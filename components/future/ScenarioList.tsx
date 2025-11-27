import React from 'react';
import { FUTURE_SCENARIOS } from '../../constants';
import { History, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ScenarioList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6 custom-scrollbar min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {FUTURE_SCENARIOS.map((scenario) => {
                const Icon = scenario.icon;
                return (
                    <div key={scenario.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all group flex flex-col relative overflow-hidden min-h-[450px]">
                        <div className={`absolute top-0 left-0 w-full h-1 ${scenario.id === 'nordic' ? 'bg-green-500' : scenario.id === 'us' ? 'bg-cyan-500' : 'bg-yellow-500'}`}></div>
                        
                        <div className="flex items-center gap-3 mb-6 shrink-0">
                            <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 ${scenario.color}`}>
                                <Icon size={24} />
                            </div>
                            <h3 className={`font-bold text-lg ${scenario.color}`}>{scenario.name}</h3>
                        </div>

                        <div className="space-y-8 flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">核心机制</h4>
                                <ul className="space-y-2">
                                    {scenario.mechanism.map((m, i) => (
                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></div>
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/50">
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1">
                                    <History size={10} /> 历史镜像
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{scenario.history}</p>
                            </div>

                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">2035 预测结果</h4>
                                <ul className="space-y-2">
                                    {scenario.outcome.map((o, i) => (
                                        <li key={i} className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                                            {o.startsWith('✓') ? <CheckCircle size={12} className="text-green-500 shrink-0" /> : 
                                             o.startsWith('❌') ? <XCircle size={12} className="text-red-500 shrink-0" /> : 
                                             <AlertTriangle size={12} className="text-yellow-500 shrink-0" />}
                                            {o.substring(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ScenarioList;