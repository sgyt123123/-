import React, { useState } from 'react';
import { ERAS, COMPARISON_INSIGHTS } from '../constants';
import { HistoricalEra } from '../types';
import { ArrowRightLeft, ScrollText, Brain } from 'lucide-react';
import EraCard from './comparison/EraCard';
import ParadoxCard from './comparison/ParadoxCard';

const ComparisonView: React.FC = () => {
  const [era1, setEra1] = useState<HistoricalEra>(ERAS[0]); // IR1
  const [era2, setEra2] = useState<HistoricalEra>(ERAS[3]); // AI Age

  // Consistency Logic: Always sort eras chronologically to fetch the analysis text.
  const getComparisonText = (e1: HistoricalEra, e2: HistoricalEra) => {
      if (e1.id === e2.id) return "请选择两个不同的时期进行对比。";
      
      const sorted = [e1, e2].sort((a, b) => a.yearStart - b.yearStart);
      const key = `${sorted[0].id}_${sorted[1].id}`;

      return COMPARISON_INSIGHTS[key] || "暂无该组合的详细对比数据。";
  };

  const comparisonText = getComparisonText(era1, era2);
  const sortedIds = [era1.id, era2.id].sort();
  const isFordVsAI = sortedIds[0] === 'IR2' && sortedIds[1] === 'AI_AGE';

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto relative z-10 custom-scrollbar animate-in zoom-in-95 duration-500">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="mb-6 lg:mb-10 text-center shrink-0">
                    <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">历史镜像</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-light text-base lg:text-lg">
                        "我们是否正在重演19世纪的悲剧？"<br/>
                        <span className="text-sm text-slate-600 font-mono mt-2 block">Compare systemic impacts across centuries</span>
                    </p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col lg:flex-row gap-6 shrink-0 h-auto lg:h-[500px]">
                    <div className="flex-1 min-w-0 h-[400px] lg:h-auto">
                        <EraCard era={era1} setEra={setEra1} label="卡片 A" />
                    </div>

                    {/* Analysis Center */}
                    <div className="lg:w-2/5 flex flex-col shrink-0">
                        <div className="flex items-center justify-center -my-3 z-10 lg:my-auto lg:-mx-4 lg:order-none order-first">
                            <div 
                                className="bg-slate-800 p-3 rounded-full shadow-xl border border-slate-700 text-cyan-400 relative cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => {
                                    const temp = era1;
                                    setEra1(era2);
                                    setEra2(temp);
                                }}
                                title="交换位置"
                            >
                                <ArrowRightLeft size={24} />
                                <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-6 lg:p-8 rounded-xl border border-slate-800 shadow-2xl flex-1 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <h4 className="text-cyan-400 text-xs font-black uppercase mb-6 flex items-center gap-2 border-b border-slate-800 pb-4 tracking-widest shrink-0 relative z-10">
                                <ScrollText size={14} /> 历史回响分析
                            </h4>
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                <div className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify font-light font-serif">
                                    {comparisonText.split('。').map((sentence, i) => (
                                        sentence.trim() && <p key={i} className="mb-4 last:mb-0">{sentence}。</p>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-slate-950 rounded-lg border border-slate-800/50 shrink-0 relative z-10">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2 font-bold flex items-center gap-2">
                                    <Brain size={12} /> 核心洞察
                                </p>
                                <p className="text-xs text-slate-400 italic">
                                    "技术红利的分配存在时间滞后效应。我们今天面临的风险，不是技术本身，而是我们是否准备好度过这 30-40 年的制度调整期。"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 h-[400px] lg:h-auto">
                        <EraCard era={era2} setEra={setEra2} label="卡片 B" />
                    </div>
                </div>

                {/* Macro Paradox Card (Only for IR2 vs AI) */}
                {isFordVsAI && <ParadoxCard />}
            </div>
        </div>
    </div>
  );
};

export default ComparisonView;