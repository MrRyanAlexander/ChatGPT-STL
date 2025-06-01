
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import SuperAgentPage from "@/pages/SuperAgentPage";
import GalleryPage from "@/pages/GalleryPage";
import PublicChatPage from "@/pages/PublicChatPage";
import SettingsPage from "@/pages/SettingsPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ExploreFeeds from "@/pages/ExploreFeeds";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="chat/:agentId" element={<ChatPage />} />
                <Route path="super-agent" element={<SuperAgentPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="public-chat" element={<PublicChatPage />} />
                <Route path="explore" element={<ExploreFeeds />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
