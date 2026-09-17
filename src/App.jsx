import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* =========================================
   PUBLIC PAGES
========================================= */

import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import SellCar from "./pages/SellCar/SellCar";
import Brands from "./pages/Brands/Brands";
import Showroom from "./pages/Showroom/Showroom";
// import Compare from "./pages/Compare/Compare";
import CompareCars from "./pages/CompareCars/CompareCars";
import Wishlist from "./pages/Wishlist/Wishlist";
import AIConcierge from "./pages/AIConcierge/AIConcierge";
import TestDrive from "./pages/TestDrive/TestDrive";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Services from "./pages/Services/Services";
import About from "./pages/About/About";
import Testimonials from "./pages/Testimonials/Testimonials";
import Contact from "./pages/Contact/Contact";

/* =========================================
   PUBLIC COMPONENTS
========================================= */

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* =========================================
   ADMIN
========================================= */

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Inventory from "./admin/Inventory";
import Appointments from "./admin/Appointments";
import Customers from "./admin/Customers";
import Analytics from "./admin/Analytics";
import SellRequests from "./admin/SellRequests";
import AIAssistant from "./admin/AIAssistant";


/* =========================================
   PUBLIC LAYOUT
========================================= */

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
};


/* =========================================
   ADMIN LAYOUT
========================================= */

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


/* =========================================
   404
========================================= */

const NotFound = () => {
  return (
    <PublicLayout>
      <section
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "120px 20px",
        }}
      >
        <div>
          <span>404</span>

          <h1>
            Page not found
          </h1>

          <a href="/">
            Back to Home
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};


/* =========================================
   APP
========================================= */

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            HOME
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================
            PUBLIC PAGES
        ================================= */}

        <Route
          path="/cars"
          element={
            <PublicLayout>
              <Cars />
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
          path="/sell"
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

        {/* <Route
          path="/compare"
          element={
            <PublicLayout>
              <Compare />
            </PublicLayout>
          }
        /> */}

        <Route
          path="/compare-cars"
          element={
            <PublicLayout>
              <CompareCars />
            </PublicLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PublicLayout>
              <Wishlist />
            </PublicLayout>
          }
        />

        <Route
          path="/ai-concierge"
          element={
            <PublicLayout>
              <AIConcierge />
            </PublicLayout>
          }
        />

        <Route
          path="/test-drive"
          element={
            <PublicLayout>
              <TestDrive />
            </PublicLayout>
          }
        />

        <Route
          path="/how-it-works"
          element={
            <PublicLayout>
              <HowItWorks />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/testimonials"
          element={
            <PublicLayout>
              <Testimonials />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />


        {/* =================================
            ADMIN
        ================================= */}

        <Route
          path="/admin"
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
          path="/admin/sell-requests"
          element={
            <AdminPage>
              <SellRequests />
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


        {/* =================================
            404
        ================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;