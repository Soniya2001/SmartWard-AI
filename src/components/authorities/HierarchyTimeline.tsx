import React from 'react';
import { Landmark, ShieldCheck, ChevronRight, UserCheck, ArrowDown, User, Network } from 'lucide-react';
import { StateData, DistrictData } from './types';

interface HierarchyTimelineProps {
  stateData: StateData | undefined;
  districtData: DistrictData | undefined;
  onNodeClick?: (category: 'cm' | 'minister' | 'collector' | 'commissioner') => void;
}

export const HierarchyTimeline: React.FC<HierarchyTimelineProps> = ({
  stateData,
  districtData,
  onNodeClick,
}) => {
  if (!stateData) return null;

  const cmName = stateData.cm.name;
  const collectorName = districtData?.collector.name || 'Not Selected';
  const commissionerName = districtData?.commissioner.name || 'Not Selected';
  const mlaCount = districtData?.mlas.length || 0;
  const councillorCount = districtData?.councillors.length || 0;
  const deptCount = districtData?.deptHeads.length || 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-brand-dark/95 text-white rounded-2xl p-6 md3-shadow-lg mb-8 border border-slate-800" id="governance-hierarchy-section">
      <div className="flex flex-col gap-5">
        
        {/* Title and Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gov-blue/20 border border-gov-blue/30 flex items-center justify-center text-gov-blue">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Administrative Governance Flow</h3>
              <p className="text-xs text-slate-400">Visual administrative relationship of authority channels in {stateData.name}</p>
            </div>
          </div>
          
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Interactive Hierarchy</span>
          </div>
        </div>

        {/* The visual flowchart */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch relative" id="hierarchy-flow-grid">
          
          {/* Node 1: State Executive (CM) */}
          <div 
            onClick={() => onNodeClick?.('cm')}
            className="group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:bg-white/10 hover:border-gov-blue/50 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold text-gov-blue tracking-wider uppercase">Level 1: State Head</span>
              <Landmark className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <h4 className="font-sans font-medium text-xs text-slate-400">Chief Minister</h4>
              <p className="font-display font-semibold text-sm text-white group-hover:text-gov-blue transition-colors mt-0.5">{cmName}</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-300">
              <span>View portfolio</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          {/* Connection 1 (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <ChevronRight className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex lg:hidden items-center justify-center py-1 text-slate-700">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* Node 2: Cabinet (Ministers) */}
          <div 
            onClick={() => onNodeClick?.('minister')}
            className="group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:bg-white/10 hover:border-gov-blue/50 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold text-gov-blue tracking-wider uppercase">Level 2: State Cabinet</span>
              <UserCheck className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <h4 className="font-sans font-medium text-xs text-slate-400">State Ministers</h4>
              <p className="font-display font-semibold text-sm text-white group-hover:text-gov-blue transition-colors mt-0.5">{stateData.ministers.length} Portfolio Heads</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-300">
              <span>View ministers list</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          {/* Connection 2 */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <ChevronRight className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex lg:hidden items-center justify-center py-1 text-slate-700">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* Node 3: District Head (Collector) */}
          <div 
            onClick={() => onNodeClick?.('collector')}
            className={`group relative flex flex-col justify-between border rounded-xl p-4 transition-all hover:bg-white/10 cursor-pointer ${
              districtData 
                ? 'bg-white/5 border-white/10 hover:border-gov-blue/50' 
                : 'bg-slate-900/50 border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold text-ai-purple tracking-wider uppercase">Level 3: District</span>
              <User className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <h4 className="font-sans font-medium text-xs text-slate-400">District Collector</h4>
              <p className="font-display font-semibold text-sm text-white group-hover:text-ai-purple transition-colors mt-0.5 truncate">{collectorName}</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-300">
              <span>View credentials</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          {/* Connection 3 */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <ChevronRight className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex lg:hidden items-center justify-center py-1 text-slate-700">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* Node 4: Municipal Head (Commissioner) */}
          <div 
            onClick={() => onNodeClick?.('commissioner')}
            className={`group relative flex flex-col justify-between border rounded-xl p-4 transition-all hover:bg-white/10 cursor-pointer ${
              districtData 
                ? 'bg-white/5 border-white/10 hover:border-gov-blue/50' 
                : 'bg-slate-900/50 border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold text-ai-purple tracking-wider uppercase">Level 4: Corporation</span>
              <Landmark className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <h4 className="font-sans font-medium text-xs text-slate-400">Municipal Commissioner</h4>
              <p className="font-display font-semibold text-sm text-white group-hover:text-ai-purple transition-colors mt-0.5 truncate">{commissionerName}</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-300">
              <span>View administration</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          {/* Connection 4 */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <ChevronRight className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex lg:hidden items-center justify-center py-1 text-slate-700">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* Node 5: Field execution (Local representation) */}
          <div 
            className={`relative flex flex-col justify-between border rounded-xl p-4 transition-all ${
              districtData 
                ? 'bg-white/5 border-white/10 hover:border-white/20' 
                : 'bg-slate-900/50 border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">Level 5: Grassroots</span>
              <Network className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <h4 className="font-sans font-medium text-xs text-slate-400">Constituency & Field</h4>
              <div className="flex flex-col gap-0.5 mt-1 font-display font-semibold text-[11px] text-white">
                <span className="text-amber-400">{mlaCount} MLAs</span>
                <span className="text-sky-400">{councillorCount} Councillors</span>
                <span className="text-emerald-400">{deptCount} Department Heads</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500">
              Direct public engagement nodes
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
