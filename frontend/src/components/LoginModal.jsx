import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

// 1. Added 'onSwitchToRegister' to props
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/users/login', formData);
      login(res.data, res.data.token);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Modal Container - Scaled for 100% Zoom */}
      {/* Changed: max-w-5xl -> max-w-4xl, md:h-[600px] -> md:h-[550px] */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[550px] animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT SIDE: Image */}
        <div className="hidden md:block w-1/2 relative bg-gray-900">
          {/* Space/Astronaut Image */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
            alt="Space Background"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-12 text-white p-4">
            <h3 className="text-3xl font-bold mb-2">Be the Change</h3>
            <p className="text-gray-300">Join our community and start making a difference today.</p>
          </div>
        </div>

        {/* RIGHT SIDE: Form Logic */}
        {/* Changed: p-8 md:p-12 -> p-6 md:p-10 to reduce internal spacing */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto bg-white flex flex-col justify-center">

          {/* Changed: mb-10 -> mb-8, text-4xl -> text-3xl */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "sans-serif, Arial, Helvetica" }}>
              Hi <span style={{ color: "#747def" }}>Again!</span>
            </h2>
            <p className="text-gray-500 text-base">Nice to see you back!</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center justify-center">
              {error}
            </div>
          )}

          {/* Changed: space-y-6 -> space-y-5 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  // Changed: py-3.5 -> py-3 (Reduced height)
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  // Changed: py-3.5 -> py-3 (Reduced height)
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[#747def] hover:text-[#747def]/80 font-semibold hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              // Changed: py-4 -> py-3, text-lg -> text-base (Reduced button bulk)
              className="w-full py-3 bg-[#747def] text-white rounded-xl font-bold text-base shadow-xl shadow-[#747def]/20 hover:shadow-[#747def]/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Changed: mt-8 -> mt-6 */}
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account?{' '}
              {/* 2. Updated to use the prop function instead of Link */}
              <button
                onClick={onSwitchToRegister}
                className="text-[#747def] font-bold hover:underline"
              >
                Register
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;