import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getUserProjects, deleteProject } from '@/services/api/projectService';
import { useSelector } from 'react-redux';

const Dashboard = () => {
const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

const checkAuthAndLoadData = async () => {
    try {
      if (!isAuthenticated || !user) {
        toast.error('Silakan login terlebih dahulu');
        navigate('/login');
        return;
      }
      
      await loadProjects(user.userId);
    } catch (error) {
      setError('Gagal memuat data dashboard');
      setLoading(false);
    }
  };

  const loadProjects = async (userId) => {
    setLoading(true);
    setError('');

    try {
      const userProjects = await getUserProjects(userId);
      setProjects(userProjects);
    } catch (error) {
      setError('Gagal memuat project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Yakin ingin menghapus project ini?')) {
      return;
    }

    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.Id !== projectId));
      toast.success('Project berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus project');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      archived: { color: 'bg-slate-100 text-slate-800', label: 'Archived' }
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-primary-100">
                Memuat data dashboard Anda...
              </p>
            </div>
            <Loading type="default" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-primary-100">
                Kelola semua landing page dan iklan Anda
              </p>
            </div>
            <Error
              message="Gagal Memuat Dashboard"
              description={error}
onRetry={() => loadProjects(user?.userId)}
            />
          </div>
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
                  Selamat datang, {user?.firstName || user?.name}! 👋
                </h1>
                <p className="text-primary-100">
                  Kelola semua landing page dan kampanye iklan Anda dari sini
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/mulai">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    icon="Plus"
                    className="bg-white text-primary-700 hover:bg-slate-50"
                  >
                    Buat Project Baru
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8 border-b border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Layout" className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
                <div className="text-sm text-slate-600">Total Projects</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Globe" className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {projects.filter(p => p.status === 'published').length}
                </div>
                <div className="text-sm text-slate-600">Published</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Edit" className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {projects.filter(p => p.status === 'draft').length}
                </div>
                <div className="text-sm text-slate-600">Draft</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Coins" className="h-6 w-6 text-purple-600" />
                </div>
<div className="text-2xl font-bold text-slate-900">{user?.tokenBalance || 0}</div>
                <div className="text-sm text-slate-600">Token Tersisa</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-8">
            <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                to="/mulai"
                className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ApperIcon name="Plus" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900">Buat Landing Page</h4>
                    <p className="text-sm text-primary-700">Mulai project baru</p>
                  </div>
                </div>
              </Link>

              <button className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ApperIcon name="BarChart3" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Lihat Analytics</h4>
                    <p className="text-sm text-green-700">Performance insights</p>
                  </div>
                </div>
              </button>

              <button className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ApperIcon name="HelpCircle" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Bantuan</h4>
                    <p className="text-sm text-orange-700">Tutorial & Support</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Landing Page Projects
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Kelola semua landing page dan iklan yang telah Anda buat
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" icon="Filter" size="sm">
                  Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {projects.length === 0 ? (
              <Empty
                type="dashboard"
                title="Belum Ada Project"
                description="Mulai buat landing page pertama Anda dengan AI. Hanya butuh 5 menit untuk mendapatkan hasil yang profesional."
                icon="Layout"
                actionLabel="Buat Project Pertama"
                onAction={() => navigate('/mulai')}
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 card-hover"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <ApperIcon name="Layout" className="h-6 w-6 text-white" />
                      </div>
                      {getStatusBadge(project.status)}
                    </div>

                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                      {project.product_name}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {project.target_market}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>Dibuat {formatDate(project.created_at)}</span>
                      {project.public_url && (
                        <a 
                          href={`/p/${project.public_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <ApperIcon name="ExternalLink" className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Link 
                        to={`/editor/${project.Id}`}
                        className="flex-1"
                      >
                        <Button size="sm" variant="outline" icon="Edit" className="w-full">
                          Edit
                        </Button>
                      </Link>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        icon="Trash2"
                        onClick={() => handleDeleteProject(project.Id)}
                        className="text-red-600 hover:bg-red-50"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;