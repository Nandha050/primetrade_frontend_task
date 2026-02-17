import React, { useContext, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Check, Eye, EyeOff, ChefHat, ArrowRight } from 'lucide-react';
import { sanitizeInput, validateEmail } from '../utils/helpers';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength calculator
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const levels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Weak', color: 'bg-red-500' },
      { score: 2, label: 'Fair', color: 'bg-orange-500' },
      { score: 3, label: 'Good', color: 'bg-yellow-500' },
      { score: 4, label: 'Strong', color: 'bg-green-500' },
      { score: 5, label: 'Very Strong', color: 'bg-green-600' },
    ];

    return levels[Math.min(score, 5)];
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = sanitizeInput(formData.name);
    const email = sanitizeInput(formData.email);
    const password = sanitizeInput(formData.password);
    const confirmPassword = sanitizeInput(formData.confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await register({ name, email, password, confirmPassword });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center position-fixed relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Floating Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row relative z-10 animate-fade-in-up">

        {/* Right Side - Image Section (Order-last for Desktop to keep typical layout, or keep left for consistency? Let's mirror Login for variety or keep consistent? The previous design had it flipped. Let's keep consistency with Login: Image Left, Form Right. Actually, the user might prefer consistency. Let's do Image Left for both or Image Right for both? The previous code had Image on the right for Register. Let's Keep Image on the LEFT for consistency with standard modal designs, or we can Flip it. Let's Flip it like the previous design to distinguish pages.) */}
        {/* Let's stick to the previous Split design's logical flow but inside a card. 
            Login: Image Left. Register: Image Right? 
            Actually, for a "Closed Card", standard is often Image Left or Top. 
            Let's do Image Left for Register too for consistency, OR Image Right to match the previous code's decision. 
            The previous code had `order-last` on the image div. Let's keep that structure but adapted for the card.
        */}

        {/* Form Section (Left side in source, but visual order depends on flex) */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 bg-white flex flex-col justify-center order-2 md:order-1">
          <div className="max-w-md mx-auto w-full space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 group mb-2">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <ChefHat size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Foodoo</span>
            </Link>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-500">
                Join us and start your culinary journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Confirm</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="animate-fade-in bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Strength</span>
                    <span className={`text-xs font-bold ${passwordStrength.color.replace('bg-', 'text-')}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  {formData.password === formData.confirmPassword && formData.confirmPassword && (
                    <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1 animate-fade-in">
                      <Check size={12} strokeWidth={3} /> Passwords match
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 mt-2 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-orange-600 hover:text-orange-500 hover:underline transition-colors flex items-center justify-center gap-1">
                Sign in <ArrowRight size={14} className="ml-0.5" />
              </Link>
            </p>
          </div>
        </div>

        {/* Image Section (Right Side) */}
        <div className="hidden md:block md:w-1/2 relative bg-black order-1 md:order-2">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img
            src="https://plus.unsplash.com/premium_photo-1726797922299-9ffb46f91841?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Cooking vegetables"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
          />
          <div className="relative z-20 flex flex-col justify-end h-full p-12 text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">
                Start Your <br />
                <span className="text-orange-400">Flavor Journey</span>
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-100 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="p-1 bg-green-500 rounded-full"><Check className="text-white" size={12} strokeWidth={3} /></div>
                  Access 200+ Premium Recipes
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-100 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="p-1 bg-green-500 rounded-full"><Check className="text-white" size={12} strokeWidth={3} /></div>
                  Save & Organize Favorites
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-100 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="p-1 bg-green-500 rounded-full"><Check className="text-white" size={12} strokeWidth={3} /></div>
                  Share with Community
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
