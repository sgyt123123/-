import React from 'react';
import { HistoricalEra } from '../../types';
import { ERAS } from '../../constants';
import { Brain, Factory, Cpu, Zap, ChevronDown, Users } from 'lucide-react';

interface EraCardProps {
  era: HistoricalEra;
  setEra: (e: HistoricalEra) => void;
  label: string;
}

const EraCard: React.FC<EraCardProps> = ({ era, setEra, label }) => {
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

export default EraCard;