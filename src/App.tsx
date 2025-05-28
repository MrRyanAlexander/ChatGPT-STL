
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
                <Route path="agent/:agentId" element={<ChatPage />} />
                <Route path="super-agent" element={<SuperAgentPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="public-chat" element={<PublicChatPage />} />
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
