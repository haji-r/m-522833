
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AuthContext} from "../context/AuthProvider";

const Navbar = () => {
  const { user, accessToken } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">ShazBot</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <Link to="/research" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Research
            </Link>
            { (!user || !accessToken) && 
              <>
                <Link to="/sign-up" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Sign-up
                </Link>
                <Link to="/sign-in" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  <Button size="sm" className="bg-slate-500 self-start hover:bg-yellow-500">Sign-in</Button>
                </Link>
              </>
            }
            { (accessToken) &&
                <Link to="/shazbot" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  <Button size="sm" className="bg-slate-500 self-start hover:bg-yellow-500">Shazbot</Button>
                </Link>
            }            
          </div>
          
          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:max-w-none">
                <div className="mt-6 flex flex-col space-y-4">
                  <Link to="/" className="text-base font-medium text-gray-900 hover:text-primary">
                    Home
                  </Link>
                  <Link to="/about" className="text-base font-medium text-gray-900 hover:text-primary">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-base font-medium text-gray-900 hover:text-primary">
                    Contact
                  </Link>
                  <Link to="/research" className="text-base font-medium text-gray-900 hover:text-primary">
                    Research
                  </Link>
                  { (!user || !accessToken) &&
                      <>
                        <Link to="/sign-up" className="text-base font-medium text-gray-900 hover:text-primary">
                          Sign-Up
                        </Link>
                        <Link to="/sign-in" className="text-base font-medium text-gray-900 hover:text-primary">
                          <Button size="sm" className="bg-slate-500 self-start hover:bg-yellow-500">Sign-in</Button>
                        </Link>
                      </>
                  }
                  { (user && accessToken) &&
                      <Link to="/shazbot" className="text-base font-medium text-gray-900 hover:text-primary">
                        <Button size="sm" className="bg-slate-500 self-start hover:bg-yellow-500">Shazbot</Button>
                      </Link>
                  }
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
