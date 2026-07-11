export interface MockComplaint {
  id: string;
  category: string;
  title: string;
  location: string;
  slaDays: number;
  status: 'pending' | 'active' | 'resolved' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: string;
  description: string;
  citizenName: string;
  preferredLanguage: string;
  contact: string;
  images: string[];
  assignedTo?: string;
  ward: string;
}

export interface MaterialInventoryItem {
  item: string;
  level: string;
  status: 'Optimal' | 'Low Stock' | 'Critical';
  pct: number;
  color: string;
}

export interface CrewSquad {
  name: string;
  leader: string;
  strength: number;
  status: string;
}

export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  contact: string;
  email: string;
  experience: string;
  tasks: string[];
}

export interface DepartmentData {
  title: string;
  subtitle: string;
  categories: string[];
  complaints: MockComplaint[];
  materials: MaterialInventoryItem[];
  crew: CrewSquad[];
  staff: StaffProfile[];
  recommendations: string[];
  reportTitle: string;
  verificationTarget: string;
}

export function getDepartmentData(department: string): DepartmentData {
  switch (department) {
    case 'Roads Department':
      return {
        title: "Road Maintenance Console",
        subtitle: "Operations-heavy engineering terminal. Review assigned service tickets, manage materials stocks, dispatch road crews, and perform photographic AI verification audits.",
        categories: ["All", "Potholes", "Road Damage", "Broken Pavements", "Road Barricades"],
        reportTitle: "Road Infrastructure & Pavement Maintenance Report",
        verificationTarget: "pothole depth clearance, asphalt leveling, and joint sealing",
        recommendations: [
          "Deploy pothole repair crew to Melur Road corridor immediately to restore vehicular flow.",
          "Order 5.5 Tons of hot mix asphalt stock from central PWD depot.",
          "Initiate temporary traffic diversion on Kamarajar Street for major asphalt subsidence repair."
        ],
        materials: [
          { item: 'Asphalt / Tar Stock', level: '24.5 Tons', status: 'Optimal', pct: 82, color: 'bg-emerald-500' },
          { item: 'Sub-base Gravel Mix', level: '15.0 Tons', status: 'Optimal', pct: 60, color: 'bg-emerald-500' },
          { item: 'Retroreflective Signs', level: '5 Units', status: 'Low Stock', pct: 15, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'Squad A (Road Repair)', leader: 'Supervisor Kumar', strength: 8, status: 'Active (Melur Rd)' },
          { name: 'Squad B (Pavement Patch)', leader: 'Supervisor Selvam', strength: 5, status: 'Active (School Lane)' },
          { name: 'Squad C (Signage Crew)', leader: 'Supervisor Mani', strength: 3, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-R1', name: 'Kumar Swamy', role: 'Civil Engineer', contact: '+91 91500 48201', email: 'kumar.swamy@smartward.in', experience: '10 Years', tasks: ['#RD-1044: Earth stabilization check'] },
          { id: 'ST-R2', name: 'Ramesh Selvan', role: 'Asphalt Crew Lead', contact: '+91 94441 55021', email: 'ramesh.s@smartward.in', experience: '6 Years', tasks: ['#RD-1022: Concrete paving tiling'] },
          { id: 'ST-R3', name: 'M. Ganesan', role: 'Road Inspector', contact: '+91 98402 77412', email: 'ganesan.m@smartward.in', experience: '4 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'RD-1011',
            category: 'Potholes',
            title: 'Severe potholes on Melur Road main artery',
            location: 'Melur Road Highway Crossing, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '5 mins ago',
            description: 'A series of 4 deep potholes are causing vehicles to swerve dangerously into oncoming lanes. Requires immediate cold asphalt mix treatment.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'RD-1022',
            category: 'Broken Pavements',
            title: 'Broken concrete pavements near primary school',
            location: 'Ward 42 Central School Lane',
            slaDays: 3,
            status: 'active',
            severity: 'critical',
            reportedAt: '2 hrs ago',
            description: 'The pedestrian concrete tiles have buckled and cracked, exposing metal mesh underneath. A child has already tripped here.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'Ramesh Selvan',
            ward: '42'
          },
          {
            id: 'RD-1033',
            category: 'Road Barricades',
            title: 'Unmarked construction barricade blocking blind turn',
            location: 'East Colony Bypass Turn, Ward 42',
            slaDays: 1,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '6 hrs ago',
            description: 'Construction crew left barricades without retroreflective tape on a dark turn, presenting a high risk for motorists.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'M. Ganesan',
            ward: '42'
          },
          {
            id: 'RD-1044',
            category: 'Road Damage',
            title: 'Major asphalt depression from underground conduit collapse',
            location: 'Kamarajar Street, Ward 42',
            slaDays: 5,
            status: 'active',
            severity: 'high',
            reportedAt: '1 day ago',
            description: 'Sub-surface earth settlement has created a massive 3-inch depression in the asphalt across both lanes.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'Kumar Swamy',
            ward: '42'
          }
        ]
      };

    case 'Water Supply':
      return {
        title: "Water Distribution Console",
        subtitle: "Operations-heavy engineering terminal. Monitor storage reservoirs, coordinate valve leakage dispatch, and audit chlorine levels in pipelines.",
        categories: ["All", "Pipe Leakage", "Water Shortage", "Low Pressure", "Contaminated Water"],
        reportTitle: "Water Resource Management & Utility Report",
        verificationTarget: "pipe joint welding, pressure seal stability, and water clarity",
        recommendations: [
          "High-volume water leakage detected near Sector 4 corridor. Emergency seal recommended.",
          "Emergency shut-off valve inspection required on main distribution grid.",
          "Replace corroded pipe segments along Madurai North residential grid to cure muddy supply."
        ],
        materials: [
          { item: 'Chlorine Treatment Pack', level: '120 Cases', status: 'Optimal', pct: 90, color: 'bg-emerald-500' },
          { item: 'Concrete Sewer Pipes', level: '18 Units', status: 'Optimal', pct: 80, color: 'bg-emerald-500' },
          { item: 'Solenoid Valves', level: '2 Units', status: 'Low Stock', pct: 20, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'Leakage Response Team A', leader: 'Supervisor Kumar', strength: 6, status: 'Active (Sector 4)' },
          { name: 'Reservoir Pressure Guard', leader: 'Supervisor Selvam', strength: 4, status: 'Active (North Colony)' },
          { name: 'Contamination Trace Unit', leader: 'Supervisor Mani', strength: 2, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-W1', name: 'Suresh Gopalan', role: 'Water Engineer', contact: '+91 94440 22019', email: 'suresh.g@smartward.in', experience: '8 Years', tasks: ['#WT-9842: Bypass tracer check'] },
          { id: 'ST-W2', name: 'M. Kartikeyan', role: 'Valve Inspector', contact: '+91 98412 88410', email: 'kartik.m@smartward.in', experience: '5 Years', tasks: ['#WT-1102: Bleeding valve lock'] },
          { id: 'ST-W3', name: 'A. Selvaraj', role: 'Pipe Technician', contact: '+91 97890 12345', email: 'selvaraj.a@smartward.in', experience: '12 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'WT-3301',
            category: 'Pipe Leakage',
            title: 'Main distribution bypass valve leak wasting high volume',
            location: 'SWM Sector 4 Corridor, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '10 mins ago',
            description: 'The main bypass valve at SWM Sector 4 Corridor is suffering from high-pressure seal erosion. Clean potable water is rushing into the stormwater channel.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'WT-9842',
            category: 'Contaminated Water',
            title: 'Contaminated muddy water supply in residential block',
            location: 'Bypass Road, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '1 hr ago',
            description: 'The tap water running in block B is brown, emits a foul sulfur smell, and has suspended clay particles. This might indicate sewer seepage.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'Suresh Gopalan',
            ward: '42'
          },
          {
            id: 'WT-4210',
            category: 'Pipe Leakage',
            title: 'Water main fracture causing neighborhood flooding',
            location: 'West Street Main Crossing, Ward 42',
            slaDays: 3,
            status: 'resolved',
            severity: 'high',
            reportedAt: '4 hrs ago',
            description: 'A 6-inch sub-surface distribution pipe cracked near the West Street Crossing, causing asphalt erosion and flooding. Supply suspended.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'M. Kartikeyan',
            ward: '42'
          },
          {
            id: 'WT-1102',
            category: 'Low Pressure',
            title: 'Complete pressure drop in overhead reservoir tanks',
            location: 'Madurai North Colony, Ward 42',
            slaDays: 5,
            status: 'active',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'The local overhead reservoir is unable to pump water to high altitude residential blocks due to air locks in secondary pressure valves.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1621293954908-907141467fc7?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'A. Selvaraj',
            ward: '42'
          }
        ]
      };

    case 'Sanitation':
      return {
        title: "Sanitation & Hygiene Console",
        subtitle: "Operations-heavy engineering terminal. Plan micro-sweeps, assign community toilet deep cleans, and coordinate high-volume market clearances.",
        categories: ["All", "Garbage", "Waste Collection", "Public Toilets", "Cleaning"],
        reportTitle: "Sanitation Operations & Ward Hygiene Audit Report",
        verificationTarget: "garbage removal proof, public restroom sanitization, and gutter sweeping",
        recommendations: [
          "Deploy biological deep cleaning crew to Bus Stand comfort complex immediately.",
          "Optimize door-to-door SWM truck routes for dry waste coverage in Block C.",
          "Install heavy commercial trash bins near vegetable market gates to prevent litter overflow."
        ],
        materials: [
          { item: 'Industrial Bleaching Powder', level: '45 Bags', status: 'Optimal', pct: 75, color: 'bg-emerald-500' },
          { item: 'Deodorizing Enzyme Sprays', level: '12 Cans', status: 'Optimal', pct: 60, color: 'bg-emerald-500' },
          { item: 'Heavy Duty Bin Liners', level: '2 Rolls', status: 'Low Stock', pct: 10, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'Commercial Waste Sweep Team', leader: 'Supervisor Kumar', strength: 12, status: 'Active (Anna Nagar)' },
          { name: 'Public Sanitation Crew', leader: 'Supervisor Selvam', strength: 8, status: 'Active (Bus Stand)' },
          { name: 'Street Sweeper Unit', leader: 'Supervisor Mani', strength: 6, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-S1', name: 'T. Ganesan', role: 'Sanitation Inspector', contact: '+91 94551 10294', email: 'ganesan.s@smartward.in', experience: '9 Years', tasks: ['#SN-2032: Restroom deep cleaning audit'] },
          { id: 'ST-S2', name: 'K. Nagarajan', role: 'Sanitation Squad Lead', contact: '+91 98311 00291', email: 'nagarajan.k@smartward.in', experience: '6 Years', tasks: ['#SN-2022: Waste vehicle reroute'] },
          { id: 'ST-S3', name: 'M. Thangavel', role: 'Sanitation Worker', contact: '+91 91224 55190', email: 'thangavel.m@smartward.in', experience: '3 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'SN-2011',
            category: 'Garbage',
            title: 'Overfilled municipal garbage bin attracting pests',
            location: 'Anna Nagar Commercial Street, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '15 mins ago',
            description: 'The large secondary trash collection bin has not been cleared for 3 days. Rubbish has spilled into the street, causing foul smell and stray animal menace.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'SN-2022',
            category: 'Waste Collection',
            title: 'Incomplete door-to-door dry waste collection sweep',
            location: 'Block C Residential colony, Ward 42',
            slaDays: 3,
            status: 'active',
            severity: 'medium',
            reportedAt: '3 hrs ago',
            description: 'Sanitation vehicle missed Block C entirely this week. Dry recyclable plastic bags are piling up in front of gates.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'K. Nagarajan',
            ward: '42'
          },
          {
            id: 'SN-2032',
            category: 'Public Toilets',
            title: 'Clogged and unusable public toilet complex',
            location: 'Bus Stand Public Comfort Station, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '5 hrs ago',
            description: '3 of the 4 stalls in the public rest area are fully clogged, water supply line is broken, presenting extreme biological risk.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'T. Ganesan',
            ward: '42'
          },
          {
            id: 'SN-2042',
            category: 'Cleaning',
            title: 'Foul odour and accumulated debris in market lane',
            location: 'Nehru Daily Vegetable Market, Ward 42',
            slaDays: 4,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'Decomposing organic matter from vegetable vendors has pooled on the market walkway. Requires high-pressure sweeping.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'M. Thangavel',
            ward: '42'
          }
        ]
      };

    case 'Electrical':
      return {
        title: "Electrical Operations Console",
        subtitle: "Operations-heavy engineering terminal. Track substation loads, coordinate grid transformer fixes, and execute high-voltage security checks.",
        categories: ["All", "Street Lights", "Transformers", "Power Poles", "Electric Hazards"],
        reportTitle: "Electrical Power Grid & Substation Maintenance Report",
        verificationTarget: "transformer installation safety, cable insulation, and phase box calibration",
        recommendations: [
          "Dispatch emergency hazard isolation team to Gandhi Bazaar waterlogging.",
          "Schedule immediate cooling oil replacement for Housing Board transformer.",
          "Conduct insulation resistance audit across secondary distribution feeders."
        ],
        materials: [
          { item: 'Insulated Copper Wire', level: '350 Meters', status: 'Optimal', pct: 85, color: 'bg-emerald-500' },
          { item: 'Transformer Coolant Oil', level: '180 Liters', status: 'Optimal', pct: 72, color: 'bg-emerald-500' },
          { item: 'High-Voltage Ceramic Fuses', level: '3 Units', status: 'Low Stock', pct: 15, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'HV Emergency Squad', leader: 'Supervisor Kumar', strength: 4, status: 'Active (Gandhi Bazaar)' },
          { name: 'Substation Maintenance Unit', leader: 'Supervisor Selvam', strength: 3, status: 'Active (Housing Board)' },
          { name: 'Streetlighting Grid Squad', leader: 'Supervisor Mani', strength: 2, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-E1', name: 'V. Karuppasamy', role: 'Electrical Safety Inspector', contact: '+91 94812 00192', email: 'karuppa.e@smartward.in', experience: '11 Years', tasks: ['#EL-3032: Exposed cable hazard isolation'] },
          { id: 'ST-E2', name: 'R. Chidambaram', role: 'Sub-station Electrician', contact: '+91 98403 99281', email: 'chidambaram.r@smartward.in', experience: '7 Years', tasks: ['#EL-3022: Pole support brace fitting'] },
          { id: 'ST-E3', name: 'K. Subramani', role: 'Line Inspector', contact: '+91 91760 33410', email: 'subramani.k@smartward.in', experience: '4 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'EL-3011',
            category: 'Transformers',
            title: 'Sparking distribution transformer near residential gate',
            location: 'Housing Board Gate 2, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'critical',
            reportedAt: '8 mins ago',
            description: 'Local transformer is emitting loud buzzing and high-voltage sparks during peak hours. High fire hazard risk during rainfall.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'EL-3022',
            category: 'Power Poles',
            title: 'Damaged power pole leaning over public walkway',
            location: 'South Colony Lane 4, Ward 42',
            slaDays: 3,
            status: 'active',
            severity: 'high',
            reportedAt: '2 hrs ago',
            description: 'A truck backed into the concrete power support pole. It is visibly fractured at the base and leaning at a 30-degree angle.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'R. Chidambaram',
            ward: '42'
          },
          {
            id: 'EL-3032',
            category: 'Electric Hazards',
            title: 'Exposed live high-voltage cables in waterlogged street',
            location: 'Gandhi Bazaar Cross Road, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '4 hrs ago',
            description: 'A contractor cut an underground feeder line. Live copper wires are sitting directly in rainwater puddles on a busy retail street.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'V. Karuppasamy',
            ward: '42'
          },
          {
            id: 'EL-3042',
            category: 'Street Lights',
            title: 'Dark zone caused by cable short circuit',
            location: 'Lakeview Walkway North, Ward 42',
            slaDays: 4,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'Sub-surface cable short cut out power to 15 lamps along the jogging track.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'K. Subramani',
            ward: '42'
          }
        ]
      };

    case 'Drainage & Storm Water':
      return {
        title: "Drainage & Stormwater Console",
        subtitle: "Operations-heavy engineering terminal. Dispatch high-pressure sewer jetting vacuum units, desilt stormwater intake channels, and execute pre-monsoon flow audits.",
        categories: ["All", "Blocked Drains", "Flooding", "Stormwater", "Sewage Overflow"],
        reportTitle: "Drainage Pipeline Flow & Sewerage Health Assessment Report",
        verificationTarget: "sewer vacuum truck clearance, culvert pipe unblocking, and manhole lid casting",
        recommendations: [
          "Dispatch high-pressure sewer jetting vacuum truck to Kamarajar manhole bypass.",
          "Desilt stormwater intakes along Melur Road highway before expected heavy showers.",
          "Initiate trenchless pipe lining on the damaged sewer main at Street 9 corridor."
        ],
        materials: [
          { item: 'Concrete Pipe Couplings', level: '25 Units', status: 'Optimal', pct: 80, color: 'bg-emerald-500' },
          { item: 'Sewer Jetting Fluid', level: '90 Liters', status: 'Optimal', pct: 60, color: 'bg-emerald-500' },
          { item: 'Cast Iron Manhole Lids', level: '1 Unit', status: 'Low Stock', pct: 10, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'High-Pressure Jetting Squad', leader: 'Supervisor Kumar', strength: 6, status: 'Active (Kamarajar)' },
          { name: 'Stormwater Clearing Squad', leader: 'Supervisor Selvam', strength: 5, status: 'Active (Melur Rd)' },
          { name: 'Subsurface Pipeline Repair Unit', leader: 'Supervisor Mani', strength: 4, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-D1', name: 'G. Murugesan', role: 'Drainage Inspector', contact: '+91 94501 22910', email: 'murugesan.g@smartward.in', experience: '10 Years', tasks: ['#DR-4022: Manhole vacuum truck dispatch'] },
          { id: 'ST-D2', name: 'S. Kaliappan', role: 'Sewer Inspector', contact: '+91 98404 88310', email: 'kaliappan.s@smartward.in', experience: '8 Years', tasks: ['#DR-4042: Ground-penetrating radar trace'] },
          { id: 'ST-D3', name: 'P. Veeramani', role: 'Drainage Specialist', contact: '+91 91761 00291', email: 'veeramani.p@smartward.in', experience: '5 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'DR-4011',
            category: 'Stormwater',
            title: 'Silt and plastic choking stormwater intake channel',
            location: 'Melur Road Highway Intake, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '12 mins ago',
            description: 'Heavy siltation and plastic bag blockage have clogged the primary intake grate. Water is ponding on the bypass road.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'DR-4022',
            category: 'Sewage Overflow',
            title: 'Raw sewage bubbling out of residential manhole chamber',
            location: 'Kamarajar Cross, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '2 hrs ago',
            description: 'Manhole chamber has backed up completely. Black raw sewage is flooding domestic driveways and emitting toxic gas.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'G. Murugesan',
            ward: '42'
          },
          {
            id: 'DR-4032',
            category: 'Blocked Drains',
            title: 'Blocked drainage culvert causing market floods',
            location: 'Market Bazaar South Gate, Ward 42',
            slaDays: 3,
            status: 'resolved',
            severity: 'high',
            reportedAt: '5 hrs ago',
            description: 'Debris from food vendors has lodged inside the 3-foot culvert pipeline, blocking water discharge.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'P. Veeramani',
            ward: '42'
          },
          {
            id: 'DR-4042',
            category: 'Sewage Overflow',
            title: 'Sub-surface sewer main crack eroding road base',
            location: 'Anna Nagar Street 9, Ward 42',
            slaDays: 5,
            status: 'active',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'A hairline crack in the concrete sewage line is slowly leaching liquid into the sub-base earth, causing structural soil voids.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'S. Kaliappan',
            ward: '42'
          }
        ]
      };

    case 'Solid Waste Management':
      return {
        title: "SWM Logistics Console",
        subtitle: "Operations-heavy engineering terminal. Audit micro-compost yards, manage high-density compactor assets, and coordinate rubble sweeping squads.",
        categories: ["All", "Garbage Pile", "Compactor Fault", "Bio-Medical Waste", "Littering"],
        reportTitle: "Solid Waste Logistics & Composting Recovery Performance Report",
        verificationTarget: "industrial site debris clearance, bio-disinfection, and hydraulic line repair",
        recommendations: [
          "Deploy biohazard containment crew to South Colony hospital lane bin immediately.",
          "Reroute waste logistics tipper trucks to central composting yard while Compactor 3 is under repair.",
          "Install high-resolution night cameras near Melur corridor to catch illegal commercial dumpers."
        ],
        materials: [
          { item: 'SWM Heavy Duty Liners', level: '1500 Bags', status: 'Optimal', pct: 88, color: 'bg-emerald-500' },
          { item: 'Bio-Disinfectant Dust', level: '60 Bags', status: 'Optimal', pct: 66, color: 'bg-emerald-500' },
          { item: 'Hydraulic Oil H-46', level: '40 Liters', status: 'Low Stock', pct: 20, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'Debris Clearing Squad', leader: 'Supervisor Kumar', strength: 8, status: 'Active (Melur Corridor)' },
          { name: 'Compactor Repair Team', leader: 'Supervisor Selvam', strength: 4, status: 'Active (SWM Facility)' },
          { name: 'Special Biohazard Patrol', leader: 'Supervisor Mani', strength: 2, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-M1', name: 'L. Arumugam', role: 'SWM Fleet Engineer', contact: '+91 94442 88192', email: 'arumugam.l@smartward.in', experience: '12 Years', tasks: ['#SW-5022: Compactor hydraulic hose replacement'] },
          { id: 'ST-M2', name: 'V. Palanisamy', role: 'Hazmat Waste Supervisor', contact: '+91 98405 77109', email: 'palanisamy.v@smartward.in', experience: '8 Years', tasks: ['#SW-5032: Hospital lane hazard isolation'] },
          { id: 'ST-M3', name: 'T. Rajkumar', role: 'SWM Area Inspector', contact: '+91 91503 11928', email: 'rajkumar.t@smartward.in', experience: '5 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'SW-5011',
            category: 'Garbage Pile',
            title: 'Illegal dumping of hazardous construction debris',
            location: 'Melur Road Corridor, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '18 mins ago',
            description: 'A tipper truck has illegally dumped several tons of concrete debris and brick rubble directly on the public corridor lane.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'SW-5022',
            category: 'Compactor Fault',
            title: 'Commercial hydraulic compactor station mechanical fault',
            location: 'Central Ward SWM Facility, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '1 hr ago',
            description: 'Hydraulic fluid line ruptured on Compactor Unit 3. The station is unable to pack incoming municipal waste, causing trucks to stall.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'L. Arumugam',
            ward: '42'
          },
          {
            id: 'SW-5032',
            category: 'Bio-Medical Waste',
            title: 'Discarded expired clinical waste in municipal bins',
            location: 'South Colony Hospital Lane, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '3 hrs ago',
            description: 'Unidentified clinic discarded bags of used syringes and expired vials into public household bins. Major biohazard risk.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'V. Palanisamy',
            ward: '42'
          },
          {
            id: 'SW-5042',
            category: 'Garbage Pile',
            title: 'Regular trash backlog in high-density shopping area',
            location: 'Kamarajar Retail Corridor, Ward 42',
            slaDays: 4,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'Festival shopping crowd generated 3x normal trash volume. Additional sweepers deployed.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'T. Rajkumar',
            ward: '42'
          }
        ]
      };

    case 'Street Lighting':
      return {
        title: "Street Lighting Grid Console",
        subtitle: "Operations-heavy engineering terminal. Audit astronomical timers, replace photoelectric sensors, and eliminate grid dark-zones.",
        categories: ["All", "Flickering Lights", "Dark Zones", "Cable Short", "Pole Damage"],
        reportTitle: "Street Lighting Electrical Grid & Lamp Replacement Performance Report",
        verificationTarget: "timer sensor calibration, pole verticality, and bulb lumen verification",
        recommendations: [
          "Send emergency subsurface cable trace specialist to Kamarajar Street grid box.",
          "Replace daylight sensor photodiode at Bye-Pass road astronomical timer box.",
          "Proactively reinforce steel base sleeves around North Playground rusted poles."
        ],
        materials: [
          { item: '90W LED Lamp Heads', level: '45 Units', status: 'Optimal', pct: 90, color: 'bg-emerald-500' },
          { item: 'Astronomical Timers', level: '8 Units', status: 'Optimal', pct: 80, color: 'bg-emerald-500' },
          { item: 'Phase Breaker Boxes', level: '1 Unit', status: 'Low Stock', pct: 10, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'High-Mast Repair Squad', leader: 'Supervisor Kumar', strength: 3, status: 'Active (Roundabout)' },
          { name: 'Underground Cable Patch', leader: 'Supervisor Selvam', strength: 4, status: 'Active (Kamarajar)' },
          { name: 'Pole Structural Weld Unit', leader: 'Supervisor Mani', strength: 2, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-L1', name: 'A. Pandian', role: 'Sub-surface Cable Engineer', contact: '+91 94443 11029', email: 'pandian.a@smartward.in', experience: '14 Years', tasks: ['#SL-6022: Cable locator and phase box test'] },
          { id: 'ST-L2', name: 'M. Elangovan', role: 'Grid Electrician', contact: '+91 98406 88201', email: 'elan.m@smartward.in', experience: '6 Years', tasks: ['#SL-6042: Pole base welding support'] },
          { id: 'ST-L3', name: 'S. Dharmaraj', role: 'Lighting Line Inspector', contact: '+91 91504 22910', email: 'dharmaraj.s@smartward.in', experience: '3 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'SL-6011',
            category: 'Dark Zones',
            title: 'Series of 8 non-functioning streetlights creating dark zone',
            location: 'Bye-Pass Road High-Speed Stretch, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '14 mins ago',
            description: 'A sequence of 8 high-sodium lamps has gone completely dark. Visually inspected, no bulb filament damage, indicating automatic timer switch failure.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'SL-6022',
            category: 'Cable Short',
            title: 'Subsurface power cable insulation short circuit',
            location: 'Kamarajar Street Lane 2, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'critical',
            reportedAt: '2 hrs ago',
            description: 'An underground utility short has tripped the phase breaker box, cutting off entire street light grid power. Residents report smoke near grid box.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'A. Pandian',
            ward: '42'
          },
          {
            id: 'SL-6032',
            category: 'Flickering Lights',
            title: 'Flickering high-mast light causing motorist distraction',
            location: 'Central Roundabout, Ward 42',
            slaDays: 2,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '6 hrs ago',
            description: 'The 500W LED high-mast is strobe-flashing rapidly, distracting drivers on the state highway.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'S. Dharmaraj',
            ward: '42'
          },
          {
            id: 'SL-6042',
            category: 'Pole Damage',
            title: 'Rusty pole base rusted through with falling hazard',
            location: 'North Colony Playground, Ward 42',
            slaDays: 5,
            status: 'active',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'Ground level moisture has severely rusted the bottom plate. The 15-foot metal pole is shaking during winds.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'M. Elangovan',
            ward: '42'
          }
        ]
      };

    case 'Parks & Public Spaces':
      return {
        title: "Parks & Urban Spaces Console",
        subtitle: "Operations-heavy engineering terminal. Audit children play equipments, coordinate canopy trimming, and supervise walking-track masonry works.",
        categories: ["All", "Tree Falling", "Playground Damage", "Pathway Damage", "Vandalism"],
        reportTitle: "Urban Tree Canopy & Recreational Facility Health Audit Report",
        verificationTarget: "tree branch trimming, open-gym equipment base cementing, and paver leveling",
        recommendations: [
          "Dispatch tree pruning crew with high-reach hydraulic saw to trim corporation park Gulmohar branches.",
          "Install UV-stabilized playground slide panels at Anna Nagar community park to replace rusted sheet metal slide.",
          "Repour M25-grade concrete foundation anchor blocks for the open gym chest press equipment."
        ],
        materials: [
          { item: 'M25-Grade Sand Bags', level: '50 Bags', status: 'Optimal', pct: 85, color: 'bg-emerald-500' },
          { item: 'Zinc Galvanizing Primer', level: '30 Liters', status: 'Optimal', pct: 75, color: 'bg-emerald-500' },
          { item: 'Repl. Playground Slides', level: '0 Units', status: 'Critical', pct: 0, color: 'bg-rose-500' }
        ],
        crew: [
          { name: 'Canopy Pruning Squad', leader: 'Supervisor Kumar', strength: 5, status: 'Active (Corporation Park)' },
          { name: 'Masonry & Walkway Crew', leader: 'Supervisor Selvam', strength: 4, status: 'Active (Gandhi Gym)' },
          { name: 'Parks Security Unit', leader: 'Supervisor Mani', strength: 3, status: 'Standby' }
        ],
        staff: [
          { id: 'ST-P1', name: 'R. Chinasamy', role: 'Horticulture Supervisor', contact: '+91 94444 22014', email: 'chinasamy.r@smartward.in', experience: '10 Years', tasks: ['#PK-7011: Branch trimming and hydraulic saw dispatch'] },
          { id: 'ST-P2', name: 'S. Arumai', role: 'Pavement Specialist', contact: '+91 98407 11029', email: 'arumai.s@smartward.in', experience: '7 Years', tasks: ['#PK-7032: Open Gym anchor cementing'] },
          { id: 'ST-P3', name: 'P. Muthu', role: 'Maintenance Supervisor', contact: '+91 91505 88310', email: 'muthu.p@smartward.in', experience: '4 Years', tasks: [] }
        ],
        complaints: [
          {
            id: 'PK-7011',
            category: 'Tree Falling',
            title: 'Heavy fractured overhead branch posing public walk danger',
            location: 'Corporation Park Main Walkway, Ward 42',
            slaDays: 2,
            status: 'pending',
            severity: 'high',
            reportedAt: '9 mins ago',
            description: 'A mature Gulmohar tree has a deep split on its primary lateral branch. It is hanging directly above the children\'s play path.',
            citizenName: 'M. Saravanan',
            preferredLanguage: 'Tamil',
            contact: '+91 94432 10842',
            images: ['https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'],
            ward: '42'
          },
          {
            id: 'PK-7022',
            category: 'Playground Damage',
            title: 'Damaged and rusted children\'s metal slides with jagged edges',
            location: 'Anna Nagar Community Park, Ward 42',
            slaDays: 3,
            status: 'active',
            severity: 'high',
            reportedAt: '2 hrs ago',
            description: 'The support frame of the slide has buckled, creating a sharp 3-inch torn sheet metal gap that could injure children.',
            citizenName: 'Ms. Anita Desai',
            preferredLanguage: 'English',
            contact: '+91 98401 55621',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'R. Chinasamy',
            ward: '42'
          },
          {
            id: 'PK-7032',
            category: 'Playground Damage',
            title: 'Public gym equipment concrete base pulled out of ground',
            location: 'Gandhi Park Open Gym, Ward 42',
            slaDays: 1,
            status: 'active',
            severity: 'medium',
            reportedAt: '4 hrs ago',
            description: 'The double chest-press machine base has broken loose from the concrete pad. The machine is fully unstable.',
            citizenName: 'K. Ranganathan',
            preferredLanguage: 'Tamil',
            contact: '+91 81224 99014',
            images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'P. Muthu',
            ward: '42'
          },
          {
            id: 'PK-7042',
            category: 'Pathway Damage',
            title: 'Broken brick pavement on lake walkway',
            location: 'Lake Promenade Ward 42, Ward 42',
            slaDays: 5,
            status: 'resolved',
            severity: 'medium',
            reportedAt: '1 day ago',
            description: 'Heavy rains caused soil erosion under the interlocking paver blocks, creating a 5-foot ankle-sprain gap.',
            citizenName: 'Smt. Jayanthi',
            preferredLanguage: 'Tamil',
            contact: '+91 73388 41109',
            images: ['https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80'],
            assignedTo: 'S. Arumai',
            ward: '42'
          }
        ]
      };

    default:
      return getDepartmentData('Water Supply');
  }
}
