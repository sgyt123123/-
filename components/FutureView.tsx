import React, { useState } from 'react';
import { TrendingUp, User, Globe } from 'lucide-react';
import ScenarioList from './future/ScenarioList';
import TimelineCurve from './future/TimelineCurve';
import PersonalStrategies from './future/PersonalStrategies';

const FutureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'curve' | 'personal'>('scenarios');

  return (
    <div className="flex-1 p-4 lg:p-10 overflow-y-auto relative z-10 custom-scrollbar animate-in fade-in duration-700">
        <div className="max-w-6xl mx-auto flex flex-col h-full">
            <div className="mb-8 lg:mb-12 text-center shrink-0">
                    <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">未来岔路口</h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base lg:text-lg font-light">
                        技术已经就位，现在轮到制度做选择。我们是走向新的镀金时代，还是福利社会？
                    </p>
            </div>
            
            <div className="h-full flex flex-col gap-6">
            {/* Toggle */}
            <div className="flex justify-center shrink-0">
                <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 inline-flex flex-wrap justify-center gap-1">
                    <button 
                        onClick={() => setActiveTab('scenarios')}
                        className={`px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'scenarios' ? 'bg-slate-800 text-white shadow ring-1 ring-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Globe size={14} /> 宏观：制度路径
                    </button>
                    <button 
                        onClick={() => setActiveTab('curve')}
                        className={`px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'curve' ? 'bg-slate-800 text-white shadow ring-1 ring-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <TrendingUp size={14} /> 趋势：技术曲线
                    </button>
                    <button 
                        onClick={() => setActiveTab('personal')}
                        className={`px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'personal' ? 'bg-slate-800 text-white shadow ring-1 ring-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <User size={14} /> 微观：个人策略
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col">
                {activeTab === 'scenarios' && <ScenarioList />}
                {activeTab === 'curve' && <TimelineCurve />}
                {activeTab === 'personal' && <PersonalStrategies />}
            </div>
            </div>
        </div>
    </div>
  );
};

export default FutureView;