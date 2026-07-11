import React from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  FileSpreadsheet, Download, FileText, ChevronRight, CheckCircle2, 
  Clock, Shield, AlertCircle, Calendar 
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { currentRole, kpis } = useAuthority();

  const handleDownload = (format: string, reportName: string) => {
    alert(`Generating encrypted ${format} compilation file for "${reportName}"...\nSSL Secured sandbox connection established.\nSaved to device downloads folder successfully.`);
  };

  const reportsList = [
    { id: 'RPT-102', title: 'District-Wide Grievance Audit', desc: 'Consolidated report including individual sector resolution speeds and SLA index scores.', date: 'July 2026', size: '2.4 MB' },
    { id: 'RPT-103', title: 'AI Automation Dispatch Review', desc: 'Evaluation of computer vision accuracy rates and automated dispatch pipeline timers.', date: 'June 2026', size: '1.8 MB' },
    { id: 'RPT-104', title: 'Municipal Sanitation Truck SLA Logs', desc: 'GPS geo-tracking timestamp audit logs for solid waste management division vehicles.', date: 'May 2026', size: '4.1 MB' },
    { id: 'RPT-105', title: 'Citizen Post-Resolution Survey Summary', desc: 'Direct phone OTP & verified SMS feedback scores matching regional sectors.', date: 'April 2026', size: '1.2 MB' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {currentRole.roleName} Console &gt; Official Publications
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Government Compliance Reports
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Export verified audit files, state compliance summaries, and departmental SLA performance briefs.
            </p>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400">
            Encrypted Nic Mail Safe
          </div>
        </div>
      </div>

      {/* Main Reporting Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Side: Generated Files List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">Available Audit Records</h3>
          
          <div className="space-y-3">
            {reportsList.map((rpt) => (
              <div 
                key={rpt.id}
                className="bg-white p-4.5 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold text-slate-400">#{rpt.id}</span>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {rpt.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{rpt.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-normal">{rpt.desc}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-slate-400">{rpt.size}</span>
                  <button 
                    onClick={() => handleDownload('PDF', rpt.title)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                    title="Download encrypted PDF"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Compilation Hub */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between h-fit gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">Quick Compilation Hub</h3>
              <span className="text-[9px] font-bold font-mono text-gov-blue px-2 py-0.5 bg-gov-blue-light rounded">Active</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Compile and generate immediate real-time statistics covering the current administrative session.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/50 space-y-2.5 font-semibold text-[11px] text-slate-600">
              <div className="flex justify-between items-center">
                <span>Active Role:</span>
                <strong className="text-gov-blue font-mono uppercase">{currentRole.roleName}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>SLA Rate:</span>
                <strong className="text-success font-mono">94.8% SLA Met</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Speed:</span>
                <strong className="text-slate-800 font-mono">{kpis.avgSla}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Feedback Score:</span>
                <strong className="text-amber-500 font-mono">{kpis.satisfaction}</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => handleDownload('Excel / Spreadsheet', `${currentRole.roleName} Session Brief`)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="h-4.5 w-4.5" /> Compile Executive Sheet
          </button>
        </div>

      </div>

    </div>
  );
};
