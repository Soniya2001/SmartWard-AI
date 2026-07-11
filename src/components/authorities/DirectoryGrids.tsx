import React from 'react';
import { 
  Mail, Phone, MapPin, Star, Award, ChevronRight, Landmark, 
  Milestone, Sparkles, Droplet, Flame, Wrench, Trash2, 
  ShieldAlert, Flower2, HelpCircle 
} from 'lucide-react';
import { AuthorityMember } from './types';

// Helper to get department icons safely
const getDeptIcon = (name?: string) => {
  switch (name) {
    case 'Milestone': return Milestone;
    case 'Sparkles': return Sparkles;
    case 'Droplet': return Droplet;
    case 'Flame': return Flame;
    case 'Wrench': return Wrench;
    case 'Trash2': return Trash2;
    case 'ShieldAlert': return ShieldAlert;
    case 'Flower2': return Flower2;
    default: return HelpCircle;
  }
};

interface CardProps {
  member: AuthorityMember;
  onViewProfile: (member: AuthorityMember) => void;
}

/* ==========================================
   1. CHIEF MINISTER (PREMIUM HERO CARD)
   ========================================== */
export const CMHeroCard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 p-6 md3-shadow-md hover:border-gov-blue/40 transition-all group" id={`cm-hero-card-${member.id}`}>
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={member.photo}
          alt={member.name}
          referrerPolicy="no-referrer"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-slate-100 shadow-md object-cover bg-slate-200"
        />
        <div className="flex-1 text-center md:text-left flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-center md:justify-start mb-2">
              <span className="text-xs font-bold text-gov-blue bg-gov-blue/10 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase">
                <Landmark className="h-3.5 w-3.5" />
                State Executive Head
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-gov-blue transition-colors">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Chief Minister of {member.state}
            </p>
            <p className="text-sm text-slate-600 mt-3 max-w-xl line-clamp-2">
              {member.biography}
            </p>
          </div>
          
          <div className="mt-5 flex flex-wrap gap-4 justify-center md:justify-start items-center text-xs text-slate-500 font-medium">
            <span className="bg-slate-100 px-2.5 py-1 rounded-md">Years in Office: {member.yearsInOffice}</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md">Office: Secretariat</span>
            <button
              onClick={() => onViewProfile(member)}
              className="inline-flex items-center gap-1 text-gov-blue font-semibold hover:underline cursor-pointer ml-auto"
              id={`view-cm-profile-${member.id}`}
            >
              <span>View Profile &amp; Directives</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   2. CABINET MINISTERS
   ========================================== */
export const MinisterCard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md3-shadow-sm hover:md3-shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group" id={`minister-card-${member.id}`}>
      <div>
        <div className="flex items-start gap-4 mb-4">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full border border-slate-100 object-cover bg-slate-100"
          />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              {member.ministry} Portfolio
            </span>
            <h4 className="font-display font-bold text-slate-900 leading-tight group-hover:text-gov-blue transition-colors text-base">
              {member.name}
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{member.role}</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {member.biography}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-3 flex items-center justify-between mt-auto">
        <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
          {member.email}
        </span>
        <button
          onClick={() => onViewProfile(member)}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-gov-blue hover:underline cursor-pointer"
          id={`view-minister-profile-${member.id}`}
        >
          <span>View Profile</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   3. DISTRICT COLLECTOR & COMMISSIONER
   ========================================== */
