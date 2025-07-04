import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import DestinationsPage from './DestinationsPage';
import BookingModal from './BookingModal';
import SignupModal from './SignupModal';
import Navbar from './Navbar';
import LoginModal from './LoginModal';
import CruiseShipsPage from './CruiseShipsPage';
import BookingOverviewPage from './BookingOverviewPage';
import SuperAdminDashboard from './SuperAdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import PassengerDashboard from './PassengerDashboard';
import FoodInventoryDashboard from './FoodInventoryDashboard';
import ItineraryDashboard from './ItineraryDashboard';

export const AuthContext = React.createContext();

function SignupRouteHandler({ isAuthenticated, setIsSignupModalOpen }) {
  useEffect(() => {
    setIsSignupModalOpen(true);
  }, [setIsSignupModalOpen]);
  if (isAuthenticated) return <Navigate to="/" />;
  return null;
}

function LoginRouteHandler({ isAuthenticated, setIsLoginModalOpen }) {
  useEffect(() => {
    setIsLoginModalOpen(true);
  }, [setIsLoginModalOpen]);
  if (isAuthenticated) return <Navigate to="/" />;
  return null;
}

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(currentUser?.role?.toLowerCase())) return <Navigate to="/" />;
  return children;
};

function AppRoutes(props) {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    isLoginModalOpen,
    isSignupModalOpen,
    isBookingModalOpen,
    setIsBookingModalOpen
  } = props;

  return (
    <>
      <Navbar
        onSignupClick={() => setIsSignupModalOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          if (window.location.pathname === "/login") navigate("/");
        }}
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
          if (window.location.pathname === "/login") navigate("/signup");
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => {
          setIsSignupModalOpen(false);
          if (window.location.pathname === "/signup") navigate("/");
        }}
        openLoginModal={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
          if (window.location.pathname === "/signup") navigate("/login");
        }}
      />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage onBookingClick={() => setIsBookingModalOpen(true)} />} />
        <Route path="/cruise-ships" element={<CruiseShipsPage />} />
        <Route path="/booking" element={<Navigate to="/" replace />} />
        <Route path="/booking-overview" element={<BookingOverviewPage />} />
        <Route path="/login" element={<LoginRouteHandler isAuthenticated={isAuthenticated} setIsLoginModalOpen={setIsLoginModalOpen} />} />
        <Route path="/signup" element={<SignupRouteHandler isAuthenticated={isAuthenticated} setIsSignupModalOpen={setIsSignupModalOpen} />} />

        {/* Protected Routes */}
        <Route path="/super-admin" element={<ProtectedRoute allowedRoles={["superadmin"]}><SuperAdminDashboard /></ProtectedRoute>} />
        <Route path="/customer-dashboard" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/passenger-management" element={<ProtectedRoute allowedRoles={["superadmin"]}><PassengerDashboard /></ProtectedRoute>} />
        <Route path="/food-inventory-management" element={<ProtectedRoute allowedRoles={["superadmin"]}><FoodInventoryDashboard /></ProtectedRoute>} />
        <Route path="/itinerary-management" element={<ProtectedRoute allowedRoles={["superadmin"]}><ItineraryDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  // For development: Auto-authenticate as super admin
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Super Admin',
    email: 'admin@serendipwaves.com',
    role: 'superadmin'
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, setIsAuthenticated, setCurrentUser }}>
      <Router>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
          isLoginModalOpen={isLoginModalOpen}
          isSignupModalOpen={isSignupModalOpen}
          isBookingModalOpen={isBookingModalOpen}
          setIsBookingModalOpen={setIsBookingModalOpen}
        />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;