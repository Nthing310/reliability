
import React from 'react';
import { FailureData } from '../types';
import { Table, Trash2, Plus, Upload } from 'lucide-react';

interface DataManagementProps {
  data: FailureData[];
  setData: React.Dispatch<React.SetStateAction<FailureData[]>>;
}

const DataManagement: React.FC<DataManagementProps> = ({ data, setData }) => {
  const handleDelete = (id: number) => {
    const newData = data.filter(d => d.id !== id);
    // Recalculate cumulative
    let current = 0;
    const recalculated = newData.map((d, i) => {
      current += d.interval;
      return { ...d, id: i + 1, cumulativeTime: current };
    });
    setData(recalculated);
  };

  const handleAdd = () => {
    const lastId = data.length > 0 ? data[data.length - 1].id : 0;
    const lastTime = data.length > 0 ? data[data.length - 1].cumulativeTime : 0;
    const interval = 10;
    setData([...data, { 
      id: lastId + 1, 
      interval, 
      cumulativeTime: lastTime + interval 
    }]);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-800">Dataset Explorer</h3>
          <p className="text-sm text-slate-500">View and manage system failure timestamps</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border rounded-xl hover:bg-slate-50 transition-all">
            <Upload size={16} />
            Import CSV
          </button>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
          >
            <Plus size={16} />
            Add Failure
          </button>
        </div>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white border-b text-slate-400 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Failure Order</th>
              <th className="px-6 py-4">Interval (TBF)</th>
              <th className="px-6 py-4">Cumulative Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900"># {d.id}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-sm font-semibold border border-blue-100">
                    {d.interval} units
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">{d.cumulativeTime} units</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(d.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataManagement;
