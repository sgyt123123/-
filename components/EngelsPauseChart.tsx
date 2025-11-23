import React, { useState } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine, BarChart, Bar, Cell } from 'recharts';
import { ENGELS_PAUSE_DATA, MODERN_DIVERGENCE_DATA, DATA_SOURCES } from '../constants';
import { TrendingUp, Users, AlertTriangle, ArrowRight, Quote } from 'lucide-react';

const DataEvidence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'historical' | 'modern'>('historical');

  // Polarization Data (The Dumbbell Shape)
  const POLARIZATION_DATA = [
    { skill: '低技能 (服务)', change: 15, fill: '#cbd5e1', label: '护工/清洁/餐饮' },
    { skill: '中等技能 (常规)', change: -40, fill: '#f87171', label: '文员/会计/装配' },
    { skill: '高技能 (抽象)', change: 25, fill: '#34d399', label: '管理/研发/创意' },
  ];

  const currentData = activeTab === 'historical' ? ENGELS_PAUSE_DATA : MODERN_DIVERGENCE_DATA;
  const chartColor = activeTab === 'historical' ? '#22d3ee' : '#f472b6';
  const yearStart = activeTab === 'historical' ? 1780 : 1980;
  const yearEnd = activeTab === 'historical' ? 1870 : 2024;
  const gapName = activeTab === 'historical' ? "恩格斯的停顿 (1790-1840)" : "大分流 (1980-2024)";

  return (
    <div className="w-full flex flex-col gap-6">
        
      {/* Chart Container */}
      <div className="w-full h-[550px] bg-slate-900/40 p-6 lg:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Toggle Header */}
        <div className="mb-6 flex flex-wrap justify-between items-start border-b border-slate-800/60 pb-4 relative z-10 shrink-0 gap-4">
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

            {/* Integrated Top Legend */}
            <div className="flex gap-4 lg:gap-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
                <div className="flex flex-col gap-1">
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px] ${activeTab === 'historical' ? 'bg-cyan-400 shadow-cyan-400' : 'bg-pink-400 shadow-pink-400'}`}></div>
                        产出 (GDP/Productivity)
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
                        <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-300"></div>
                        工资中位数 (Wages)
                    </div>
                </div>
            </div>
        </div>
        
        {/* Main Chart Area */}
        <div className="flex-1 w-full min-h-0 relative">
            <div className="absolute top-4 left-4 z-0 pointer-events-none">
                 <h3 className={`text-4xl font-serif font-black opacity-10 ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>
                    {activeTab === 'historical' ? 'THE PAUSE' : 'THE DIVERGENCE'}
                 </h3>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <defs>
                    <linearGradient id="productivityFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0.01}/>
                    </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                    dataKey="year" 
                    stroke="#64748b" 
                    tick={{fontSize: 12, fontFamily: 'monospace'}}
                    tickMargin={15}
                    axisLine={false}
                />
                <YAxis 
                    stroke="#64748b" 
                    tick={{fontSize: 12, fontFamily: 'monospace'}}
                    axisLine={false}
                    tickLine={false}
                    domain={['auto', 'auto']}
                />
                
                <Tooltip 
                    cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.3 }}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const prod = payload.find(p => p.dataKey === 'productivity')?.value as number;
                            const wage = payload.find(p => p.dataKey === 'wages')?.value as number;
                            const gap = prod - wage;
                            const event = payload[0].payload.event;

                            return (
                                <div className="bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
                                    <div className="text-slate-400 font-mono text-xs mb-2">{label}</div>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm font-bold ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>产出</span>
                                            <span className="font-mono text-white">{prod}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm font-bold">工资</span>
                                            <span className="font-mono text-slate-300">{wage}</span>
                                        </div>
                                    </div>
                                    {gap > 5 && (
                                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-2 mb-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Gap</span>
                                                <span className="text-red-400 font-mono font-black">+{gap.toFixed(0)} pts</span>
                                            </div>
                                        </div>
                                    )}
                                    {event && (
                                        <div className="text-xs text-amber-400 italic mt-2 pt-2 border-t border-slate-800">
                                            "{event}"
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                
                {/* Highlight Areas */}
                {activeTab === 'historical' ? (
                     <ReferenceArea x1={1790} x2={1840} fill="#f87171" fillOpacity="0.05" />
                ) : (
                     <ReferenceArea x1={2000} x2={2024} fill="#f87171" fillOpacity="0.05" />
                )}

                <Area type="monotone" dataKey="productivity" stroke="none" fill="url(#productivityFade)" />
                <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke={chartColor} 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: chartColor, stroke: '#0f172a' }}
                />
                <Line 
                    type="monotone" 
                    dataKey="wages" 
                    stroke="#cbd5e1" 
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    dot={false}
                    activeDot={{ r: 6, fill: '#cbd5e1', stroke: '#0f172a' }}
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        {/* Source Citation Footer */}
        <div className="mt-2 pt-3 border-t border-slate-800/50 flex justify-between items-center">
            <div className="flex items-center gap-2 opacity-50 text-[10px] text-slate-400 font-mono">
                <Quote size={10} />
                <span>
                    {activeTab === 'historical' ? DATA_SOURCES.engels : DATA_SOURCES.modern}
                </span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Stylized Data</span>
        </div>
      </div>

      {/* Analysis & Polarization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Analysis */}
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
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

          {/* Polarization Chart (Mini) */}
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col">
              <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
                  <Users size={18} className="text-amber-400" />
                  {activeTab === 'historical' ? '19世纪：去技能化 (Deskilling)' : '21世纪：哑铃型分化 (Polarization)'}
              </h4>
              
              {activeTab === 'modern' ? (
                <div className="flex-1 min-h-[150px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={POLARIZATION_DATA} layout="vertical" margin={{left: 40}}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="skill" type="category" width={100} tick={{fontSize: 10, fill: '#94a3b8'}} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                content={({payload}) => {
                                    if(payload && payload.length) {
                                        return <div className="bg-slate-900 p-2 border border-slate-700 text-xs text-white rounded">{payload[0].payload.label}: {payload[0].value}%</div>
                                    }
                                    return null;
                                }} 
                            />
                            <Bar dataKey="change" barSize={20} radius={[0, 4, 4, 0]}>
                                {POLARIZATION_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                         <div className="text-[100px] text-slate-500 font-black tracking-tighter">I X I</div>
                     </div>
                </div>
              ) : (
                  <div className="flex-1 flex items-center justify-center text-center">
                      <div className="text-sm text-slate-500">
                          <p className="mb-2"><span className="text-red-400 font-bold">工匠 ↓</span> 技能贬值</p>
                          <p><span className="text-slate-400 font-bold">普工 ↑</span> 需求激增</p>
                          <p className="text-xs mt-2 opacity-60">(单一维度的向下流动)</p>
                      </div>
                  </div>
              )}
               <div className="mt-2 pt-2 border-t border-slate-800/50 flex flex-col gap-1 items-center">
                    <p className="text-xs text-slate-500 text-center">
                        {activeTab === 'modern' ? "中产阶级空心化：高薪与低薪岗位增长，中等技能消失。" : "手工技能被机器归零，劳动力同质化。"}
                    </p>
                    {activeTab === 'modern' && (
                        <p className="text-[9px] text-slate-600 font-mono text-center">
                            {DATA_SOURCES.polarization}
                        </p>
                    )}
               </div>
          </div>
      </div>
    </div>
  );
};

export default DataEvidence;