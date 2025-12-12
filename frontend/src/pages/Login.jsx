import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Heart } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/users/login', formData);
      login(res.data, res.data.token);
    } catch (err) {
      alert('Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      
      {/* --- LEFT SIDE: FORM --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-20 bg-white">
        
        {/* Logo (Top Left) */}
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
             <Heart className="w-5 h-5 text-white fill-white" />
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">Reach</span>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sign in</h1>
            <p className="text-gray-500">Please login to continue to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="jonas_kahnwald@gmail.com"
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                id="keep-logged-in"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-700">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button (Purple/Blue from reference) */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-gray-500">
              Need an account?{' '}
              <Link to="/register" className="font-semibold text-[#6366f1] hover:underline underline-offset-4">
                Create one
              </Link>
            </p>
          </div>

        </div>

        {/* Empty div for spacing balance */}
        <div className="hidden md:block"></div>
      </div>

      {/* --- RIGHT SIDE: IMAGE --- */}
      {/* Matches the padding and rounded corners from reference image */}
      <div className="hidden md:block w-1/2 p-4 h-screen sticky top-0">
        <div className="h-full w-full rounded-[2.5rem] overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
            alt="Abstract Blue Ink" 
            className="h-full w-full object-cover"
          />
          {/* Overlay to match the vibe if image is too bright */}
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
        </div>
      </div>

    </div>
  );
};

export default Login;