import React from 'react';

const ConceptCards: React.FC = () => {
  return (
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
  );
};

export default ConceptCards;