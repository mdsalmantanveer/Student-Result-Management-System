import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin data on mount
    const storedAdmin = localStorage.getItem('gradevault_admin');
    if (storedAdmin) {
      try {
        const parsed = JSON.parse(storedAdmin);
        setAdmin(parsed);
      } catch (error) {
        localStorage.removeItem('gradevault_admin');
      }
    }
    setLoading(false);
  }, []);

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('gradevault_admin', JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('gradevault_admin');
  };

  const getToken = () => {
    return admin?.token || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
