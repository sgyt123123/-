import React, { useState } from 'react';
import { ERAS, COMPARISON_INSIGHTS, FORD_VS_AI_DATA } from '../constants';
import { HistoricalEra } from '../types';
import { ArrowRightLeft, Users, Factory, ScrollText, Cpu, Zap, Brain, ChevronDown, Hammer, Sparkles, ArrowDown } from 'lucide-react';

const EraComparison: React.FC = () => {
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

  const EraCard = ({ era, setEra, label }: { era: HistoricalEra, setEra: (e: HistoricalEra) => void, label: string }) => {
      const isReplacing = era.type === 'replacing';
      const accentColor = isReplacing ? 'text-red-400 border-red-500/30 bg-red-500/5' : 'text-green-400 border-green-500/30 bg-green-500/5';
      const Icon = era.id.includes('AI') ? Brain : era.id.includes('IR1') ? Factory : era.id.includes('IR3') ? Cpu : Zap;

      return (
        <div className={`rounded-xl p-1 border transition-all h-full flex flex-col ${isReplacing ? 'border-red-900/50' : 'border-green-900/50'}`}>
            <div className={`h-full bg-slate-900/80 rounded-lg p-4 lg:p-6 relative overflow-hidden group flex flex-col`}>
                {/* Background Icon */}
                <div className={`absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity scale-150 ${isReplacing ? 'text-red-500' : 'text-green-500'}`}>
                    <Icon size={120} />
                </div>

                <div className="flex justify-between items-center mb-4 relative z-10 shrink-0">
                    <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
                        {label}
                    </label>
                    <div className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded border ${accentColor}`}>
                        {isReplacing ? '取代型 (Replacing)' : '赋能型 (Enabling)'}
                    </div>
                </div>

                {/* Dropdown Container */}
                <div className="relative mb-6 shrink-0 group/select">
                    {/* Visual Custom Dropdown Overlay */}
                    <div className="flex items-center justify-between w-full bg-slate-950 p-3 rounded-lg border border-slate-800 group-hover/select:border-cyan-500/50 group-hover/select:bg-slate-900 transition-all cursor-pointer shadow-sm">
                        <span className="font-bold text-white truncate pr-4">{era.name}</span>
                        <ChevronDown size={16} className="text-slate-500 group-hover/select:text-cyan-400 transition-colors" />
                    </div>

                    {/* Hidden Native Select for Accessibility & Functionality */}
                    <select 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={era.id}
                        onChange={(e) => setEra(ERAS.find(x => x.id === e.target.value) || ERAS[0])}
                    >
                        {ERAS.map(e => (
                            <option key={e.id} value={e.id} className="bg-slate-900 text-slate-200">
                                {e.name}
                            </option>
                        ))}
                    </select>

                    <div className="absolute -top-3 left-2 px-1 bg-slate-900 text-[9px] text-cyan-500 opacity-0 group-hover/select:opacity-100 transition-opacity pointer-events-none font-medium z-20">
                        点击切换时期
                    </div>
                </div>
                
                <div className="space-y-6 relative z-10 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
                    <div>
                        <div className="text-4xl lg:text-6xl font-black text-slate-800 mb-2 font-serif">{era.yearStart}</div>
                        <div className={`h-1 w-16 mb-4 ${isReplacing ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <p className="text-slate-300 text-sm leading-relaxed">{era.description}</p>
                    </div>
                    
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                            <Zap size={12} /> 关键技术
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {era.keyTechnologies.map(t => (
                                <span key={t} className="text-xs font-medium bg-slate-950 border border-slate-800 px-2.5 py-1 rounded text-slate-400">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                            <Users size={12} /> 社会影响
                        </h4>
                        <p className="text-xs text-slate-400 italic border-l-2 border-slate-800 pl-3">
                            {era.socialImpact}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
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
        {isFordVsAI && (
            <div className="border-t border-slate-800 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <ArrowDown size={20} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            {FORD_VS_AI_DATA.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            宏观经济悖论：正和博弈 vs 零和博弈
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-0 bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                        {/* Ford Side */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col items-center gap-4 relative group hover:bg-slate-900/60 transition-colors border-b md:border-b-0 md:border-r border-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent pointer-events-none"></div>
                        <div className="p-4 bg-slate-800 rounded-full border border-slate-700 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-colors shadow-lg">
                            <Hammer size={28} />
                        </div>
                        <h5 className="text-sm font-black text-slate-300 uppercase tracking-widest text-center border-b border-slate-700 pb-2 mb-2 w-full">{FORD_VS_AI_DATA.ford.label}</h5>
                        
                        <div className="space-y-4 w-full max-w-xs">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">解构对象</span>
                                <span className="font-bold text-amber-200">{FORD_VS_AI_DATA.ford.target}</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">经济模型</span>
                                <span className="font-bold text-emerald-400">{FORD_VS_AI_DATA.ford.economics}</span>
                            </div>
                                <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">核心机制</span>
                                <span className="font-mono text-slate-300">{FORD_VS_AI_DATA.ford.mechanism}</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="bg-amber-950/30 p-3 rounded border border-amber-900/50 flex flex-col gap-1">
                                <span className="text-[9px] text-amber-500/70 uppercase font-bold">社会后果</span>
                                <span className="text-sm font-bold text-amber-400 leading-snug">{FORD_VS_AI_DATA.ford.impact}</span>
                                <span className="text-[10px] text-amber-500/50 italic mt-1">{FORD_VS_AI_DATA.ford.insight}</span>
                            </div>
                        </div>
                        </div>

                        {/* AI Side */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col items-center gap-4 relative group hover:bg-slate-900/60 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none"></div>
                        <div className="p-4 bg-slate-800 rounded-full border border-slate-700 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors shadow-lg">
                            <Sparkles size={28} />
                        </div>
                        <h5 className="text-sm font-black text-slate-300 uppercase tracking-widest text-center border-b border-slate-700 pb-2 mb-2 w-full">{FORD_VS_AI_DATA.ai.label}</h5>
                        
                        <div className="space-y-4 w-full max-w-xs">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">解构对象</span>
                                <span className="font-bold text-purple-200">{FORD_VS_AI_DATA.ai.target}</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">经济模型</span>
                                <span className="font-bold text-red-400">{FORD_VS_AI_DATA.ai.economics}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase font-bold text-[10px]">核心机制</span>
                                <span className="font-mono text-slate-300">{FORD_VS_AI_DATA.ai.mechanism}</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="bg-purple-950/30 p-3 rounded border border-purple-900/50 flex flex-col gap-1">
                                <span className="text-[9px] text-purple-500/70 uppercase font-bold">社会后果</span>
                                <span className="text-sm font-bold text-purple-400 leading-snug">{FORD_VS_AI_DATA.ai.impact}</span>
                                <span className="text-[10px] text-purple-500/50 italic mt-1">{FORD_VS_AI_DATA.ai.insight}</span>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default EraComparison;