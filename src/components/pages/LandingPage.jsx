import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import React from "react";

const LandingPage = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'AI Generate Otomatis',
      description: 'Sistem AI menganalisis bisnis Anda dan membuat konten marketing yang tepat sasaran'
    },
    {
      icon: 'Target',
      title: 'Metode Eddy Miranda',
      description: 'Menggunakan framework teruji: Bleeding Neck Problem → Pattern Interrupt → The New Way'
    },
    {
      icon: 'Layout',
      title: 'Landing Page Siap Pakai',
      description: 'Preview langsung landing page profesional dengan headline, konten, dan CTA yang compelling'
    },
    {
      icon: 'Megaphone',
      title: '20 Ide Iklan Premium',
      description: 'Dapatkan 10 ide Meta Ads + 10 ide Google Ads yang bisa langsung digunakan'
    },
    {
      icon: 'Smartphone',
      title: 'Mudah untuk UMKM',
      description: 'Interface sederhana, step-by-step, tidak perlu keahlian teknis atau marketing'
    },
    {
      icon: 'Clock',
      title: 'Cepat & Efisien',
      description: 'Dari input produk sampai jadi landing page + iklan hanya butuh 5-10 menit'
    }
  ];

  const testimonials = [
    {
      name: 'Siti Rahma',
      business: 'Warung Nasi Padang',
      avatar: 'S',
      text: 'Dari warung kecil jadi punya website profesional! Orderan online meningkat 300% dalam sebulan.'
    },
    {
      name: 'Budi Santoso',
      business: 'Toko Elektronik',
      avatar: 'B',
      text: 'AI-nya pintar banget! Bikin iklan yang bener-bener nyambung sama pelanggan. Penjualan naik drastis!'
    },
    {
      name: 'Maya Indira',
      business: 'Katering Rumahan',
      avatar: 'M',
      text: 'Gak nyangka bisa bikin landing page secantik ini. Klien jadi lebih percaya dan order lebih banyak.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Input Data Produk',
      description: 'Masukkan nama produk, target market, dan benefit utama. Cuma 3 field, gampang banget!'
    },
    {
      number: '02',
      title: 'Pilih Masalah Utama',
      description: 'AI generate 5 masalah pelanggan. Pilih yang paling pas dengan bisnis Anda.'
    },
    {
      number: '03',
      title: 'Pattern Interrupt',
      description: 'Sistem bikin pesan provokatif yang bikin calon pelanggan sadar cara lama mereka salah.'
    },
    {
      number: '04',
      title: 'Preview Hasil',
      description: 'Lihat landing page + 20 ide iklan yang siap pakai. Kalau cocok, lanjut daftar untuk edit.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234F46E5%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-sm font-medium text-primary-700 mb-6">
                <ApperIcon name="Sparkles" className="h-4 w-4 mr-2" />
                Platform AI Pertama untuk UMKM Indonesia
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6">
                Buat{' '}
                <span className="gradient-text">Landing Page</span>
                {' '}& Iklan{' '}
                <br className="hidden sm:block" />
                dengan AI dalam{' '}
                <span className="gradient-text">5 Menit</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Tidak perlu skill marketing atau coding. Cukup input produk Anda, 
                AI akan generate landing page profesional + 20 ide iklan siap pakai!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/mulai">
                  <Button size="xl" icon="Rocket" className="w-full sm:w-auto">
                    Mulai Gratis Sekarang
                  </Button>
                </Link>
                <Button variant="secondary" size="xl" icon="Play" className="w-full sm:w-auto">
                  Lihat Demo 2 Menit
                </Button>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
                  Gratis trial tanpa kartu kredit
                </div>
                <div className="flex items-center">
                  <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
                  Setup dalam 5 menit
                </div>
                <div className="flex items-center">
                  <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2" />
                  Support WhatsApp 24/7
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Kenapa UMKM Pilih{' '}
                <span className="gradient-text">LandingGenius?</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Satu-satunya platform yang menggabungkan AI pintar dengan metode marketing teruji 
                khusus untuk pelaku usaha Indonesia
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-100 card-hover"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6">
                  <ApperIcon name={feature.icon} className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Cara Kerja{' '}
                <span className="gradient-text">Super Mudah</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hanya 4 langkah sederhana untuk mendapatkan landing page profesional 
                dan kampanye iklan yang converting
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-slate-500">landinggenius.com</div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary-200 to-secondary-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  <div className="flex space-x-2 mt-4">
                    <div className="h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded w-24"></div>
                    <div className="h-8 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="Sparkles" className="h-8 w-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Cerita Sukses{' '}
                <span className="gradient-text">UMKM Indonesia</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Ribuan UMKM sudah merasakan peningkatan penjualan drastis 
                dengan landing page dan iklan dari LandingGenius
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-100 card-hover"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.business}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <ApperIcon key={star} name="Star" className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Siap Tingkatkan Penjualan{' '}
              <br className="hidden sm:block" />
              <span className="text-accent-300">Hingga 300%?</span>
            </h2>
            
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join ribuan UMKM yang sudah merasakan pertumbuhan bisnis eksponensial. 
              Mulai gratis hari ini, tanpa komitmen apapun!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/mulai">
                <Button 
                  size="xl" 
                  variant="secondary" 
                  icon="Rocket" 
                  className="w-full sm:w-auto bg-white text-primary-700 hover:bg-slate-50"
                >
                  Mulai Gratis Sekarang
                </Button>
              </Link>
              <div className="flex items-center text-white/90 text-sm">
                <ApperIcon name="Shield" className="h-5 w-5 mr-2" />
                100% Gratis, Tanpa Kartu Kredit
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">5000+</div>
                <div className="text-primary-200 text-sm">UMKM Terdaftar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">300%</div>
                <div className="text-primary-200 text-sm">Rata-rata Growth</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">5 Min</div>
                <div className="text-primary-200 text-sm">Setup Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-primary-200 text-sm">WhatsApp Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;