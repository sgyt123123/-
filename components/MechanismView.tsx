import React, { useState } from 'react';
import LogicMap from './mechanism/LogicMap';
import InfoPanel from './mechanism/InfoPanel';
import { Node } from '../types';
import { TRAP_LOGIC_MAP } from '../constants';

const MechanismView: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    // Helper to allow InfoPanel to drive navigation
    const handleNodeNavigation = (nodeId: string) => {
        const node = TRAP_LOGIC_MAP.nodes.find(n => n.id === nodeId);
        if (node) setSelectedNode(node);
    };

    return (
        <div className="flex w-full h-full relative animate-in fade-in duration-500 flex-col md:flex-row z-10">
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
                    <LogicMap onNodeSelect={setSelectedNode} selectedNodeId={selectedNode?.id || null} />
                </div>
            </div>
            {/* Responsive Sidebar */}
            <div className="h-[45%] md:h-full w-full md:w-[400px] xl:w-[500px] border-t md:border-t-0 md:border-l border-white/5 z-20 bg-[#020617] shrink-0 shadow-2xl transition-all duration-300">
                <InfoPanel selectedNode={selectedNode} onNavigate={handleNodeNavigation} />
            </div>
        </div>
    );
};

export default MechanismView;