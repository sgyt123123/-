import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import ProductivityChart from './data/ProductivityChart';
import PolarizationChart from './data/PolarizationChart';
import ConceptCards from './data/ConceptCards';

const DataView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'historical' | 'modern'>('historical');
  const gapName = activeTab === 'historical' ? "恩格斯的停顿 (1790-1840)" : "大分流 (1980-2024)";

  return (
    <div className="flex-1 p-4 lg:p-10 overflow-y-auto flex flex-col items-center relative z-10 custom-scrollbar animate-in slide-in-from-right-4 duration-500 w-full">
        <div className="max-w-5xl w-full space-y-10 pb-20">
            {/* Header */}
            <div className="text-center space-y-4 py-4">
                <h2 className="text-3xl lg:text-5xl font-serif font-black text-white tracking-tight mb-2">History Rhymes</h2>
                <p className="text-slate-500 font-mono text-xs lg:text-sm uppercase tracking-[0.4em]">Evidence: 1790 vs 2024</p>
            </div>
            
            <div className="w-full flex flex-col gap-6">
                
                {/* Toggle Controls */}
                <div className="mb-2 flex flex-wrap justify-between items-start z-10 shrink-0 gap-4">
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => setActiveTab('historical')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'historical' ? 'bg-cyan-900/30 text-cyan-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            19世纪：恩格斯停顿
                        </button>
                        <button 
                            onClick={() => setActiveTab('modern')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'modern' ? 'bg-pink-900/30 text-pink-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            21世纪：现代大分流
                        </button>
                    </div>
                </div>

                {/* Explicit width wrapper to prevent flex collapse */}
                <div className="w-full min-w-0">
                    <ProductivityChart activeTab={activeTab} />
                </div>

                {/* Analysis & Polarization Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {/* Text Analysis */}
                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl w-full">
                        <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className={activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'} />
                            数据解码: {gapName}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            {activeTab === 'historical' 
                                ? "在工业革命的前50年，英国人均GDP翻倍，但普通工人的实际工资几乎停滞。这是典型的「取代型」技术冲击阶段。利润流向了购买机器的资本家，直到19世纪后期制度改革跟上，工资才开始追赶产出。"
                                : "自1980年代以来，计算机化带来了巨大的生产力提升，但红利主要流向了顶层1%和高技能人才。普通中产阶级的工资增长与生产力彻底脱钩。这标志着我们进入了新的「恩格斯停顿」。"
                            }
                        </p>
                    </div>

                    {/* Polarization Chart wrapper */}
                    <div className="w-full min-w-0">
                         <PolarizationChart activeTab={activeTab} />
                    </div>
                </div>
            </div>
            
            <ConceptCards />
        </div>
    </div>
  );
};

export default DataView;