import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';

// Import Pages
import Home from './pages/Home'; // <--- NEW IMPORT
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// --- Navbar Component ---
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Go to Home after logout
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">HelpLink</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                <div className="hidden md:block h-6 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 hidden md:block">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 text-sm font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 text-sm font-bold transition shadow-md">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Main App ---
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />           {/* Public Landing Page */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Protected Dashboard */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;