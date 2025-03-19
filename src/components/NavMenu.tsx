
import React, { useEffect, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Info, Mail, User, UserPlus, LogOut, Menu, LogIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router';
import { AuthContext} from "../context/AuthProvider";

export const NavMenu = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = useParams()
  const { signout, accessToken, user } = useContext(AuthContext);

  const handleSignOut = () => {
    const signOut = signout();
    if (signOut)
      navigate("/sign-in");
  }

  if (location.pathname != "/shazbot")
    return null;

  const linkClass = "flex items-center gap-2 cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--message-bg)] transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[var(--background)]">
        <DropdownMenuItem asChild>
          <Link to="/" className={linkClass}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/about" className={linkClass}>
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/contact" className={linkClass}>
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>
        { (user && user.role == "admin") &&
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className={linkClass}>
                <User className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          </>
        }
        { !accessToken &&
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/sign-up" className={linkClass}>
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/sign-in" className={linkClass}>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </DropdownMenuItem>
          </>
        }
        { accessToken &&
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400"
              onClick={() => handleSignOut()}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
