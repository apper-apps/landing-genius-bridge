import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StepIndicator from '@/components/molecules/StepIndicator';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { generatePatternInterrupt } from '@/services/api/contentService';

const PatternInterrupt = () => {
  const navigate = useNavigate();
  const [patternInterrupt, setPatternInterrupt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const steps = [
    { title: 'Input Produk', description: 'Data dasar bisnis' },
    { title: 'Pilih Masalah', description: 'Identifikasi pain point' },
    { title: 'Pattern Interrupt', description: 'Pesan provokatif' },
    { title: 'Preview Hasil', description: 'Landing page + iklan' },
    { title: 'Registrasi', description: 'Buat akun' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedProductData = localStorage.getItem('productData');
      const savedProblem = localStorage.getItem('selectedProblem');
      
      if (!savedProductData || !savedProblem) {
        toast.error('Data tidak lengkap. Silakan mulai dari awal.');
        navigate('/mulai');
        return;
      }

      const productData = JSON.parse(savedProductData);
      const problem = JSON.parse(savedProblem);
      
      setProductData(productData);
      setSelectedProblem(problem);

      // Check if pattern interrupt already exists
      const savedPattern = localStorage.getItem('patternInterrupt');
      if (savedPattern) {
        setPatternInterrupt(JSON.parse(savedPattern));
        setLoading(false);
      } else {
        await generatePatternInterruptData(productData, problem);
      }
    } catch (error) {
      setError('Gagal memuat data');
      setLoading(false);
    }
  };

  const generatePatternInterruptData = async (productData, problem) => {
    setLoading(true);
    setError('');

    try {
      const generatedPattern = await generatePatternInterrupt(productData, problem);
      setPatternInterrupt(generatedPattern);
      localStorage.setItem('patternInterrupt', JSON.stringify(generatedPattern));
    } catch (error) {
      setError('Gagal generate Pattern Interrupt');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    navigate('/preview');
  };

  const handleRetry = () => {
    if (productData && selectedProblem) {
      generatePatternInterruptData(productData, selectedProblem);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={2} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                AI Membuat Pattern Interrupt...
              </h1>
              <p className="text-primary-100">
                Menyusun pesan provokatif yang akan membuka mata calon pelanggan
              </p>
            </div>
            <Loading 
              type="wizard" 
              message="AI sedang menyusun Pattern Interrupt berdasarkan masalah yang Anda pilih. Pesan ini akan mengguncang cara berpikir lama calon pelanggan..."
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
          <StepIndicator currentStep={2} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Pattern Interrupt
              </h1>
              <p className="text-primary-100">
                Pesan yang mengguncang cara berpikir lama calon pelanggan
              </p>
            </div>
            <Error
              type="wizard"
              message="Gagal Generate Pattern Interrupt"
              description="AI tidak dapat membuat pesan provokatif. Mohon coba lagi atau periksa koneksi internet."
              onRetry={handleRetry}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={2} totalSteps={5} steps={steps} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Pattern Interrupt Siap!
            </h1>
            <p className="text-primary-100">
              Pesan provokatif yang akan membuka mata calon pelanggan tentang cara lama yang salah
            </p>
          </div>

          <div className="p-8">
            {/* Context Review */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <ApperIcon name="Target" className="h-5 w-5 mr-2 text-primary-600" />
                Konteks Yang Dianalisis
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-medium text-slate-600 mb-2">Produk Anda:</p>
                  <p className="text-slate-800 bg-white p-3 rounded-lg">{productData?.productName}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-600 mb-2">Masalah Terpilih:</p>
                  <p className="text-slate-800 bg-white p-3 rounded-lg">{selectedProblem?.title}</p>
                </div>
              </div>
            </div>

            {/* Pattern Interrupt Content */}
            <div className="space-y-8">
              {/* Main Message */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="AlertTriangle" className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-4">
                      Pesan Pattern Interrupt
                    </h3>
                    <div className="text-red-800 leading-relaxed text-lg">
                      {patternInterrupt?.mainMessage}
                    </div>
                  </div>
                </div>
              </div>

              {/* The Problem with Old Way */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <ApperIcon name="X" className="h-5 w-5 mr-2 text-red-500" />
                  Mengapa Cara Lama Tidak Efektif
                </h4>
                <div className="space-y-3">
                  {patternInterrupt?.oldWayProblems?.map((problem, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ApperIcon name="Minus" className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-slate-700">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The New Reality */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                  <ApperIcon name="CheckCircle" className="h-5 w-5 mr-2 text-green-600" />
                  Realitas Baru Yang Harus Dipahami
                </h4>
                <div className="text-green-800 leading-relaxed">
                  {patternInterrupt?.newReality}
                </div>
              </div>

              {/* Call to Action Preview */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6">
                <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                  <ApperIcon name="Zap" className="h-5 w-5 mr-2 text-primary-600" />
                  Transisi ke Solusi
                </h4>
                <div className="text-primary-800 leading-relaxed">
                  {patternInterrupt?.transitionToSolution}
                </div>
              </div>
            </div>

            {/* Impact Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Lightbulb" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Mengapa Pattern Interrupt Ini Powerful?</h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• <strong>Mengguncang status quo:</strong> Membuat calon pelanggan mempertanyakan cara lama mereka</p>
                    <p>• <strong>Menciptakan urgensi:</strong> Menunjukkan konsekuensi jika terus menggunakan cara lama</p>
                    <p>• <strong>Memposisikan solusi:</strong> Produk Anda menjadi jawaban yang tepat waktu</p>
                    <p>• <strong>Emosional trigger:</strong> Menggunakan ketakutan dan harapan untuk memotivasi aksi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200 mt-8">
              <Button
                onClick={handleNext}
                size="lg"
                icon="ArrowRight"
                iconPosition="right"
                className="flex-1"
              >
                Lanjut ke Preview Landing Page
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/masalah')}
                icon="ArrowLeft"
              >
                Ganti Masalah
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                🔥 Pattern Interrupt ini akan menjadi fondasi semua konten marketing Anda. 
                Di step berikutnya, Anda akan melihat bagaimana pesan ini diterapkan dalam landing page dan iklan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatternInterrupt;