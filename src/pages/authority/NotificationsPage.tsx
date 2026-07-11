import React from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  Bell, AlertCircle, ShieldCheck, Info, Sparkles, Trash2, CheckCheck 
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { currentRole } = useAuthority();

  const notifications = [
    { id: '1', title: 'High Priority Complaint Escalated', desc: 'Critical sewer failure reported on Bypass Hwy Ward 42 near bypass intersection. SLA response expires in 2 hrs.', time: '5 mins ago', type: 'critical', read: false },
    { id: '2', title: 'Complaint Assigned', desc: 'SLA priority code #SW-9742 assigned to PWD engineering desk.', time: '14 mins ago', type: 'info', read: false },
    { id: '3', title: 'Weekly Audit Dispatch', desc: 'State-wide citizen satisfaction rating scorecard published.', time: '1 hour ago', type: 'update', read: true },
    { id: '4', title: 'Reminder: PWD Review', desc: 'Pending road repairs verify checklist submission required before 17:00 IST.', time: '3 hours ago', type: 'warning', read: true },
    { id: '5', title: 'National NIC Server Migration complete', desc: 'Sovereign SSL handshake certificates successfully rotated for fiscal year 2026.', time: '1 day ago', type: 'update', read: true },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {currentRole.roleName} Console &gt; Notification Hub
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Administrative Notifications
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Live secure alerts, infrastructure escalations, and system update briefs transmitted via secure channels.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => alert('All alerts marked as read in system session.')}
              className="px-2.5 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1"
            >
              <CheckCheck className="h-3.5 w-3.5 text-slate-400" /> Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Lists of Alerts */}
      <div className="space-y-3.5 text-left">
        {notifications.map((notif) => {
          const isCritical = notif.type === 'critical';
          const isWarning = notif.type === 'warning';
          const isUpdate = notif.type === 'update';

          return (
            <div 
              key={notif.id}
              className={`p-4.5 rounded-xl border transition-all flex gap-4 ${
                notif.read ? 'bg-white border-slate-200/80' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              {/* Alert Left Icon */}
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                isCritical ? 'bg-danger-light text-danger' :
                isWarning ? 'bg-warning-light text-warning' :
                isUpdate ? 'bg-ai-purple-light/40 text-ai-purple' :
                'bg-gov-blue-light/30 text-gov-blue'
              }`}>
                {isCritical && <AlertCircle className="h-5 w-5 animate-pulse" />}
                {isWarning && <AlertCircle className="h-5 w-5" />}
                {isUpdate && <Sparkles className="h-5 w-5" />}
                {!isCritical && !isWarning && !isUpdate && <Info className="h-5 w-5" />}
              </div>

              {/* Alert Content */}
              <div className="space-y-1 flex-grow">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase tracking-wider font-mono ${
                      isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-slate-500'
                    }`}>
                      {notif.type} alert
                    </span>
                    {!notif.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-gov-blue" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{notif.time}</span>
                </div>
                
                <h4 className="text-sm font-bold text-slate-800 leading-snug">{notif.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{notif.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
