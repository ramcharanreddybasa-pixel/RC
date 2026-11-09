import React from 'react';
import { Terminal, Code, Cpu, Users } from 'lucide-react';

const skillCategories = [
  {
    discipline: 'Core Programming',
    primary: 'Python 3',
    proficiency: 'Solid Foundations',
    icon: Terminal,
    topics: ['Algorithmic Logic', 'Functions & Modularity', 'Data Structures', 'Exception Handling', 'Scripting'],
    application: 'Powers backend algorithms, numerical data processing, and validation pipelines in working web projects.',
  },
  {
    discipline: 'Web Engineering',
    primary: 'HTML5 & CSS3',
    proficiency: 'Production Craft',
    icon: Code,
    topics: ['Responsive Architecture', 'Semantic Layouts', 'CSS Variables & Themes', 'DOM Interaction', 'Form Validation'],
    application: 'Designs and builds accessible, high-contrast, multi-device interfaces with zero clutter.',
  },
  {
    discipline: 'Artificial Intelligence',
    primary: 'Gen AI & Math Foundations',
    proficiency: 'Active Study',
    icon: Cpu,
    topics: ['Generative AI Primitives', 'Prompt Architecture', 'Discrete Math & Logic', 'Model Integration Basics'],
    application: 'Undergraduate specialization at Joy University CSE (AI), actively building intelligent applications.',
  },
  {
    discipline: 'Systems & Collaboration',
    primary: 'Teamwork & Git',
    proficiency: 'Practicing Discipline',
    icon: Users,
    topics: ['Version Control (GitHub)', 'Collaborative Planning', 'Technical Articulation', 'Milestone Execution'],
    application: 'Focusing on transparent communication and iterative delivery across engineering teams.',
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-3">
            03 / Technical Competency & Tooling
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Engineering capability matrix.
          </h2>
        </div>

        {/* 4 Architectural Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:border-[var(--border-active)] transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[var(--border-hairline)]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--surface-card-subtle)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--accent-primary)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase">
                          {cat.discipline}
                        </div>
                        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                          {cat.primary}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono-code text-[var(--accent-primary)] font-semibold">
                      {cat.proficiency}
                    </span>
                  </div>

                  {/* Clean Unboxed Key Topics (Zero-Pill Rule) */}
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2 text-xs text-[var(--text-secondary)] font-mono-code mb-4">
                    {cat.topics.map((t, tIdx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {tIdx < cat.topics.length - 1 && <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Application Note */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cat.application}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
