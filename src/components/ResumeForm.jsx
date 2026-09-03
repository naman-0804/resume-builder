import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import './ResumeForm.css';

const ResumeForm = ({ data, setData }) => {
  const [collapsed, setCollapsed] = useState({});

  const toggle = (key) => setCollapsed(p => ({ ...p, [key]: !p[key] }));

  const handleChange = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const arr = [...data[section]];
    arr[index] = { ...arr[index], [field]: value };
    setData({ ...data, [section]: arr });
  };

  const handleBulletChange = (section, itemIdx, bulletIdx, value) => {
    const arr = [...data[section]];
    const bullets = [...arr[itemIdx].bullets];
    bullets[bulletIdx] = value;
    arr[itemIdx] = { ...arr[itemIdx], bullets };
    setData({ ...data, [section]: arr });
  };

  const addItem = (section, item) => setData({ ...data, [section]: [...data[section], item] });
  const removeItem = (section, idx) => {
    const arr = [...data[section]];
    arr.splice(idx, 1);
    setData({ ...data, [section]: arr });
  };

  const addBullet = (section, idx) => {
    const arr = [...data[section]];
    arr[idx] = { ...arr[idx], bullets: [...arr[idx].bullets, ''] };
    setData({ ...data, [section]: arr });
  };

  const removeBullet = (section, itemIdx, bulletIdx) => {
    const arr = [...data[section]];
    const bullets = [...arr[itemIdx].bullets];
    bullets.splice(bulletIdx, 1);
    arr[itemIdx] = { ...arr[itemIdx], bullets };
    setData({ ...data, [section]: arr });
  };

  const Section = ({ id, title, children, onAdd, addLabel }) => (
    <div className="form-section">
      <div className="form-section-header" onClick={() => toggle(id)}>
        <h3>{title}</h3>
        <div className="section-actions">
          {onAdd && (
            <button className="btn-add" onClick={(e) => { e.stopPropagation(); onAdd(); }}>
              <Plus size={14} /> {addLabel || 'Add'}
            </button>
          )}
          {collapsed[id] ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
      </div>
      {!collapsed[id] && <div className="form-section-body">{children}</div>}
    </div>
  );

  return (
    <div className="resume-form">

      {/* Personal Info */}
      <Section id="personal" title="Personal Information">
        <div className="field-grid">
          <input placeholder="Full Name" value={data.personalInfo.name} onChange={e => handleChange('personalInfo', 'name', e.target.value)} />
          <input placeholder="Website (optional)" value={data.personalInfo.website} onChange={e => handleChange('personalInfo', 'website', e.target.value)} />
          <input placeholder="Email" value={data.personalInfo.email} onChange={e => handleChange('personalInfo', 'email', e.target.value)} />
          <input placeholder="Phone" value={data.personalInfo.phone} onChange={e => handleChange('personalInfo', 'phone', e.target.value)} />
          <input placeholder="LinkedIn URL" value={data.personalInfo.linkedin} onChange={e => handleChange('personalInfo', 'linkedin', e.target.value)} />
          <input placeholder="GitHub URL" value={data.personalInfo.github} onChange={e => handleChange('personalInfo', 'github', e.target.value)} />
        </div>
      </Section>

      {/* Experience */}
      <Section id="exp" title="Work Experience" onAdd={() => addItem('experience', { title: '', date: '', bullets: [''] })}>
        {data.experience.map((exp, i) => (
          <div key={i} className="entry-card">
            <button className="card-remove" onClick={() => removeItem('experience', i)}><Trash2 size={14} /></button>
            <div className="field-grid">
              <input placeholder="Title & Company" value={exp.title} onChange={e => handleArrayChange('experience', i, 'title', e.target.value)} />
              <input placeholder="Date range" value={exp.date} onChange={e => handleArrayChange('experience', i, 'date', e.target.value)} />
            </div>
            <div className="bullets-list">
              {exp.bullets.map((b, j) => (
                <div key={j} className="bullet-row">
                  <textarea rows={2} placeholder="Bullet point..." value={b} onChange={e => handleBulletChange('experience', i, j, e.target.value)} />
                  <button className="btn-rm" onClick={() => removeBullet('experience', i, j)}><Trash2 size={13} /></button>
                </div>
              ))}
              <button className="btn-link" onClick={() => addBullet('experience', i)}>+ Add bullet</button>
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="field-grid">
          <input placeholder="Programming Languages" value={data.skills.programming} onChange={e => handleChange('skills', 'programming', e.target.value)} />
          <input placeholder="Backend" value={data.skills.backend} onChange={e => handleChange('skills', 'backend', e.target.value)} />
          <input placeholder="Database" value={data.skills.database} onChange={e => handleChange('skills', 'database', e.target.value)} />
          <input placeholder="Frontend" value={data.skills.frontend} onChange={e => handleChange('skills', 'frontend', e.target.value)} />
          <input placeholder="Tools" value={data.skills.tools} onChange={e => handleChange('skills', 'tools', e.target.value)} />
          <input placeholder="Cloud" value={data.skills.cloud} onChange={e => handleChange('skills', 'cloud', e.target.value)} />
          <input placeholder="AI/ML" value={data.skills.aiml} onChange={e => handleChange('skills', 'aiml', e.target.value)} />
          <input placeholder="Soft Skills" value={data.skills.softSkills} onChange={e => handleChange('skills', 'softSkills', e.target.value)} />
        </div>
      </Section>

      {/* Education */}
      <Section id="edu" title="Education" onAdd={() => addItem('education', { school: '', degree: '', date: '' })}>
        {data.education.map((edu, i) => (
          <div key={i} className="entry-card">
            <button className="card-remove" onClick={() => removeItem('education', i)}><Trash2 size={14} /></button>
            <div className="field-grid three-col">
              <input placeholder="School / University" value={edu.school} onChange={e => handleArrayChange('education', i, 'school', e.target.value)} />
              <input placeholder="Degree / Score" value={edu.degree} onChange={e => handleArrayChange('education', i, 'degree', e.target.value)} />
              <input placeholder="Date" value={edu.date} onChange={e => handleArrayChange('education', i, 'date', e.target.value)} />
            </div>
          </div>
        ))}
      </Section>

      {/* Projects */}
      <Section id="proj" title="Projects" onAdd={() => addItem('projects', { title: '', github: '', link: '', linkText: '', date: '', bullets: [''] })}>
        {data.projects.map((proj, i) => (
          <div key={i} className="entry-card">
            <button className="card-remove" onClick={() => removeItem('projects', i)}><Trash2 size={14} /></button>
            <div className="field-grid">
              <input placeholder="Project Title" value={proj.title} onChange={e => handleArrayChange('projects', i, 'title', e.target.value)} />
              <input placeholder="Date" value={proj.date} onChange={e => handleArrayChange('projects', i, 'date', e.target.value)} />
              <input placeholder="GitHub Link" value={proj.github} onChange={e => handleArrayChange('projects', i, 'github', e.target.value)} />
              <input placeholder="Website Link" value={proj.link} onChange={e => handleArrayChange('projects', i, 'link', e.target.value)} />
              <input placeholder="Link Text (e.g. YouTube Link)" value={proj.linkText} onChange={e => handleArrayChange('projects', i, 'linkText', e.target.value)} />
            </div>
            <div className="bullets-list">
              {proj.bullets.map((b, j) => (
                <div key={j} className="bullet-row">
                  <textarea rows={2} placeholder="Bullet point..." value={b} onChange={e => handleBulletChange('projects', i, j, e.target.value)} />
                  <button className="btn-rm" onClick={() => removeBullet('projects', i, j)}><Trash2 size={13} /></button>
                </div>
              ))}
              <button className="btn-link" onClick={() => addBullet('projects', i)}>+ Add bullet</button>
            </div>
          </div>
        ))}
      </Section>

      {/* Achievements */}
      <Section id="ach" title="Achievements" onAdd={() => addItem('achievements', { title: '', description: '' })}>
        {data.achievements.map((a, i) => (
          <div key={i} className="entry-card inline-card">
            <input className="inline-title" placeholder="Title (bold)" value={a.title} onChange={e => handleArrayChange('achievements', i, 'title', e.target.value)} />
            <textarea rows={2} className="inline-desc" placeholder="Description..." value={a.description} onChange={e => handleArrayChange('achievements', i, 'description', e.target.value)} />
            <button className="btn-rm" onClick={() => removeItem('achievements', i)}><Trash2 size={13} /></button>
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section id="cert" title="Certifications" onAdd={() => addItem('certifications', { title: '', description: '' })}>
        {data.certifications.map((c, i) => (
          <div key={i} className="entry-card inline-card">
            <input className="inline-title" placeholder="Certificate Name" value={c.title} onChange={e => handleArrayChange('certifications', i, 'title', e.target.value)} />
            <textarea rows={2} className="inline-desc" placeholder="Details / Score..." value={c.description} onChange={e => handleArrayChange('certifications', i, 'description', e.target.value)} />
            <button className="btn-rm" onClick={() => removeItem('certifications', i)}><Trash2 size={13} /></button>
          </div>
        ))}
      </Section>

    </div>
  );
};

export default ResumeForm;
