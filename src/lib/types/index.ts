export type Store = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attributes {
  name: string;
  widgetType: "text" | "radio" | "checkbox" | "switch";
  defaultValue?: string;
  availableOptions?: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
}

export interface ProductAttribute {
  name: string;
  value: string | boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: PriceConfiguration;
  category: Category;
  attributes: ProductAttribute[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  toppings: {
    _id: string;
    name: string;
    image: string;
    price: number;
    tenantId: string;
  }[];
}

export interface Topping {
  _id?: string;
  label: string;
  image: string;
  price: number;
}
