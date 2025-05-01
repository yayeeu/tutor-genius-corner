import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Chat from "./pages/Chat";
import Practice from "./pages/Practice";
import ScreeningAssignment from "./pages/ScreeningAssignment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CourseProvider>
            <Toaster />
            <Sonner />
            <Navigation />
            <div className="pt-16 min-h-screen flex flex-col bg-gradient-to-br from-aku-cream/50 to-white">
              <Routes>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/learn" element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                } />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } />
                <Route path="/practice" element={
                  <ProtectedRoute>
                    <Practice />
                  </ProtectedRoute>
                } />
                <Route path="/screening" element={
                  <ProtectedRoute>
                    <ScreeningAssignment />
                  </ProtectedRoute>
                } />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/help" element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </CourseProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
