import { getRandomDelay } from '@/utils/helpers';

// Mock AI content generation functions
export const generateProblems = async (productData) => {
  await getRandomDelay(1000, 2000);

  const problemsTemplates = [
    {
      id: 1,
      title: "Harga Tidak Transparan dan Sering Berubah",
      description: "Pelanggan frustrasi karena tidak tahu harga pasti dari awal, seringkali ada biaya tersembunyi yang muncul belakangan.",
      severity: 4
    },
    {
      id: 2,
      title: "Kualitas Tidak Konsisten dan Mengecewakan",
      description: "Produk atau layanan yang diterima tidak sesuai ekspektasi, kualitas naik-turun dan tidak bisa diandalkan.",
      severity: 5
    },
    {
      id: 3,
      title: "Proses Pemesanan Ribet dan Lama",
      description: "Terlalu banyak step untuk memesan, harus bolak-balik, dan menunggu lama tanpa kepastian.",
      severity: 3
    },
    {
      id: 4,
      title: "Customer Service Sulit Dihubungi",
      description: "Ketika ada masalah, tidak ada yang bisa dihubungi. CS tidak responsif dan tidak membantu menyelesaikan masalah.",
      severity: 4
    },
    {
      id: 5,
      title: "Tidak Ada Garansi atau Jaminan",
      description: "Takut rugi karena tidak ada garansi. Jika produk rusak atau tidak sesuai, tidak ada perlindungan untuk konsumen.",
      severity: 3
    }
  ];

  // Customize problems based on product data
  const customizedProblems = problemsTemplates.map((problem, index) => {
    if (productData.productName.toLowerCase().includes('makanan') || 
        productData.productName.toLowerCase().includes('kuliner')) {
      if (index === 0) {
        return {
          ...problem,
          title: "Harga Makanan Mahal Tapi Porsi Kecil",
          description: "Pelanggan kecewa karena harga mahal tapi porsi tidak sesuai, rasa tidak istimewa, dan tidak worth it."
        };
      }
      if (index === 1) {
        return {
          ...problem,
          title: "Rasa Tidak Konsisten dan Higienis Diragukan",
          description: "Rasa makanan berubah-ubah, kadang enak kadang tidak. Kebersihan tempat dan proses masak juga dipertanyakan."
        };
      }
    }

    if (productData.productName.toLowerCase().includes('kursus') || 
        productData.targetMarket.toLowerCase().includes('belajar')) {
      if (index === 0) {
        return {
          ...problem,
          title: "Biaya Kursus Mahal Tapi Hasilnya Tidak Jelas",
          description: "Sudah bayar mahal untuk kursus tapi tidak ada jaminan bisa menguasai skill atau mendapat pekerjaan."
        };
      }
      if (index === 1) {
        return {
          ...problem,
          title: "Materi Kursus Ketinggalan Zaman",
          description: "Materi yang diajarkan sudah tidak relevan dengan kebutuhan industri saat ini, waste time and money."
        };
      }
    }

    return problem;
  });

  return customizedProblems;
};

export const generatePatternInterrupt = async (productData, selectedProblem) => {
  await getRandomDelay(800, 1500);

  const patternTemplates = {
    mainMessage: `STOP! Jangan sampai Anda jadi korban selanjutnya dari "${selectedProblem.title}". Ribuan orang sudah terjebak dan mengalami kerugian besar. Saatnya buka mata tentang cara lama yang SALAH!`,
    
    oldWayProblems: [
      `Cara lama: ${selectedProblem.title.toLowerCase()} - ini sudah terbukti merugikan konsumen`,
      "Mindset lama: 'Yang penting murah' - padahal ujung-ujungnya keluar biaya lebih besar",
      "Kebiasaan buruk: tidak research dulu sebelum beli - akibatnya sering kecewa dan rugi",
      "Pola pikir salah: 'semua produk sama saja' - padahal kualitas sangat menentukan hasil"
    ],

    newReality: `Realitas yang harus Anda pahami SEKARANG: ${productData.benefits}. Ini bukan sekedar produk biasa, tapi solusi yang benar-benar menyelesaikan masalah ${selectedProblem.title.toLowerCase()}. Ribuan pelanggan kami sudah membuktikannya!`,

    transitionToSolution: `Jadi, daripada terus terjebak dengan cara lama yang SALAH dan merugikan, mengapa tidak beralih ke ${productData.productName}? Kami hadir khusus untuk ${productData.targetMarket} yang sudah lelah dengan ${selectedProblem.title.toLowerCase()}.`
  };

  return patternTemplates;
};

export const generateLandingPage = async (data) => {
  await getRandomDelay(1200, 2000);

  return {
    headline: `${data.productData.productName} - Solusi Terbaik untuk ${data.productData.targetMarket}`,
    subheadline: `Sudah lelah dengan ${data.problem.title.toLowerCase()}? Saatnya beralih ke cara yang BENAR!`,
    newWay: `Cara baru yang revolusioner: ${data.productData.benefits}. Tidak seperti yang lain, kami fokus pada kepuasan dan hasil nyata untuk pelanggan.`,
    howItWorks: [
      "Konsultasi gratis untuk memahami kebutuhan spesifik Anda",
      "Proses yang transparan dengan timeline yang jelas",
      "Eksekusi berkualitas tinggi dengan monitoring ketat",
      "Support penuh hingga Anda benar-benar puas dengan hasilnya"
    ],
    socialProof: "Sudah dipercaya 1000+ pelanggan dengan rating 4.8/5",
    cta: "Dapatkan Sekarang - Garansi 100% Puas atau Uang Kembali!"
  };
};

export const generateAds = async (data) => {
  await getRandomDelay(1000, 1800);

  const metaAds = [
    {
      type: "Awareness",
      headline: `STOP! Jangan Sampai Kena ${data.problem.title}`,
      description: `Ribuan orang sudah terjebak. ${data.productData.productName} hadir sebagai solusi yang tepat untuk ${data.productData.targetMarket}. ${data.productData.benefits}`,
      cta: "Pelajari Lebih Lanjut"
    },
    {
      type: "Problem-Solution",
      headline: `Lelah dengan ${data.problem.title}?`,
      description: `Kami mengerti frustrasi Anda. ${data.productData.productName} diciptakan khusus untuk menyelesaikan masalah ini. Sudah 1000+ pelanggan yang puas!`,
      cta: "Coba Sekarang"
    },
    {
      type: "Social Proof",
      headline: `Mengapa 1000+ Orang Pilih ${data.productData.productName}?`,
      description: `Rating 4.8/5 bukan kebetulan. ${data.productData.benefits}. Khusus untuk ${data.productData.targetMarket} yang menginginkan hasil terbaik.`,
      cta: "Lihat Testimoni"
    },
    {
      type: "Urgency",
      headline: `Promo Terbatas - ${data.productData.productName}`,
      description: `Jangan sampai menyesal kemudian. Hanya hari ini, dapatkan solusi terbaik untuk ${data.problem.title.toLowerCase()}. Limited stock!`,
      cta: "Pesan Sekarang"
    },
    {
      type: "Benefit-Focused",
      headline: `${data.productData.benefits}`,
      description: `Inilah yang membedakan ${data.productData.productName} dari yang lain. Khusus untuk ${data.productData.targetMarket} yang serius ingin hasil maksimal.`,
      cta: "Dapatkan Sekarang"
    },
    {
      type: "Question Hook",
      headline: `Masih Mau Terjebak ${data.problem.title}?`,
      description: `Atau siap beralih ke solusi yang benar? ${data.productData.productName} adalah jawabannya. ${data.productData.benefits}`,
      cta: "Ganti Sekarang"
    },
    {
      type: "Comparison",
      headline: `${data.productData.productName} vs Kompetitor Lain`,
      description: `Bandingkan sendiri: kami memberikan ${data.productData.benefits}. Kompetitor? Masih stuck dengan cara lama yang bikin ${data.problem.title.toLowerCase()}.`,
      cta: "Bandingkan Sekarang"
    },
    {
      type: "Story",
      headline: `Kisah Nyata: Dari Frustasi ke Sukses`,
      description: `"Dulu saya juga victim ${data.problem.title}. Sampai menemukan ${data.productData.productName}. Sekarang ${data.productData.benefits}!" - Testimoni Pelanggan`,
      cta: "Baca Kisah Lengkap"
    },
    {
      type: "Fear-Based",
      headline: `Berapa Lama Lagi Anda Mau Rugi?`,
      description: `Setiap hari tunda keputusan = kerugian makin besar. ${data.productData.productName} sudah terbukti menyelesaikan ${data.problem.title.toLowerCase()}.`,
      cta: "Stop Kerugian Sekarang"
    },
    {
      type: "Guarantee",
      headline: `Garansi 100% Puas atau Uang Kembali`,
      description: `Tidak ada risiko! Coba ${data.productData.productName} selama 30 hari. Jika tidak puas dengan ${data.productData.benefits}, uang kembali full!`,
      cta: "Coba Tanpa Risiko"
    }
  ];

  const googleAds = [
    {
      type: "Search",
      headline1: `${data.productData.productName} Terpercaya`,
      headline2: `Solusi ${data.problem.title}`,
      description: `${data.productData.benefits}. Garansi puas atau uang kembali. Hubungi sekarang!`
    },
    {
      type: "Search",
      headline1: `Cara Mengatasi ${data.problem.title}`,
      headline2: `${data.productData.productName} #1`,
      description: `Sudah 1000+ pelanggan puas. Rating 4.8/5. Konsultasi gratis hari ini!`
    },
    {
      type: "Display",
      headline1: `Stop ${data.problem.title}!`,
      headline2: `${data.productData.productName} Solusinya`,
      description: `Khusus ${data.productData.targetMarket}. ${data.productData.benefits}. Promo terbatas!`
    },
    {
      type: "Shopping",
      headline1: `${data.productData.productName} Original`,
      headline2: `Kualitas Terjamin`,
      description: `${data.productData.benefits}. Free konsultasi. Garansi resmi!`
    },
    {
      type: "Local",
      headline1: `${data.productData.productName} Terdekat`,
      headline2: `Pelayanan 24/7`,
      description: `Solusi cepat untuk ${data.problem.title.toLowerCase()}. Call center siaga!`
    },
    {
      type: "Remarketing",
      headline1: `Masih Mikir ${data.productData.productName}?`,
      headline2: `Jangan Sampai Kehabisan`,
      description: `Stock terbatas! ${data.productData.benefits}. Pesan sebelum terlambat!`
    },
    {
      type: "Competitor",
      headline1: `Alternatif Terbaik`,
      headline2: `${data.productData.productName} Juara`,
      description: `Mengapa pilih yang biasa-biasa saja? ${data.productData.benefits}!`
    },
    {
      type: "Brand",
      headline1: `${data.productData.productName} Official`,
      headline2: `Website Resmi`,
      description: `${data.productData.benefits}. Trusted by 1000+ customers. Order now!`
    },
    {
      type: "Generic",
      headline1: `Solusi ${data.problem.title}`,
      headline2: `Terbukti Efektif`,
      description: `${data.productData.productName}: ${data.productData.benefits}. Try risk-free!`
    },
    {
      type: "Long-tail",
      headline1: `${data.productData.productName} untuk`,
      headline2: `${data.productData.targetMarket}`,
      description: `Spesialisasi mengatasi ${data.problem.title.toLowerCase()}. Konsultasi gratis!`
    }
  ];

  return { metaAds, googleAds };
};