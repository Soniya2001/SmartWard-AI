<img width="4320" height="1440" alt="hh26 main poster 2 with sponsors 3x1 (4320 x 1440 px) (2)" src="https://github.com/user-attachments/assets/c698b2cd-da84-4cb0-9276-125c6a7244aa" />

# 🚀 SmartWard AI 🏛️💡

> An advanced, AI-powered Civic Governance & Public Grievance Platform designed to bridge the gap between citizens and administration.

---

## 📌 Problem & Domain

Traditional civic grievance mechanisms are plagued by slow response times, lack of transparency, and administrative bottlenecks. Citizens file complaints without real-time tracking, and authorities operate in informational silos without a unified coordination platform.

**Themes Selected:**
- [ ] Human Experience & Productivity  
- [ ] Climate & Sustainability Systems  
- [ ] HealthTech & Bio Platforms  
- [ ] Learning & Knowledge Systems  
- [ ] Work, Finance & Digital Economy  
- [✓] Infrastructure, Mobility & Smart Systems  
- [ ] Trust, Identity & Security  
- [ ] Media, Social & Interactive Platforms  
- [✓] Public Systems, Governance and Civic Tech  
- [ ] Developer Tools & Software Infrastructure  

---

## 🎯 Objective

SmartWard AI streamlines the reporting of public issues (water, sanitation, roads, power, etc.) and provides tailored, executive analytical control rooms for municipal and state authorities to manage resources with maximum precision.

* **Target Users**: Citizens, Ward representatives (MLAs, Councillors), Municipal Commissioners, District Collectors, State Ministers, and the Chief Minister.
* **The Pain Point**: Fragmented communication, manual classification overhead, lack of photographic validation, and static resource planning.
* **The Value**: Multi-modal AI analysis (Gemini 2.5 Flash) instantly validates and categorizes issues; role-based administrative dashboards enable dynamic resource allocation, real-time ticket timelines, and cross-department collaboration.

---

## 🧠 Team & Approach

### Team Name:  
`XXX`

### Team Member:  
- **Soniya Baskaran** (GitHub: [soniyabaskaran2001](https://github.com/Soniya2001) / Role: Full Stack Lead & AI Engineer / Linkedin: https://www.linkedin.com/in/soniya-baskaran-617216244/)  

### Your Approach:
* **Why we chose this problem**: Municipal maintenance and public grievance transparency are foundational to sustainable, modern cities. By leveraging AI-assisted intake, we lower the barrier for citizens while empowering authorities with actionable data.
* **Key challenges addressed**: Handling real-time image processing under heavy API demand. Resolved by introducing a highly robust dual-layer fallback structure (from `gemini-2.5-flash` to `gemini-1.5-flash`) coupled with image-compression on upload to reduce network latency.
* **Breakthroughs**: Built fully interactive role-based authority dashboards covering all levels of governance—from Ward levels (MLAs, Councillors) to Municipal, District, and State leadership.

---

## 🛠️ Tech Stack

### Core Technologies Used:
* **Frontend**: React 18, TypeScript, Vite
* **Backend**: Node.js, Express (custom server architecture binding to port 3000)
* **Database**: High-fidelity Local Storage Persistence engine mimicking robust cloud registries
* **APIs**: **Google Gen AI SDK** utilizing `gemini-2.5-flash` & `gemini-1.5-flash`
* **Animations**: Framer Motion (`motion/react`)
* **Charts & Visualization**: Recharts
* **Icons**: Lucide React

### Additional Technologies Used (Optional):
- [✓] AI / ML  
- [ ] Web3 / Blockchain  
- [ ] Cyber Security 
- [✓] Cloud  

---

## 🏆 Sponsored Track (Optional)

Select if your project participates in any track:

- [ ] **Expo Track** – Built using Expo  
- [ ] **Neo4j Track** – Uses AuraDB as primary database  
- [ ] **Base44 Track** – Prototype/Final Product built using Base44  

---

## ✨ Key Features

### 👥 For Citizens
* **Unified Issue Reporting**: Lodge grievances with categories, severity levels, detailed descriptions, and automated location details.
* **AI-Powered Intake**: Multi-modal analysis via **Gemini 2.5 Flash** to automatically describe photo evidence, suggest categories, and determine severity.
* **Real-time Ticket Tracking**: Beautiful interactive timeline showing issue lifecycle progression from *Filed* to *In Progress* and *Resolved*.
* **Interactive Map**: Locate nearby reported grievances and ongoing public works visually.

### 🏛️ For Authorities (Tailored Control Rooms)
1. **Ward MLA (Member of Legislative Assembly)**:
   * Track constituency development funds (CDF).
   * Ward-wise comparative metric tracking and direct CDF resource reallocations.
2. **Municipal Commissioner**:
   * Departmental performance analytics, GIS tracking, and sanitation/SWM asset dispatch coordination.
3. **District Collector**:
   * Cross-taluk SLA compliance indexes and administrative force dispatch logs to resolve bottlenecking.
4. **State Minister**:
   * State-wide policy execution monitoring and sector ranking indices.
5. **Chief Minister (CM)**:
   * Global state executive dashboard, macro performance rosters, and instant council meeting ratification flows.
6. **Ward Councillor**:
   * Track Interactive Ward GIS maps, Core Sector complaints distribution, and department SLA indexes.
   * Review citizen service ratings and issue direct override orders for critical overdue escalations.
7. **Department Officer / Ward Engineer**:
   * Manage department-specific inventory (pipes, cables, lighting bulbs, asphalt mix).
   * Supervise and coordinate the assigned work queue, update repair statuses, and deploy Field Squads (Technicians, Inspectors, Engineers).

---

## 📽️ Demo & Deliverables

- **Demo Video Link (Mandatory):** [TBD]  
- **Deployment Link (Recommended): https://smartward-ai.ai.studio
- **Pitch Deck / PPT (Optional): https://docs.google.com/presentation/d/1C5ZiYsKykxzzsi1URnNVvYwSWII7huz_/edit?usp=sharing&ouid=118359157138178570616&rtpof=true&sd=true

---

## ✅ Tasks & Bonus Checklist

- [✓] All team members completed the mandatory social task  

---

## 🧪 How to Run the Project

### Requirements:
- Node.js (v18+)
- Google Gemini API Key configured in your environment (`GEMINI_API_KEY`)

### Local Setup:

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Spin up the development server:
```bash
npm run dev
```

4. Compile a production bundle:
```bash
npm run build
```

---

## 🧬 Future Scope

* 📈 **Municipal GIS Integration**: Directly hook into live municipal GIS sensors for automatic road hazard tracking.
* 🛡️ **Blockchain-backed Sovereign Logs**: Immutable ledger logging for public accountability.
* 🌐 **Extended Vernacular Accessibility**: Add support for local dialects using speech-to-text models for intake.

---

## 📎 Resources / Credits

* Google Gen AI SDK
* Recharts Library for clean data widgets
* Lucide React for consistent UI vector elements
* Framer Motion for beautiful transitions

---

## 🏁 Final Words

Built with a deep passion for solving citizen-centric problems and improving smart governance. Experience the power of AI-assisted transparency with SmartWard AI!
