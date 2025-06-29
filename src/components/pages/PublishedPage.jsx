import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { getProjectByUrl } from "@/services/api/projectService";

const PublishedPage = () => {
  const { url } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProject();
  }, [url]);

  const loadProject = async () => {
    setLoading(true);
    setError('');

    try {
      const projectData = await getProjectByUrl(url);
      if (!projectData) {
        throw new Error('Landing page tidak ditemukan');
      }
      setProject(projectData);
    } catch (error) {
      setError(error.message || 'Gagal memuat landing page');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Loading message="Memuat landing page..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Error
            message="Landing Page Tidak Ditemukan"
            description={error}
            onRetry={loadProject}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
<section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%234F46E5\" fill-opacity=\"0.03\"><circle cx=\"30\" cy=\"30\" r=\"4\"/></g></g></svg>')] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
              {project.product_name}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Solusi terbaik untuk {project.target_market}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="btn-animate bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                Pesan Sekarang
              </button>
              <button className="btn-animate border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Star" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  Keunggulan Utama
                </h3>
                <p className="text-primary-800 leading-relaxed text-lg">
                  {project.benefits}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: 'Zap', title: 'Cepat & Efisien', desc: 'Proses yang simpel dan hasil yang maksimal' },
              { icon: 'Shield', title: 'Terpercaya', desc: 'Sudah dipercaya ribuan pelanggan' },
              { icon: 'Heart', title: 'Berkualitas', desc: 'Kualitas terbaik dengan harga terjangkau' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-100 card-hover"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><circle cx=\"30\" cy=\"30\" r=\"4\"/></g></g></svg>')] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Siap Untuk Memulai?
            </h2>
            
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Jangan tunggu lagi! Dapatkan {project.product_name} sekarang dan rasakan perbedaannya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-animate bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-all duration-200">
                Hubungi Kami Sekarang
              </button>
              <button className="btn-animate border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-200">
                Konsultasi Gratis
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-display font-bold mb-2">
              {project.product_name}
            </h3>
            <p className="text-slate-400">
              Solusi terbaik untuk kebutuhan Anda
            </p>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} {project.product_name}. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-slate-500 text-sm">
                <span>Powered by</span>
                <ApperIcon name="Zap" className="h-4 w-4" />
                <span className="font-medium">LandingGenius</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublishedPage;