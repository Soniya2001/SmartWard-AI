import React from 'react';
import { Shield, Sparkles, Cpu, Lock, Eye, CheckCircle2, Award, Landmark, Database } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const highlights = [
    { title: 'Sovereign Multi-Agent AI', desc: 'Custom trained models classify, validate and draft civic filings under 4 seconds without manual human oversight.', icon: Sparkles, color: 'text-ai-purple bg-ai-purple-light' },
    { title: 'Split-Collection Security', desc: 'Isolates citizen PII in secured, restricted database tables while presenting metadata on public transparency feeds.', icon: Lock, color: 'text-gov-blue bg-gov-blue-light' },
    { title: 'GIS Jurisdiction Mapping', desc: 'Polygons map exact GPS indicators against municipal boundary coordinates to routing tickets cleanly to corresponding ward directors.', icon: Database, color: 'text-teal-600 bg-emerald-50' },
  ];

  const standards = [
    { rule: '24-Hour Severity Resolution', detail: 'Critical public hazards require ward deployment and repair uploads under a strict 24-hour statutory SLA.' },
    { rule: 'Public Audit Ledger', detail: 'Every administrative decision block, routing shift, and citizen resolution poll is logged in a secure, immutable registry.' },
    { rule: 'Citizen Validation Poll', detail: 'A ticket cannot be closed solely by authorities; it requires a valid feedback token response from the reporting citizen.' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left" id="about-page-container">
      
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase bg-gov-blue-light text-gov-blue border border-gov-blue/20">
          <Award className="h-3.5 w-3.5" />
          <span>Mission and Architecture</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About SmartWard AI
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          SmartWard AI is a pioneering National Civic Infrastructure solution. Our mission is to bridge the gap between citizens and state departments, utilizing state-of-the-art vision models and automated workflow agents to create clean, responsive, and completely transparent cities.
        </p>
      </div>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 md3-shadow-sm space-y-4"
            >
              <div className={`p-3 rounded-xl inline-block ${item.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* SLA / Standards details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
        
        {/* Left column */}
        <div className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Platform SLA Mandates</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            SmartWard AI acts as a digital twin for municipal-scale civic grievances. Our platform enforces compliance metrics mapped to municipal and central laws, providing administrators with transparent performance tracking dashboards.
          </p>
          
          <div className="space-y-3.5 pt-2">
            {standards.map((std, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{std.rule}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{std.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: System Topology Diagram */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 md3-shadow-md space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Digital twin topology</h3>
          <p className="text-xs text-slate-400">Continuous classification of municipal telemetry.</p>
          
          <div className="space-y-3 font-mono text-[11px] font-bold text-slate-500">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-gov-blue">CITIZEN INPUT VECTORS</span>
              <span className="text-slate-400">Mobile Photo / Voice / GPS</span>
            </div>
            <div className="text-center text-slate-300">▼</div>
            <div className="p-3 bg-ai-purple-light text-ai-purple rounded-xl border border-ai-purple/10 flex items-center justify-between">
              <span>WARD AI DISPATCH ENGINE</span>
              <span className="text-[10px] bg-ai-purple text-white px-1.5 py-0.5 rounded uppercase">LLM Router</span>
            </div>
            <div className="text-center text-slate-300">▼</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700">GIS BOUNDARY INTERSECTS</span>
              <span className="text-slate-400">Jurisdiction Mapping</span>
            </div>
            <div className="text-center text-slate-300">▼</div>
            <div className="p-3 bg-success-light text-success rounded-xl border border-success/15 flex items-center justify-between">
              <span>ADMINISTRATIVE RESOLUTION</span>
              <span className="text-[10px] bg-success text-white px-1.5 py-0.5 rounded">Verified SLA</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
