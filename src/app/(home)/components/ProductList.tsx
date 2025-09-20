"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { Category, Product } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 8;
const ProductList = () => {
  // states
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/kong/api/catalog/categories`
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();

      // Add "All" category manually
      const allCategories = [{ _id: "all", name: "All" }, ...data];
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Fetch products
  const fetchProducts = async (categoryId: string, currentPage: number) => {
    try {
      setIsLoadingProducts(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: PAGE_SIZE.toString(),
      });

      console.log("params", params);

      if (categoryId !== "all") params.append("categoryId", categoryId);

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/kong/api/catalog/products?${params}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.totalPages ?? 1);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Load categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load products whenever activeCategory changes or page changes
  useEffect(() => {
    fetchProducts(activeCategory, page);
  }, [activeCategory, page]);

  // Reset page to 1 when switching categories
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  return (
    <section className="container mx-auto my-10 px-[100px]">
      {isLoadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          {/* Tabs List */}
          <TabsList className="flex justify-start gap-4 bg-transparent p-0 border-b border-border">
            {categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="relative text-muted-foreground data-[state=active]:text-primary pb-2 transition-colors
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full 
                  after:bg-primary after:scale-x-0 after:origin-center data-[state=active]:after:scale-x-100 after:transition-transform cursor-pointer"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value={activeCategory}>
            {isLoadingProducts && products.length === 0 ? (
              <p>Loading products...</p>
            ) : (
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="my-6 jutify-center">
          <PaginationContent>
            {/* Previous pagination button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>
            {/* Render page numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink isActive={page === page}>
                    <button onClick={() => setPage(page)}>{page}</button>
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              {totalPages > 5 && <PaginationEllipsis />}
            </PaginationItem>

            {/* Next pagination button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default ProductList;
