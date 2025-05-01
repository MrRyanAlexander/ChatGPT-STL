
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import PublicChatPage from "@/pages/PublicChatPage";
import GalleryPage from "@/pages/GalleryPage";
import ExploreFeeds from "@/pages/ExploreFeeds";
import SettingsPage from "@/pages/SettingsPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import AuthCallback from "@/pages/auth/AuthCallback";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="chat/:agentId" element={<ChatPage />} />
                <Route path="public-chat" element={<PublicChatPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="explore" element={<ExploreFeeds />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              
              <Route path="/auth">
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="verify" element={<VerifyPage />} />
                <Route path="callback" element={<AuthCallback />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
