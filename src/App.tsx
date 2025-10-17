import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import FreefireDiamond from "./pages/FreefireDiamond";
import TikTokCoins from "./pages/TikTokCoins";
import CapCutPro from "./pages/CapCutPro";
import RobloxRobux from "./pages/RobloxRobux";
import ChatGPTSubscription from "./pages/ChatGPTSubscription";
import LogoDesign from "./pages/LogoDesign";
import PostDesign from "./pages/PostDesign";
import BannerDesign from "./pages/BannerDesign";
import ThumbnailDesign from "./pages/ThumbnailDesign";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/freefire-diamond" element={<FreefireDiamond />} />
            <Route path="/product/tiktok-coins" element={<TikTokCoins />} />
            <Route path="/product/capcut-pro" element={<CapCutPro />} />
            <Route path="/product/roblox-robux" element={<RobloxRobux />} />
            <Route path="/product/chatgpt-premium" element={<ChatGPTSubscription />} />
            <Route path="/product/logo-design" element={<LogoDesign />} />
            <Route path="/product/post-design" element={<PostDesign />} />
            <Route path="/product/banner-design" element={<BannerDesign />} />
            <Route path="/product/thumbnail-design" element={<ThumbnailDesign />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
