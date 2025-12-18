import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import logo2 from '../assets/logo2.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 200);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 200);
  };

  return (
    <>
      {/* --- MODALS --- */}
      {!user && (
        <>
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToRegister={switchToRegister}
          />
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onSwitchToLogin={switchToLogin}
          />
        </>
      )}

      {/* --- NAVIGATION BAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm' // Scrolled State
        : 'bg-white border-b border-gray-100' // Initial State (White background restored)
        }`}>

        {/* Alignment Fix: max-w-7xl to match Home Page */}
<div className="w-full px-6 md:px-16 py-4">          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 md:h-12 w-auto flex items-center justify-center">
                <img
                  src={logo2}
                  alt="Reach Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">

              {user ? (
                // --- VIEW FOR LOGGED IN USERS ---
                <>
                  <Link
                    to="/dashboard"
                    className="hidden md:block text-gray-600 hover:text-[#747def] font-medium transition-colors"
                  >
                    Dashboard
                  </Link>

                  {/* Mobile Dashboard Icon */}
                  <Link
                    to="/dashboard"
                    className="md:hidden p-2 text-gray-600 hover:text-[#747def] transition-colors"
                    title="Dashboard"
                  >
                    <LayoutDashboard size={24} />
                  </Link>

                  {/* Divider */}
                  <div className="hidden md:block h-6 w-px bg-gray-300 mx-2"></div>

                  {/* Name Link */}
                  <Link
                    to="/profile"
                    className="text-[#747def] font-bold hover:text-[#5e63c2] transition-colors hidden sm:block"
                  >
                    {user.name.split(' ')[0]}
                  </Link>

                  {/* Profile Circle */}
                  <Link
                    to="/profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 ml-1 hover:scale-105 transition-transform"
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#747def] font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Link>

                  {/* --- CUSTOM LOGOUT BUTTON --- */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#F4616D] hover:bg-[#e05560] text-white pl-3 pr-5 py-2 rounded-full font-bold transition-all shadow-md ml-4 group"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center">
                      <LogOut size={12} strokeWidth={3} className="ml-0.5 text-white" />
                    </div>
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                  {/* --------------------------- */}
                </>
              ) : (
                // --- VIEW FOR GUESTS ---
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 md:px-6 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-white/50 transition-all duration-200 font-medium"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="px-4 md:px-6 py-2 rounded-full bg-[#25c19b] text-white hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-[#25c19b]/10 font-medium"
                  >
                    Register
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;