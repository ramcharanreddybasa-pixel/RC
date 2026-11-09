import React from 'react';
import { Terminal, Cpu, Layers, MessageSquare } from 'lucide-react';

const focusAreas = [
  {
    index: '01',
    title: 'Algorithmic Rigor',
    description: 'Mastering algorithmic problem solving, computational complexity, and clean modular code in Python.',
    icon: Terminal,
  },
  {
    index: '02',
    title: 'Tangible Software',
    description: 'Transforming theoretical knowledge into real, responsive web interfaces that people can click, type into, and rely on.',
    icon: Layers,
  },
  {
    index: '03',
    title: 'Applied Intelligence',
    description: 'Exploring machine learning principles, generative AI orchestration, and automated logic workflows.',
    icon: Cpu,
  },
  {
    index: '04',
    title: 'Teamwork & Communication',
    description: 'Cultivating strong technical articulation, cooperative workflows, and cross-disciplinary collaboration.',
    icon: MessageSquare,
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[var(--border-hairline)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-3">
            01 / Background & Philosophy
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight [text-wrap:balance]">
            Curiosity as a compass. Craft as a discipline.
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            <p>
              I am driven by learning new paradigms and immediately testing them against real constraints. Rather than remaining passive with theory, I enjoy <strong className="text-[var(--text-primary)] font-semibold">turning what I learn into functioning software</strong> that handles user input, executes business rules, and delivers clean utility.
            </p>
            <p>
              Currently enrolled in my 1st year of <strong className="text-[var(--text-primary)] font-semibold">B.Tech Computer Science and Engineering (Artificial Intelligence) at Joy University</strong>, I am systematically sharpening both my technical engineering craft and my communication abilities.
            </p>
            <p className="text-sm text-[var(--text-muted)] font-mono-code pt-4 border-t border-[var(--border-hairline)]">
              North Star Goal: Deepen systems mastery and launch my own venture in intelligent software and AI.
            </p>
          </div>

          {/* Core Focus Pillars Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusAreas.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.index}
                  className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:border-[var(--border-active)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono-code text-xs font-bold text-[var(--accent-primary)]">
                        {item.index}.
                      </span>
                      <Icon className="w-4 h-4 text-[var(--text-muted)]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
