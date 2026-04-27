import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageResults from './pages/ManageResults';
import About from './pages/About';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { admin } = useAuth();
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/results/:rollNumber" element={<ResultPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <ProtectedRoute>
                <ManageResults />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
