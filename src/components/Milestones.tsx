import React from 'react';
import { CheckCircle2, Clock, GraduationCap, Target } from 'lucide-react';

const milestones = [
  {
    index: '01',
    category: 'Academic Foundation',
    status: 'Achieved',
    isDone: true,
    title: 'B.Tech CSE (AI) Admission & Foundation',
    institution: 'Joy University, Year 1',
    description: 'Enrolled in Computer Science and Engineering with an Artificial Intelligence specialization, undertaking formal study in computational logic, mathematics, and software design.',
  },
  {
    index: '02',
    category: 'Technical Craft',
    status: 'Achieved',
    isDone: true,
    title: 'Python Scripting & Core Web Engineering',
    institution: 'Hands-on Projects & Self-Direction',
    description: 'Attained solid practical proficiency in Python 3 algorithms, functional structuring, and responsive, standards-compliant HTML5/CSS3 interfaces.',
  },
  {
    index: '03',
    category: 'Engineering Target',
    status: 'Active Pursuit',
    isDone: false,
    title: 'Advanced Systems & Computational Rigor',
    institution: 'Undergraduate Trajectory',
    description: 'Systematically deepening knowledge in data structures, algorithms, system architecture, and modern applied generative AI workflows.',
  },
  {
    index: '04',
    category: 'North Star Goal',
    status: 'Active Pursuit',
    isDone: false,
    title: 'Founding an Intelligent Tech Startup',
    institution: 'Entrepreneurial Vision',
    description: 'Actively designing and validating proprietary software products with the ambition of launching a scalable, high-impact artificial intelligence venture.',
  },
];

const educationHistory = [
  {
    status: 'Current',
    degree: 'B.Tech, Computer Science & Engineering (AI)',
    institution: 'Joy University',
    timeline: '2026 – Present (1st Year)',
    active: true,
  },
  {
    status: 'Completed',
    degree: 'Intermediate (Pre-University)',
    institution: 'Board of Intermediate Education',
    timeline: 'Completed with Strong Foundations',
    active: false,
  },
  {
    status: 'Completed',
    degree: 'Secondary School (10th Standard)',
    institution: 'Board of Secondary Education',
    timeline: 'Foundational Education',
    active: false,
  },
];

export const Milestones: React.FC = () => {
  return (
    <section id="milestones" className="py-20 sm:py-28 border-b border-[var(--border-hairline)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-3">
            04 / Trajectory & Milestones
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Academic foundation to startup vision.
          </h2>
        </div>

        {/* 2-Column Split: Milestones + Education Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Milestones Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Key Strategic Milestones
            </div>

            {milestones.map((m) => (
              <div
                key={m.index}
                className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:border-[var(--border-active)] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
                    <span className="font-bold text-[var(--accent-primary)]">{m.index}.</span>
                    <span>{m.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{m.institution}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold text-[var(--text-secondary)]">
                    {m.isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">{m.status}</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span className="text-[var(--accent-primary)]">{m.status}</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>

          {/* Education Timeline (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Academic Roadmap
            </div>

            <div className="space-y-4">
              {educationHistory.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-code text-[var(--text-muted)]">
                      {edu.status}
                    </span>
                    <GraduationCap className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-1">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-[var(--text-secondary)] font-medium">
                    {edu.institution}
                  </div>
                  <div className="text-[11px] font-mono-code text-[var(--text-muted)] mt-2">
                    {edu.timeline}
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Ethos Box */}
            <div className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-left">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--accent-primary)] font-semibold mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>Operating Principle</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                “Continuous Progress · Rigorous Fundamentals · Shipped Solutions. Every milestone represents dedicated coursework, functional software development, and real-world AI applications.”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