export const ExecutiveFeatureCard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md3-shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group" id={`exec-card-${member.id}`}>
      <div>
        {/* Header Profile details */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover bg-slate-100"
          />
          <div className="text-left">
            <span className="text-[10px] font-bold text-ai-purple bg-ai-purple-light px-2 py-0.5 rounded-full uppercase tracking-wider">
              {member.category === 'collector' ? 'District Executive' : 'Municipal Executive'}
            </span>
            <h4 className="font-display font-bold text-slate-900 text-lg group-hover:text-ai-purple transition-colors mt-1.5 leading-tight">
              {member.name}
            </h4>
            <p className="text-xs font-medium text-slate-500 mt-1">{member.role}</p>
          </div>
        </div>

        {/* Contact details list */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-mono">{member.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{member.officeAddress}</span>
          </div>
        </div>

        {/* Performance Index preview */}
        {member.performance && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/80 mb-5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>SLA Performance Summary</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                {member.performance.resolutionRate}% Resolved
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tickets Managed</span>
                <span className="font-mono font-bold text-slate-800 text-base">
                  {member.performance.complaintsOverseen.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Citizen Thumbs</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-mono font-bold text-slate-800 text-sm">
                    {member.performance.citizenSatisfaction} / 5
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Details Footer */}
      <div className="border-t border-slate-100 pt-4 mt-auto flex justify-end">
        <button
          onClick={() => onViewProfile(member)}
          className="inline-flex items-center justify-center gap-1 w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-all"
          id={`view-exec-profile-${member.id}`}
        >
          <span>View Profile &amp; SLA Logs</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   4. MLA CARDS
   ========================================== */
export const MLACard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md3-shadow-sm hover:md3-shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group" id={`mla-card-${member.id}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Constituency: {member.constituency}
          </span>
          {member.performanceBadge && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {member.performanceBadge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3.5 my-4">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-13 h-13 rounded-full border border-slate-100 object-cover bg-slate-50"
          />
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm leading-tight group-hover:text-gov-blue transition-colors">
              {member.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">MLA Office, Assembly</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {member.biography}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between text-xs font-semibold text-gov-blue">
        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
          {member.phone}
        </span>
        <button
          onClick={() => onViewProfile(member)}
          className="hover:underline cursor-pointer inline-flex items-center gap-0.5"
          id={`view-mla-profile-${member.id}`}
        >
          <span>Constituency Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   5. WARD COUNCILLOR CARDS
   ========================================== */
export const CouncillorCard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md3-shadow-sm hover:md3-shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group" id={`councillor-card-${member.id}`}>
      <div>
        <div className="flex items-center justify-between border-b border-slate-50 pb-2.5 mb-3">
          <span className="text-xs font-bold text-gov-blue bg-gov-blue/5 px-2.5 py-0.5 rounded-full">
            {member.wardNumber}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-500" />
            <span className="font-mono font-bold text-xs">{member.citizenRating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full border border-slate-100 object-cover bg-slate-50"
          />
          <div>
            <h4 className="font-display font-semibold text-slate-900 text-sm leading-tight group-hover:text-gov-blue transition-colors">
              {member.name}
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Elected Ward Councillor</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {member.biography}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between text-xs">
        <span className="text-[10px] text-slate-400 font-mono">{member.phone}</span>
        <button
          onClick={() => onViewProfile(member)}
          className="text-gov-blue font-semibold hover:underline cursor-pointer inline-flex items-center gap-0.5"
          id={`view-councillor-profile-${member.id}`}
        >
          <span>View Ward Logs</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   6. DEPARTMENT HEADS CARDS
   ========================================== */
export const DepartmentHeadCard: React.FC<CardProps> = ({ member, onViewProfile }) => {
  const IconComponent = getDeptIcon(member.departmentIconName);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md3-shadow-sm hover:md3-shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group" id={`dept-head-card-${member.id}`}>
      <div>
        <div className="flex items-center justify-between border-b border-slate-50 pb-2.5 mb-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {member.department} Division
          </span>
          <div className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <IconComponent className="h-4 w-4 text-slate-600" />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full border border-slate-100 object-cover bg-slate-50"
          />
          <div>
            <h4 className="font-display font-semibold text-slate-900 text-sm leading-tight group-hover:text-gov-blue transition-colors">
              {member.name}
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Executive Field Engineer</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {member.biography}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between text-xs">
        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{member.email}</span>
        <button
          onClick={() => onViewProfile(member)}
          className="text-gov-blue font-semibold hover:underline cursor-pointer inline-flex items-center gap-0.5"
          id={`view-dept-head-profile-${member.id}`}
        >
          <span>View Department</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
