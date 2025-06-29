import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    targetMarket: '',
    benefits: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.productName.trim().length > 0;
      case 2:
        return formData.targetMarket.trim().length > 0;
      case 3:
        return formData.benefits.trim().length > 0;
      default:
        return false;
    }
  };

  const allStepsCompleted = formData.productName.trim() && formData.targetMarket.trim() && formData.benefits.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234F46E5%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-sm font-medium text-primary-700 mb-6">
                <ApperIcon name="Sparkles" className="h-4 w-4 mr-2" />
                Platform AI Pertama untuk UMKM Indonesia
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
                Buat Landing Page & Iklan{' '}
                <br className="hidden sm:block" />
                <span className="gradient-text">Profesional dalam 3 Menit.</span>
                <br className="hidden sm:block" />
                Gratis Coba!
              </h1>
            </motion.div>
          </div>

          {/* Demo Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h2 className="text-xl md:text-2xl font-display font-bold text-white text-center">
                Demo Cepat - Coba Sekarang!
              </h2>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep
                          ? 'bg-white'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Step 1: Nama Produk */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Nama Produk</h3>
                    <p className="text-slate-600">Apa nama produk atau layanan Anda?</p>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Contoh: Nasi Gudeg Bu Sari"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                      autoFocus
                    />
                  </div>

                  {isStepValid(1) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={handleNextStep}
                        size="lg"
                        icon="ArrowRight"
                        iconPosition="right"
                        className="w-full"
                      >
                        Lanjut ke Target Market
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Target Market */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Target Market</h3>
                    <p className="text-slate-600">Siapa target pelanggan Anda?</p>
                  </div>

                  <div>
                    <textarea
                      placeholder="Contoh: Pekerja kantoran Jakarta yang suka makanan tradisional"
                      value={formData.targetMarket}
                      onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg resize-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="secondary"
                      size="lg"
                      icon="ArrowLeft"
                      className="flex-1"
                    >
                      Kembali
                    </Button>
                    {isStepValid(2) && (
                      <Button
                        onClick={handleNextStep}
                        size="lg"
                        icon="ArrowRight"
                        iconPosition="right"
                        className="flex-1"
                      >
                        Lanjut ke Benefit
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Benefits */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Benefit atau Fitur Utama</h3>
                    <p className="text-slate-600">Apa keunggulan produk Anda?</p>
                  </div>

                  <div>
                    <textarea
                      placeholder="Contoh: Rasa autentik Jogja, higienis, delivery cepat, harga terjangkau"
                      value={formData.benefits}
                      onChange={(e) => handleInputChange('benefits', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg resize-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="secondary"
                      size="lg"
                      icon="ArrowLeft"
                      className="flex-1"
                    >
                      Kembali
                    </Button>
                    {isStepValid(3) && allStepsCompleted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1"
                      >
                        <Link to="/mulai" className="block">
                          <Button
                            size="lg"
                            icon="Rocket"
                            iconPosition="right"
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          >
                            Coba Sekarang
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Progress Summary */}
              {allStepsCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center text-green-700">
                    <ApperIcon name="CheckCircle" className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Semua informasi sudah lengkap! Siap untuk membuat landing page.</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
          >
            <div className="flex items-center">
              <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
              Gratis trial tanpa kartu kredit
            </div>
            <div className="flex items-center">
              <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
              Setup dalam 3 menit
            </div>
            <div className="flex items-center">
              <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
              Support WhatsApp 24/7
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
