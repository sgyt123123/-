import React from 'react';
import { Repeat, Users, XCircle, Anchor, Lock } from 'lucide-react';

const TrapVisual: React.FC = () => (
    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 mb-6 w-full">
      <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
        <span>System Failure: The Stagnation Cycle</span>
      </div>

      {/* Ancient Trap: The Triangle of Stagnation */}
      <div className="relative">
         <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="text-amber-500 font-bold text-sm flex items-center gap-2">
                <Repeat size={16} /> 罗马式停滞 (Stagnation Trap)
            </h4>
         </div>
         
         <div className="h-[260px] w-full relative bg-amber-950/10 rounded-xl border border-amber-900/20">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 340 260">
                <defs>
                    <marker id="arrow-amber" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill="#d97706" />
                    </marker>
                </defs>

                {/* Triangle Path */}
                <path d="M170,40 L280,200 L60,200 Z" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M170,40 L280,200 L60,200 Z" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="8 8" className="animate-[flow_6s_linear_infinite]" />

                {/* Node 1: Top (Labor) */}
                <foreignObject x="110" y="0" width="120" height="70">
                     <div className="flex flex-col items-center bg-slate-950 border border-amber-600/50 p-2.5 rounded-lg shadow-xl relative z-10">
                        <div className="text-amber-400 text-xs font-black flex items-center gap-1.5 mb-1 whitespace-nowrap">
                            <Users size={14} /> 劳动力廉价
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">奴隶制/低工资</span>
                    </div>
                </foreignObject>

                {/* Node 2: Bottom Right (Incentive) */}
                <foreignObject x="230" y="180" width="110" height="70">
                    <div className="flex flex-col items-center bg-slate-950 border border-amber-600/50 p-2.5 rounded-lg shadow-xl relative z-10">
                        <div className="text-amber-400 text-xs font-black flex items-center gap-1.5 mb-1 whitespace-nowrap">
                            <XCircle size={14} /> 动力缺失
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">替代成本过高</span>
                    </div>
                </foreignObject>

                {/* Node 3: Bottom Left (Stagnation) */}
                <foreignObject x="0" y="180" width="110" height="70">
                    <div className="flex flex-col items-center bg-slate-950 border border-amber-600/50 p-2.5 rounded-lg shadow-xl relative z-10">
                         <div className="text-amber-400 text-xs font-black flex items-center gap-1.5 mb-1 whitespace-nowrap">
                            <Anchor size={14} /> 产出停滞
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">维稳 > 发展</span>
                    </div>
                </foreignObject>
                
                {/* Center Lock Icon */}
                <foreignObject x="150" y="110" width="40" height="40">
                    <div className="flex items-center justify-center text-amber-500/30 animate-pulse">
                        <Lock size={32} />
                    </div>
                </foreignObject>
                
                {/* Direction Labels */}
                <text x="240" y="100" className="fill-amber-700/70 text-[10px] font-mono font-bold" transform="rotate(25, 240, 100)">无需机器</text>
                <text x="170" y="215" className="fill-amber-700/70 text-[10px] font-mono font-bold" textAnchor="middle">无法增长</text>
                <text x="100" y="100" className="fill-amber-700/70 text-[10px] font-mono font-bold" transform="rotate(-25, 100, 100)">巩固低薪</text>

            </svg>
         </div>
      </div>
    </div>
);

export default TrapVisual;