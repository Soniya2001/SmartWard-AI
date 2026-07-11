import React from 'react';
import { X, Mail, Phone, MapPin, Clock, Award, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { AuthorityMember } from './types';

interface ProfileModalProps {
  member: AuthorityMember | null;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="profile-modal-container">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        id="profile-modal-backdrop"
      />

      {/* Modal content body */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl md3-shadow-xl border border-slate-200 p-6 sm:p-8 transition-all animate-in fade-in zoom-in-95 duration-200"
        id="profile-modal-body"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          aria-label="Close modal"
          id="profile-modal-close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
          <img
            src={member.photo}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-slate-50 object-cover shadow-md bg-slate-100"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-gov-blue uppercase bg-gov-blue/10 px-2.5 py-1 rounded-full">
                {member.role}
              </span>
              {member.performanceBadge && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {member.performanceBadge}
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-900 leading-tight">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {member.category === 'cm' || member.category === 'minister' 
                ? `${member.state} State Government` 
                : member.district 
                  ? `${member.district} District Administration`
                  : 'Local Civil Administration'
              }
            </p>
            {member.constituency && (
              <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded">
                Constituency: {member.constituency}
              </p>
            )}
            {member.wardNumber && (
              <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded">
                Representing {member.wardNumber}
              </p>
            )}
            {member.department && (
              <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded">
                Department: {member.department}
              </p>
            )}
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          
          {/* Left Column: Bio & Core Info */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Biography */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biography & Context</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {member.biography || `${member.name} serves with dedication in the municipal structure, executing key public policies and coordinating local administrative resources to resolve civic requests.`}
              </p>
            </div>

            {/* Responsibilities list if available */}
            {member.responsibilities && member.responsibilities.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Directives & Mandates</h4>
                <ul className="flex flex-col gap-2">
                  {member.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gov-blue shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Office Address, Hours, Contact, Performance */}
          <div className="md:col-span-5 flex flex-col gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            
            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 pb-1.5">Official Contacts</h4>
              
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <Mail className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <p className="font-semibold text-slate-800">Email Address</p>
                  <a href={`mailto:${member.email}`} className="text-gov-blue hover:underline break-all">
                    {member.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <Phone className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Direct Office Line</p>
                  <p className="font-mono text-slate-700">{member.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">HQ Office Location</p>
                  <p className="leading-tight text-slate-600">{member.officeAddress}</p>
                </div>
              </div>

              {member.officeHours && (
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Public Visiting Hours</p>
                    <p className="text-slate-600">{member.officeHours}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Performance Stats Dashboard (For officials with stats) */}
            {(member.performance || member.citizenRating !== undefined) && (
              <div className="flex flex-col gap-3 border-t border-slate-200/60 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1">Performance Index</h4>
                
                {member.performance && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Tickets Monitored</span>
                      <span className="font-mono font-bold text-sm text-slate-800">
                        {member.performance.complaintsOverseen.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-500">Resolution SLA</span>
                        <span className="font-mono font-bold text-sm text-emerald-600">
                          {member.performance.resolutionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${member.performance.resolutionRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Satisfaction Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                        <span className="font-mono font-bold text-sm text-slate-800">
                          {member.performance.citizenSatisfaction} / 5.0
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {member.citizenRating !== undefined && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500">Citizen Rating</span>
                      <p className="text-[10px] text-slate-400">Calculated from ward tickets</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/15">
                      <Star className="h-4 w-4 fill-amber-500 shrink-0" />
                      <span className="font-mono font-bold text-sm">
                        {member.citizenRating}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 mt-6 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            id="close-profile-modal-footer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
