import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Landmark, AlertCircle, Sparkles, MapPin, Search, Star, ShieldAlert } from 'lucide-react';
import { DirectoryFilters } from '../components/authorities/DirectoryFilters';
import { HierarchyTimeline } from '../components/authorities/HierarchyTimeline';
import { ProfileModal } from '../components/authorities/ProfileModal';
import { PerformanceCards } from '../components/authorities/PerformanceCards';
import { DIRECTORY_DATA } from '../components/authorities/demoData';
import { AuthorityMember } from '../components/authorities/types';
import { 
  CMHeroCard, MinisterCard, ExecutiveFeatureCard, 
  MLACard, CouncillorCard, DepartmentHeadCard 
} from '../components/authorities/DirectoryGrids';

export const AuthoritiesPage: React.FC = () => {
  // Setup default active state & district for maximum visual appeal upon entering
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Madurai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<AuthorityMember | null>(null);
  
  // Showcase location banner state
  const [showLocationBanner, setShowLocationBanner] = useState<boolean>(false);

  // Cascading data retrieval
  const stateData = selectedState ? DIRECTORY_DATA[selectedState] : undefined;
  const districtData = (stateData && selectedDistrict) ? stateData.districts[selectedDistrict] : undefined;

  // Handle cascading triggers
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict(''); // reset district selection
    setSearchQuery('');
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSearchQuery('');
  };

  // Shortcut simulation for saved location
  const handleMyRepresentatives = () => {
    setSelectedState('Tamil Nadu');
    setSelectedDistrict('Madurai');
    setSearchQuery('');
    setShowLocationBanner(true);
    
    // Auto scroll down slightly to focus on representatives
    setTimeout(() => {
      const el = document.getElementById('representatives-start-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // Fade the banner out after 6 seconds automatically
    setTimeout(() => {
      setShowLocationBanner(false);
    }, 6000);
  };

  const handleClearFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSearchQuery('');
    setShowLocationBanner(false);
  };

  // Fast filling from the empty state
  const handleQuickSelectDemo = () => {
    setSelectedState('Tamil Nadu');
    setSelectedDistrict('Madurai');
  };

  // Hierarchy interactive clicks
  const handleHierarchyNodeClick = (category: 'cm' | 'minister' | 'collector' | 'commissioner') => {
    if (!stateData) return;
    
    if (category === 'cm') {
      setSelectedProfile(stateData.cm);
    } else if (category === 'collector' && districtData) {
      setSelectedProfile(districtData.collector);
    } else if (category === 'commissioner' && districtData) {
      setSelectedProfile(districtData.commissioner);
    } else {
      // scroll to ministerial or relevant grid section
      const el = document.getElementById(`section-${category}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Compile flat list of all members for global searching
  const allMembersList = useMemo(() => {
    if (!stateData) return [];
    
    const list: AuthorityMember[] = [];
    list.push(stateData.cm);
    stateData.ministers.forEach(m => list.push(m));
    
    if (districtData) {
      list.push(districtData.collector);
      list.push(districtData.commissioner);
      districtData.mlas.forEach(m => list.push(m));
      districtData.councillors.forEach(c => list.push(c));
      districtData.deptHeads.forEach(d => list.push(d));
    }
    
    return list;
  }, [stateData, districtData]);

  // Apply search query filters
  const searchedMembers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allMembersList.filter(m => {
      return (
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        (m.ministry && m.ministry.toLowerCase().includes(query)) ||
        (m.constituency && m.constituency.toLowerCase().includes(query)) ||
        (m.wardNumber && m.wardNumber.toLowerCase().includes(query)) ||
        (m.department && m.department.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, allMembersList]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 text-left" id="authorities-directory-page">
      
      {/* 1. Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gov-blue/10 text-gov-blue border border-gov-blue/20">
            <Users className="h-3.5 w-3.5 animate-pulse" />
            <span>Digital Administrative Directory</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Authorities Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl leading-normal">
            Explore the administrative hierarchy and public officials responsible for civic governance, sanitation, and infrastructure operations in your selected district.
          </p>
        </div>
      </div>

      {/* 2. Cascading Selectors & Search Filters */}
      <DirectoryFilters
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        searchQuery={searchQuery}
        onStateChange={handleStateChange}
        onDistrictChange={handleDistrictChange}
        onSearchChange={setSearchQuery}
        onMyRepresentativesClick={handleMyRepresentatives}
        onClearFilters={handleClearFilters}
      />

      {/* Location Simulation Alert Banner */}
      <AnimatePresence>
        {showLocationBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm font-medium"
            id="saved-location-banner"
          >
            <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="flex-1">
              <span className="font-bold">📍 Registered Ward Detected:</span> We have automatically synchronized your directory with your registered residence profile: <strong className="underline">Tamil Nadu, Madurai District (Ward 42)</strong>. Meet your local municipal leaders below!
            </div>
            <button 
              onClick={() => setShowLocationBanner(false)} 
              className="text-emerald-500 hover:text-emerald-800 text-xs font-bold font-mono px-2"
              id="dismiss-location-banner"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="representatives-start-anchor" />

      {/* 3. Empty State (If no State or District Selected) */}
      {!selectedState || !selectedDistrict ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-8"
          id="directory-empty-state"
        >
          <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-800">No Administration Selected</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-md">
            Please pick a State and District using the cascading selectors above to explore the administrative directory, ward councils, and public performance logs.
          </p>
          <button
            onClick={handleQuickSelectDemo}
            className="mt-6 px-6 py-2.5 bg-gov-blue text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gov-blue-dark transition-all shadow-md hover:scale-[1.02]"
            id="empty-state-quick-select"
          >
            Quick Select Madurai (Demo)
          </button>
        </motion.div>
      ) : (
        /* 4. Active Directory State */
        <div className="space-y-12">
          
          {/* A. Administrative Flow Chart */}
          <HierarchyTimeline 
            stateData={stateData}
            districtData={districtData}
            onNodeClick={handleHierarchyNodeClick}
          />

          {/* If there's an active global search query, display search results grid */}
          {searchQuery.trim() ? (
            <div className="space-y-6" id="search-results-wrapper">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-display font-bold text-slate-900 text-lg">
                  Search Results ({searchedMembers.length} found)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Showing matching officers across State and District portfolios.
                </p>
              </div>

              {searchedMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchedMembers.map((member) => (
                    <div key={member.id}>
                      {member.category === 'cm' && (
                        <CMHeroCard member={member} onViewProfile={setSelectedProfile} />
                      )}
                      {member.category === 'minister' && (
                        <MinisterCard member={member} onViewProfile={setSelectedProfile} />
                      )}
                      {(member.category === 'collector' || member.category === 'commissioner') && (
                        <ExecutiveFeatureCard member={member} onViewProfile={setSelectedProfile} />
                      )}
                      {member.category === 'mla' && (
                        <MLACard member={member} onViewProfile={setSelectedProfile} />
                      )}
                      {member.category === 'councillor' && (
                        <CouncillorCard member={member} onViewProfile={setSelectedProfile} />
                      )}
                      {member.category === 'dept_head' && (
                        <DepartmentHeadCard member={member} onViewProfile={setSelectedProfile} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-10 text-center text-slate-500 text-sm">
                  No personnel found matching &ldquo;{searchQuery}&rdquo;. Try another name or keyword.
                </div>
              )}
            </div>
          ) : (
            /* B. Structure Grids (When no active search query) */
            <div className="space-y-12">
              
              {/* B1. Chief Minister Portfolio */}
              {stateData && (
                <section className="space-y-4" id="section-cm">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <Landmark className="h-4.5 w-4.5 text-gov-blue" />
                      State Executive Chief
                    </h3>
                  </div>
                  <CMHeroCard member={stateData.cm} onViewProfile={setSelectedProfile} />
                </section>
              )}

              {/* B2. State Cabinet Ministers */}
              {stateData && stateData.ministers.length > 0 && (
                <section className="space-y-4" id="section-minister">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <Landmark className="h-4.5 w-4.5 text-gov-blue" />
                      State Cabinet Ministers
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stateData.ministers.map((m) => (
                      <MinisterCard key={m.id} member={m} onViewProfile={setSelectedProfile} />
                    ))}
                  </div>
                </section>
              )}

              {/* B3. Administrative Executives (Collector & Commissioner) */}
              {districtData && (
                <section className="space-y-4" id="section-executives">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-ai-purple" />
                      District Executive Leaders
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ExecutiveFeatureCard member={districtData.collector} onViewProfile={setSelectedProfile} />
                    <ExecutiveFeatureCard member={districtData.commissioner} onViewProfile={setSelectedProfile} />
                  </div>
                </section>
              )}

              {/* B4. Members of Legislative Assembly (MLAs) */}
              {districtData && districtData.mlas.length > 0 && (
                <section className="space-y-4" id="section-mlas">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <Users className="h-4.5 w-4.5 text-gov-blue" />
                      Legislative Representation (MLAs)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtData.mlas.map((mla) => (
                      <MLACard key={mla.id} member={mla} onViewProfile={setSelectedProfile} />
                    ))}
                  </div>
                </section>
              )}

              {/* B5. Elected Ward Councillors */}
              {districtData && districtData.councillors.length > 0 && (
                <section className="space-y-4" id="section-councillors">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <Users className="h-4.5 w-4.5 text-gov-blue" />
                      Ward Councillors
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {districtData.councillors.map((c) => (
                      <CouncillorCard key={c.id} member={c} onViewProfile={setSelectedProfile} />
                    ))}
                  </div>
                </section>
              )}

              {/* B6. Municipal Department Heads */}
              {districtData && districtData.deptHeads.length > 0 && (
                <section className="space-y-4" id="section-dept-heads">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <ShieldAlert className="h-4.5 w-4.5 text-gov-blue" />
                      Municipal Division Leads
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {districtData.deptHeads.map((d) => (
                      <DepartmentHeadCard key={d.id} member={d} onViewProfile={setSelectedProfile} />
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}

          {/* C. District Performance Accountability Metrics */}
          <PerformanceCards districtData={districtData} />

        </div>
      )}

      {/* 5. Profile Overlay Modal */}
      <ProfileModal 
        member={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />

    </div>
  );
};
