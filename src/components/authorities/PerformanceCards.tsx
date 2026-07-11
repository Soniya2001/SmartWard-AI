import React from 'react';
import { Users, Award, Shield, CheckCircle, Percent, BarChart3, Star, Landmark } from 'lucide-react';
import { DistrictData } from './types';

interface PerformanceCardsProps {
  districtData: DistrictData | undefined;
}

export const PerformanceCards: React.FC<PerformanceCardsProps> = ({ districtData }) => {
  if (!districtData) return null;

  const { totalAuthorities, departments, wards, avgCitizenRating, overallResolutionRate } = districtData.stats;

  const statsList = [
    {
      id: 'total-auths',
      name: 'Total Administrative Nodes',
      value: totalAuthorities,
      description: 'Active public representatives & executive leaders',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'departments-count',
      name: 'Active Divisions',
      value: departments,
      description: 'Specialized civic service divisions',
      icon: Landmark,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'wards-count',
      name: 'Registered Municipal Wards',
      value: `${wards} Wards`,
      description: 'Decentralized local administrative segments',
      icon: Shield,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      id: 'citizen-rating',
      name: 'Avg Citizen Rating',
      value: `${avgCitizenRating} / 5.0`,
      description: 'Aggregated satisfaction across public dispatches',
      icon: Star,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'resolution-sla',
      name: 'Overall Resolution SLA',
      value: `${overallResolutionRate}%`,
      description: 'Average ticket resolution compliance rate',
      icon: CheckCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md3-shadow-sm mt-12" id="performance-dashboard-block">
      <div className="flex flex-col gap-5">
        
        {/* Header Title */}
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60">
          <BarChart3 className="h-5 w-5 text-slate-700" />
          <div>
            <h3 className="font-display font-bold text-slate-800 text-base">{districtData.name} Municipal Performance Index</h3>
            <p className="text-xs text-slate-500">Live operational transparency metrics updated daily from ward statistics</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statsList.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col justify-between transition-all hover:md3-shadow-md"
                id={`stat-card-${stat.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
                    {stat.name}
                  </span>
                  <div className={`h-8 w-8 rounded-lg ${stat.color} flex items-center justify-center border`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <p className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small footer footnote */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
          <span>SmartWard AI Auditing Protocol</span>
          <span>Last computed: Today (Realtime SLA)</span>
        </div>

      </div>
    </div>
  );
};
