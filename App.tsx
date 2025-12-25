
import React, { useState } from 'react';
import Layout from './components/Layout';
import AnalysisView from './components/AnalysisView';
import DataManagement from './components/DataManagement';
import { NTDS_DATASET } from './constants';
import { FailureData } from './types';
// Fixed missing Settings import from lucide-react
import { ShieldCheck, Info, FileText, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<FailureData[]>(NTDS_DATASET);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-indigo-100 font-medium mb-1">Total Failures</h4>
                <p className="text-4xl font-bold">{data.length}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-indigo-100">
                  <TrendingDown size={14} className="rotate-180" />
                  System healthy - stable trend
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border shadow-sm">
                <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                  <Info size={28} />
                </div>
                <h4 className="text-slate-500 font-medium mb-1">Last Interval</h4>
                <p className="text-4xl font-bold text-slate-800">
                  {data.length > 0 ? data[data.length - 1].interval : 0}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-400">
                  Current MTBF tracking...
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border shadow-sm">
                <div className="bg-amber-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
                  <FileText size={28} />
                </div>
                <h4 className="text-slate-500 font-medium mb-1">Active Model</h4>
                <p className="text-4xl font-bold text-slate-800">JM / GO</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-400">
                  Dual hybrid mode enabled
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Introduction to Curriculum Design</h3>
              <div className="grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
                <div className="space-y-4">
                  <p>
                    This platform implements the software reliability course design requirements from <strong>Nanjing University of Aeronautics and Astronautics</strong>. 
                  </p>
                  <p>
                    Software reliability is defined as the probability of failure-free software operation for a specified period of time in a specified environment. As modern systems grow in complexity, predictive modeling becomes essential for lifecycle management.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    Our analysis engine covers two main categories:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> <strong>Growth Models:</strong> JM, GO, MO, and S-Shaped models focusing on the debugging phase.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> <strong>Data-Driven Models:</strong> ARIMA, GM(1,1), and Machine Learning (BP, SVR) for complex failure patterns.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analysis':
        return <AnalysisView data={data} />;
      case 'data':
        return <DataManagement data={data} setData={setData} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Settings size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Module under development</p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

// Internal icon component for trending
const TrendingDown: React.FC<{ size?: number, className?: string }> = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

export default App;
