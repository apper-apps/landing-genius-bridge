import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StepIndicator from '@/components/molecules/StepIndicator';
import PreviewTabs from '@/components/molecules/PreviewTabs';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { generateLandingPage, generateAds } from '@/services/api/contentService';

const PreviewResults = () => {
  const navigate = useNavigate();
  const [landingPage, setLandingPage] = useState(null);
  const [metaAds, setMetaAds] = useState([]);
  const [googleAds, setGoogleAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allData, setAllData] = useState(null);

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
      const savedPattern = localStorage.getItem('patternInterrupt');
      
      if (!savedProductData || !savedProblem || !savedPattern) {
        toast.error('Data tidak lengkap. Silakan mulai dari awal.');
        navigate('/mulai');
        return;
      }

      const productData = JSON.parse(savedProductData);
      const problem = JSON.parse(savedProblem);
      const pattern = JSON.parse(savedPattern);
      
      const combinedData = {
        productData,
        problem,
        pattern
      };
      
      setAllData(combinedData);

      // Check if results already exist
      const savedResults = localStorage.getItem('previewResults');
      if (savedResults) {
        const results = JSON.parse(savedResults);
        setLandingPage(results.landingPage);
        setMetaAds(results.metaAds);
        setGoogleAds(results.googleAds);
        setLoading(false);
      } else {
        await generateAllContent(combinedData);
      }
    } catch (error) {
      setError('Gagal memuat data');
      setLoading(false);
    }
  };

  const generateAllContent = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Generate landing page
      const generatedLandingPage = await generateLandingPage(data);
      setLandingPage(generatedLandingPage);

      // Generate ads
      const generatedAds = await generateAds(data);
      setMetaAds(generatedAds.metaAds);
      setGoogleAds(generatedAds.googleAds);

      // Save to localStorage
      const results = {
        landingPage: generatedLandingPage,
        metaAds: generatedAds.metaAds,
        googleAds: generatedAds.googleAds
      };
      localStorage.setItem('previewResults', JSON.stringify(results));

    } catch (error) {
      setError('Gagal generate konten');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Save current progress
    localStorage.setItem('wizardCompleted', 'true');
    toast.info('Untuk edit dan publish, silakan daftar terlebih dahulu');
    navigate('/daftar');
  };

  const handleRetry = () => {
    if (allData) {
      generateAllContent(allData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={3} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                AI Membuat Konten Marketing...
              </h1>
              <p className="text-primary-100">
                Generating landing page profesional + 20 ide iklan siap pakai
              </p>
            </div>
            <Loading 
              type="wizard" 
              message="AI sedang menyusun landing page lengkap dengan headline, konten, dan CTA yang converting. Plus 10 ide Meta Ads dan 10 ide Google Ads yang ready to use..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={3} totalSteps={5} steps={steps} />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Preview Hasil
              </h1>
              <p className="text-primary-100">
                Landing page profesional + 20 ide iklan siap pakai
              </p>
            </div>
            <Error
              type="wizard"
              message="Gagal Generate Konten"
              description="AI tidak dapat membuat landing page dan iklan. Mohon coba lagi atau periksa koneksi internet."
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
        <StepIndicator currentStep={3} totalSteps={5} steps={steps} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  Hasil Preview Siap! 🎉
                </h1>
                <p className="text-primary-100">
                  Landing page profesional + 20 ide iklan telah berhasil di-generate
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white/90 text-sm">Total Generated:</div>
                  <div className="text-white font-bold">
                    1 Landing Page + {metaAds.length + googleAds.length} Iklan
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Success Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Layout" className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-green-900">1</div>
                <div className="text-xs text-green-700">Landing Page</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Facebook" className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-blue-900">{metaAds.length}</div>
                <div className="text-xs text-blue-700">Meta Ads</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Search" className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-green-900">{googleAds.length}</div>
                <div className="text-xs text-green-700">Google Ads</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-purple-900">100%</div>
                <div className="text-xs text-purple-700">AI Generated</div>
              </div>
            </div>

            {/* Preview Tabs */}
            <PreviewTabs 
              landingPage={landingPage}
              metaAds={metaAds}
              googleAds={googleAds}
            />

            {/* Limitation Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Lock" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Mode Preview Only</h3>
                  <p className="text-amber-800 mb-4">
                    Anda sedang melihat preview hasil. Untuk edit konten, customize design, 
                    dan publish landing page dengan URL publik, silakan daftar akun terlebih dahulu.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
                    <div>
                      <h4 className="font-medium mb-2">Yang Sudah Bisa:</h4>
                      <ul className="space-y-1">
                        <li>• Lihat preview landing page</li>
                        <li>• Baca semua ide iklan</li>
                        <li>• Copy konten untuk keperluan lain</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Setelah Daftar:</h4>
                      <ul className="space-y-1">
                        <li>• Edit konten inline</li>
                        <li>• Customize warna & design</li>
                        <li>• Publish dengan URL publik</li>
                        <li>• Download semua aset</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 mt-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Siap Untuk Go Live? 🚀
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Konten marketing Anda sudah siap! Daftar sekarang untuk mulai edit, 
                customize, dan publish landing page Anda dengan URL publik.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleRegister}
                  size="xl"
                  variant="secondary"
                  icon="UserPlus"
                  className="bg-white text-primary-700 hover:bg-slate-50"
                >
                  Lanjut Edit & Publish
                </Button>
                
                <Button
                  variant="ghost"
                  size="xl"
                  onClick={() => navigate('/pattern')}
                  icon="ArrowLeft"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Kembali ke Pattern
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                💡 Tip: Screenshot atau copy konten yang Anda suka sebelum melanjutkan. 
                Setelah daftar, Anda bisa kembali ke sini kapan saja untuk edit lebih lanjut.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewResults;