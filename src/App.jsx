import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, RefreshCw, Trash2, Sun, Moon, Download } from 'lucide-react';
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
        "Tech stack \u2013 React.js, MongoDB, WebRTC, Flask, Express.js"
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
    },
    {
      title: "Diabetes Prediction on Amazon Web Services (AWS)",
      github: "https://github.com",
      link: "https://youtube.com",
      linkText: "YouTube Link",
      date: "Nov-2024",
      bullets: [
        "Built and deployed a diabetes prediction application on AWS using Flask, EC2, S3, Amplify, API Gateway, DynamoDB and SNS.",
        "Implemented cloud-based model deployment, data storage, and automated email notifications for prediction results."
      ]
    },
    {
      title: "Adv Secure Virtual Private Cloud Arch with NAT-Based Private Network Isolation on AWS",
      github: "",
      link: "https://example.com",
      linkText: "Implementation Link",
      date: "Nov-2024",
      bullets: [
        "Designed an AWS VPC with private EC2 instances and NAT-based outbound connectivity, demonstrating private network isolation and SSH key-based access using PuTTY.",
        "Implemented Application Load Balancer with Auto Scaling to distribute traffic across EC2 instances",
        "Additionally developed an Amazon Lex chatbot with intents (fallback intents / welcome intents)"
      ]
    },
    {
      title: "Context Driven multi stage retrieval pipelines",
      github: "https://github.com",
      link: "https://example.com",
      linkText: "Website Link",
      date: "Sep-2025",
      bullets: [
        "Developed a RAG-based document intelligence system using Gemini, Pinecone, chunking, query rewriting, embedding generation, vector similarity search, Cross-Encoder reranking, document-level namespace isolation, and context-grounded answer generation, with real-time evaluation of hallucination rate, response consistency, retrieval quality, and latency metrics."
      ]
    },
    {
      title: "E-Commerce Customer Segmentation and Purchase Prediction using Machine Learning",
      github: "https://github.com",
      link: "https://example.com",
      linkText: "Website Link",
      date: "Oct-2025",
      bullets: [
        "Implemented KMeans clustering with the Elbow Method to segment customers based on income and spending behavior.",
        "Identified distinct customer groups (high-value, average, and low-engagement) using unsupervised learning.",
        "Built a Random Forest regressor to predict purchase using behavioral features and cluster obtained from KMeans clustering.",
        "Visualized customer segments & predictions using scatter, cluster plots to interpret spending behavior, identify high Val groups.",
        "Tech Stack- Python (Scikit-learn for ML, Pandas for data preprocessing, Matplotlib for visualization)"
      ]
    }
  ],
  achievements: [
    { title: "Devshouse 2024 (National)", description: "Qualified Round 1 from 2,500+ teams and achieved 5th rank (tied 4th) among 60 finalist teams" },
    { title: "SIH2024 (National)", description: "Cleared two rounds, placed 33rd among 548 teams, received college nomination for official SIH round" },
    { title: "Solve-A-Thon 2024 (Inter)", description: "Secured 6th place among 63 finalist teams; shortlisted from 400+ registrations and received special appreciation from the Vice Chancellor of VIT" }
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
          <button className="action-btn primary" onClick={handleDownloadWord} style={{ marginLeft: '8px' }}>
            <Download size={16} /> Word
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



