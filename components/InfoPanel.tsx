import React from 'react';
import { Node } from '../types';
import { BookOpen, Quote, Hash, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface InfoPanelProps {
  selectedNode: Node | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedNode }) => {
  
  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-12 text-center bg-slate-950/80 backdrop-blur-md border-l border-white/5">
        <div className="relative mb-8 group cursor-default">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-1000"></div>
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <BookOpen size={48} className="text-cyan-500" />
            </div>
        </div>
        <h3 className="text-3xl font-serif font-bold text-slate-200 mb-4 tracking-wide">探索机制</h3>
        <p className="text-slate-400 leading-relaxed max-w-xs font-light">
            点击左侧图谱中的节点<br/>
            解构<span className="text-cyan-400 font-bold mx-1">技术陷阱</span>的深层逻辑
        </p>
      </div>
    );
  }

  const getTypeConfig = (type: string) => {
      switch(type) {
          case 'cause': return { color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10', label: '驱动因素' };
          case 'effect': return { color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-500/10', label: '社会后果' };
          case 'solution': return { color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', label: '破局之道' };
          case 'trap': return { color: 'text-slate-300', border: 'border-slate-500/50', bg: 'bg-slate-500/10', label: '系统陷阱' };
          default: return { color: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-500/10', label: '概念' };
      }
  }

  const config = getTypeConfig(selectedNode.type);

  return (
    <div className="h-full flex flex-col border-l border-slate-800 bg-slate-950 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] relative z-30">
      
      {/* Header - Solid background to prevent bleed */}
      <div className="p-8 pb-6 bg-slate-950 shadow-xl shrink-0 border-b border-slate-800 relative z-20">
        <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] border ${config.border} ${config.bg} ${config.color} shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
                {config.label}
            </span>
            <span className="text-[10px] font-mono text-slate-600 uppercase">ID: {selectedNode.id.toUpperCase()}</span>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4 leading-tight tracking-tight">
            {selectedNode.label}
        </h2>
        
        <div className="relative pl-6 py-2 border-l-2 border-slate-700 mr-4">
            <Quote size={20} className="absolute -left-3 -top-3 text-slate-600 bg-slate-950 p-0.5 rounded-full z-10" />
            <p className="text-base lg:text-lg text-slate-300 font-serif italic leading-relaxed opacity-90">
                {selectedNode.description}
            </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar scroll-smooth bg-slate-950">
        <div className="prose prose-invert prose-sm max-w-none 
            prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-200
            prose-h3:text-xl prose-h3:text-cyan-100 prose-h3:mt-8 prose-h3:mb-4 prose-h3:border-b prose-h3:border-slate-800 prose-h3:pb-2
            prose-h4:text-xs prose-h4:uppercase prose-h4:tracking-widest prose-h4:text-slate-500 prose-h4:mt-8
            prose-p:text-slate-400 prose-p:leading-7 prose-p:font-light prose-p:mb-4
            prose-strong:text-white prose-strong:font-bold
            prose-li:text-slate-400 prose-li:marker:text-slate-700
            prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-300
            hr:border-slate-800 hr:my-8">
            <ReactMarkdown>
                {selectedNode.detailedMarkdown}
            </ReactMarkdown>
        </div>

        {/* Footer Tags */}
        {selectedNode.relatedConcepts && selectedNode.relatedConcepts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-800 pb-12">
                <div className="flex items-center gap-2 mb-4 text-slate-500">
                    <Hash size={14} className="text-slate-600" />
                    <span className="text-xs uppercase tracking-wider font-bold font-mono">Related Concepts</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {selectedNode.relatedConcepts.map((concept, idx) => (
                        <span key={idx} className="group cursor-help flex items-center text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg transition-all hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-950/20">
                            <Lightbulb size={12} className="mr-2 text-slate-700 group-hover:text-yellow-400 transition-colors" />
                            {concept}
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;