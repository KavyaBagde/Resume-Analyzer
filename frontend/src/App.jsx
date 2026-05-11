import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

import LandingPage from "./pages/LandingPage";
import AnalysisPage from "./pages/AnalysisPage";
import AuthPage from "./pages/AuthPage";
import ResumePage from "./pages/ResumePage";

// Dashboard imports
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Resumes from "./pages/dashboard/Resumes";
import Settings from "./pages/dashboard/Settings";
import Billing from "./pages/dashboard/Billing";
import Checkout from "./pages/dashboard/Checkout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-cyan-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Initializing application...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis/:id" element={<AnalysisPage />} />

        {/* Auth */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billing/checkout" element={<Checkout />} />
        </Route>

        <Route
          path="/resume/:resumeId"
          element={
            <PrivateRoute>
              <ResumePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
