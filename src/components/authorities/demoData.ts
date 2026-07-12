import { StateData } from './types';

export const DIRECTORY_DATA: Record<string, StateData> = {
  'Tamil Nadu': {
    id: 'TN',
    name: 'Tamil Nadu',
    cm: {
      id: 'TN-CM',
      name: 'Thiru. S. K. Sundaram',
      role: 'Chief Minister',
      category: 'cm',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sundaram&radius=50&backgroundColor=c084fc',
      state: 'Tamil Nadu',
      office: 'Secretariat, Fort St. George, Chennai',
      email: 'cmcell@tn.gov.in',
      phone: '+91 44 2567 1212',
      officeAddress: 'Chief Minister\'s Office, Secretariat, Fort St. George, Chennai - 600009',
      yearsInOffice: '2 Years',
      biography: 'Thiru. S. K. Sundaram is a visionary leader and the current Chief Minister of Tamil Nadu, heading the new-age democratic government focused on systemic anti-corruption, youth empowerment, digital-first municipal ward integration, and secular social justice.',
      responsibilities: [
        'Head of the State Cabinet & Infrastructure Planning',
        'Direct supervision of Public Administration & Home Affairs',
        'State Security, Civil Services Coordination & Policy Formulation',
        'Budget Allocation and Strategic Welfare Directives'
      ]
    },
    ministers: [
      {
        id: 'TN-MIN-1',
        name: 'Thiru. A. K. Raghavan',
        role: 'Minister for Municipal Administration & Water Supply',
        category: 'minister',
        ministry: 'Municipal Administration',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raghavan&radius=50&backgroundColor=ffe0cc',
        email: 'min.maws@tn.gov.in',
        phone: '+91 44 2567 2201',
        officeAddress: 'Secretariat Building, Fort St. George, Chennai - 600009',
        biography: 'Thiru. A. K. Raghavan is a key organizer and senior cabinet minister driving urban municipal transformation, local self-governance platforms, and clean water delivery mechanisms across Tamil Nadu.',
        responsibilities: [
          'Municipal corporations & municipalities management',
          'Drinking water distribution and reservoir infrastructure',
          'Urban sanitation planning and solid waste systems integration'
        ]
      },
      {
        id: 'TN-MIN-2',
        name: 'Thiru. S. Venugopal',
        role: 'Minister for Public Works (PWD) & Highways',
        category: 'minister',
        ministry: 'Public Works (PWD)',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Venugopal&radius=50&backgroundColor=ccf7e0',
        email: 'min.pwd@tn.gov.in',
        phone: '+91 44 2567 2202',
        officeAddress: 'Secretariat Building, Fort St. George, Chennai - 600009',
        biography: 'Thiru. S. Venugopal coordinates strategic infrastructure developments, highway connectivity grids, and regional flood mitigation projects across the state.',
        responsibilities: [
          'State Highways & arterial roads maintenance',
          'Public buildings, government hospitals and schools infrastructure construction',
          'Infrastructure capital budgeting and private-public partnerships'
        ]
      },
      {
        id: 'TN-MIN-3',
        name: 'Dr. A. Meenakshi',
        role: 'Minister for Health & Family Welfare',
        category: 'minister',
        ministry: 'Health',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meenakshi&radius=50&backgroundColor=e3ccff',
        email: 'min.health@tn.gov.in',
        phone: '+91 44 2567 2203',
        officeAddress: 'Secretariat Building, Fort St. George, Chennai - 600009',
        biography: 'Dr. A. Meenakshi oversees public health programs, medical infrastructure, and decentralized community wellness schemes across local municipal wards.',
        responsibilities: [
          'State healthcare network and government medical college operations',
          'Urban primary health center (UPHC) standards maintenance',
          'Epidemiologic protection programs and health crisis intervention'
        ]
      },
      {
        id: 'TN-MIN-4',
        name: 'Thiru. R. Jegadeesan',
        role: 'Minister for School Education & Youth Welfare',
        category: 'minister',
        ministry: 'Education',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jegadeesan&radius=50&backgroundColor=ffdcf0',
        email: 'min.edu@tn.gov.in',
        phone: '+91 44 2567 2204',
        officeAddress: 'Secretariat Building, Fort St. George, Chennai - 600009',
        biography: 'Thiru. R. Jegadeesan leads school curriculum digitization, neighborhood public reading room facilities, and community youth sports programs.',
        responsibilities: [
          'School facilities renovation and public educational infrastructure',
          'Implementation of regional digital literacy curricula',
          'Public library network and community learning hubs expansion'
        ]
      }
    ],
    districts: {
      'Madurai': {
        id: 'MDU',
        name: 'Madurai',
        collector: {
          id: 'MDU-COLL',
          name: 'Dr. S. Priya, IAS',
          role: 'District Collector & District Magistrate',
          category: 'collector',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&radius=50&backgroundColor=ffd1d1',
          email: 'collrmdu@nic.in',
          phone: '+91 452 253 1111',
          officeAddress: 'District Collectorate, Shenoy Nagar, Madurai - 625020',
          officeHours: '10:00 AM - 5:00 PM (Monday - Friday)',
          district: 'Madurai',
          biography: 'Dr. S. Priya, IAS, is a highly decorated administrative officer leading Madurai district. She monitors revenue administration, coordinates welfare schemes, and conducts weekly public grievance check-ins.',
          responsibilities: [
            'Supreme executive and revenue management of Madurai district',
            'Disaster management relief plans execution and containment audits',
            'SLA monitoring of district-level municipal and rural grievances',
            'Liaison between state ministers and grassroots execution teams'
          ],
          performance: {
            complaintsOverseen: 14850,
            resolutionRate: 94.2,
            citizenSatisfaction: 4.6
          }
        },
        commissioner: {
          id: 'MDU-COMM',
          name: 'Shri. R. Saravanakumar, IAS',
          role: 'Municipal Commissioner',
          category: 'commissioner',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saravanakumar&radius=50&backgroundColor=d1ffd1',
          email: 'commr.madurai@tn.gov.in',
          phone: '+91 452 253 0521',
          officeAddress: 'Madurai Corporation Head Office, Anna Nagar, Madurai - 625020',
          officeHours: '9:30 AM - 6:00 PM (Monday - Saturday)',
          corporation: 'Madurai Corporation',
          biography: 'Shri. R. Saravanakumar, IAS, administers the Madurai City Municipal Corporation. He is known for fast-tracking storm water drain projects and digitized waste disposal tracking systems.',
          responsibilities: [
            'Direction of municipal water, drainage, sanitation, and street utilities',
            'Supervision of smart city urban planning and parks reconstruction',
            'Property registries, tax administration, and building authorization permits',
            'Daily monitoring of ward-level engineering field crews'
          ],
          performance: {
            complaintsOverseen: 11200,
            resolutionRate: 91.5,
            citizenSatisfaction: 4.4
          }
        },
        mlas: [
          {
            id: 'MDU-MLA-1',
            name: 'Thiru R. Selvam',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Madurai West',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selvam&radius=50&backgroundColor=e1f5fe',
            email: 'selvam.r@tnmla.gov.in',
            phone: '+91 94444 12345',
            officeAddress: 'Madurai West MLA Office, Palanganatham, Madurai',
            performanceBadge: 'Highly Responsive',
            biography: 'Thiru R. Selvam has served as an MLA for multiple terms, heavily focusing on drinking water supply and neighborhood road connectivity inside Madurai West.',
            responsibilities: [
              'Legislative representation for Madurai West constituency residents',
              'Allocation of MLA Local Area Development Scheme (MLALADS) funds',
              'Local market modernization and cooperative sector liaison'
            ]
          },
          {
            id: 'MDU-MLA-2',
            name: 'Thiru K. Chandrasekar',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Madurai North',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chandrasekar&radius=50&backgroundColor=f3e5f5',
            email: 'chandrasekar.k@tnmla.gov.in',
            phone: '+91 94444 54321',
            officeAddress: 'Madurai North MLA Office, Bibikulam, Madurai',
            performanceBadge: 'SLA Champion',
            biography: 'Thiru K. Chandrasekar is dedicated to urban health clinic upgrades, smart public parks, and primary school infrastructure restorations inside Madurai North.',
            responsibilities: [
              'Constituency advocacy in the Tamil Nadu Legislative Assembly',
              'Strategic allocation of infrastructure development funding',
              'Conducting monthly community meetings to catalog citizen grievances'
            ]
          },
          {
            id: 'MDU-MLA-3',
            name: 'Thiru Dr. P. Vignesh',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Madurai South',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vignesh&radius=50&backgroundColor=fff3e0',
            email: 'vignesh.p@tnmla.gov.in',
            phone: '+91 94444 98765',
            officeAddress: 'Madurai South MLA Office, Villapuram, Madurai',
            performanceBadge: 'Community Builder',
            biography: 'Dr. P. Vignesh combines medical expertise with civic administration to improve community clinics, drainage conduits, and garbage management systems.',
            responsibilities: [
              'Advocating for healthcare and environmental policies',
              'Sponsoring scholarship initiatives and sanitary facilities',
              'High-priority intervention for localized storm drain blocks'
            ]
          }
        ],
        councillors: [
          {
            id: 'MDU-COUN-1',
            name: 'Smt. R. Chitra',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 42',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chitra&radius=50&backgroundColor=ffebee',
            email: 'chitra.w42@maduraicorporation.co.in',
            phone: '+91 98402 42001',
            officeAddress: 'Ward 42 Office, Anna Nagar, Madurai',
            citizenRating: 4.8,
            biography: 'Smt. R. Chitra is the elected councillor representing Ward 42. She is highly active on SmartWard, resolving local streetlight and water leak dispatches on priority.',
            responsibilities: [
              'Grassroots neighborhood representation and ward meetings leadership',
              'Supervising local sanitation sweeps and waste logistics',
              'Formulating recommendations for micro-level road patch work'
            ]
          },
          {
            id: 'MDU-COUN-2',
            name: 'Thiru K. Murugan',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 43',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Murugan&radius=50&backgroundColor=e8f5e9',
            email: 'murugan.w43@maduraicorporation.co.in',
            phone: '+91 98402 42002',
            officeAddress: 'Ward 43 Office, Melur Road, Madurai',
            citizenRating: 4.5,
            biography: 'Thiru K. Murugan represents Ward 43, focusing heavily on storm drain maintenance and mosquito breeding control projects.',
            responsibilities: [
              'Managing local de-silting schedules for water runoffs',
              'Addressing community issues with electricity grid supervisors'
            ]
          },
          {
            id: 'MDU-COUN-3',
            name: 'Thiru S. Ganesan',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 44',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ganesan&radius=50&backgroundColor=e3f2fd',
            email: 'ganesan.w44@maduraicorporation.co.in',
            phone: '+91 98402 42003',
            officeAddress: 'Ward 44 Office, KK Nagar, Madurai',
            citizenRating: 4.2,
            biography: 'Thiru S. Ganesan is active in green park restorations, public library support, and managing drinking water tap schedules.',
            responsibilities: [
              'Supervision of local public spaces and park maintenance staffs',
              'Ensuring drinking water tankers meet remote pocket deficits'
            ]
          },
          {
            id: 'MDU-COUN-4',
            name: 'Smt. M. Alagu',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 45',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alagu&radius=50&backgroundColor=f3e5f5',
            email: 'alagu.w45@maduraicorporation.co.in',
            phone: '+91 98402 42004',
            officeAddress: 'Ward 45 Office, Sellur, Madurai',
            citizenRating: 4.7,
            biography: 'Smt. M. Alagu focuses on commercial street lighting, public washrooms hygiene maintenance, and plastic disposal regulation rules.',
            responsibilities: [
              'Daily morning inspections of waste collection trucks in Ward 45',
              'Coordinating commercial zone parking improvements'
            ]
          },
          {
            id: 'MDU-COUN-5',
            name: 'Thiru P. Pandian',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 46',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pandian&radius=50&backgroundColor=fffde7',
            email: 'pandian.w46@maduraicorporation.co.in',
            phone: '+91 98402 42005',
            officeAddress: 'Ward 46 Office, Goripalayam, Madurai',
            citizenRating: 4.4,
            biography: 'Thiru P. Pandian emphasizes youth facilities, local playground up-keep, and road re-paving coordination.',
            responsibilities: [
              'Overseeing building permits validation for residential grids',
              'Escalating water channel clogs to executive engineers'
            ]
          },
          {
            id: 'MDU-COUN-6',
            name: 'Smt. S. Kavitha',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 47',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha&radius=50&backgroundColor=f1f8e9',
            email: 'kavitha.w47@maduraicorporation.co.in',
            phone: '+91 98402 42006',
            officeAddress: 'Ward 47 Office, Arappalayam, Madurai',
            citizenRating: 4.6,
            biography: 'Smt. S. Kavitha champions primary education improvements and the setting up of maternal health dispensaries.',
            responsibilities: [
              'Maternal health camp setups coordination in coordination with Ministry',
              'Ensuring school lunch kitchen hygiene parameters are verified'
            ]
          },
          {
            id: 'MDU-COUN-7',
            name: 'Thiru R. Karuppiah',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 48',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karuppiah&radius=50&backgroundColor=efebe9',
            email: 'karuppiah.w48@maduraicorporation.co.in',
            phone: '+91 98402 42007',
            officeAddress: 'Ward 48 Office, Simmakkal, Madurai',
            citizenRating: 4.1,
            biography: 'Thiru R. Karuppiah addresses issues regarding heavy vehicle parking restrictions and sewage backflows.',
            responsibilities: [
              'Restricting night-time commercial logistics noise',
              'Mobilizing de-silting suction vehicles for central blockages'
            ]
          },
          {
            id: 'MDU-COUN-8',
            name: 'Smt. J. Meenakshi',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 49',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meenakshi&radius=50&backgroundColor=fce4ec',
            email: 'meenakshi.w49@maduraicorporation.co.in',
            phone: '+91 98402 42008',
            officeAddress: 'Ward 49 Office, South Gate, Madurai',
            citizenRating: 4.9,
            biography: 'Smt. J. Meenakshi boasts the highest citizen satisfaction rating due to her daily doorstep grievance surveys and prompt drainage clearing actions.',
            responsibilities: [
              'Maintaining near 100% resolution rates for residential streets',
              'Directing local youth development and tailoring training centers'
            ]
          },
          {
            id: 'MDU-COUN-9',
            name: 'Thiru S. Ramakrishnan',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 50',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramakrishnan&radius=50&backgroundColor=e0f2f1',
            email: 'ramakrishnan.w50@maduraicorporation.co.in',
            phone: '+91 98402 42009',
            officeAddress: 'Ward 50 Office, Teppakulam, Madurai',
            citizenRating: 4.3,
            biography: 'Thiru S. Ramakrishnan works towards eco-tourism protection around Temple ponds and expanding solar-powered streetlights.',
            responsibilities: [
              'Preserving heritage tank water quality metrics',
              'Transitioning local street grid sections to standalone solar pods'
            ]
          },
          {
            id: 'MDU-COUN-10',
            name: 'Smt. K. Devi',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 51',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Devi&radius=50&backgroundColor=fff8e1',
            email: 'devi.w51@maduraicorporation.co.in',
            phone: '+91 98402 42010',
            officeAddress: 'Ward 51 Office, Avaniapuram, Madurai',
            citizenRating: 4.5,
            biography: 'Smt. K. Devi works closely with micro-sanitation field workers, prioritizing door-to-door organic waste segregation.',
            responsibilities: [
              'Enforcing fine policies against illegal plastic dumpings',
              'Ensuring clean drinking supply pipes setup for newly merged blocks'
            ]
          }
        ],
        deptHeads: [
          {
            id: 'MDU-DEPT-1',
            name: 'Er. K. Srinivasan',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Roads',
            departmentIconName: 'Milestone',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Srinivasan&radius=50&backgroundColor=e8eaf6',
            email: 'roads.mdu@smartward.gov.in',
            phone: '+91 94450 11001',
            officeAddress: 'Maws Corporation Engineering Block, Wing A, Madurai',
            biography: 'Er. K. Srinivasan leads road maintenance, potholes repairs, sidewalk planning, and resurfacing projects for the Madurai Corporation.',
            responsibilities: [
              'Planning municipal asphalt layering & compaction operations',
              'Auditing road safety barriers and pedestrian crossing marking layouts'
            ]
          },
          {
            id: 'MDU-DEPT-2',
            name: 'Dr. A. Ramesh',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Sanitation',
            departmentIconName: 'Sparkles',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh&radius=50&backgroundColor=e0f2f1',
            email: 'sanitation.mdu@smartward.gov.in',
            phone: '+91 94450 11002',
            officeAddress: 'Sanitation Division Annex, Anna Nagar, Madurai',
            biography: 'Dr. A. Ramesh manages the general hygiene sweeps, anti-dengue chemical sprays, public toilets sanitation, and bio-waste collection schedules.',
            responsibilities: [
              'Directing thermal fogging schedules across 100 wards',
              'Enforcing medical waste safety protocols at health clinics'
            ]
          },
          {
            id: 'MDU-DEPT-3',
            name: 'Er. M. Selvaraj',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Water Supply',
            departmentIconName: 'Droplet',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selvaraj&radius=50&backgroundColor=e3f2fd',
            email: 'water.mdu@smartward.gov.in',
            phone: '+91 94450 11003',
            officeAddress: 'Water Works Board HQ, Shenoy Nagar, Madurai',
            biography: 'Er. M. Selvaraj acts as the Chief Executive Engineer for drinking water supply networks, main pipeline leak reparations, and reservoir distributions.',
            responsibilities: [
              'Isolating and repairing main distribution conduits failures',
              'Regulating scheduled supply timing structures across wards'
            ]
          },
          {
            id: 'MDU-DEPT-4',
            name: 'Er. S. Pandi',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Electrical',
            departmentIconName: 'Flame',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pandi&radius=50&backgroundColor=fffde7',
            email: 'electrical.mdu@smartward.gov.in',
            phone: '+91 94450 11004',
            officeAddress: 'Grid Operations Substation, Arapalayam, Madurai',
            biography: 'Er. S. Pandi supervises the smart lighting grid, transformer replacements, electrical wiring faults, and solar backup systems.',
            responsibilities: [
              'Monitoring smart sensor streetlight networks diagnostic systems',
              'Coordinating emergency grid repairs during severe rainstorms'
            ]
          },
          {
            id: 'MDU-DEPT-5',
            name: 'Er. V. Subbiah',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Drainage',
            departmentIconName: 'Wrench',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Subbiah&radius=50&backgroundColor=f3e5f5',
            email: 'drainage.mdu@smartward.gov.in',
            phone: '+91 94450 11005',
            officeAddress: 'Sewerage Treatment Plant Board Office, Madurai',
            biography: 'Er. V. Subbiah focuses on stormwater drain channels, sewerage pipeline de-clogging, pump houses maintenance, and localized flood mitigation.',
            responsibilities: [
              'Supervising heavy vacuum pump trucks and sludge clearers',
              'Auditing pre-monsoon storm drain de-silting logs'
            ]
          },
          {
            id: 'MDU-DEPT-6',
            name: 'Thiru K. Muthu',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Solid Waste',
            departmentIconName: 'Trash2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muthu&radius=50&backgroundColor=efebe9',
            email: 'waste.mdu@smartward.gov.in',
            phone: '+91 94450 11006',
            officeAddress: 'Integrated Waste Management Depot, Avaniapuram, Madurai',
            biography: 'Thiru K. Muthu supervises dumpsters relocations, heavy compactor vehicles dispatching, composting processing plants, and landfill engineering.',
            responsibilities: [
              'Scheduling residential organic waste pickup routes',
              'Managing municipal recycling centers capacity constraints'
            ]
          },
          {
            id: 'MDU-DEPT-7',
            name: 'Dr. R. Subbulakshmi',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Health',
            departmentIconName: 'ShieldAlert',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Subbulakshmi&radius=50&backgroundColor=fce4ec',
            email: 'health.mdu@smartward.gov.in',
            phone: '+91 94450 11007',
            officeAddress: 'Municipal Health Directorate, Anna Nagar, Madurai',
            biography: 'Dr. R. Subbulakshmi oversees epidemic protective strategies, vaccination centers logistics, maternal dispensaries auditing, and food safety standards.',
            responsibilities: [
              'Inspecting restaurant kitchens hygiene parameters',
              'Ensuring essential vaccine stocks across 45 urban clinics'
            ]
          },
          {
            id: 'MDU-DEPT-8',
            name: 'Thiru P. Raja',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Parks',
            departmentIconName: 'Flower2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raja&radius=50&backgroundColor=f1f8e9',
            email: 'parks.mdu@smartward.gov.in',
            phone: '+91 94450 11008',
            officeAddress: 'Horticulture Department Wing, Race Course Road, Madurai',
            biography: 'Thiru P. Raja executes botanical maintenance, green park pathways development, tree pruning dispatches, and kids playground security inspections.',
            responsibilities: [
              'Executing plantation drives to increase ward green cover index',
              'Maintaining automated irrigation pipes in public gardens'
            ]
          }
        ],
        stats: {
          totalAuthorities: 24,
          departments: 8,
          wards: 100,
          avgCitizenRating: 4.5,
          overallResolutionRate: 92.4
        }
      },
      'Coimbatore': {
        id: 'CBE',
        name: 'Coimbatore',
        collector: {
          id: 'CBE-COLL',
          name: 'Thiru R. Anand Kumar, IAS',
          role: 'District Collector & District Magistrate',
          category: 'collector',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnandKumar&radius=50&backgroundColor=d1ffd1',
          email: 'collrcbe@nic.in',
          phone: '+91 422 230 1111',
          officeAddress: 'District Collectorate, State Bank Road, Coimbatore - 641018',
          officeHours: '10:00 AM - 5:30 PM (Monday - Friday)',
          district: 'Coimbatore',
          biography: 'Thiru R. Anand Kumar, IAS, is the executive head of Coimbatore District. He focuses heavily on industrial zone infrastructure, bypass lanes expansion, and water basin preservation schemes.',
          responsibilities: [
            'Supreme revenue administration and judicial coordination in Coimbatore',
            'SLA monitoring of grievances in industrial cluster corridors',
            'Executing Western Ghats watershed protection initiatives'
          ],
          performance: {
            complaintsOverseen: 16200,
            resolutionRate: 95.1,
            citizenSatisfaction: 4.7
          }
        },
        commissioner: {
          id: 'CBE-COMM',
          name: 'Thiru S. Premkumar, IAS',
          role: 'Municipal Commissioner',
          category: 'commissioner',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Premkumar&radius=50&backgroundColor=ffebee',
          email: 'commr.coimbatore@tn.gov.in',
          phone: '+91 422 230 0211',
          officeAddress: 'Coimbatore Corporation Office, Town Hall, Coimbatore - 641001',
          officeHours: '9:30 AM - 5:45 PM (Monday - Friday)',
          corporation: 'Coimbatore Municipal Corporation',
          biography: 'Thiru S. Premkumar, IAS, runs municipal assets, drinking water schemes, and smart industrial road grids across Coimbatore City limits.',
          responsibilities: [
            'Supervising garbage micro-segregation and smart recycling grids',
            'Conducting digital surveys of municipal school facilities',
            'Issuing structural clearances for commercial and retail establishments'
          ],
          performance: {
            complaintsOverseen: 12900,
            resolutionRate: 92.8,
            citizenSatisfaction: 4.5
          }
        },
        mlas: [
          {
            id: 'CBE-MLA-1',
            name: 'Thiru A. Mohanraj',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Coimbatore South',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohanraj&radius=50&backgroundColor=f3e5f5',
            email: 'mohanraj.a@tnmla.gov.in',
            phone: '+91 94444 22001',
            officeAddress: 'Mohanraj MLA Office, Race Course, Coimbatore',
            performanceBadge: 'Infrastructure Champion',
            biography: 'Thiru A. Mohanraj is known for his focused efforts in modernizing local text-tile industrial pockets and bringing advanced underground sewerage to urban grids.',
            responsibilities: [
              'Legislating industrial and commercial growth parameters',
              'Allocation of MLALADS budgets for neighborhood bypass links'
            ]
          },
          {
            id: 'CBE-MLA-2',
            name: 'Smt. V. Nandhini',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Coimbatore Central',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nandhini&radius=50&backgroundColor=ffe0cc',
            email: 'nandhini.v@tnmla.gov.in',
            phone: '+91 94444 22002',
            officeAddress: 'Nandhini MLA Office, Gandhipuram, Coimbatore',
            performanceBadge: 'Community Liaison',
            biography: 'Smt. V. Nandhini focuses heavily on women self-help empowerment guilds, park security installations, and citizen literacy campaigns.',
            responsibilities: [
              'Advocating for small business subsidies and self-help systems',
              'Allocating developmental funds for smart school blocks'
            ]
          },
          {
            id: 'CBE-MLA-3',
            name: 'Thiru A. Gopinath',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Coimbatore North',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gopinath&radius=50&backgroundColor=e1f5fe',
            email: 'gopinath.a@tnmla.gov.in',
            phone: '+91 94444 22003',
            officeAddress: 'Gopinath MLA Office, Kavundampalayam, Coimbatore',
            performanceBadge: 'SLA Pioneer',
            biography: 'Thiru A. Gopinath has consistently targeted flyover bottleneck issues, water main links, and smart streetlight coverage on the ring-roads.',
            responsibilities: [
              'Legislating bypass lane expansions in the state house',
              'Sponsoring local watershed conservation plans'
            ]
          }
        ],
        councillors: [
          {
            id: 'CBE-COUN-1',
            name: 'Thiru R. Suresh',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 10',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh&radius=50&backgroundColor=e0f2f1',
            email: 'suresh.w10@coimbatorecorporation.org',
            phone: '+91 98412 10001',
            officeAddress: 'Ward 10 Office, RS Puram, Coimbatore',
            citizenRating: 4.7,
            biography: 'Thiru R. Suresh is a proactive representative who has successfully transformed RS Puram park segments into plastic-free zones.',
            responsibilities: [
              'Conducting local market sanitary audits',
              'Managing drinking water valves timing patterns'
            ]
          },
          {
            id: 'CBE-COUN-2',
            name: 'Smt. V. Geetha',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 11',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Geetha&radius=50&backgroundColor=fce4ec',
            email: 'geetha.w11@coimbatorecorporation.org',
            phone: '+91 98412 10002',
            officeAddress: 'Ward 11 Office, Gandhipuram, Coimbatore',
            citizenRating: 4.4,
            biography: 'Smt. V. Geetha concentrates on night security solar streetlights and clearing illegal waste deposits.',
            responsibilities: [
              'Monitoring local night police patrol linkages',
              'Filing urgent storm water de-silting petitions'
            ]
          },
          {
            id: 'CBE-COUN-3',
            name: 'Thiru K. Prabhu',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 12',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prabhu&radius=50&backgroundColor=fffde7',
            email: 'prabhu.w12@coimbatorecorporation.org',
            phone: '+91 98412 10003',
            officeAddress: 'Ward 12 Office, Saibaba Colony, Coimbatore',
            citizenRating: 4.8,
            biography: 'Thiru K. Prabhu is dedicated to smart solid waste recycling, offering home composter kits to verified colony residents.',
            responsibilities: [
              'Drying waste distribution logistics management',
              'Initiating commercial grease trap enforcement checks'
            ]
          },
          {
            id: 'CBE-COUN-4',
            name: 'Smt. N. Shanthi',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 13',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shanthi&radius=50&backgroundColor=efebe9',
            email: 'shanthi.w13@coimbatorecorporation.org',
            phone: '+91 98412 10004',
            officeAddress: 'Ward 13 Office, Peelamedu, Coimbatore',
            citizenRating: 4.3,
            biography: 'Smt. N. Shanthi ensures educational support centers are active for local students after school hours.',
            responsibilities: [
              'Supervising government reading rooms upgrades',
              'Clearing tree falls during squalls'
            ]
          },
          {
            id: 'CBE-COUN-5',
            name: 'Thiru P. Loganathan',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 14',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Loganathan&radius=50&backgroundColor=e8f5e9',
            email: 'loganathan.w14@coimbatorecorporation.org',
            phone: '+91 98412 10005',
            officeAddress: 'Ward 14 Office, Singanallur, Coimbatore',
            citizenRating: 4.6,
            biography: 'Thiru P. Loganathan has prioritized clean drinking water grids restoration and lake-side pathway developments.',
            responsibilities: [
              'Ensuring heavy machinery is dispatched for sewerage blocks',
              'Coordinating local sports training camps'
            ]
          },
          {
            id: 'CBE-COUN-6',
            name: 'Smt. R. Priya',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 15',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&radius=50&backgroundColor=fff8e1',
            email: 'priya.w15@coimbatorecorporation.org',
            phone: '+91 98412 10006',
            officeAddress: 'Ward 15 Office, Saravanampatti, Coimbatore',
            citizenRating: 4.9,
            biography: 'Smt. R. Priya leads the IT corridor ward. She utilizes advanced digital dashboards to coordinate with PWD engineers and close pothole tickets in 24 hours.',
            responsibilities: [
              'Supervising smart infrastructure rollouts in IT sectors',
              'Coordinating quick-response streetlights repairs'
            ]
          },
          {
            id: 'CBE-COUN-7',
            name: 'Thiru S. Karthik',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 16',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik&radius=50&backgroundColor=e3f2fd',
            email: 'karthik.w16@coimbatorecorporation.org',
            phone: '+91 98412 10007',
            officeAddress: 'Ward 16 Office, Ramanathapuram, Coimbatore',
            citizenRating: 4.1,
            biography: 'Thiru S. Karthik works towards drainage de-silting and traffic bypass signage up-grades.',
            responsibilities: [
              'Restricting commercial container entry speeds',
              'Coordinating anti-dengue fogging sprays'
            ]
          },
          {
            id: 'CBE-COUN-8',
            name: 'Smt. M. Banumathi',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 17',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Banumathi&radius=50&backgroundColor=f3e5f5',
            email: 'banumathi.w17@coimbatorecorporation.org',
            phone: '+91 98412 10008',
            officeAddress: 'Ward 17 Office, Ukkadam, Coimbatore',
            citizenRating: 4.5,
            biography: 'Smt. M. Banumathi is active in public market sanitation, lake protection grids development, and solar lamps deployment.',
            responsibilities: [
              'Inspecting Ukrainian-lake side garbage dumping violations',
              'Regulating weekly bazaar sanitary sweeps'
            ]
          },
          {
            id: 'CBE-COUN-9',
            name: 'Thiru G. Vignesh',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 18',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vignesh&radius=50&backgroundColor=f1f8e9',
            email: 'vignesh.w18@coimbatorecorporation.org',
            phone: '+91 98412 10009',
            officeAddress: 'Ward 18 Office, Kuniamuthur, Coimbatore',
            citizenRating: 4.4,
            biography: 'Thiru G. Vignesh targets public health center modernization and clean municipal water supply conduits.',
            responsibilities: [
              'Directing mosquito fogging plans in residential zones',
              'Escalating water connection leaks'
            ]
          },
          {
            id: 'CBE-COUN-10',
            name: 'Smt. T. Kokila',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 19',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kokila&radius=50&backgroundColor=fff3e0',
            email: 'kokila.w19@coimbatorecorporation.org',
            phone: '+91 98412 10010',
            officeAddress: 'Ward 19 Office, Kovaipudur, Coimbatore',
            citizenRating: 4.7,
            biography: 'Smt. T. Kokila is noted for eco-friendly waste management schemes and maintaining quiet residential garden spaces.',
            responsibilities: [
              'Implementing leaf composters in public parks',
              'Ensuring prompt roadside grass trimmings schedules'
            ]
          }
        ],
        deptHeads: [
          {
            id: 'CBE-DEPT-1',
            name: 'Er. J. Sundaram',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Roads',
            departmentIconName: 'Milestone',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sundaram&radius=50&backgroundColor=d1f3ff',
            email: 'roads.cbe@smartward.gov.in',
            phone: '+91 94451 22001',
            officeAddress: 'Corporation Engineering block, Coimbatore',
            biography: 'Er. J. Sundaram supervises highways and city bypass asphalt laying, pothole patching, and speed-breaker designs.',
            responsibilities: [
              'Planning municipal bypass patching schemes',
              'Auditing road painting safety standards'
            ]
          },
          {
            id: 'CBE-DEPT-2',
            name: 'Dr. G. Kavitha',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Sanitation',
            departmentIconName: 'Sparkles',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KavithaDept&radius=50&backgroundColor=ffe3f2',
            email: 'sanitation.cbe@smartward.gov.in',
            phone: '+91 94451 22002',
            officeAddress: 'Sanitation Wing, Town Hall, Coimbatore',
            biography: 'Dr. G. Kavitha oversees general sanitation, malaria mosquito containment campaigns, and waste disposal routes.',
            responsibilities: [
              'Managing automated fogging dispatches across 100 blocks',
              'Enforcing plastic ban rules at local merchant centers'
            ]
          },
          {
            id: 'CBE-DEPT-3',
            name: 'Er. R. Sathyamoorthy',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Water Supply',
            departmentIconName: 'Droplet',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sathyamoorthy&radius=50&backgroundColor=e8f5e9',
            email: 'water.cbe@smartward.gov.in',
            phone: '+91 94451 22003',
            officeAddress: 'Siruvani Water Works Annex, Coimbatore',
            biography: 'Er. R. Sathyamoorthy handles the Siruvani reservoir filtration and city supply conduits distribution networks.',
            responsibilities: [
              'Auditing drinking water purity levels daily',
              'Fixing main line water valve leak failures'
            ]
          },
          {
            id: 'CBE-DEPT-4',
            name: 'Er. N. Karthikeyan',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Electrical',
            departmentIconName: 'Flame',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KarthikeyanDept&radius=50&backgroundColor=fffde7',
            email: 'electrical.cbe@smartward.gov.in',
            phone: '+91 94451 22004',
            officeAddress: 'Electrical Operations Block, Singanallur, Coimbatore',
            biography: 'Er. N. Karthikeyan coordinates smart city streetlighting and high-tension grid solar power integrations.',
            responsibilities: [
              'Installing smart light sensors across ring roads',
              'Directing electrical maintenance bucket lifts'
            ]
          },
          {
            id: 'CBE-DEPT-5',
            name: 'Er. S. Selvakumar',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Drainage',
            departmentIconName: 'Wrench',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selvakumar&radius=50&backgroundColor=e8eaf6',
            email: 'drainage.cbe@smartward.gov.in',
            phone: '+91 94451 22005',
            officeAddress: 'Sewerage operations office, Ukkadam, Coimbatore',
            biography: 'Er. S. Selvakumar runs the Ukkadam treatment plant, storm drains de-silting, and vacuum pump operations.',
            responsibilities: [
              'Coordinating sewer blockages vacuum suction actions',
              'Ensuring sewage treatment effluent compliance levels'
            ]
          },
          {
            id: 'CBE-DEPT-6',
            name: 'Thiru S. Rajendran',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Solid Waste',
            departmentIconName: 'Trash2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajendran&radius=50&backgroundColor=fbe9e7',
            email: 'waste.cbe@smartward.gov.in',
            phone: '+91 94451 22006',
            officeAddress: 'Vellalore Solid Waste Plant, Coimbatore',
            biography: 'Thiru S. Rajendran directs dry/wet garbage separation logistics, compostings, and local landfill monitoring.',
            responsibilities: [
              'Scheduling residential dump truck sweeps',
              'Monitoring bio-compost processing limits'
            ]
          },
          {
            id: 'CBE-DEPT-7',
            name: 'Dr. M. Boopathi',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Health',
            departmentIconName: 'ShieldAlert',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boopathi&radius=50&backgroundColor=efebe9',
            email: 'health.cbe@smartward.gov.in',
            phone: '+91 94451 22007',
            officeAddress: 'Municipal Health HQ, Ramanathapuram, Coimbatore',
            biography: 'Dr. M. Boopathi directs primary health dispensaries, vaccination logistics, and clean retail food audits.',
            responsibilities: [
              'Inspecting bazaar food hygiene parameters',
              'Conducting pediatric pulse-polio vaccine camps'
            ]
          },
          {
            id: 'CBE-DEPT-8',
            name: 'Thiru R. Anand',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Parks',
            departmentIconName: 'Flower2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnandDept&radius=50&backgroundColor=f1f8e9',
            email: 'parks.cbe@smartward.gov.in',
            phone: '+91 94451 22008',
            officeAddress: 'Horticulture wing, Singanallur lake, Coimbatore',
            biography: 'Thiru R. Anand leads the municipal botanical gardens, lake pathway greenery, and recreational park safety setups.',
            responsibilities: [
              'Maintaining municipal garden walking tracks',
              'Conducting tree safety cuts near electricity cables'
            ]
          }
        ],
        stats: {
          totalAuthorities: 24,
          departments: 8,
          wards: 100,
          avgCitizenRating: 4.6,
          overallResolutionRate: 93.9
        }
      }
    }
  },
  'Karnataka': {
    id: 'KA',
    name: 'Karnataka',
    cm: {
      id: 'KA-CM',
      name: 'Shri H. V. Gowda',
      role: 'Chief Minister',
      category: 'cm',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gowda&radius=50&backgroundColor=e1f5fe',
      state: 'Karnataka',
      office: 'Vidhana Soudha, Bengaluru',
      email: 'cm.karnataka@gov.in',
      phone: '+91 80 2225 1111',
      officeAddress: 'Chief Minister\'s Office, Room No. 312, Vidhana Soudha, Bengaluru - 560001',
      yearsInOffice: '3 Years',
      biography: 'Shri H. V. Gowda is an esteemed civic leader serving as the Chief Minister of Karnataka. He has implemented large-scale public transportation schemes, direct-benefit financial transfers, and digital civic governance interfaces.',
      responsibilities: [
        'Head of Government and Strategic Cabinet Projects',
        'Direct oversight of Finance, Cabinet Affairs, and Administrative Reforms',
        'State planning, developmental goals coordination, and policy frameworks'
      ]
    },
    ministers: [
      {
        id: 'KA-MIN-1',
        name: 'Shri S. R. Patil',
        role: 'Deputy Chief Minister & Minister for Bengaluru Development',
        category: 'minister',
        ministry: 'Municipal Administration',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SRPatil&radius=50&backgroundColor=d1ffd1',
        email: 'dycm.blr@karnataka.gov.in',
        phone: '+91 80 2225 2201',
        officeAddress: 'Vidhana Soudha, Bengaluru - 560001',
        biography: 'Shri S. R. Patil coordinates urban infrastructure development, metropolitan drinking water supply (BWSSB), and BBMP operations.',
        responsibilities: [
          'Bengaluru metropolitan area smart infrastructure growth',
          'BBMP sanitation and solid waste logistics management',
          'Cauvery drinking water supply coordination'
        ]
      },
      {
        id: 'KA-MIN-2',
        name: 'Shri K. R. Prasad',
        role: 'Minister for Law & Parliamentary Affairs',
        category: 'minister',
        ministry: 'Public Works (PWD)',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KRPrasad&radius=50&backgroundColor=f3e5f5',
        email: 'min.law@karnataka.gov.in',
        phone: '+91 80 2225 2202',
        officeAddress: 'Vidhana Soudha, Bengaluru - 560001',
        biography: 'Shri K. R. Prasad monitors parliamentary regulations, state legal frameworks, PWD alignments, and judicial audits.',
        responsibilities: [
          'Formulating legal guidelines for decentralized ward committees',
          'Inter-departmental dispute settlement panels leadership',
          'Legislative reviews of municipal regulatory norms'
        ]
      },
      {
        id: 'KA-MIN-3',
        name: 'Shri M. N. Bhat',
        role: 'Minister for Health & Family Welfare',
        category: 'minister',
        ministry: 'Health',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MNBhat&radius=50&backgroundColor=fff3e0',
        email: 'min.health@karnataka.gov.in',
        phone: '+91 80 2225 2203',
        officeAddress: 'Vidhana Soudha, Bengaluru - 560001',
        biography: 'Shri M. N. Bhat directs public health grids, expansion of "Namma Clinics", immunization plans, and municipal sanitation inspections.',
        responsibilities: [
          'Overseeing primary and secondary clinical setups across cities',
          'Promoting preventative medicine campaigns and disease containment programs',
          'Directing biological waste management regulations'
        ]
      },
      {
        id: 'KA-MIN-4',
        name: 'Shri T. V. Hegde',
        role: 'Minister for Primary & Secondary Education',
        category: 'minister',
        ministry: 'Education',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TVHegde&radius=50&backgroundColor=ffebee',
        email: 'min.edu@karnataka.gov.in',
        phone: '+91 80 2225 2204',
        officeAddress: 'Vidhana Soudha, Bengaluru - 560001',
        biography: 'Shri T. V. Hegde drives curriculum modernizations, smart classrooms integration, and building safety certifications across state school systems.',
        responsibilities: [
          'Directing infrastructural renovations of municipal schools',
          'Expanding digital learning labs in urban zones',
          'Managing public scholarship distribution algorithms'
        ]
      }
    ],
    districts: {
      'Bengaluru Urban': {
        id: 'BLR',
        name: 'Bengaluru Urban',
        collector: {
          id: 'BLR-COLL',
          name: 'Shri K. L. Hegde, IAS',
          role: 'District Collector & District Magistrate',
          category: 'collector',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KLHegde&radius=50&backgroundColor=e8f5e9',
          email: 'dc-bangaloreu@kar.nic.in',
          phone: '+91 80 2221 1111',
          officeAddress: 'District Commissioner Office, Behind Kandaya Bhavan, KG Road, Bengaluru - 560009',
          officeHours: '10:00 AM - 5:30 PM (Monday - Friday)',
          district: 'Bengaluru Urban',
          biography: 'Shri K. L. Hegde is an IAS officer heading Bengaluru Urban. He has pioneered direct digital title deeds and weekly public revenue grievance resolution days.',
          responsibilities: [
            'Supreme revenue and civil administration of Bengaluru Urban district',
            'SLA grievance oversight across electronic city corridors',
            'Coordinating metropolitan disaster control protocols'
          ],
          performance: {
            complaintsOverseen: 21500,
            resolutionRate: 93.5,
            citizenSatisfaction: 4.5
          }
        },
        commissioner: {
          id: 'BLR-COMM',
          name: 'Shri T. S. Murthy, IAS',
          role: 'Municipal Commissioner (BBMP)',
          category: 'commissioner',
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TSMurthy&radius=50&backgroundColor=e3f2fd',
          email: 'commr.bbmp@kar.nic.in',
          phone: '+91 80 2222 1212',
          officeAddress: 'BBMP Head Office, Hudson Circle, Bengaluru - 560002',
          officeHours: '9:30 AM - 6:00 PM (Monday - Saturday)',
          corporation: 'Bruhat Bengaluru Mahanagara Palike',
          biography: 'Shri T. S. Murthy, IAS, runs the massive Bruhat Bengaluru Mahanagara Palike. He is active in modern waste processing setups, smart flyover construction, and resolving pothole complaints via GIS tracing.',
          responsibilities: [
            'Supreme executive direction of BBMP utilities and ward maintenance',
            'Supervising high-density corridor road re-paving schedules',
            'Directing micro-drainage excavations for monsoon protection'
          ],
          performance: {
            complaintsOverseen: 29500,
            resolutionRate: 90.8,
            citizenSatisfaction: 4.2
          }
        },
        mlas: [
          {
            id: 'BLR-MLA-1',
            name: 'Shri R. A. Swamy',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Padmanabhanagar',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Swamy&radius=50&backgroundColor=ffebee',
            email: 'swamy.ra@karnatakala.gov.in',
            phone: '+91 94480 12345',
            officeAddress: 'Swamy MLA Office, Banashankari, Bengaluru',
            performanceBadge: 'Infrastructure Builder',
            biography: 'Shri R. A. Swamy has represented Padmanabhanagar for several terms, driving advanced drinking water main lines and robust flyover loops.',
            responsibilities: [
              'Legislative representation for constituency residents',
              'MLALADS budget distribution for smart public spaces'
            ]
          },
          {
            id: 'BLR-MLA-2',
            name: 'Shri B. Z. Khan',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Chamarajpet',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khan&radius=50&backgroundColor=fff3e0',
            email: 'khan.bz@karnatakala.gov.in',
            phone: '+91 94480 54321',
            officeAddress: 'Khan MLA Office, Mysore Road, Bengaluru',
            performanceBadge: 'Highly Accessible',
            biography: 'Shri B. Z. Khan focuses on urban housing redevelopment plans, maternal clinic support, and central drainage clearing schedules.',
            responsibilities: [
              'Advocating for metropolitan housing welfare strategies',
              'Sponsoring weekly community clinic camps'
            ]
          },
          {
            id: 'BLR-MLA-3',
            name: 'Shri S. S. Murthy',
            role: 'Member of Legislative Assembly (MLA)',
            category: 'mla',
            constituency: 'Rajajinagar',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SSMurthy&radius=50&backgroundColor=e8f5e9',
            email: 'murthy.ss@karnatakala.gov.in',
            phone: '+91 94480 98765',
            officeAddress: 'Murthy MLA Office, Rajajinagar, Bengaluru',
            performanceBadge: 'SLA Champion',
            biography: 'Shri S. S. Murthy is highly regarded for clean school infrastructure transformations and transparency in municipal fund disbursements.',
            responsibilities: [
              'Legislating educational equity guidelines in the house',
              'Allocating developmental funds for green parks and walkways'
            ]
          }
        ],
        councillors: [
          {
            id: 'BLR-COUN-1',
            name: 'Shri M. Satish',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 102',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Satish&radius=50&backgroundColor=fff8e1',
            email: 'satish.w102@bbmp.gov.in',
            phone: '+91 98450 10201',
            officeAddress: 'BBMP Ward 102 Office, Vasanth Nagar, Bengaluru',
            citizenRating: 4.6,
            biography: 'Shri M. Satish leads the central Vasanth Nagar ward, focusing heavily on modern composting hubs and safe sidewalks.',
            responsibilities: [
              'Grassroots constituency support and daily garbage truck tracking',
              'Supervising playground and garden sanitation'
            ]
          },
          {
            id: 'BLR-COUN-2',
            name: 'Smt. H. Sunitha',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 103',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunitha&radius=50&backgroundColor=fce4ec',
            email: 'sunitha.w103@bbmp.gov.in',
            phone: '+91 98450 10202',
            officeAddress: 'BBMP Ward 103 Office, Malleshwaram, Bengaluru',
            citizenRating: 4.8,
            biography: 'Smt. H. Sunitha is an active environmental advocate who has established community tree plantation pods across heritage sectors.',
            responsibilities: [
              'Monitoring local solar lamp installation grids',
              'Organizing stormwater channel clearing drives'
            ]
          },
          {
            id: 'BLR-COUN-3',
            name: 'Shri K. Ramesh',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 104',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RameshC&radius=50&backgroundColor=e3f2fd',
            email: 'ramesh.w104@bbmp.gov.in',
            phone: '+91 98450 10203',
            officeAddress: 'BBMP Ward 104 Office, Rajajinagar, Bengaluru',
            citizenRating: 4.2,
            biography: 'Shri K. Ramesh handles water scheduling issues and localized de-silting projects around central pipelines.',
            responsibilities: [
              'Isolating leak reports for quick repair escalation',
              'Ensuring fair drinking water distributions'
            ]
          },
          {
            id: 'BLR-COUN-4',
            name: 'Smt. N. Lakshmi',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 105',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi&radius=50&backgroundColor=f3e5f5',
            email: 'lakshmi.w105@bbmp.gov.in',
            phone: '+91 98450 10204',
            officeAddress: 'BBMP Ward 105 Office, Indiranagar, Bengaluru',
            citizenRating: 4.7,
            biography: 'Smt. N. Lakshmi represents the high-commercial Indiranagar segment, regulating commercial night noise and solid waste disposal protocols.',
            responsibilities: [
              'Coordinating parking grids and commercial waste collections',
              'Inspecting streetlight networks safety parameters'
            ]
          },
          {
            id: 'BLR-COUN-5',
            name: 'Shri P. Venkatesh',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 106',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Venkatesh&radius=50&backgroundColor=e8f5e9',
            email: 'venkatesh.w106@bbmp.gov.in',
            phone: '+91 98450 10205',
            officeAddress: 'BBMP Ward 106 Office, Koramangala, Bengaluru',
            citizenRating: 4.5,
            biography: 'Shri P. Venkatesh focuses heavily on storm drains de-silting and preventing water stagnation in low sectors.',
            responsibilities: [
              'Monitoring high-power water vacuum pumps operation',
              'Escalating road repair requirements'
            ]
          },
          {
            id: 'BLR-COUN-6',
            name: 'Smt. S. Asha',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 107',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asha&radius=50&backgroundColor=fffde7',
            email: 'asha.w107@bbmp.gov.in',
            phone: '+91 98450 10206',
            officeAddress: 'BBMP Ward 107 Office, Jayanagar, Bengaluru',
            citizenRating: 4.6,
            biography: 'Smt. S. Asha emphasizes primary health campaigns and maintenance of local children walking lanes.',
            responsibilities: [
              'Coordinating local health clinic vaccine allocations',
              'Conducting monthly residents feedback forum check-ins'
            ]
          },
          {
            id: 'BLR-COUN-7',
            name: 'Shri R. Nagaraj',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 108',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nagaraj&radius=50&backgroundColor=efebe9',
            email: 'nagaraj.w108@bbmp.gov.in',
            phone: '+91 98450 10207',
            officeAddress: 'BBMP Ward 108 Office, Banashankari, Bengaluru',
            citizenRating: 4.1,
            biography: 'Shri R. Nagaraj works on improving bypass road speed-breakers and public water taps scheduling.',
            responsibilities: [
              'Investigating neighborhood electricity fluctuation reports',
              'Clearing debris from construction dumpings'
            ]
          },
          {
            id: 'BLR-COUN-8',
            name: 'Smt. K. Roopa',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 109',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roopa&radius=50&backgroundColor=ffebee',
            email: 'roopa.w109@bbmp.gov.in',
            phone: '+91 98450 10208',
            officeAddress: 'BBMP Ward 109 Office, Whitefield, Bengaluru',
            citizenRating: 4.4,
            biography: 'Smt. K. Roopa manages IT suburb grids, supervising high-speed sewer de-cloggers and pothole patching crews.',
            responsibilities: [
              'Coordinating with tech-park security for smooth transit',
              'Supervising modern organic waste processing centers'
            ]
          },
          {
            id: 'BLR-COUN-9',
            name: 'Shri S. Anand',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 110',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnandC&radius=50&backgroundColor=e0f2f1',
            email: 'anand.w110@bbmp.gov.in',
            phone: '+91 98450 10209',
            officeAddress: 'BBMP Ward 110 Office, Hebbal, Bengaluru',
            citizenRating: 4.3,
            biography: 'Shri S. Anand coordinates flyover corridor repairs and storm drain wall reinforcements.',
            responsibilities: [
              'Investigating water ponding issues on service loops',
              'Mobilizing mosquito fogging trucks schedules'
            ]
          },
          {
            id: 'BLR-COUN-10',
            name: 'Smt. G. Sandhya',
            role: 'Ward Councillor',
            category: 'councillor',
            wardNumber: 'Ward 111',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandhya&radius=50&backgroundColor=f1f8e9',
            email: 'sandhya.w111@bbmp.gov.in',
            phone: '+91 98450 10210',
            officeAddress: 'BBMP Ward 111 Office, HSR Layout, Bengaluru',
            citizenRating: 4.8,
            biography: 'Smt. G. Sandhya leads HSR Layout, enforcing strict organic garbage segregation rules and maintaining elegant neighborhood garden strips.',
            responsibilities: [
              'Ensuring 100% waste segregation at housing gates',
              'Drying compost programs management in public parks'
            ]
          }
        ],
        deptHeads: [
          {
            id: 'BLR-DEPT-1',
            name: 'Er. Suresh Gowda',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Roads',
            departmentIconName: 'Milestone',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SureshGowda&radius=50&backgroundColor=ffe0cc',
            email: 'roads.bbmp@smartward.gov.in',
            phone: '+91 94498 11001',
            officeAddress: 'BBMP Engineering Annex, Wing B, Bengaluru',
            biography: 'Er. Suresh Gowda leads arterial road paving, pothole detection scans, and sidewalk safety structures.',
            responsibilities: [
              'Deploying quick-dry asphalt crews to high-density lanes',
              'Scheduling pedestrian sidewalk pathway restorations'
            ]
          },
          {
            id: 'BLR-DEPT-2',
            name: 'Dr. S. Lokesh',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Sanitation',
            departmentIconName: 'Sparkles',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lokesh&radius=50&backgroundColor=e8f5e9',
            email: 'sanitation.bbmp@smartward.gov.in',
            phone: '+91 94498 11002',
            officeAddress: 'BBMP Health Wing, Hudson Circle, Bengaluru',
            biography: 'Dr. S. Lokesh oversees public sanitation, vector-borne fogging operations, and garbage segregation mandates.',
            responsibilities: [
              'Enforcing fine structures on mixed trash disposals',
              'Monitoring anti-malaria water sprays in stormwater tracks'
            ]
          },
          {
            id: 'BLR-DEPT-3',
            name: 'Er. K. P. Nagaraju',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Water Supply',
            departmentIconName: 'Droplet',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NagarajuDept&radius=50&backgroundColor=e3f2fd',
            email: 'water.bwssb@smartward.gov.in',
            phone: '+91 94498 11003',
            officeAddress: 'BWSSB Central Building, Cauvery Bhavan, Bengaluru',
            biography: 'Er. K. P. Nagaraju acts as the Senior Executive Engineer of BWSSB, organizing main water line valve repairs and local pipeline leaks.',
            responsibilities: [
              'Maintaining water pressure metrics in Cauvery main feeds',
              'Deploying emergency water tankers to remote areas'
            ]
          },
          {
            id: 'BLR-DEPT-4',
            name: 'Er. S. Shivalingaiah',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Electrical',
            departmentIconName: 'Flame',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shivalingaiah&radius=50&backgroundColor=fffde7',
            email: 'electrical.bescom@smartward.gov.in',
            phone: '+91 94498 11004',
            officeAddress: 'BESCOM grid control room, Bengaluru',
            biography: 'Er. S. Shivalingaiah monitors smart street illumination towers, wiring malfunctions, and solar transformers setup.',
            responsibilities: [
              'Upgrading BESCOM grid lines with protective rubber sleeving',
              'Re-wiring damaged street pillar circuits'
            ]
          },
          {
            id: 'BLR-DEPT-5',
            name: 'Er. C. Prasanna',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Drainage',
            departmentIconName: 'Wrench',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prasanna&radius=50&backgroundColor=f3e5f5',
            email: 'drainage.bbmp@smartward.gov.in',
            phone: '+91 94498 11005',
            officeAddress: 'Stormwater Drainage division, Bengaluru',
            biography: 'Er. C. Prasanna conducts large storm drain de-silting excavations and localized sewage de-cloggings.',
            responsibilities: [
              'Organizing major storm drains cleanups before heavy monsoons',
              'Resolving sewage line backflow reports'
            ]
          },
          {
            id: 'BLR-DEPT-6',
            name: 'Shri G. Manjunath',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Solid Waste',
            departmentIconName: 'Trash2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manjunath&radius=50&backgroundColor=efebe9',
            email: 'waste.bbmp@smartward.gov.in',
            phone: '+91 94498 11006',
            officeAddress: 'Integrated Solid Waste Depot, Jayanagar, Bengaluru',
            biography: 'Shri G. Manjunath manages compost hubs, landfill compliance indexes, and scheduled trash dumpsters sweeps.',
            responsibilities: [
              'Optimizing compactor truck transport paths',
              'Auditing neighborhood dry trash recovery stations'
            ]
          },
          {
            id: 'BLR-DEPT-7',
            name: 'Dr. H. Savitha',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Health',
            departmentIconName: 'ShieldAlert',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Savitha&radius=50&backgroundColor=fce4ec',
            email: 'health.bbmp@smartward.gov.in',
            phone: '+91 94498 11007',
            officeAddress: 'BBMP Health Directorate, Malleshwaram, Bengaluru',
            biography: 'Dr. H. Savitha leads the epidemic containment network, monitoring the smart clinics supply chain and food safety audits.',
            responsibilities: [
              'Auditing retail commercial food stores hygiene standard',
              'Ensuring essential medical kits at 60 clinics'
            ]
          },
          {
            id: 'BLR-DEPT-8',
            name: 'Shri N. Murthy',
            role: 'Department Head',
            category: 'dept_head',
            department: 'Parks',
            departmentIconName: 'Flower2',
            photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Murthy&radius=50&backgroundColor=f1f8e9',
            email: 'parks.bbmp@smartward.gov.in',
            phone: '+91 94498 11008',
            officeAddress: 'BBMP Horticulture block, Cubbon Park Road, Bengaluru',
            biography: 'Shri N. Murthy monitors city lung-spaces, Cubbon Park/Lalbagh subways coordination, and local residential garden setups.',
            responsibilities: [
              'Supervising flower bed restorations and watering runs',
              'Restoring children park slides and playground turf'
            ]
          }
        ],
        stats: {
          totalAuthorities: 24,
          departments: 8,
          wards: 198,
          avgCitizenRating: 4.4,
          overallResolutionRate: 91.2
        }
      }
    }
  }
};
