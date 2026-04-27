import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlineHeart } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-auto" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <HiOutlineAcademicCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold gradient-text">
                GradeVault
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A modern Student Result Management System built with the MERN stack. Secure, fast, and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/results', label: 'Check Results' },
                { to: '/about', label: 'About' },
                { to: '/admin/login', label: 'Admin Login' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 hover:text-accent-cyan text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/10"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} GradeVault. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Made with <HiOutlineHeart className="w-4 h-4 text-red-500" /> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
