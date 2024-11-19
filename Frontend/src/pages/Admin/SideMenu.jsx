import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Shop from "../../assets/branch.png";
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
import LOGO from "../../assets/Main A.png";
import { useEffect, useState } from "react";
import { GetAllBranch } from "@/store/features/branch/branchSlice";
import { useDispatch, useSelector } from "react-redux";

function DashboardLayout() {
  const branch = useSelector((state) => state.branch.branch);
  const [searchTerm, setSearchTerm] = useState("");
  const [Branches, setBranches] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllBranch());
  }, [dispatch]);

  useEffect(() => {
    if (branch && branch.branch) {
      setBranches(branch.branch);
    }
  }, [branch]);
  console.log(branch);
  const filterbranches = branch.Branches?.filter((branch) =>
    branch?.branch_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filterbranches);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[220px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block border-r fixed bg-sidebar-bg w-[220px] h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 px-4 mt-2">
            <img src={LOGO} alt="Organicx Media logo" className="w-[100px]" />
          </div>
          <nav className="flex-1 px-2 text-sm font-medium lg:px-4 text-sidebar-text bg-gradient-to-b from-white to-slate-200 mr-2 rounded-t-lg pt-4 border ">
            
            <Link
              to="/admin/"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:bg-sidebar-hover "
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:bg-sidebar-hover "
            >
              <Package className="h-4 w-4" />
              Plans
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3  px-3 py-2 transition-all hover:bg-sidebar-hover"
            >
              <SwatchBook className="h-4 w-4" />
              Brands
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3  px-3 py-2 transition-all hover:bg-sidebar-hover "
            >
              <LineChart className="h-4 w-4" />
              Growth & Strategy
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:bg-sidebar-hover"
            >
              <BadgeDollarSign className="h-4 w-4" />
              Finance
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:bg-sidebar-hover"
            >
              <UserCog className="h-4 w-4" />
              HR
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:bg-sidebar-hover "
            >
              <ArrowUpNarrowWide className="h-4 w-4" />
              Sales
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full gap-3  px-3 py-2 text-left transition-all hover:bg-sidebar-hover active:bg-sidebar-bg">
                  <div className="flex w-full items-center justify-between mt-0">
                    <div className="flex justify-start items-center">
                    <img
                          src={Shop} // Add an icon URL or a default icon
                          alt={branch.branch_name}
                          className="w-5 h-5 mr-4"
                        />
                        <span className="text-medium">Branch</span>
                    </div>
                    
                    <MdOutlineKeyboardArrowDown className="text-lg" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-gray-100 text-gray-900"
              >
                <div className="p-4 bg-white shadow rounded-lg">
                  <h3 className="text-sidebar-sub-gray font-semibold text-sm mb-3">
                    Our Branches
                  </h3>
                  <div className="space-y-2">
                    {filterbranches?.map((branch) => (
                      <div
                        key={branch._id}
                        className="flex items-center p-2 bg-gray-100 rounded hover:bg-sidebar-hover"
                      >
                        <img
                          src={Shop} // Add an icon URL or a default icon
                          alt={branch.branch_name}
                          className="w-4 h-4 mr-4"
                        />
                        <Link
                          to={`/admin/branch/${branch._id}`}
                          className="text-gray-800 text-sm"
                        >
                          {branch.branch_name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex text-[12px]  font-medium items-center justify-between border-t pt-3">
                    <Link
                      to="/admin/add-branch"
                      className="text-sidebar-sub-gray hover:underline"
                    >
                      + Add workspace
                    </Link>
                    <Link
                      to="/admin/branch"
                      className="text-sidebar-sub-gray hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                      Browse all
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {/* <Link
            to="/admin/branch"
            className="text-sm font-medium self-center text-gray-300 hover:text-white w-40 rounded-full px-5 py-2 mb-4 bg-sky-900/50 border border-sky-950 hover:border-sky-900 hover:bg-sky-950 transition-all text-center"
          >
            Branch
          </Link> */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <header className="flex justify-between items-center h-14 px-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-sidebar-bg text-sidebar-text"
            >
              <div className="flex items-center justify-center h-20 px-4">
                <img
                  src={LOGO}
                  alt="Organicx Media logo"
                  className="w-[150px]"
                />
              </div>
              <nav className="flex flex-col h-full gap-2 text-lg font-medium pl-2 bg-gradient-to-b from-white to-slate-200 rounded-t-lg pt-4 border ">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 px-3 py-2 text-left transition-all hover:bg-sidebar-hover">
                      <Home className="h-4 w-4" />
                      Branch
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-sidebar-bg text-sidebar-text"
                  >
                    <div className="p-4 bg-white shadow rounded-lg">
                      <h3 className="text-sidebar-sub-gray font-semibold text-sm mb-3">
                        Our Branches
                      </h3>
                      <div className="space-y-2">
                        {filterbranches?.map((branch) => (
                          <div
                            key={branch._id}
                            className="flex items-center p-2 bg-gray-100 rounded hover:bg-sidebar-hover"
                          >
                            <img
                              src={Shop} // Add an icon URL or a default icon
                              alt={branch.branch_name}
                              className="w-4 h-4 mr-2"
                            />
                            <Link
                              to={`/admin/branch/${branch._id}`}
                              className="text-gray-800 text-sm"
                            >
                              {branch.branch_name}
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <Link
                          to="/admin/add-branch"
                          className="text-sidebar-sub-gray hover:underline"
                        >
                          + Add workspace
                        </Link>
                        <Link
                          to="/admin/branches"
                          className="text-sidebar-sub-gray hover:underline flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h8m-8 6h16"
                            />
                          </svg>
                          Browse all
                        </Link>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <Link
                  to="/admin/niche"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <Users className="h-4 w-4" />
                  Clients
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <Package className="h-4 w-4" />
                  Plans
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <SwatchBook className="h-4 w-4" />
                  Brands
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all"
                >
                  <LineChart className="h-4 w-4" />
                  Growth & Strategy
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <BadgeDollarSign className="h-4 w-4" />
                  Finance
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <UserCog className="h-4 w-4" />
                  HR
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all "
                >
                  <ArrowUpNarrowWide className="h-4 w-4" />
                  Sales
                </Link>
                <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full gap-3  px-3 py-2 text-left transition-all hover:bg-sidebar-hover active:bg-sidebar-bg">
                  <div className="flex w-full items-center justify-between mt-0">
                    <div className="flex justify-start items-center">
                    <img
                          src={Shop} // Add an icon URL or a default icon
                          alt={branch.branch_name}
                          className="w-5 h-5 mr-4"
                        />
                        <span className="text-medium">Branch</span>
                    </div>
                    
                    <MdOutlineKeyboardArrowDown className="text-lg" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-gray-100 text-gray-900"
              >
                <div className="p-4 bg-white shadow rounded-lg">
                  <h3 className="text-sidebar-sub-gray font-semibold text-sm mb-3">
                    Our Branches
                  </h3>
                  <div className="space-y-2">
                    {filterbranches?.map((branch) => (
                      <div
                        key={branch._id}
                        className="flex items-center p-2 bg-gray-100 rounded hover:bg-sidebar-hover"
                      >
                        <img
                          src={Shop} // Add an icon URL or a default icon
                          alt={branch.branch_name}
                          className="w-4 h-4 mr-4"
                        />
                        <Link
                          to={`/admin/branch/${branch._id}`}
                          className="text-gray-800 text-sm"
                        >
                          {branch.branch_name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex text-[12px]  font-medium items-center justify-between border-t pt-3">
                    <Link
                      to="/admin/add-branch"
                      className="text-sidebar-sub-gray hover:underline"
                    >
                      + Add workspace
                    </Link>
                    <Link
                      to="/admin/branches"
                      className="text-sidebar-sub-gray hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                      Browse all
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
