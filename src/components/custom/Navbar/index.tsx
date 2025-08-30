import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between py-4 px-[100px]">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-gray-600 ">localmart</span>
          <div className="px-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="store-a">Store A</SelectItem>
                <SelectItem value="store-b">Store B</SelectItem>
                <SelectItem value="store-c">Store C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
