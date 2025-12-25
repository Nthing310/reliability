
import React, { useState, useMemo } from 'react';
import { ModelType, FailureData, ModelResult } from '../types';
import { MODEL_DESCRIPTIONS } from '../constants';
import { runModel } from '../utils/math';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Play, CheckCircle2, AlertCircle, TrendingUp, Target, BarChart2 } from 'lucide-react';

interface AnalysisViewProps {
  data: FailureData[];
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  const [selectedModels, setSelectedModels] = useState<ModelType[]>([ModelType.JM, ModelType.GO]);
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleToggleModel = (type: ModelType) => {
    setSelectedModels(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate processing time
    setTimeout(() => {
      const newResults = selectedModels.map(type => runModel(type, data));
      setResults(newResults);
      setIsAnalyzing(false);
    }, 1200);
  };

  const chartData = useMemo(() => {
    return data.map((d, i) => {
      const point: any = { index: d.id, actual: d.interval };
      results.forEach(res => {
        point[res.type] = res.predictions[i]?.predicted.toFixed(2);
      });
      return point;
    });
  }, [data, results]);

  return (
    <div className="space-y-6">
      {/* Model Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Object.values(ModelType).map((type) => (
          <button
            key={type}
            onClick={() => handleToggleModel(type)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedModels.includes(type)
              ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-slate-800 text-sm">{type}</span>
              {selectedModels.includes(type) && (
                <CheckCircle2 size={16} className="text-indigo-600" />
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              {MODEL_DESCRIPTIONS[type]}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRunAnalysis}
          disabled={selectedModels.length === 0 || isAnalyzing}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
        >
          {isAnalyzing ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Play size={20} />
          )}
          {isAnalyzing ? 'Computing Parameters...' : 'Execute Reliability Analysis'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Visualization */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-600" />
                Failure Interval Distribution
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  Actual
                </div>
                {results.map((r, i) => (
                  <div key={r.type} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <div className={`w-3 h-3 rounded-full bg-indigo-${500 + i * 100}`}></div>
                    {r.type}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="index" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#94a3b8' }}
                    activeDot={{ r: 6 }}
                  />
                  {results.map((r, i) => (
                    <Line
                      key={r.type}
                      type="monotone"
                      dataKey={r.type}
                      stroke={['#6366f1', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981'][i % 5]}
                      strokeWidth={3}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm h-full">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <Target size={20} className="text-indigo-600" />
                Precision Metrics
              </h3>
              <div className="space-y-4">
                {results.map((res) => (
                  <div key={res.type} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-slate-700 text-sm">{res.type}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                        R²: {res.metrics.r2.toFixed(3)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">MAE</p>
                        <p className="text-sm font-semibold text-slate-700">{res.metrics.mae.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">RMSE</p>
                        <p className="text-sm font-semibold text-slate-700">{res.metrics.rmse.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">AE (%)</p>
                        <p className="text-sm font-semibold text-slate-700">{res.metrics.ae.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">MSPE</p>
                        <p className="text-sm font-semibold text-slate-700">{res.metrics.mspe.toFixed(3)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisView;
