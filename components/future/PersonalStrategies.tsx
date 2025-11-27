
import React from 'react';
import { PERSONAL_STRATEGIES } from '../../constants';

const PersonalStrategies: React.FC = () => {
    return (
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4 lg:p-8 overflow-y-auto custom-scrollbar relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto flex flex-col py-10">
                 <div className="text-center mb-12 shrink-0">
                    <h3 className="text-2xl lg:text-3xl font-serif font-black text-white mb-2">个体进化策略：与 AI 共舞</h3>
                    <p className="text-slate-400 text-sm">在算法洪流中，建立不可替代的人类护城河</p>
                 </div>

                 <div className="flex flex-col gap-4 relative">
                    {/* Visual guide line */}
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-700 hidden lg:block opacity-30"></div>

                    {PERSONAL_STRATEGIES.map((strat, index) => { 
                        const Icon = strat.icon;
                        const isTop = index === 0; // First item is now Strategy (Top priority)
                        return (
                            <div key={index} className="flex gap-4 lg:gap-8 group">
                                <div className="hidden lg:flex flex-col items-center justify-center w-16 shrink-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-slate-950 transition-colors ${isTop ? 'border-purple-500 text-purple-400 group-hover:bg-purple-500/10' : 'border-slate-700 text-slate-500 group-hover:border-cyan-500 group-hover:text-cyan-400'}`}>
                                        <Icon size={20} />
                                    </div>
                                </div>
                                <div className={`flex-1 p-6 rounded-xl border transition-all duration-300 hover:translate-x-2 ${isTop ? 'bg-purple-900/10 border-purple-500/30' : 'bg-slate-950 border-slate-800 hover:border-cyan-500/30'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`text-lg font-bold ${isTop ? 'text-purple-400' : 'text-slate-200 group-hover:text-cyan-400'}`}>{strat.title}</h4>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono border border-slate-800 px-2 py-0.5 rounded">{strat.level}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {strat.skills.map(s => (
                                            <span key={s} className="text-xs bg-black/30 px-2 py-1 rounded text-slate-400 border border-white/5">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-slate-800 pl-3">
                                        "{strat.desc}"
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                 </div>
            </div>
        </div>
    );
};

export default PersonalStrategies;
