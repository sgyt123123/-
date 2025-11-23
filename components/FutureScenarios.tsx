import React, { useState } from 'react';
import { FUTURE_SCENARIOS, PERSONAL_STRATEGIES, COGNITIVE_PIPELINE_DATA } from '../constants';
import { History, CheckCircle, XCircle, AlertTriangle, TrendingUp, User, Globe, Zap, Clock, ArrowRightLeft, UserCircle, BrainCircuit } from 'lucide-react';

const FutureScenarios: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'curve' | 'personal'>('scenarios');

  return (
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

      {activeTab === 'scenarios' && (
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
      )}

      {activeTab === 'curve' && (
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-0 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Header */}
             <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center flex-wrap gap-4 shrink-0">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        <TrendingUp className="text-cyan-500" size={20} /> 
                        时光镜像：1712 vs 2023
                    </h3>
                    <p className="text-slate-400 text-sm font-light">
                        当下的 AI 革命正处于历史的<span className="text-cyan-400 font-bold">黄金机会窗口</span> (Golden Window)。
                    </p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-3">
                    <Clock size={16} className="text-amber-500" />
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">时间压缩 (Time Compression)</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-amber-500 font-mono font-bold line-through opacity-50 text-xs">64 年</span>
                            <span className="text-slate-600 text-xs">→</span>
                            <span className="text-cyan-400 font-mono font-black text-sm">6 年</span>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Dual Track Timeline */}
             <div className="flex-1 overflow-y-auto custom-scrollbar pt-16 pb-12 px-6">
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Timeline Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-[600px]">
                        
                        {/* Stage 1: The Spark */}
                        <div className="flex flex-col gap-4 relative group">
                            <div className="text-center mb-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">阶段一：火花 (The Spark)</span>
                            </div>
                            
                            {/* Industrial Top */}
                            <div className="bg-amber-950/10 border border-amber-900/30 p-4 rounded-lg relative overflow-hidden group-hover:bg-amber-950/20 transition-colors">
                                <div className="absolute top-0 right-0 p-2 opacity-10"><Zap className="text-amber-500" /></div>
                                <div className="text-amber-600 font-serif font-bold text-sm mb-1">纽科门机 (1712)</div>
                                <p className="text-xs text-amber-500/70 font-serif leading-snug">
                                    效率极低 (1%)，耗煤巨大。仅能用于矿井抽水。
                                </p>
                            </div>

                            {/* Connector */}
                            <div className="h-8 w-px bg-gradient-to-b from-amber-900/30 to-cyan-900/30 mx-auto"></div>

                            {/* AI Bottom */}
                            <div className="bg-cyan-950/10 border border-cyan-900/30 p-4 rounded-lg relative overflow-hidden group-hover:bg-cyan-950/20 transition-colors">
                                <div className="absolute top-0 right-0 p-2 opacity-10"><Zap className="text-cyan-500" /></div>
                                <div className="text-cyan-400 font-mono font-bold text-sm mb-1">Transformer (2017)</div>
                                <p className="text-xs text-cyan-500/70 font-mono leading-snug">
                                    纯架构突破。难以训练，难以部署，仅限实验室。
                                </p>
                            </div>
                        </div>

                        {/* Stage 2: The Adoption (We Are Here) */}
                        <div className="flex flex-col gap-0 relative scale-105 z-10">
                            {/* Highlight Badge */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] z-20 whitespace-nowrap">
                                我们在这里 (We Are Here)
                            </div>

                            <div className="bg-slate-900 border border-cyan-500/50 p-1 rounded-xl shadow-2xl">
                                <div className="text-center py-2 bg-slate-950/50 rounded-t-lg border-b border-slate-800">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400">阶段二：窗口期 (The Window)</span>
                                </div>

                                {/* Industrial Top */}
                                <div className="bg-amber-900/20 p-5 border-b border-dashed border-slate-700 relative">
                                    <div className="text-amber-500 font-serif font-bold text-lg mb-1">瓦特改良 (1776)</div>
                                    <div className="text-xs text-amber-200/60 font-serif italic mb-3">
                                        "能用但复杂，经常爆炸。"
                                    </div>
                                    <div className="bg-amber-950/40 p-2 rounded border border-amber-500/20">
                                        <span className="block text-[9px] text-amber-500 uppercase font-bold mb-1">历史职业</span>
                                        <span className="text-xs text-amber-100 font-serif">机械修理师 & 锅炉调优师</span>
                                    </div>
                                </div>

                                {/* AI Bottom */}
                                <div className="bg-cyan-900/20 p-5 relative">
                                    <div className="text-cyan-400 font-mono font-bold text-lg mb-1">GPT-4 (2023)</div>
                                    <div className="text-xs text-cyan-200/60 font-mono italic mb-3">
                                        "强大但有幻觉，需要对齐。"
                                    </div>
                                    <div className="bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
                                        <span className="block text-[9px] text-cyan-500 uppercase font-bold mb-1">现代职业</span>
                                        <span className="text-xs text-cyan-100 font-mono">提示词工程师 & 智能检索架构师 (RAG)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Value Prop */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed">
                                    <span className="text-white font-bold">价值定律：</span>
                                    技术的<span className="text-red-400">不完美性</span> (瓶颈) 定义了人的<span className="text-green-400">高薪价值</span>。
                                </p>
                            </div>
                        </div>

                        {/* Stage 3: Ubiquity */}
                        <div className="flex flex-col gap-4 relative group opacity-60 hover:opacity-100 transition-opacity">
                            <div className="text-center mb-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">阶段三：普及 (Ubiquity)</span>
                            </div>
                            
                            {/* Industrial Top */}
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg relative grayscale group-hover:grayscale-0 transition-all">
                                <div className="text-slate-400 font-serif font-bold text-sm mb-1">工业革命完成 (1850)</div>
                                <p className="text-xs text-slate-500 font-serif leading-snug">
                                    标准化、廉价化。旧工匠彻底消失，新工人阶级形成。
                                </p>
                            </div>

                            {/* Connector */}
                            <div className="h-8 w-px bg-slate-800 mx-auto"></div>

                            {/* AI Bottom */}
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg relative grayscale group-hover:grayscale-0 transition-all">
                                <div className="text-slate-400 font-mono font-bold text-sm mb-1">AGI / 通用认知 (2035?)</div>
                                <p className="text-xs text-slate-500 font-mono leading-snug">
                                    智能如水电般廉价普及。平庸的脑力劳动归零，人类仅剩两座堡垒：<span className="text-slate-200 font-bold">「定义方向的战略家」</span>与<span className="text-slate-200 font-bold">「提供温度的真人」</span>。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Cognitive Pipeline Architecture */}
                    <div className="border-t border-slate-800 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <BrainCircuit size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    {COGNITIVE_PIPELINE_DATA.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    微观角色演变：人类在流水线上的位置迁移
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Comparison Table */}
                            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden p-6">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-800">
                                            {COGNITIVE_PIPELINE_DATA.columns.map((col, i) => (
                                                <th key={i} className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {COGNITIVE_PIPELINE_DATA.rows.map((row, i) => (
                                            <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
                                                <td className="py-4 text-xs font-bold text-slate-400">{row.dim}</td>
                                                <td className="py-4 text-sm text-amber-100 font-serif pr-4">{row.ford}</td>
                                                <td className="py-4 text-sm text-cyan-100 font-mono">{row.ai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-6 p-6 bg-gradient-to-r from-cyan-950/30 to-slate-900/50 rounded-xl border-l-4 border-cyan-500 shadow-lg">
                                    <p className="text-base lg:text-lg font-serif text-cyan-100 leading-relaxed font-medium">
                                        "{COGNITIVE_PIPELINE_DATA.insight}"
                                    </p>
                                </div>
                            </div>

                            {/* Visual Flow Shift */}
                            <div className="flex flex-col gap-6">
                                {/* Old Model */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative">
                                    <div className="absolute top-2 right-4 text-[10px] uppercase font-bold text-slate-600">Old Paradigm</div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                                        <UserCircle size={16} /> 人类角色：<span className="text-slate-400 font-bold">执行者 (Executor)</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="h-10 px-4 rounded border border-slate-700 bg-slate-800 flex items-center text-xs text-slate-400">输入</div>
                                        <div className="h-0.5 flex-1 bg-slate-700 mx-2"></div>
                                        <div className="h-16 w-16 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center bg-amber-900/10 text-amber-500 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                            人类
                                        </div>
                                        <div className="h-0.5 flex-1 bg-slate-700 mx-2"></div>
                                        <div className="h-10 px-4 rounded border border-slate-700 bg-slate-800 flex items-center text-xs text-slate-400">输出</div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center mt-3">人被困在循环中，作为效率瓶颈。</p>
                                </div>

                                {/* New Model */}
                                <div className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl p-6 relative flex-1">
                                    <div className="absolute top-2 right-4 text-[10px] uppercase font-bold text-cyan-600">New Paradigm</div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                                        <BrainCircuit size={16} /> 人类角色：<span className="text-cyan-400 font-bold">定义者 & 评估者</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-8 relative">
                                        {/* Upstream Human */}
                                        <div className="flex flex-col items-center gap-2 z-10">
                                            <div className="h-12 w-12 rounded-full border border-purple-500 bg-purple-900/20 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                                                <UserCircle size={20} />
                                            </div>
                                            <span className="text-[10px] font-bold text-purple-300 uppercase">定义 (Define)</span>
                                        </div>

                                        {/* Flow Arrow */}
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-emerald-500/50 mx-2 relative">
                                            <ArrowRightLeft size={12} className="absolute left-1/2 -top-1.5 -translate-x-1/2 text-slate-600" />
                                        </div>

                                        {/* AI Blackbox */}
                                        <div className="h-20 w-32 rounded-lg border border-cyan-500/30 bg-slate-950 flex flex-col items-center justify-center relative z-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
                                            <span className="text-xs font-black text-cyan-500 z-10">AI Agent</span>
                                            <span className="text-[9px] text-slate-600 z-10">Black Box Execution</span>
                                        </div>

                                        {/* Flow Arrow */}
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-emerald-500/50 mx-2 relative">
                                             <ArrowRightLeft size={12} className="absolute left-1/2 -top-1.5 -translate-x-1/2 text-slate-600" />
                                        </div>

                                        {/* Downstream Human */}
                                        <div className="flex flex-col items-center gap-2 z-10">
                                            <div className="h-12 w-12 rounded-full border border-emerald-500 bg-emerald-900/20 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                                                <UserCircle size={20} />
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-300 uppercase">评估 (Evaluate)</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center mt-6">人移至循环两端，控制黑盒，而非被黑盒控制。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      )}

      {activeTab === 'personal' && (
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4 lg:p-8 overflow-y-auto custom-scrollbar relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto flex flex-col py-10">
                 <div className="text-center mb-12 shrink-0">
                    <h3 className="text-2xl lg:text-3xl font-serif font-black text-white mb-2">反脆弱职业能力金字塔</h3>
                    <p className="text-slate-400 text-sm">如何成为"AI增强型专家"而非"被AI替代的专家"</p>
                 </div>

                 <div className="flex flex-col gap-4 relative">
                    {/* Visual guide line */}
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-700 hidden lg:block opacity-30"></div>

                    {PERSONAL_STRATEGIES.map((strat, index) => { 
                        const Icon = strat.icon;
                        const isTop = index === 0; // Since we reversed data order in constants, first item is now Top (Meta)
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
      )}
    </div>
  );
};

export default FutureScenarios;