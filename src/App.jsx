import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, RefreshCw, Trash2, Sun, Moon } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

const defaultData = {
  personalInfo: {
    name: "Naman Srivastava",
    website: "https://namansrivastava.is-a.dev",
    email: "namansrivastava0104@gmail.com",
    phone: "+91---------",
    linkedin: "http://www.linkedin.com/in/naman1608",
    github: "https://github.com/naman-0804"
  },
  experience: [
    {
      title: "Software Developer Intern (The Entrepreneurship Network)",
      date: "June-2024-July2024",
      bullets: [
        "Developed the Employee Management System of the company, deployed 10+ RESTful APIs (MongoDB, Flask, React)",
        "Implemented new features, enhanced legacy functionality and resolved 5+ issues/bugs, improving stability and UX",
        "Collaborated within an Agile Scrum team, participating in meetings, and retrospectives to ensure efficient communication",
        "Designed a CI workflow with GitHub Actions to verify REST API endpoints via automated curl-based tests.",
        "Dockerized the application and its dependencies to ensure reproducibility, and environment-independent execution."
      ]
    }
  ],
  skills: {
    programming: "C++ , Java, Python",
    backend: "Flask ,Express.js",
    database: "MongoDB, DynamoDB",
    frontend: "React.js",
    tools: "Git, GitHub Actions, Docker, Ngrok, Postman, PuTTY, WinSCP",
    cloud: "AWS, GCP",
    aiml: "LangChain, LangGraph, RAG, DL, ML",
    softSkills: "Leadership, Time Management, Team collaboration, Adaptability, Creativity, Resilience"
  },
  education: [
    { school: "Vellore Institute of Technology Chennai B. TECH", degree: "<strong>Computer science (CSE)</strong> \u2013 8.3 CGPA", date: "2022-2026" },
    { school: "Peace Public School <strong>(CBSE Board)</strong>", degree: "<strong>10th class</strong>- 89.4% -2020 &nbsp;&nbsp;&nbsp;&nbsp; <strong>12th class (PCM)</strong>- 90.4% -2022", date: "2018-2022" }
  ],
  projects: [
    {
      title: "VITISH24 - SIH Internal Hackathon (Nominated for SIH2024)",
      github: "https://github.com",
      link: "https://youtube.com",
      linkText: "YouTube Link",
      date: "Nov-2024",
      bullets: [
        "Designed a two-way real-time communication system where mute patients stream hand-gesture video during live WebRTC-Based video calls, it is processed by ML model and predicted text is delivered live to the doctor\u0027s interface with TTS support",
        "Tech stack - React.js, MongoDB, WebRTC, Flask, Express.js"
      ]
    },
    {
      title: "Multi-Tool LLM Workflow",
      github: "https://github.com",
      link: "https://example.com",
      linkText: "Website Link",
      date: "Aug-2026",
      bullets: [
        "Architected an autonomous multi-tool LLM agent using LangGraph and Gemini, integrating Tavily web search, Wikipedia APIs, computational and local file management tools through dynamic agent workflows.",
        "Developed PDF/DOCX document parsing and file management tools, enabling the agent to read, extract, and answer questions from document content."
      ]
    }
  ],
  achievements: [
    { title: "Devshouse 2024 (National)", description: "Qualified Round 1 from 2,500+ teams and achieved 5th rank (tied 4th) among 60 finalist teams" },
    { title: "SIH2024 (National)", description: "Cleared two rounds, placed 33rd among 548 teams, received college nomination for official SIH round" }
  ],
  certifications: [
    { title: "Microsoft Azure Data Fundamentals", description: "Score (925/1000), Spoken Tutorial (From IIT Bombay) - C++ certification - Score (73/100)" }
  ]
};

const emptyData = {
  personalInfo: { name: "", website: "", email: "", phone: "", linkedin: "", github: "" },
  experience: [],
  skills: { programming: "", backend: "", database: "", frontend: "", tools: "", cloud: "", aiml: "", softSkills: "" },
  education: [],
  projects: [],
  achievements: [],
  certifications: []
};

function App() {
  const [data, setData] = useState(defaultData);
  const [darkMode, setDarkMode] = useState(true);
  const componentRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('resumeBuilderData');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(data));
  }, [data]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume`,
  });

  const handleReset = () => {
    if (window.confirm("Load default template? This will overwrite your current data.")) {
      setData(defaultData);
      localStorage.setItem('resumeBuilderData', JSON.stringify(defaultData));
    }
  };

  const handleClear = () => {
    if (window.confirm("Clear all resume data?")) {
      setData(emptyData);
      localStorage.setItem('resumeBuilderData', JSON.stringify(emptyData));
    }
  };

  return (
    <div className={`app-root ${darkMode ? 'dark' : 'light'}`}>
      <header className="action-bar">
        <div className="action-bar-left">
          <div className="logo-mark">R</div>
          <h1>Resume Builder</h1>
        </div>
        <div className="action-bar-right">
          <button className="action-btn ghost" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="action-btn outline" onClick={handleClear}>
            <Trash2 size={16} /> Clear
          </button>
          <button className="action-btn outline" onClick={handleReset}>
            <RefreshCw size={16} /> Template
          </button>
          <button className="action-btn primary" onClick={handlePrint}>
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </header>

      <div className="split-layout">
        <aside className="form-pane">
          <ResumeForm data={data} setData={setData} />
        </aside>
        <main className="preview-pane">
          <ResumePreview ref={componentRef} data={data} />
        </main>
      </div>
    </div>
  );
}

export default App;
