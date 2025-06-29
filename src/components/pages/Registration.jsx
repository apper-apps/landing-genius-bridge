import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StepIndicator from '@/components/molecules/StepIndicator';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { createUser } from '@/services/api/userService';

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    wa_number: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedPackage: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wizardSteps = [
    { title: 'Input Produk', description: 'Data dasar bisnis' },
    { title: 'Pilih Masalah', description: 'Identifikasi pain point' },
    { title: 'Pattern Interrupt', description: 'Pesan provokatif' },
    { title: 'Preview Hasil', description: 'Landing page + iklan' },
    { title: 'Registrasi', description: 'Buat akun' }
  ];

  const registrationSteps = [
    { title: 'Data Diri', description: 'Nama & WhatsApp' },
    { title: 'Buat Password', description: 'Email & Password' },
    { title: 'Pilih Paket', description: 'Token & Langganan' },
    { title: 'Pembayaran', description: 'Konfirmasi bayar' }
  ];

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 49000,
      tokens: 5,
      features: [
        '5 Landing Page',
        '50 Ide Iklan',
        'Basic Templates',
        'WhatsApp Support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 99000,
      tokens: 15,
      features: [
        '15 Landing Page',
        '150 Ide Iklan',
        'Premium Templates',
        'Custom Domain',
        'Analytics Dashboard',
        'Priority Support'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      price: 199000,
      tokens: 50,
      features: [
        '50 Landing Page',
        '500 Ide Iklan',
        'All Templates',
        'White Label',
        'Team Collaboration',
        'API Access',
        '24/7 Phone Support'
      ],
      popular: false
    }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nama lengkap wajib diisi';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Nama minimal 2 karakter';
      }

      if (!formData.wa_number.trim()) {
        newErrors.wa_number = 'Nomor WhatsApp wajib diisi';
      } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.wa_number)) {
        newErrors.wa_number = 'Format nomor WhatsApp tidak valid';
      }
    }

    if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email wajib diisi';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }

      if (!formData.password) {
        newErrors.password = 'Password wajib diisi';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password minimal 6 karakter';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Password tidak cocok';
      }
    }

    if (step === 2) {
      if (!formData.selectedPackage) {
        newErrors.selectedPackage = 'Silakan pilih paket terlebih dahulu';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < registrationSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/preview');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        wa_number: formData.wa_number,
        password: formData.password,
        selectedPackage: formData.selectedPackage,
        token_balance: packages.find(p => p.id === formData.selectedPackage)?.tokens || 0
      };

      const user = await createUser(userData);
      
      // Save user session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      
      toast.success('Registrasi berhasil! Selamat datang di LandingGenius 🎉');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      toast.error(error.message || 'Gagal mendaftar. Mohon coba lagi.');
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={4} totalSteps={5} steps={wizardSteps} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Buat Akun LandingGenius
            </h1>
            <p className="text-primary-100">
              {registrationSteps[currentStep].description} - Langkah {currentStep + 1} dari {registrationSteps.length}
            </p>
          </div>

          {/* Registration Steps Indicator */}
          <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex justify-between">
              {registrationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${index <= currentStep 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-slate-300 text-slate-500'
                    }
                  `}>
                    {index < currentStep ? (
                      <ApperIcon name="Check" className="h-4 w-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      index <= currentStep ? 'text-slate-800' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < registrationSteps.length - 1 && (
                    <div className={`hidden sm:block w-8 h-0.5 ml-4 ${
                      index < currentStep ? 'bg-primary-500' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Personal Info */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Informasi Dasar
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Masukkan nama lengkap dan nomor WhatsApp untuk komunikasi support
                  </p>
                </div>

                <Input
                  label="Nama Lengkap"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  icon="User"
                  required
                />

                <Input
                  label="Nomor WhatsApp"
                  placeholder="Contoh: 081234567890"
                  value={formData.wa_number}
                  onChange={(e) => handleInputChange('wa_number', e.target.value)}
                  error={errors.wa_number}
                  icon="Phone"
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="MessageCircle" className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Kenapa perlu WhatsApp?</p>
                      <p>Kami akan mengirim notifikasi penting dan update via WhatsApp. Support 24/7 juga tersedia melalui WA.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Account Setup */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Setup Akun
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Buat email dan password untuk login ke dashboard
                  </p>
                </div>

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
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  icon="Lock"
                  required
                />

                <Input
                  label="Konfirmasi Password"
                  type="password"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  icon="Lock"
                  required
                />
              </motion.div>
            )}

            {/* Step 3: Package Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Pilih Paket Token
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Setiap landing page membutuhkan 1 token. Pilih paket sesuai kebutuhan bisnis Anda.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => handleInputChange('selectedPackage', pkg.id)}
                      className={`
                        relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 card-hover
                        ${formData.selectedPackage === pkg.id
                          ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                          : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
                        }
                      `}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Paling Populer
                          </span>
                        </div>
                      )}

                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                          {pkg.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-slate-900">
                            {formatPrice(pkg.price)}
                          </span>
                          <span className="text-slate-500 text-sm">/bulan</span>
                        </div>
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                          {pkg.tokens} Token
                        </div>
                      </div>

                      <ul className="space-y-2 text-sm">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-slate-700">
                            <ApperIcon name="Check" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {formData.selectedPackage === pkg.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                          <ApperIcon name="Check" className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {errors.selectedPackage && (
                  <p className="text-red-600 text-sm flex items-center">
                    <ApperIcon name="AlertCircle" className="h-4 w-4 mr-1" />
                    {errors.selectedPackage}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 4: Payment Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Konfirmasi Pembayaran
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Review detail pesanan dan konfirmasi pembayaran
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Nama:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">WhatsApp:</span>
                      <span className="font-medium">{formData.wa_number}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Paket:</span>
                        <span className="font-medium">
                          {packages.find(p => p.id === formData.selectedPackage)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Token:</span>
                        <span className="font-medium">
                          {packages.find(p => p.id === formData.selectedPackage)?.tokens} Token
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold pt-2 border-t border-slate-300">
                        <span>Total:</span>
                        <span className="text-primary-600">
                          {formatPrice(packages.find(p => p.id === formData.selectedPackage)?.price || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Simulation Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="Info" className="h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Mode Demo</h3>
                      <p className="text-blue-800 mb-4">
                        Ini adalah simulasi pembayaran untuk demo. Tidak ada pembayaran yang sesungguhnya akan diproses.
                      </p>
                      <p className="text-blue-700 text-sm">
                        Setelah klik "Konfirmasi Pembayaran", akun Anda akan langsung aktif dengan token sesuai paket yang dipilih.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200 mt-8">
              <Button
                onClick={handleNext}
                size="lg"
                loading={isSubmitting}
                icon={currentStep === 3 ? "CreditCard" : "ArrowRight"}
                iconPosition="right"
                className="flex-1"
              >
                {currentStep === 3 
                  ? (isSubmitting ? 'Memproses...' : 'Konfirmasi Pembayaran')
                  : 'Lanjutkan'
                }
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBack}
                icon="ArrowLeft"
                disabled={isSubmitting}
              >
                {currentStep === 0 ? 'Kembali ke Preview' : 'Kembali'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;