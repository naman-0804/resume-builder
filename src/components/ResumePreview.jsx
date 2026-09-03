import React from 'react';
import './ResumePreview.css';

const ResumePreview = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  return (
    <div className="resume-preview-wrapper" ref={ref}>
      <div className="resume-doc">

        {/* Header */}
        <header className="r-header">
          <h1 className="r-name">
            {data.personalInfo.name}
            {data.personalInfo.website && (
              <span className="r-website"> (<a href={data.personalInfo.website}>{data.personalInfo.website}</a>)</span>
            )}
          </h1>
          <p className="r-contact">
            {[
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.linkedin && <a key="li" href={data.personalInfo.linkedin}>{data.personalInfo.linkedin}</a>,
              data.personalInfo.github && <a key="gh" href={data.personalInfo.github}>{data.personalInfo.github}</a>
            ].filter(Boolean).reduce((acc, el, i) => {
              if (i > 0) acc.push(<span key={`sep-${i}`}> &bull; </span>);
              acc.push(typeof el === 'string' ? <span key={i}>{el}</span> : el);
              return acc;
            }, [])}
          </p>
        </header>

        {/* Work Experience */}
        {data.experience?.length > 0 && (
          <section className="r-section">
            <h2 className="r-section-title">WORK EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="r-entry">
                <div className="r-entry-header">
                  <span className="r-entry-title"><strong>{exp.title}</strong></span>
                  <span className="r-entry-date">{exp.date}</span>
                </div>
                <ul className="r-bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills && (
          <section className="r-section">
            <h2 className="r-section-title">SKILLS</h2>
            <div className="r-skills">
              {data.skills.programming && (
                <div>
                  <strong>Programming languages:</strong> {data.skills.programming}
                  {data.skills.backend && <>{' '}<strong>Backend:</strong> {data.skills.backend}</>}
                  {data.skills.database && <>{' '}<strong>Database:</strong> {data.skills.database}</>}
                  {data.skills.frontend && <>{' '}<strong>Frontend:</strong> {data.skills.frontend}</>}
                </div>
              )}
              {data.skills.tools && (
                <div>
                  <strong>Tools:</strong> {data.skills.tools}
                  {data.skills.cloud && <>{' '}<strong>Cloud:</strong> {data.skills.cloud}</>}
                  {data.skills.aiml && <>{' '}<strong>AI/ML:</strong> {data.skills.aiml}</>}
                </div>
              )}
              {data.skills.softSkills && (
                <div><strong>Soft Skills:</strong> {data.skills.softSkills}</div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="r-section">
            <h2 className="r-section-title">EDUCATION</h2>
            <div className="r-edu">
              {data.education.map((edu, i) => (
                <div key={i} className="r-edu-row">
                  <span className="r-edu-school">&bull; <span dangerouslySetInnerHTML={{ __html: edu.school }} /></span>
                  <span className="r-edu-degree" dangerouslySetInnerHTML={{ __html: edu.degree }} />
                  <span className="r-edu-date">{edu.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="r-section">
            <h2 className="r-section-title">PROJECTS</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="r-entry">
                <div className="r-entry-header r-project-header">
                  <span className="r-entry-title">
                    <u>{proj.title}</u>
                    {proj.github && <> - <a href={proj.github}><i>GitHub Link</i></a></>}
                    {proj.link && <> - <a href={proj.link}><i>{proj.linkText || 'Website Link'}</i></a></>}
                  </span>
                  <span className="r-entry-date">{proj.date}</span>
                </div>
                <ul className="r-bullets">
                  {proj.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {data.achievements?.length > 0 && (
          <section className="r-section">
            <h2 className="r-section-title">ACHIEVEMENTS</h2>
            <ul className="r-bullets r-compact">
              {data.achievements.map((a, i) => (
                <li key={i}><strong>{a.title}</strong> - {a.description}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <section className="r-section">
            <h2 className="r-section-title">CERTIFICATIONS</h2>
            <ul className="r-bullets r-compact">
              {data.certifications.map((c, i) => (
                <li key={i}><strong>{c.title}</strong> - {c.description}</li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
});

export default ResumePreview;
