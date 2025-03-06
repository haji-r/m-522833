
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Register from "./pages/Register";  // Import the new Register component
import { NavMenu } from "./components/NavMenu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="fixed top-4 right-4 z-50">
            <NavMenu />
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<div className="p-4">About Page</div>} />
            <Route path="/contact" element={<div className="p-4">Contact Page</div>} />
            <Route path="/admin" element={<div className="p-4">Admin Page</div>} />
            <Route path="/signup" element={<div className="p-4">Sign Up Page</div>} />
            <Route path="/register" element={<Register />} />  {/* Add new route for Register page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
