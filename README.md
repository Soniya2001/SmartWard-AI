# SmartWard AI 🏛️💡

An advanced, AI-powered Civic Governance & Public Grievance Platform designed to bridge the gap between citizens and administration. SmartWard AI streamlines the reporting of public issues (water, sanitation, roads, power, etc.) and provides tailored, executive analytical control rooms for municipal and state authorities to manage resources with maximum precision.

---

## 🌟 Key Features

### 👥 For Citizens
* **Unified Issue Reporting**: Easily lodge grievances with categories, severity levels, descriptions, and location details.
* **Real-time Ticket Tracking**: Dynamic timeline showing issue lifecycle progression from *Filed* to *In Progress* and *Resolved*.
* **Interactive Maps**: Locate reported public issues visually and track ongoing civic projects in their neighborhood.

### 🏛️ For Authorities (Role-based Control Rooms)
Tailored dashboards for different administrative tiers, complete with AI Audit Intelligence:
1. **Ward MLA (Member of Legislative Assembly)**:
   * Track constituency development funds (CDF).
   * Ward-wise comparative metric tracking.
   * *AI Action*: Reallocate CDF reserves to critical wards dynamically.
2. **Municipal Commissioner**:
   * Departmental performance analytics and GIS monitoring.
   * *AI Action*: Optimize sanitation and Solid Waste Management (SWM) resource allocations.
3. **District Collector**:
   * Cross-taluk SLA compliance indexes and administrative force dispatch logs.
   * *AI Action*: Override boundary bottlenecks and dispatch regional units.
4. **State Minister**:
   * Policy implementation progress and state-wide sector rankings.
   * *AI Action*: Expand specialized public health/sanitation programs.
5. **Chief Minister (CM)**:
   * State Executive command center featuring global district leaderboards and macro performance indexes.
   * *AI Action*: Convene the state executive council to ratify large-scale infrastructure projects.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS
* **Animations**: Motion (f.k.a. Framer Motion)
* **Charts & Visualization**: Recharts
* **Icons**: Lucide React
* **State Management**: React Context (Auth and Authority-specific states)

---

## 📁 Code Architecture

* `/src/App.tsx`: Central route mapping featuring smart authentication gateways (protecting authority and user panels).
* `/src/contexts/AuthContext.tsx`: Manages session security and login credentials for role-based testing.
* `/src/contexts/AuthorityContext.tsx`: Powers the centralized administrative metrics, dynamic charts data, and action history tracking.
* `/src/components/authority/dashboards/`: Tier-specific authority consoles (MLA, Collector, Commissioner, Minister, CM).
* `/src/pages/LandingPage.tsx`: Welcome portal accessible strictly before authentication.
* `/src/pages/CitizenDashboard.tsx`: Comprehensive client view for filing and monitoring grievances.
* `/src/pages/AuthorityDashboard.tsx`: Unified administrative command bridge featuring role selection and executive navigation.

---

## 🚀 Running the Project

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
