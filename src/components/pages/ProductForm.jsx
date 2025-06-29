import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StepIndicator from '@/components/molecules/StepIndicator';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    targetMarket: '',
    benefits: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load saved data if exists
    const savedData = localStorage.getItem('productData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const steps = [
    { title: 'Input Produk', description: 'Data dasar bisnis' },
    { title: 'Pilih Masalah', description: 'Identifikasi pain point' },
    { title: 'Pattern Interrupt', description: 'Pesan provokatif' },
    { title: 'Preview Hasil', description: 'Landing page + iklan' },
    { title: 'Registrasi', description: 'Buat akun' }
  ];

  const examples = {
    productName: [
      'Nasi Gudeg Bu Sari',
      'Tas Kulit Handmade Jogja',
      'Kursus Bahasa Inggris Online',
      'Skincare Herbal Alami'
    ],
    targetMarket: [
      'Pekerja kantoran Jakarta yang suka makanan tradisional',
      'Wanita 25-40 tahun yang menghargai produk berkualitas',
      'Pelajar dan mahasiswa Indonesia',
      'Wanita 20-35 tahun yang peduli kecantikan alami'
    ],
    benefits: [
      'Rasa autentik Jogja, higienis, delivery cepat, harga terjangkau',
      'Kulit asli, jahitan rapi, tahan lama, design eksklusif',
      'Belajar fleksibel, native speaker, sertifikat resmi, harga murah',
      'Bahan alami 100%, tidak ada efek samping, hasil terlihat 7 hari'
    ]
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Nama produk wajib diisi';
    } else if (formData.productName.length < 3) {
      newErrors.productName = 'Nama produk minimal 3 karakter';
    }

    if (!formData.targetMarket.trim()) {
      newErrors.targetMarket = 'Target market wajib diisi';
    } else if (formData.targetMarket.length < 10) {
      newErrors.targetMarket = 'Deskripsikan target market lebih detail (minimal 10 karakter)';
    }

    if (!formData.benefits.trim()) {
      newErrors.benefits = 'Benefit produk wajib diisi';
    } else if (formData.benefits.length < 10) {
      newErrors.benefits = 'Deskripsikan benefit lebih detail (minimal 10 karakter)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Auto-save to localStorage
    const updatedData = { ...formData, [field]: value };
    localStorage.setItem('productData', JSON.stringify(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save data and navigate to next step
      localStorage.setItem('productData', JSON.stringify(formData));
      toast.success('Data produk berhasil disimpan!');
      
      setTimeout(() => {
        navigate('/masalah');
      }, 1000);
    } catch (error) {
      toast.error('Terjadi kesalahan. Mohon coba lagi.');
      setIsSubmitting(false);
    }
  };

  const fillExample = (field, index) => {
    const value = examples[field][index];
    handleInputChange(field, value);
    toast.info(`Contoh ${field} berhasil diisi!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={0} totalSteps={5} steps={steps} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Ceritakan Tentang Bisnis Anda
            </h1>
            <p className="text-primary-100">
              AI akan menganalisis informasi ini untuk membuat konten marketing yang tepat sasaran
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Product Name */}
            <div>
              <Input
                label="Nama Produk/Layanan"
                placeholder="Contoh: Nasi Gudeg Bu Sari"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                error={errors.productName}
                icon="Package"
                required
              />
              
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">💡 Contoh nama produk:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.productName.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillExample('productName', index)}
                      className="text-xs bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Market */}
            <div>
              <Textarea
                label="Target Market"
                placeholder="Contoh: Pekerja kantoran Jakarta yang suka makanan tradisional, usia 25-45 tahun, income menengah"
                value={formData.targetMarket}
                onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                error={errors.targetMarket}
                rows={3}
                required
              />
              
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">💡 Contoh target market:</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {examples.targetMarket.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillExample('targetMarket', index)}
                      className="text-xs bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-700 px-3 py-2 rounded-lg transition-colors text-left"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <Textarea
                label="Benefit/Keunggulan Utama"
                placeholder="Contoh: Rasa autentik Jogja, higienis, delivery cepat dalam 30 menit, harga terjangkau mulai 15rb"
                value={formData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                error={errors.benefits}
                rows={3}
                required
              />
              
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">💡 Contoh benefit produk:</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {examples.benefits.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillExample('benefits', index)}
                      className="text-xs bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-700 px-3 py-2 rounded-lg transition-colors text-left"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Lightbulb" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Tips Mengisi Form</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Nama produk: Gunakan nama yang mudah diingat pelanggan</li>
                    <li>• Target market: Semakin spesifik, semakin baik AI analyze-nya</li>
                    <li>• Benefit: Fokus pada hasil yang dirasakan pelanggan, bukan fitur</li>
                    <li>• Gunakan contoh di atas untuk inspirasi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                loading={isSubmitting}
                icon="ArrowRight"
                iconPosition="right"
                className="flex-1"
                disabled={!formData.productName || !formData.targetMarket || !formData.benefits}
              >
                {isSubmitting ? 'Memproses Data...' : 'Lanjut ke Analisis Masalah'}
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/')}
                icon="ArrowLeft"
              >
                Kembali
              </Button>
            </div>

            {/* Character Count */}
            <div className="text-xs text-slate-500 space-y-1">
              <div>Nama produk: {formData.productName.length} karakter</div>
              <div>Target market: {formData.targetMarket.length} karakter</div>
              <div>Benefit: {formData.benefits.length} karakter</div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductForm;