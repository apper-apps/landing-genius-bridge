import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { getProject, updateProject, publishProject } from '@/services/api/projectService';

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    setLoading(true);
    setError('');

    try {
      const projectData = await getProject(parseInt(id));
      if (!projectData) {
        throw new Error('Project tidak ditemukan');
      }
      setProject(projectData);
    } catch (error) {
      setError(error.message || 'Gagal memuat project');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await updateProject(project.Id, project);
      toast.success('Project berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan project');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!project.product_name.trim() || !project.benefits.trim()) {
      toast.error('Mohon lengkapi data produk sebelum publish');
      return;
    }

    setPublishing(true);
    
    try {
      const result = await publishProject(project.Id);
      setProject(prev => ({
        ...prev,
        status: 'published',
        public_url: result.public_url
      }));
      
      toast.success('Landing page berhasil dipublish! 🎉');
      toast.info(`URL: ${window.location.origin}/p/${result.public_url}`);
    } catch (error) {
      toast.error('Gagal publish landing page');
    } finally {
      setPublishing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'content', label: 'Konten', icon: 'FileText' },
    { id: 'design', label: 'Design', icon: 'Palette' },
    { id: 'seo', label: 'SEO', icon: 'Search' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading message="Memuat editor..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error
            message="Gagal Memuat Editor"
            description={error}
            onRetry={loadProject}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  Editor Landing Page
                </h1>
                <p className="text-primary-100">
                  Edit dan customize landing page Anda
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button
                  variant="secondary"
                  icon="ArrowLeft"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Kembali
                </Button>
                <Button
                  variant="secondary"
                  icon="Save"
                  loading={saving}
                  onClick={handleSave}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Simpan
                </Button>
                <Button
                  variant="secondary"
                  icon="Globe"
                  loading={publishing}
                  onClick={handlePublish}
                  className="bg-white text-primary-700 hover:bg-slate-50"
                >
                  {project.status === 'published' ? 'Update' : 'Publish'}
                </Button>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium text-slate-700">
                    {project.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                {project.public_url && (
                  <a
                    href={`/p/${project.public_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                  >
                    <ApperIcon name="ExternalLink" className="h-4 w-4" />
                    <span>Lihat Live</span>
                  </a>
                )}
              </div>
              <div className="text-sm text-slate-500">
                Terakhir diubah: {new Date(project.updated_at || project.created_at).toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editor Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <ApperIcon name={tab.icon} className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-6">
                    Edit Konten Landing Page
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Input
                        label="Nama Produk/Layanan"
                        value={project.product_name}
                        onChange={(e) => handleInputChange('product_name', e.target.value)}
                        placeholder="Nama produk Anda"
                      />

                      <Textarea
                        label="Target Market"
                        value={project.target_market}
                        onChange={(e) => handleInputChange('target_market', e.target.value)}
                        placeholder="Deskripsikan target market Anda"
                        rows={3}
                      />

                      <Textarea
                        label="Benefits/Keunggulan"
                        value={project.benefits}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                        placeholder="Keunggulan produk Anda"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h4 className="font-medium text-slate-800 mb-4">Preview Headline</h4>
                        <div className="space-y-3">
                          <div className="text-2xl font-bold text-slate-900">
                            {project.product_name || 'Nama Produk Anda'}
                          </div>
                          <div className="text-slate-600">
                            Solusi terbaik untuk {project.target_market || 'target market Anda'}
                          </div>
                          <div className="text-sm text-slate-500">
                            ✨ {project.benefits || 'Manfaat utama produk Anda'}
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <ApperIcon name="Lightbulb" className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Tips Edit Konten:</p>
                            <ul className="space-y-1 text-xs">
                              <li>• Gunakan kata-kata yang emosional dan persuasif</li>
                              <li>• Fokus pada hasil yang dirasakan pelanggan</li>
                              <li>• Tambahkan angka/statistik jika ada</li>
                              <li>• Gunakan bahasa yang mudah dipahami</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Palette" className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Design Customization
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Fitur customize design akan segera tersedia. Untuk saat ini, fokus pada konten yang compelling terlebih dahulu.
                </p>
                <Button variant="outline" icon="Palette">
                  Coming Soon
                </Button>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Search" className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  SEO Optimization
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Tools SEO akan membantu landing page Anda ditemukan di Google. Fitur ini sedang dalam development.
                </p>
                <Button variant="outline" icon="Search">
                  Coming Soon
                </Button>
              </motion.div>
            )}

            {activeTab === 'preview' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Preview Landing Page
                  </h3>
                  {project.public_url && (
                    <a
                      href={`/p/${project.public_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <ApperIcon name="ExternalLink" className="h-4 w-4" />
                      <span>Buka di Tab Baru</span>
                    </a>
                  )}
                </div>

                <div className="bg-slate-100 rounded-xl p-8 min-h-96">
                  {/* Simple Landing Page Preview */}
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        {project.product_name}
                      </h1>
                      <p className="text-xl text-slate-600 mb-6">
                        Solusi terbaik untuk {project.target_market}
                      </p>
                      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold text-primary-900 mb-3">
                          Mengapa Memilih Kami?
                        </h3>
                        <p className="text-primary-800">
                          {project.benefits}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-semibold">
                          Pesan Sekarang
                        </button>
                        <button className="w-full border-2 border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold">
                          Pelajari Lebih Lanjut
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="Info" className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Preview Sederhana</p>
                      <p>Ini adalah preview dasar. Landing page yang dipublish akan memiliki design yang lebih lengkap dan profesional.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditorPage;