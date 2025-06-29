import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StepIndicator from '@/components/molecules/StepIndicator';
import ProblemCard from '@/components/molecules/ProblemCard';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { generateProblems } from '@/services/api/contentService';

const ProblemSelection = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);

  const steps = [
    { title: 'Input Produk', description: 'Data dasar bisnis' },
    { title: 'Pilih Masalah', description: 'Identifikasi pain point' },
    { title: 'Pattern Interrupt', description: 'Pesan provokatif' },
    { title: 'Preview Hasil', description: 'Landing page + iklan' },
    { title: 'Registrasi', description: 'Buat akun' }
  ];

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    try {
      const savedData = localStorage.getItem('productData');
      if (!savedData) {
        toast.error('Data produk tidak ditemukan. Silakan mulai dari awal.');
        navigate('/mulai');
        return;
      }

      const data = JSON.parse(savedData);
      setProductData(data);
      
      // Load saved problem selection if exists
      const savedSelection = localStorage.getItem('selectedProblem');
      if (savedSelection) {
        setSelectedProblem(JSON.parse(savedSelection));
      }

      // Generate problems
      await generateProblemsData(data);
    } catch (error) {
      setError('Gagal memuat data produk');
      setLoading(false);
    }
  };

  const generateProblemsData = async (productData) => {
    setLoading(true);
    setError('');

    try {
      const generatedProblems = await generateProblems(productData);
      setProblems(generatedProblems);
    } catch (error) {
      setError('Gagal generate masalah pelanggan');
    } finally {
      setLoading(false);
    }
  };

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    localStorage.setItem('selectedProblem', JSON.stringify(problem));
    toast.success('Masalah berhasil dipilih!');
  };

  const handleNext = () => {
    if (!selectedProblem) {
      toast.error('Silakan pilih salah satu masalah terlebih dahulu');
      return;
    }

    navigate('/pattern');
  };

  const handleRetry = () => {
    if (productData) {
      generateProblemsData(productData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={1} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                AI Sedang Menganalisis...
              </h1>
              <p className="text-primary-100">
                Mengidentifikasi masalah utama yang dihadapi target market Anda
              </p>
            </div>
            <Loading 
              type="wizard" 
              message="AI sedang menganalisis data produk dan target market Anda untuk mengidentifikasi 5 masalah utama yang paling relevan..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={1} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Pilih Masalah Utama
              </h1>
              <p className="text-primary-100">
                Identifikasi masalah yang paling mengganggu target market Anda
              </p>
            </div>
            <Error
              type="wizard"
              message="Gagal Generate Masalah"
              description="AI tidak dapat menganalisis data produk Anda. Mohon coba lagi atau periksa koneksi internet."
              onRetry={handleRetry}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={1} totalSteps={5} steps={steps} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Pilih Masalah Utama
            </h1>
            <p className="text-primary-100">
              AI telah mengidentifikasi 5 masalah yang paling mengganggu target market Anda. 
              Pilih yang paling relevan dengan bisnis Anda.
            </p>
          </div>

          <div className="p-8">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <ApperIcon name="Package" className="h-5 w-5 mr-2 text-primary-600" />
                Ringkasan Produk Anda
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-slate-600">Produk:</p>
                  <p className="text-slate-800">{productData?.productName}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-600">Target:</p>
                  <p className="text-slate-800">{productData?.targetMarket?.substring(0, 50)}...</p>
                </div>
                <div>
                  <p className="font-medium text-slate-600">Benefit:</p>
                  <p className="text-slate-800">{productData?.benefits?.substring(0, 50)}...</p>
                </div>
              </div>
            </div>

            {/* Problems Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
              {problems.map((problem, index) => (
                <ProblemCard
                  key={index}
                  problem={problem}
                  isSelected={selectedProblem?.id === problem.id}
                  onSelect={() => handleProblemSelect(problem)}
                  index={index}
                />
              ))}
            </div>

            {/* Selection Info */}
            {selectedProblem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="CheckCircle" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Masalah Terpilih</h3>
                    <p className="text-green-800 mb-3">{selectedProblem.title}</p>
                    <p className="text-sm text-green-700">
                      AI akan menggunakan masalah ini untuk membuat Pattern Interrupt 
                      yang akan membuka mata calon pelanggan tentang cara lama yang salah.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200 mt-8">
              <Button
                onClick={handleNext}
                size="lg"
                icon="ArrowRight"
                iconPosition="right"
                className="flex-1"
                disabled={!selectedProblem}
              >
                Lanjut ke Pattern Interrupt
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/mulai')}
                icon="ArrowLeft"
              >
                Ubah Data Produk
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                💡 Pilih masalah yang paling sering Anda dengar dari calon pelanggan. 
                Semakin relevan, semakin kuat dampak iklan Anda nantinya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemSelection;