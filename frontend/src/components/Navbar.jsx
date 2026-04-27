import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineLogin,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: HiOutlineHome },
    { to: '/results', label: 'Results', icon: HiOutlineDocumentText },
    { to: '/about', label: 'About', icon: HiOutlineInformationCircle },
  ];

  const adminLinks = admin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard', icon: HiOutlineCog },
        { to: '/admin/manage', label: 'Manage', icon: HiOutlineDocumentText },
      ]
    : [];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-cyan group-hover:shadow-glow-purple transition-shadow duration-300">
              <HiOutlineAcademicCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold gradient-text hidden sm:block">
              GradeVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-white/10 text-accent-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {adminLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-white/10 text-accent-purple'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {admin ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  Hi, <span className="text-accent-cyan font-medium">admin</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-2 btn-gradient text-sm !px-4 !py-2"
              >
                <HiOutlineLogin className="w-4 h-4" />
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            {isMobileOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
            style={{ background: 'rgba(15, 23, 42, 0.95)' }}
          >
            <div className="px-4 py-3 space-y-1">
              {[...navLinks, ...adminLinks].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-white/10 text-accent-cyan'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                {admin ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    Logout (admin)
                  </button>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-accent-cyan hover:bg-white/5 transition-all"
                  >
                    <HiOutlineLogin className="w-5 h-5" />
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
