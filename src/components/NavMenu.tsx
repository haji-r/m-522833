
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Info, Mail, User, UserPlus, LogOut, Menu, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const NavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--message-bg)] transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[var(--background)]">
        <DropdownMenuItem asChild>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/about" className="flex items-center gap-2 cursor-pointer">
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/contact" className="flex items-center gap-2 cursor-pointer">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/signup" className="flex items-center gap-2 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/signin" className="flex items-center gap-2 cursor-pointer">
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
