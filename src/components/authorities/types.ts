export interface PerformanceStats {
  complaintsOverseen: number;
  resolutionRate: number; // e.g., 94 for 94%
  citizenSatisfaction: number; // e.g., 4.7
}

export interface AuthorityMember {
  id: string;
  name: string;
  role: string; // e.g., Chief Minister, Minister, Collector, MLA, Councillor, Department Head
  category: 'cm' | 'minister' | 'collector' | 'commissioner' | 'mla' | 'councillor' | 'dept_head';
  photo: string;
  email: string;
  phone: string;
  officeAddress: string;
  officeHours?: string;
  biography?: string;
  responsibilities?: string[];
  
  // Role-specific fields
  state?: string;
  district?: string;
  office?: string;
  yearsInOffice?: string;
  ministry?: string; // for ministers
  corporation?: string; // for municipal commissioners
  constituency?: string; // for MLAs
  wardNumber?: string; // for councillors
  department?: string; // for department heads
  departmentIconName?: string; // e.g. "Trash2", "Droplet", "Flame"
  
  performanceBadge?: string; // e.g. "Top Performer", "Highly Responsive"
  citizenRating?: number; // e.g. 4.8
  performance?: PerformanceStats; // for collector, commissioner, or dept heads
}

export interface DistrictData {
  id: string;
  name: string;
  collector: AuthorityMember;
  commissioner: AuthorityMember;
  mlas: AuthorityMember[];
  councillors: AuthorityMember[];
  deptHeads: AuthorityMember[];
  stats: {
    totalAuthorities: number;
    departments: number;
    wards: number;
    avgCitizenRating: number;
    overallResolutionRate: number;
  };
}

export interface StateData {
  id: string;
  name: string;
  cm: AuthorityMember;
  ministers: AuthorityMember[];
  districts: Record<string, DistrictData>;
}
