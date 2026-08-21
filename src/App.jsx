import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';

// Interactive Context Providers
import { CartProvider } from './hooks/useCart';
import { ChatbotProvider } from './hooks/useChatbot';

// Features UI overlays drawer
import { CartDrawer } from './components/cart/CartDrawer';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { ChatbotButton } from './components/chatbot/ChatbotButton';

// Public/Customer Pages lazy-loading
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages and wrappers
const ProtectedAdminRoute = lazy(() => import('./components/admin/ProtectedAdminRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminQueries = lazy(() => import('./pages/admin/AdminQueries'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminOffers = lazy(() => import('./pages/admin/AdminOffers'));
const AdminChatbot = lazy(() => import('./pages/admin/AdminChatbot'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminIntegrations = lazy(() => import('./pages/admin/AdminIntegrations'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const AdminNotFound = lazy(() => import('./pages/admin/AdminNotFound'));

const CustomerLayout = () => (
  <div className="flex flex-col min-h-screen bg-stone-50 select-none">
    <Navbar />
    <main className="flex-grow">
      <Suspense fallback={<Loader fullPage={true} />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <CartDrawer />
    <ChatbotWidget />
    <ChatbotButton />
    <ScrollToTop />
  </div>
);

function App() {
  return (
    <Router>
      <CartProvider>
        <ChatbotProvider>
          <Suspense fallback={<Loader fullPage={true} />}>
            <Routes>
              {/* Public/Customer routes inside layout wrapper */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Portal paths */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected admin panel sub-routes */}
              <Route path="/admin" element={<ProtectedAdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/:id/edit" element={<AdminProductForm />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="queries" element={<AdminQueries />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="offers" element={<AdminOffers />} />
                  <Route path="chatbot" element={<AdminChatbot />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="integrations" element={<AdminIntegrations />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="*" element={<AdminNotFound />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </ChatbotProvider>
      </CartProvider>
    </Router>
  );
}

export default App;

