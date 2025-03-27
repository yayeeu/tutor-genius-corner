
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Home2 from "./pages/Home2";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatTutor from "./pages/ChatTutor";
import ScreeningAssignment from "./pages/ScreeningAssignment";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <div className="pt-16"> {/* Add padding top for fixed navbar */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat-tutor" element={<ChatTutor />} />
            <Route path="/screening" element={<ScreeningAssignment />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
