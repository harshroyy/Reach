import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';

// Import Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // <--- IMPORT THE REAL DASHBOARD HERE

// --- Components ---

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold text-blue-600">HelpLink</Link>
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">Hi, {user.name} ({user.role})</span>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// --- Main App Component ---

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;