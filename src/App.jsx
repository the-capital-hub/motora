import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ================= PUBLIC PAGES =================

import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import SellCar from "./pages/SellCar/SellCar";
import Brands from "./pages/Brands/Brands";
import Showroom from "./pages/Showroom/Showroom";
import CompareCars from "./pages/CompareCars/CompareCars";
import Wishlist from "./pages/Wishlist/Wishlist";
import AIConcierge from "./pages/AIConcierge/AIConcierge";
import TestDrive from "./pages/TestDrive/TestDrive";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Services from "./pages/Services/Services";
import About from "./pages/About/About";
import Testimonials from "./pages/Testimonials/Testimonials";
import Contact from "./pages/Contact/Contact";

// ================= AUTH =================

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= PUBLIC COMPONENTS =================

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ================= ADMIN =================

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Inventory from "./admin/Inventory";
import Appointments from "./admin/Appointments";
import Customers from "./admin/Customers";
import Analytics from "./admin/Analytics";
import SellRequests from "./admin/SellRequests";
import TestDrives from "./admin/TestDrives";
import Leads from "./admin/Leads";
import AIAssistant from "./admin/AIAssistant";
import ActivityLog from "./admin/ActivityLog";
import Settings from "./admin/Settings";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// ================= SMART SEARCH =================

import SmartSearch from "./pages/SmartSearch/SmartSearch";

// ================= CLIENT PANEL =================

import ClientProtectedRoute from "./client/ClientProtectedRoute";
import ClientLayout from "./client/ClientLayout";
import ClientDashboard from "./client/ClientDashboard";
import ClientProfile from "./client/ClientProfile";
import ClientNotifications from "./client/ClientNotifications";
import ClientSettings from "./client/ClientSettings";

import {
  ClientWishlist,
  ClientAppointments,
  ClientEnquiries,
  ClientSellRequests,
  ClientActivity,
} from "./client/ClientListPages";
import AIFloatingButton from "./components/AIFloatingButton/AIFloatingButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// ================= PUBLIC LAYOUT =================

const PublicLayout = ({ children }) => (
  <>
    <Navbar />

    <main>{children}</main>

    <Footer />
    <AIFloatingButton onClick={() => {
        window.location.href = "/ai-concierge";
      }}/>
      <ScrollToTop/>
    
  </>
);

// ================= ADMIN PAGE WRAPPER =================

const AdminPage = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AdminLayout
      activePath={location.pathname}
      onNavigate={navigate}
    >
      {children}
    </AdminLayout>
  );
};

// ================= 404 PAGE =================

const NotFound = () => (
  <PublicLayout>
    <section
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <span>404</span>

        <h1>Page not found</h1>

        <a href="/">Back to Home</a>
      </div>
    </section>
  </PublicLayout>
);

// ================= APP =================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================================================= */}
        {/*                  PUBLIC WEBSITE                   */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cars"
          element={
            <PublicLayout>
              <Cars />
            </PublicLayout>
          }
        />

        <Route
          path="/cars/:id"
          element={
            <PublicLayout>
              <CarDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/car/:id"
          element={
            <PublicLayout>
              <CarDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/sell-car"
          element={
            <PublicLayout>
              <SellCar />
            </PublicLayout>
          }
        />

        <Route
          path="/brands"
          element={
            <PublicLayout>
              <Brands />
            </PublicLayout>
          }
        />

        <Route
          path="/showroom"
          element={
            <PublicLayout>
              <Showroom />
            </PublicLayout>
          }
        />

        <Route
          path="/compare-cars"
          element={
            <PublicLayout>
              <CompareCars />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                       AUTH                        */}
        {/* ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================================================= */}
        {/*                    ADMIN AUTH                     */}
        {/* ================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ================================================= */}
        {/*                     WISHLIST                      */}
        {/* ================================================= */}

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <PublicLayout>
                <Wishlist />
              </PublicLayout>
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/*                  AI CONCIERGE                     */}
        {/* ================================================= */}

        <Route
          path="/ai-concierge"
          element={
            <PublicLayout>
              <AIConcierge />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                   SMART SEARCH                    */}
        {/* ================================================= */}

        <Route
          path="/smart-search"
          element={
            <PublicLayout>
              <SmartSearch />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                    TEST DRIVE                     */}
        {/* ================================================= */}

        <Route
          path="/test-drive"
          element={
            <PublicLayout>
              <TestDrive />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                   HOW IT WORKS                    */}
        {/* ================================================= */}

        <Route
          path="/how-it-works"
          element={
            <PublicLayout>
              <HowItWorks />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                     SERVICES                      */}
        {/* ================================================= */}

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                       ABOUT                       */}
        {/* ================================================= */}

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                    TESTIMONIALS                   */}
        {/* ================================================= */}

        <Route
          path="/testimonials"
          element={
            <PublicLayout>
              <Testimonials />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                      CONTACT                      */}
        {/* ================================================= */}

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* ================================================= */}
        {/*                    ADMIN PANEL                    */}
        {/* ================================================= */}

        <Route element={<AdminProtectedRoute />}>

          <Route
            path="/admin"
            element={
              <AdminPage>
                <Dashboard />
              </AdminPage>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminPage>
                <Dashboard />
              </AdminPage>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <AdminPage>
                <Inventory />
              </AdminPage>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <AdminPage>
                <Customers />
              </AdminPage>
            }
          />

          <Route
            path="/admin/appointments"
            element={
              <AdminPage>
                <Appointments />
              </AdminPage>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <AdminPage>
                <Analytics />
              </AdminPage>
            }
          />

          <Route
            path="/admin/leads"
            element={
              <AdminPage>
                <Leads />
              </AdminPage>
            }
          />

          <Route
            path="/admin/test-drives"
            element={
              <AdminPage>
                <TestDrives />
              </AdminPage>
            }
          />

          <Route
            path="/admin/sell-requests"
            element={
              <AdminPage>
                <SellRequests />
              </AdminPage>
            }
          />

          <Route
            path="/admin/activity-log"
            element={
              <AdminPage>
                <ActivityLog />
              </AdminPage>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminPage>
                <Settings />
              </AdminPage>
            }
          />

          <Route
            path="/admin/ai-assistant"
            element={
              <AdminPage>
                <AIAssistant />
              </AdminPage>
            }
          />

        </Route>

        {/* ================================================= */}
        {/*                    CLIENT PANEL                   */}
        {/* ================================================= */}

        <Route element={<ClientProtectedRoute />}>

          <Route
            path="/client"
            element={<ClientLayout />}
          >
            {/* Client Dashboard */}
            <Route
              index
              element={<ClientDashboard />}
            />

            {/* Wishlist */}
            <Route
              path="wishlist"
              element={<ClientWishlist />}
            />

            {/* Appointments */}
            <Route
              path="appointments"
              element={<ClientAppointments />}
            />

            {/* Enquiries */}
            <Route
              path="enquiries"
              element={<ClientEnquiries />}
            />

            {/* Sell Requests */}
            <Route
              path="sell-requests"
              element={<ClientSellRequests />}
            />

            {/* Activity */}
            <Route
              path="activity"
              element={<ClientActivity />}
            />

            {/* Notifications */}
            <Route
              path="notifications"
              element={<ClientNotifications />}
            />

            {/* Profile */}
            <Route
              path="profile"
              element={<ClientProfile />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<ClientSettings />}
            />

          </Route>

        </Route>

        {/* ================================================= */}
        {/*                       404                         */}
        {/* ================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}