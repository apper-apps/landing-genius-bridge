import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Dashboard from "@/components/pages/Dashboard";

const Layout = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.user);
const { logout } = useContext(AuthContext);
  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(() => {
    if (user) {
      setTokenBalance(user.tokenBalance || 0);
    }
  }, [user]);

const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  const isWizardStep = ['/mulai', '/masalah', '/pattern', '/preview', '/daftar'].includes(location.pathname);
  const isPublicPage = location.pathname.startsWith('/p/');

  if (isPublicPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold gradient-text">LandingGenius</h1>
                <p className="text-xs text-slate-500 -mt-1">AI untuk UMKM</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {!isWizardStep && (
                <>
                  <Link 
                    to="/" 
                    className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                      location.pathname === '/' ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  >
                    Beranda
                  </Link>
{user && (
                    <>
                      <Link 
                        to="/dashboard" 
                        className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                          location.pathname === '/dashboard' ? 'text-primary-600' : 'text-slate-600'
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/landing-pages" 
                        className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                          location.pathname === '/landing-pages' ? 'text-primary-600' : 'text-slate-600'
                        }`}
                      >
                        Landing Pages
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>

            {/* User Actions */}
<div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  {/* Token Balance */}
                  <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-accent-50 to-accent-100 px-3 py-2 rounded-lg">
                    <ApperIcon name="Coins" className="h-4 w-4 text-accent-600" />
                    <span className="text-sm font-semibold text-accent-700">{tokenBalance} Token</span>
                  </div>

                  {/* User Menu */}
                  <div className="relative group">
<button className="flex items-center space-x-2 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 transition-colors">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {(user.firstName || user.name)?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-slate-700">{user.firstName || user.name}</span>
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <ApperIcon name="LayoutDashboard" className="inline h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <ApperIcon name="LogOut" className="inline h-4 w-4 mr-2" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/masuk" 
                    className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link 
                    to="/mulai" 
                    className="btn-animate bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
                  >
                    Mulai Gratis
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;