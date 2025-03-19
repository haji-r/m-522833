
import { useContext } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Info } from "lucide-react";
import { ModelSwitch } from "./ModelSwitch";
import { useTheme } from "../ThemeProvider";
import { AuthContext } from "../../context/AuthProvider";

export const ChatHeader = () => {
  const { theme } = useTheme();
  const { selectedModel } = useContext(AuthContext);

  const selectedModelBackground = theme === 'dark' ? 'bg-slate-500' : 'bg-slate-100';
  const iconColor = theme === 'dark' ? 'white' : '#00000';
  // const modelAvatar = '../../../src/assets/images/logo-cropped.png';

  const modelAvatar = selectedModel === 'Blue' ?
    '../../../src/assets/images/blue.webp' : '../../../src/assets/images/sierra.webp'

  return (
    <div className="bg-[var(--background)] border-b border-[var(--border)] p-2 sm:p-4 flex items-center gap-8">
      <div className={`border border-inherit flex gap-10 p-2 pl-4 pr-4 rounded-md ${selectedModelBackground}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <img src={modelAvatar} alt="User" className="object-cover" />
          </Avatar>
          <div>
            <div className="font-medium text-sm sm:text-base text-[var(--foreground)]">{selectedModel}</div>
            {/* <div className="text-xs sm:text-sm text-[var(--muted)]">Active now</div> */}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ModelSwitch color={iconColor} />
          {/* <button 
            onClick={onSendSimulatedMessage}
            className="p-1.5 sm:p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" transform="rotate(180 12 12)" />
            </svg>
          </button> */}
          {/* <button className="p-1.5 sm:p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors">
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
          </button> */}
        </div>

      </div>
    </div>
  );
};
