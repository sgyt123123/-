import React, { useState } from 'react';
import MechanismView from './components/MechanismView';
import DataView from './components/DataView';
import ComparisonView from './components/ComparisonView';
import FutureView from './components/FutureView';
import { LayoutDashboard, GitGraph, Compass, Binary, History } from 'lucide-react';

enum ViewMode {
  MECHANISM = 'mechanism',
  DATA = 'data',
  COMPARE = 'compare',
  FUTURE = 'future'
}

const App: React.FC = () => {
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

      {/* Main Canvas with Enhanced Atmosphere */}
      <main className="flex-1 flex overflow-hidden relative bg-[#020617]">
        
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/5 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/5 blur-[120px] animate-pulse delay-700"></div>
        </div>

        {/* Viewport Content */}
        {viewMode === ViewMode.MECHANISM && <MechanismView />}
        {viewMode === ViewMode.DATA && <DataView />}
        {viewMode === ViewMode.COMPARE && <ComparisonView />}
        {viewMode === ViewMode.FUTURE && <FutureView />}
      </main>
    </div>
  );
};

export default App;