import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowUpNarrowWide,
  BadgeDollarSign,
  Home,
  LineChart,
  Menu,
  Package,
  SwatchBook,
  UserCog,
  Users,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import LOGO from "../../assets/Main B.png";

function DashboardLayout() {
  return (
    <>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Desktop Menu */}
        <div className="hidden border-r bg-sky-950 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-20 items-center justify-center px-4 lg:h-[80px] lg:p-4">
              <img src={LOGO} alt="Organicx Media logo" className="w-[150px]" />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-md font-medium lg:px-4">
                <Link
                  to="/admin"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white "
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/admin/niche"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <Users className="h-4 w-4" />
                  Clients
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <Package className="h-4 w-4" />
                  Plans
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <SwatchBook className="h-4 w-4" />
                  Brands
                </Link>
                <Link className="flex w-full items-start gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-3 px-3 py-2 border-none bg-sky-950 rounded-full active:bg-sky-900 text-gray-500 transition-all hover:text-white text-md  hover:bg-transparent active:border-none">
                        <LineChart className="h-4 w-4" />
                        <span> Growth & Strategy</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem ><Link to="/admin/niche">Niche</Link></DropdownMenuItem>
                      <DropdownMenuItem>Services</DropdownMenuItem>
                      <DropdownMenuItem>Packages</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <BadgeDollarSign className="h-4 w-4" />
                  Finance
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <UserCog className="h-4 w-4" />
                  HR
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                >
                  <ArrowUpNarrowWide className="h-4 w-4" />
                  Sales
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex flex-col">
          <header className="flex h-14 justify-between items-center gap-4  px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden "
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-sky-950">

                <div className="flex h-20 items-center justify-center px-4 lg:h-[80px] lg:p-4">
                  <img
                    src={LOGO}
                    alt="Organicx Media logo"
                    className="w-[150px]"
                  />
                </div>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white "
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <Users className="h-4 w-4" />
                    Clients
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <Package className="h-4 w-4" />
                    Plans
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <SwatchBook className="h-4 w-4" />
                    Brands
                  </Link>
                  <Link className="flex w-full items-start gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-3 px-3 py-2 border-none bg-sky-950 rounded-full active:bg-sky-900 text-gray-500 transition-all hover:text-white text-md  hover:bg-transparent active:border-none">
                          <LineChart className="h-4 w-4" />
                          <span> Growth & Strategy</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <BadgeDollarSign className="h-4 w-4" />
                    Finance
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <UserCog className="h-4 w-4" />
                    HR
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-full active:bg-sky-900 px-3 py-2 text-gray-500 transition-all hover:text-white"
                  >
                    <ArrowUpNarrowWide className="h-4 w-4" />
                    Sales
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <Outlet/>
        </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
