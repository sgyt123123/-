
import React from 'react';
import { Node } from '../../types';
import { Info, AlertTriangle, Zap, Sprout, Skull, Ban, Hammer, Hourglass, Activity } from 'lucide-react';

interface LogicNodeProps {
  node: Node;
  isSelected: boolean;
  isHovered: boolean;
  isRelated: boolean;
  onSelect: (node: Node) => void;
  setHovered: (id: string | null) => void;
}

const LogicNode: React.FC<LogicNodeProps> = ({ node, isSelected, isHovered, isRelated, onSelect, setHovered }) => {
  
  const getNodeIcon = (node: Node) => {
    if (node.id === 'ford_paradox') return <Ban size={24} />;
    if (node.id === 'resistance') return <Hammer size={24} />;
    if (node.id === 'institution_gap') return <Hourglass size={24} />;
    if (node.id === 'short_term') return <Activity size={24} />;

    switch (node.type) {
      case 'cause': return <Zap size={24} />;
      case 'effect': return <AlertTriangle size={24} />;
      case 'solution': return <Sprout size={24} />;
      case 'trap': return <Skull size={24} />;
      default: return <Info size={24} />;
    }
  };

  const getNodeColor = (node: Node) => {
    if (node.id === 'ford_paradox') return 'stroke-rose-500 fill-rose-900/20 text-rose-500';
    if (node.id === 'resistance') return 'stroke-orange-500 fill-orange-900/20 text-orange-500';

    switch (node.type) {
      case 'cause': return 'stroke-amber-400 fill-amber-900/20 text-amber-400';
      case 'effect': return 'stroke-rose-500 fill-rose-900/20 text-rose-500';
      case 'solution': return 'stroke-emerald-400 fill-emerald-900/20 text-emerald-400';
      case 'trap': return 'stroke-slate-500 fill-slate-800/50 text-slate-500';
      default: return 'stroke-cyan-400 fill-cyan-900/20 text-cyan-400';
    }
  };

  const colorClass = getNodeColor(node);
  const opacity = isRelated ? 1 : 0.2;
  const isDecisionNode = node.id === 'institution_gap';

  return (
    <g 
      onClick={() => onSelect(node)}
      onMouseEnter={() => setHovered(node.id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer group transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Halo Effect */}
      {isDecisionNode ? (
        <rect 
            x={node.x - (isSelected || isHovered ? 50 : 40)} 
            y={node.y - (isSelected || isHovered ? 50 : 40)} 
            width={(isSelected || isHovered ? 100 : 80)}
            height={(isSelected || isHovered ? 100 : 80)}
            className={`fill-current transition-all duration-700 ease-in-out ${colorClass.split(' ')[2]}`}
            style={{ 
                opacity: isSelected || isHovered ? 0.25 : 0.05,
                transformBox: 'fill-box', 
                transformOrigin: 'center',
                transform: 'rotate(45deg)'
            }} 
        />
      ) : (
        <circle 
            cx={node.x} cy={node.y} r={isSelected || isHovered ? 60 : 45}
            className={`fill-current transition-all duration-700 ease-in-out ${colorClass.split(' ')[2]}`}
            style={{ 
                opacity: isSelected || isHovered ? 0.25 : 0.05,
                transformBox: 'fill-box', 
                transformOrigin: 'center',
            }} 
        />
      )}
      
      {/* Core Node Shape */}
      {isDecisionNode ? (
         <rect
            x={node.x - 28}
            y={node.y - 28}
            width="56"
            height="56"
            className={`${colorClass} bg-slate-950 transition-all duration-300 ease-out ${isSelected || isHovered ? 'stroke-[3px]' : 'stroke-[1.5px]'} animate-pulse`}
            fill="#020617"
            transform={`rotate(45, ${node.x}, ${node.y})`}
            filter={isSelected || isHovered ? "url(#glow-node)" : ""}
        />
      ) : (
        <circle
            cx={node.x}
            cy={node.y}
            r="36"
            className={`${colorClass} bg-slate-950 transition-all duration-300 ease-out ${isSelected || isHovered ? 'stroke-[3px]' : 'stroke-[1.5px]'}`}
            fill="#020617"
            filter={isSelected || isHovered ? "url(#glow-node)" : ""}
        />
      )}
      
      {/* Icon */}
      <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24" className={`pointer-events-none ${colorClass.split(' ').pop()}`}>
         <div className="flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:scale-110">
           {getNodeIcon(node)}
         </div>
      </foreignObject>

      {/* Main Label */}
      <text
        x={node.x}
        y={node.y + 70}
        textAnchor="middle"
        className={`text-sm font-bold pointer-events-none transition-all duration-300 ${isSelected || isHovered ? 'fill-white' : 'fill-slate-300'}`}
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
};

export default LogicNode;
