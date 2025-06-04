import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SuperAgentPage from './pages/SuperAgentPage';
import PublicChatPage from './pages/PublicChatPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ExploreFeeds from './pages/ExploreFeeds';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyPage from './pages/auth/VerifyPage';
import AuthCallback from './pages/auth/AuthCallback';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/verify" element={<VerifyPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Main App Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                
                {/* Super Agent - Primary Interface */}
                <Route path="super-agent" element={<SuperAgentPage />} />
                
                {/* Legacy agent routes redirect to Super Agent */}
                <Route path="chat/water" element={<Navigate to="/super-agent" replace />} />
                <Route path="chat/trash" element={<Navigate to="/super-agent" replace />} />
                <Route path="chat/sewer" element={<Navigate to="/super-agent" replace />} />
                <Route path="chat/boeing" element={<Navigate to="/super-agent" replace />} />
                <Route path="chat/dierbergs" element={<Navigate to="/super-agent" replace />} />
                <Route path="chat/monsanto" element={<Navigate to="/super-agent" replace />} />
                
                
                {/* Other Pages */}
                <Route path="public-chat" element={<PublicChatPage />} />
                <Route path="explore" element={<ExploreFeeds />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
