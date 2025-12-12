import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Mail, Lock, MapPin, Loader2, Heart, Handshake } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    role: 'receiver', // Default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/users/register', formData);
      login(res.data, res.data.token);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Modal Container - Auto height (No internal slider) */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 z-10 my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT SIDE: Image (Stretches to match form height) */}
        <div className="hidden md:block w-1/2 relative bg-gray-900 rounded-l-3xl overflow-hidden min-h-full">
           <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop" 
            alt="Community" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           
           <div className="absolute bottom-12 left-12 text-white p-4">
             <h3 className="text-3xl font-bold mb-2">Join the Movement</h3>
             <p className="text-gray-300">Connect, help, and grow with your local community.</p>
           </div>
        </div>

        {/* RIGHT SIDE: Form (Full height, no scrollbar) */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white rounded-r-3xl flex flex-col justify-center">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Vollkorn', serif" }}>
              Join Reach Today
            </h2>
            <p className="text-gray-500">Create an account to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">City</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="city"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="Mumbai, Delhi..."
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role Selection - Compact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">I want to...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'receiver'})}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    formData.role === 'receiver' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                      : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={20} className={formData.role === 'receiver' ? 'fill-blue-200' : ''} />
                  <span className="font-semibold text-sm">Get Help</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'helper'})}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    formData.role === 'helper' 
                      ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm' 
                      : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Handshake size={20} className={formData.role === 'helper' ? 'text-purple-500' : ''} />
                  <span className="font-semibold text-sm">Give Help</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? 'Joining...' : 'Join Reach'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-blue-600 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterModal;