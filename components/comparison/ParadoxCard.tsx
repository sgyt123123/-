import React from 'react';
import { FORD_VS_AI_DATA } from '../../constants';
import { ArrowDown, Hammer, Sparkles } from 'lucide-react';

const ParadoxCard: React.FC = () => {
    return (
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
    );
};

export default ParadoxCard;