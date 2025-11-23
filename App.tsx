import React, { useState } from 'react';
import DataEvidence from './components/EngelsPauseChart'; // Importing the refactored component (keeping filename for simplicity in this xml context, though content is DataEvidence)
import LogicMap from './components/LogicMap';
import InfoPanel from './components/InfoPanel';
import EraComparison from './components/EraComparison';
import FutureScenarios from './components/FutureScenarios';
import { Node } from './types';
import { LayoutDashboard, GitGraph, Compass, Binary, History } from 'lucide-react';

enum ViewMode {
  MECHANISM = 'mechanism',
  DATA = 'data',
  COMPARE = 'compare',
  FUTURE = 'future'
}

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.MECHANISM);

  const NavItem = ({ mode, icon: Icon, label, subLabel }: { mode: ViewMode, icon: any, label: string, subLabel: string }) => (
      <button 
        onClick={() => setViewMode(mode)}
        className={`relative px-4 lg:px-6 py-3 rounded-xl transition-all duration-300 flex flex-col items-center justify-center min-w-[100px] lg:min-w-[140px] border border-transparent
            ${viewMode === mode 
                ? 'bg-slate-800/80 text-white shadow-lg border-slate-700 ring-1 ring-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
            }`}
      >
        <div className="flex items-center gap-2 mb-1">
            <Icon size={18} className={viewMode === mode ? 'text-cyan-400' : 'opacity-70'} />
            <span className="text-sm font-bold tracking-wide">{label}</span>
        </div>
        <span className="text-[10px] font-mono uppercase opacity-60 hidden lg:block">{subLabel}</span>
        
        {/* Active Indicator */}
        {viewMode === mode && (
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
        )}
      </button>
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-[#020617] text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/30">
      
      {/* Top Bar */}
      <header className="h-16 lg:h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8 shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-cyan-900 to-slate-900 rounded-xl border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Binary size={20} className="text-cyan-400 lg:w-6 lg:h-6" />
            </div>
            <div>
                <h1 className="text-lg lg:text-xl font-black tracking-tight text-white leading-none mb-1 font-serif">The Technology Trap</h1>
                <p className="text-[9px] lg:text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em] hidden sm:block">Knowledge Visualization</p>
            </div>
        </div>

        <nav className="flex items-center gap-1 lg:gap-2 bg-slate-950/50 p-1 rounded-2xl border border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar">
            <NavItem mode={ViewMode.MECHANISM} icon={GitGraph} label="机制" subLabel="The Mechanism" />
            <div className="w-px h-6 lg:h-8 bg-slate-800 mx-1"></div>
            <NavItem mode={ViewMode.DATA} icon={LayoutDashboard} label="数据" subLabel="The Evidence" />
            <div className="w-px h-6 lg:h-8 bg-slate-800 mx-1"></div>
            <NavItem mode={ViewMode.COMPARE} icon={History} label="镜像" subLabel="The History" />
            <div className="w-px h-6 lg:h-8 bg-slate-800 mx-1"></div>
            <NavItem mode={ViewMode.FUTURE} icon={Compass} label="未来" subLabel="The Choice" />
        </nav>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 flex overflow-hidden relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/30 via-[#020617] to-[#020617]">
        
        {/* Viewport Content */}
        {viewMode === ViewMode.MECHANISM && (
            <div className="flex w-full h-full relative animate-in fade-in duration-500 flex-col md:flex-row">
                <div className="flex-1 p-4 lg:p-8 overflow-y-auto flex justify-center custom-scrollbar min-h-0">
                    <div className="max-w-6xl w-full space-y-4 lg:space-y-8 pb-24">
                        <div className="bg-gradient-to-r from-slate-900/80 to-slate-900/0 p-6 lg:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
                             <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4">
                                技术进步的双刃剑
                             </h2>
                             <p className="text-slate-400 leading-relaxed max-w-3xl font-light text-base lg:text-lg">
                                技术进步并不总是带来线性繁荣。当技术是<b>“取代型”</b>时，它会切断普通人与经济增长的联系；只有当制度通过教育和福利进行响应，将技术转化为<b>“赋能型”</b>力量时，繁荣才会到来。
                             </p>
                        </div>
                        <LogicMap onNodeSelect={setSelectedNode} />
                    </div>
                </div>
                {/* Responsive Sidebar: Full width on mobile, fixed width on large screens */}
                <div className="h-[45%] md:h-full w-full md:w-[400px] xl:w-[500px] border-t md:border-t-0 md:border-l border-white/5 z-20 bg-[#020617] shrink-0 shadow-2xl">
                    <InfoPanel selectedNode={selectedNode} />
                </div>
            </div>
        )}

        {viewMode === ViewMode.DATA && (
            <div className="flex-1 p-4 lg:p-10 overflow-y-auto flex flex-col items-center relative z-10 custom-scrollbar animate-in slide-in-from-right-4 duration-500">
                <div className="max-w-5xl w-full space-y-10 pb-20">
                     <div className="text-center space-y-4 py-4">
                        <h2 className="text-3xl lg:text-5xl font-serif font-black text-white tracking-tight mb-2">History Rhymes</h2>
                        <p className="text-slate-500 font-mono text-xs lg:text-sm uppercase tracking-[0.4em]">Evidence: 1790 vs 2024</p>
                     </div>
                     
                     <DataEvidence />
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 lg:p-8 bg-slate-900/40 border border-red-500/20 rounded-2xl relative overflow-hidden group hover:bg-slate-900/60 transition-colors">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                            <h3 className="text-red-400 font-bold mb-4 text-xl flex items-center gap-2">
                                ⚠️ 取代型技术 (Replacing)
                            </h3>
                            <p className="text-slate-400 leading-7 font-light">
                                核心特征是<b>“去技能化”</b>。它不辅助人类，而是让原有技能变得一文不值。对于马车夫来说，内燃机是灾难；对于插画师来说，AI是灾难。这通常导致<b>恩格斯的停顿</b>。
                            </p>
                        </div>
                        <div className="p-6 lg:p-8 bg-slate-900/40 border border-emerald-500/20 rounded-2xl relative overflow-hidden group hover:bg-slate-900/60 transition-colors">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                            <h3 className="text-emerald-400 font-bold mb-4 text-xl flex items-center gap-2">
                                ⚡ 赋能型技术 (Enabling)
                            </h3>
                            <p className="text-slate-400 leading-7 font-light">
                                核心特征是<b>“再技能化”</b>。它创造了只有人类利用新工具才能完成的新任务。电力创造了电工，计算机创造了程序员。这带来了<b>广泛的繁荣</b>。
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        )}

        {viewMode === ViewMode.COMPARE && (
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto relative z-10 custom-scrollbar animate-in zoom-in-95 duration-500">
                 <div className="max-w-7xl mx-auto h-full flex flex-col">
                    <div className="mb-6 lg:mb-10 text-center shrink-0">
                         <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">历史镜像</h2>
                         <p className="text-slate-400 max-w-2xl mx-auto font-light text-base lg:text-lg">
                             "我们是否正在重演19世纪的悲剧？"<br/>
                             <span className="text-sm text-slate-600 font-mono mt-2 block">Compare systemic impacts across centuries</span>
                         </p>
                    </div>
                    <div className="flex-1 min-h-0">
                        <EraComparison />
                    </div>
                 </div>
            </div>
        )}

        {viewMode === ViewMode.FUTURE && (
            <div className="flex-1 p-4 lg:p-10 overflow-y-auto relative z-10 custom-scrollbar animate-in fade-in duration-700">
                <div className="max-w-6xl mx-auto flex flex-col">
                    <div className="mb-8 lg:mb-12 text-center shrink-0">
                         <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">未来岔路口</h2>
                         <p className="text-slate-400 max-w-3xl mx-auto text-base lg:text-lg font-light">
                             技术已经就位，现在轮到制度做选择。我们是走向新的镀金时代，还是福利社会？
                         </p>
                    </div>
                    <div className="flex-1 min-h-0">
                        <FutureScenarios />
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;