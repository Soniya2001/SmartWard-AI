import React from 'react';
import { Search, MapPin, Filter, RotateCcw } from 'lucide-react';
import { DIRECTORY_DATA } from './demoData';

interface DirectoryFiltersProps {
  selectedState: string;
  selectedDistrict: string;
  searchQuery: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onSearchChange: (query: string) => void;
  onMyRepresentativesClick: () => void;
  onClearFilters: () => void;
}

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  selectedState,
  selectedDistrict,
  searchQuery,
  onStateChange,
  onDistrictChange,
  onSearchChange,
  onMyRepresentativesClick,
  onClearFilters,
}) => {
  const statesList = Object.keys(DIRECTORY_DATA);
  const districtsList = selectedState
    ? Object.keys(DIRECTORY_DATA[selectedState]?.districts || {})
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md3-shadow-md mb-8 transition-all hover:border-slate-300" id="directory-filters-card">
      <div className="flex flex-col gap-5">
        
        {/* Row 1: Filters Title and "My Representatives" shortcut */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gov-blue" />
            <h2 className="font-display font-semibold text-slate-800 text-base">Select Jurisdiction</h2>
          </div>
          
          <button
            onClick={onMyRepresentativesClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gov-blue bg-gov-blue/5 hover:bg-gov-blue/10 border border-gov-blue/20 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            id="my-representatives-btn"
          >
            <MapPin className="h-4.5 w-4.5 text-gov-blue animate-pulse" />
            <span>📍 My Representatives</span>
          </button>
        </div>

        {/* Row 2: State and District Cascading selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* State Dropdown */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label htmlFor="state-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              State
            </label>
            <div className="relative">
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value)}
                className="w-full h-11 pl-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:border-gov-blue focus:bg-white focus:ring-1 focus:ring-gov-blue outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Select State</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* District Dropdown */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label htmlFor="district-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              District
            </label>
            <div className="relative">
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                disabled={!selectedState}
                className={`w-full h-11 pl-3 pr-10 rounded-xl border bg-slate-50 text-slate-800 text-sm font-medium focus:border-gov-blue focus:bg-white focus:ring-1 focus:ring-gov-blue outline-none transition-all appearance-none ${
                  selectedState ? 'cursor-pointer border-slate-200' : 'cursor-not-allowed border-slate-100 opacity-60'
                }`}
              >
                <option value="">Select District</option>
                {districtsList.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label htmlFor="directory-search" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Global Search
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="directory-search"
                type="text"
                placeholder="Search by name, role, ward..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium placeholder-slate-400 focus:border-gov-blue focus:bg-white focus:ring-1 focus:ring-gov-blue outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Selected badge and Clear Button */}
        {(selectedState || selectedDistrict || searchQuery) && (
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 mt-1">
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
              <span>Active filters:</span>
              {selectedState && (
                <span className="bg-gov-blue/10 text-gov-blue font-medium px-2.5 py-1 rounded-md">
                  State: {selectedState}
                </span>
              )}
              {selectedDistrict && (
                <span className="bg-ai-purple/10 text-ai-purple font-medium px-2.5 py-1 rounded-md">
                  District: {selectedDistrict}
                </span>
              )}
              {searchQuery && (
                <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
                  Query: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>
            
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
              id="clear-filters-btn"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
