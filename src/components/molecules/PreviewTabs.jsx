import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PreviewTabs = ({ landingPage, metaAds, googleAds }) => {
  const [activeTab, setActiveTab] = useState('landing');

  const tabs = [
    { id: 'landing', label: 'Landing Page', icon: 'Layout', count: 1 },
    { id: 'meta', label: 'Meta Ads', icon: 'Facebook', count: metaAds?.length || 0 },
    { id: 'google', label: 'Google Ads', icon: 'Search', count: googleAds?.length || 0 }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8">
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
              <span className={`
                px-2 py-1 rounded-full text-xs font-semibold
                ${activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-slate-100 text-slate-600'
                }
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'landing' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800 flex items-center">
                <ApperIcon name="Layout" className="h-5 w-5 mr-2 text-primary-600" />
                Preview Landing Page
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Headline Utama</h4>
                  <p className="text-lg font-bold text-slate-900">{landingPage?.headline}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Sub Headline</h4>
                  <p className="text-slate-700">{landingPage?.subheadline}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Cara Baru (The New Way)</h4>
                  <p className="text-slate-700">{landingPage?.newWay}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Cara Kerja</h4>
                  <div className="space-y-2">
                    {landingPage?.howItWorks?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-4">
            {metaAds?.map((ad, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800 flex items-center">
                    <ApperIcon name="Facebook" className="h-5 w-5 mr-2 text-blue-600" />
                    Meta Ad #{index + 1}
                  </h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {ad.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-700">Headline:</p>
                    <p className="text-slate-800">{ad.headline}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Deskripsi:</p>
                    <p className="text-slate-600">{ad.description}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">CTA:</p>
                    <p className="text-primary-600 font-medium">{ad.cta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'google' && (
          <div className="space-y-4">
            {googleAds?.map((ad, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800 flex items-center">
                    <ApperIcon name="Search" className="h-5 w-5 mr-2 text-green-600" />
                    Google Ad #{index + 1}
                  </h4>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {ad.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-700">Headline 1:</p>
                    <p className="text-slate-800">{ad.headline1}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Headline 2:</p>
                    <p className="text-slate-800">{ad.headline2}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Deskripsi:</p>
                    <p className="text-slate-600">{ad.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PreviewTabs;