
import React, { useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "react-router-dom";
import { AuthContext} from "../../context/AuthProvider";

export const ModelSwitch = ({color}) => {
  const location = useLocation();
  const { setSelectedModel } = useContext(AuthContext);

  if (location.pathname != "/shazbot")
    return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--message-bg)] transition-colors">
          {/* <Menu className="w-5 h-5" /> */}
          <svg
            width="24px"
            height="24px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={color}
            className="w-4 h-4 sm:w-5 sm:h-5">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[var(--background)]">
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={() => setSelectedModel('Blue') }
          >
            <span className="p-2">Blue</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={() => setSelectedModel('Sierra') }
          >
            <span className="p-2">Sierra</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
