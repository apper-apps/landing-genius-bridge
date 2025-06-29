import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { loginUser } from '@/services/api/userService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const user = await loginUser(formData.email, formData.password);
      
      // Save user session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      
      toast.success(`Selamat datang kembali, ${user.name}! 👋`);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      toast.error(error.message || 'Gagal masuk. Periksa email dan password Anda.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              Masuk ke LandingGenius
            </h1>
            <p className="text-primary-100">
              Kelola landing page dan iklan Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              icon="Mail"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              icon="Lock"
              required
            />

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              icon="LogIn"
              iconPosition="right"
              className="w-full"
            >
              {isSubmitting ? 'Sedang Masuk...' : 'Masuk'}
            </Button>

            <div className="text-center">
              <p className="text-slate-600 text-sm">
                Belum punya akun?{' '}
                <Link 
                  to="/mulai" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Mulai Gratis
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="bg-slate-50 border-t border-slate-200 px-8 py-6">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-3">
                <ApperIcon name="Info" className="inline h-4 w-4 mr-1" />
                Demo Credentials
              </p>
              <div className="bg-white rounded-lg p-4 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">Email:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">demo@landinggenius.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Password:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">demo123</code>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-slate-500 hover:text-slate-700 text-sm inline-flex items-center"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-1" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;