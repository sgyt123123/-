import React, { useState } from 'react';
import { TRAP_LOGIC_MAP } from '../constants';
import { Node } from '../types';
import { Info, AlertTriangle, Zap, Sprout, Skull, MousePointerClick } from 'lucide-react';

interface LogicMapProps {
  onNodeSelect: (node: Node) => void;
}

const LogicMap: React.FC<LogicMapProps> = ({ onNodeSelect }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'cause': return <Zap size={24} />;
      case 'effect': return <AlertTriangle size={24} />;
      case 'solution': return <Sprout size={24} />;
      case 'trap': return <Skull size={24} />;
      default: return <Info size={24} />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'cause': return 'stroke-amber-400 fill-amber-900/20 text-amber-400';
      case 'effect': return 'stroke-rose-500 fill-rose-900/20 text-rose-500';
      case 'solution': return 'stroke-emerald-400 fill-emerald-900/20 text-emerald-400';
      case 'trap': return 'stroke-slate-500 fill-slate-800/50 text-slate-500';
      default: return 'stroke-cyan-400 fill-cyan-900/20 text-cyan-400';
    }
  };

  return (
    <div className="w-full overflow-hidden bg-slate-950 rounded-2xl border border-slate-800/60 shadow-2xl relative group selection:bg-cyan-500/30">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Title */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h3 className="text-3xl font-serif font-black text-slate-100 flex items-center gap-3">
            机制图谱
            <span className="text-xs font-sans font-normal text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 backdrop-blur">System Dynamics</span>
        </h3>
      </div>

      {/* Increased height for vertical breathing room */}
      <svg viewBox="0 0 900 1200" className="w-full h-auto min-h-[800px] relative z-20">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#64748b" />
          </marker>
           <marker id="arrowhead-success" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#34d399" />
          </marker>
           <marker id="arrowhead-danger" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#f87171" />
          </marker>
          
          <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Links */}
        {TRAP_LOGIC_MAP.links.map((link, i) => {
            const source = TRAP_LOGIC_MAP.nodes.find(n => n.id === link.source)!;
            const target = TRAP_LOGIC_MAP.nodes.find(n => n.id === link.target)!;
            const isProsperityPath = target.type === 'solution';
            const isTrapPath = target.type === 'trap';
            const isUpwardLoop = source.y > target.y;
            
            const strokeColor = isProsperityPath ? '#34d399' : isTrapPath ? '#f87171' : '#475569';
            const markerId = isProsperityPath ? 'url(#arrowhead-success)' : isTrapPath ? 'url(#arrowhead-danger)' : 'url(#arrowhead)';
            
            // Path logic
            let d = '';
            let labelX = 0;
            let labelY = 0;

            if (isUpwardLoop) {
                // Special C-Curve for Feedback Loop
                // Control points are pushed far right
                const rightEdge = Math.max(source.x, target.x) + 200; 
                d = `M${source.x},${source.y} C${rightEdge},${source.y} ${rightEdge},${target.y} ${target.x},${target.y}`;
                
                // Bezier Curve Point calculation at t=0.5
                // x(t) = (1-t)^3*x0 + 3*(1-t)^2*t*x1 + 3*(1-t)*t^2*x2 + t^3*x3
                // For t=0.5: 0.125*x0 + 0.375*x1 + 0.375*x2 + 0.125*x3
                // Here x1 = x2 = rightEdge
                labelX = 0.125 * (source.x + target.x) + 0.75 * rightEdge;
                labelY = (source.y + target.y) / 2;
                
            } else {
                // Standard S-Curve logic for top-down
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                
                // Adjust control points based on vertical distance
                const cp1x = source.x;
                const cp1y = source.y + Math.abs(dy) * 0.5;
                const cp2x = target.x;
                const cp2y = target.y - Math.abs(dy) * 0.5;
                
                d = Math.abs(dx) < 50 
                    ? `M${source.x},${source.y} L${target.x},${target.y}`
                    : `M${source.x},${source.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`;
                
                labelX = (source.x + target.x) / 2;
                labelY = (source.y + target.y) / 2;
            }

            return (
              <g key={i} className="transition-opacity duration-500">
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={hoveredNode && (source.id === hoveredNode || target.id === hoveredNode) ? 2 : 1.5}
                  strokeOpacity={0.2}
                  markerEnd={markerId}
                />
                
                {/* Flow Particle */}
                 <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={2}
                  strokeDasharray={isTrapPath ? "4,12" : "6,12"}
                  className={isTrapPath ? "animate-[flow_4s_linear_infinite_reverse]" : "animate-[flow_2s_linear_infinite]"}
                  strokeOpacity={hoveredNode && (source.id === hoveredNode || target.id === hoveredNode) ? 0.8 : 0.4}
                />

                {/* Badge Label */}
                {link.label && (
                   <foreignObject 
                    x={labelX - 80} 
                    y={labelY - 14}
                    width="160"
                    height="28"
                    style={{ overflow: 'visible' }}
                   >
                     <div className="flex items-center justify-center w-full h-full">
                        <span className={`text-[10px] font-black uppercase tracking-widest text-center py-1 px-3 rounded-full border shadow-xl z-20 whitespace-nowrap transition-all duration-300
                            ${isProsperityPath 
                                ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-400' 
                                : isTrapPath 
                                    ? 'bg-red-950/95 border-red-500/40 text-red-400' 
                                    : isUpwardLoop
                                        ? 'bg-cyan-950/95 border-cyan-500/40 text-cyan-400 hover:scale-110'
                                        : 'bg-slate-950/95 border-slate-700 text-slate-400'
                            }
                        `}>
                        {link.label}
                        </span>
                     </div>
                   </foreignObject>
                )}
              </g>
            );
        })}

        {/* Nodes */}
        {TRAP_LOGIC_MAP.nodes.map((node) => {
          const colorClass = getNodeColor(node.type);
          const isHovered = hoveredNode === node.id;
          
          return (
            <g 
              key={node.id} 
              onClick={() => onNodeSelect(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer group"
            >
              {/* Perfect Halo - Fixed Transform Origin */}
              <circle 
                  cx={node.x} cy={node.y} r={isHovered ? 60 : 45}
                  className={`fill-current transition-all duration-700 ease-in-out ${colorClass.split(' ')[2]}`}
                  style={{ 
                      opacity: isHovered ? 0.15 : 0.05,
                      transformBox: 'fill-box', 
                      transformOrigin: 'center',
                      // Removed CSS scale transform to rely on 'r' attribute and avoid offset issues
                  }} 
              />
              
              {/* Core Node */}
              <circle
                cx={node.x}
                cy={node.y}
                r="36"
                className={`${colorClass} bg-slate-950 transition-all duration-300 ease-out ${isHovered ? 'stroke-[3px]' : 'stroke-[1.5px]'}`}
                fill="#020617"
                filter={isHovered ? "url(#glow-node)" : ""}
              />
              
              {/* Icon */}
              <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24" className={`pointer-events-none ${colorClass.split(' ').pop()}`}>
                 <div className="flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:scale-110">
                   {getNodeIcon(node.type)}
                 </div>
              </foreignObject>

              {/* Main Label with Text Stroke for Contrast (No Black Box) */}
              <text
                x={node.x}
                y={node.y + 70}
                textAnchor="middle"
                className={`text-sm font-bold pointer-events-none transition-all duration-300 ${isHovered ? 'fill-white' : 'fill-slate-300'}`}
                style={{
                  paintOrder: 'stroke',
                  stroke: '#020617',
                  strokeWidth: '4px',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
              >
                {node.label}
              </text>
              
              {/* Type Tag */}
              <text
                x={node.x}
                y={node.y - 50}
                textAnchor="middle"
                className="fill-slate-500 text-[9px] font-mono uppercase tracking-[0.2em] opacity-60"
              >
                {node.type}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-400">
            <MousePointerClick size={12} /> 点击节点详解
        </div>
      </div>
    </div>
  );
};

export default LogicMap;