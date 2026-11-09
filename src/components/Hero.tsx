import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Terminal as TerminalIcon, Play, RotateCcw, Sparkles, Mail, ExternalLink } from 'lucide-react';
import { NeuralCanvas } from './NeuralCanvas.tsx';
import { playClickSound } from '../utils/sound.ts';
import { copyToClipboard } from '../utils/clipboard.ts';

const USER_EMAIL = 'ramchranreddybasa@gmail.com';

interface Snippet {
  id: string;
  tabLabel: string;
  title: string;
  code: string;
  output: string;
}

const interactiveSnippets: Snippet[] = [
  {
    id: 'ai-matrix',
    tabLabel: 'ai_eval.py',
    title: 'ai_evaluation_engine.py',
    code: `# Basa Ramcharan Reddy — CSE (AI) Joy University
def run_academic_evaluator(scores: dict) -> dict:
    total = sum(scores.values())
    percentage = (total / (len(scores) * 100)) * 100
    passed = all(s >= 35 for s in scores.values()) and percentage >= 40
    grade = 'A+' if percentage >= 90 else ('A' if percentage >= 80 else 'B')
    return {"total": total, "pct": round(percentage, 1), "grade": grade, "pass": passed}

# Test invocation:
results = run_academic_evaluator({"math": 94, "ai": 96, "py": 91, "ds": 88, "eng": 85})
print(f"Status: {'PASS' if results['pass'] else 'FAIL'} | Honors: {results['grade']} ({results['pct']}%)")`,
    output: `[Engine initialized: Joy University CSE-AI runtime]
Status: PASS | Honors: A+ (90.8%)
Execution time: 3.8ms · Memory footprint: 12.1MB
Constraints verified: ALL_SUBJECTS_MET_THRESHOLD`,
  },
  {
    id: 'table-guard',
    tabLabel: 'table_guard.py',
    title: 'table_reservation_guard.py',
    code: `class TableReservationEngine:
    CAPACITY_PER_SLOT = 3  # Maximum allowed tables
    
    def __init__(self):
        self.reservations = {}
        
    def reserve(self, date: str, slot: str, guest: str, count: int) -> str:
        key = f"{date}@{slot}"
        slot_bookings = self.reservations.get(key, [])
        if len(slot_bookings) >= self.CAPACITY_PER_SLOT:
            raise OverbookingError(f"Slot {slot} on {date} is at peak capacity.")
        ref_id = f"TB-{len(slot_bookings) + 101}"
        slot_bookings.append({"ref": ref_id, "guest": guest, "guests": count})
        self.reservations[key] = slot_bookings
        return ref_id`,
    output: `[Reservation Controller: RUNNING]
Guard state: MAX_3_TABLES_PER_SLOT enforced
Test booking: Ref #TB-101 created for Basa Ramcharan Reddy (2 guests)
Available slots for 07:30 PM: 2 remaining`,
  },
  {
    id: 'startup-vision',
    tabLabel: 'vision.sh',
    title: 'startup_trajectory.sh',
    code: `#!/usr/bin/env bash
# North Star Trajectory — Autonomous Intelligent Systems
echo "Founder: Basa Ramcharan Reddy"
echo "University: Joy University · Year 1"
echo "Thesis: Bridge algorithmic models with production software"
echo "Target: High-impact AI venture built on verified software architectures"`,
    output: `[Trajectory Target: Founding High-Impact AI Startup]
Focus 1: Algorithmic Python systems & computational theory
Focus 2: Production web engineering with verified constraints
Focus 3: Applied Generative AI systems architecture`,
  },
];

interface HeroProps {
  theme: 'dark' | 'light';
  onOpenCommandPalette: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onOpenCommandPalette }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string>(interactiveSnippets[0].output);

  const handleCopyEmail = async () => {
    playClickSound('success');
    const success = await copyToClipboard(USER_EMAIL);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunTest = () => {
    playClickSound('blip');
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setConsoleLogs(interactiveSnippets[activeTab].output);
      playClickSound('success');
    }, 280);
  };

  const currentSnippet = interactiveSnippets[activeTab];

  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[var(--border-hairline)] overflow-hidden">
      {/* Interactive Neural Canvas Background */}
      <NeuralCanvas theme={theme} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          
          {/* Left Column: Typographic Hierarchy & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata Kicker (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-5">
                <span className="text-[var(--accent-primary)] font-bold">Portfolio 2026</span>
                <span aria-hidden="true">/</span>
                <span>Computer Science & AI</span>
                <span aria-hidden="true">/</span>
                <span>Joy University</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08] mb-6 [text-wrap:balance]">
                Building intelligent systems that turn ideas into software.
              </h1>

              {/* Lead Copy */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
                I am <strong className="text-[var(--text-primary)] font-semibold">Basa Ramcharan Reddy</strong>, a 1st-year B.Tech CSE (Artificial Intelligence) student at Joy University. I build functional web applications, engineer algorithmic logic in Python, and develop software toward launching my own AI startup.
              </p>
            </div>

            {/* Actions & Interactive Affordances */}
            <div>
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <a
                  href="#projects"
                  onClick={() => playClickSound('tick')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Email Direct Action Button */}
                <a
                  href={`mailto:${USER_EMAIL}?subject=Hello%20Ramcharan`}
                  onClick={() => playClickSound('tick')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-subtle)] text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Email</span>
                </a>

                {/* LinkedIn Profile Button */}
                <a
                  href="https://www.linkedin.com/in/basaramcharanreddy-undefined-5954b1439"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound('tick')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-subtle)] text-[var(--text-primary)] transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 fill-current text-[#0a66c2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>

                {/* GitHub Profile Button */}
                <a
                  href="https://github.com/ramcharanreddybasa-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound('tick')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-subtle)] text-[var(--text-primary)] transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>

                {/* Email Copy Trigger */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono-code border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                {/* Command Palette Quick Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound('blip');
                    onOpenCommandPalette();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-mono-code border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--accent-primary)] hover:bg-[var(--surface-card-subtle)] transition-all cursor-pointer"
                  title="Open Command Launcher (⌘K)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⌘K Menu</span>
                </button>
              </div>

              {/* Status Line */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono-code">
                <span>Available for collaborations & internships</span>
                <span aria-hidden="true">·</span>
                <span>Joy University, Year 1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Console Workbench */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)]/95 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col h-full">
              
              {/* Console Window Header */}
              <div className="px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                  <span className="text-xs font-mono-code font-semibold text-[var(--text-primary)] truncate">
                    {currentSnippet.title}
                  </span>
                </div>
                
                {/* Segmented Snippet Switcher */}
                <div className="flex items-center gap-1 bg-[var(--bg-canvas)] p-1 rounded-md border border-[var(--border-hairline)] shrink-0">
                  {interactiveSnippets.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        playClickSound('tick');
                        setActiveTab(idx);
                        setConsoleLogs(s.output);
                      }}
                      className={`px-2 py-0.5 text-[11px] font-mono-code rounded transition-colors cursor-pointer ${
                        activeTab === idx
                          ? 'bg-[var(--accent-primary)] text-white font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {s.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Editor Pane */}
              <div className="p-4 sm:p-5 flex-1 font-mono-code text-xs leading-relaxed overflow-x-auto text-[var(--text-secondary)] bg-[var(--surface-card)] select-text">
                <pre className="whitespace-pre">
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>

              {/* Execution Bar */}
              <div className="p-4 border-t border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[var(--text-muted)] uppercase tracking-wider">
                    Interactive Python Engine
                  </span>
                  <button
                    type="button"
                    onClick={handleRunTest}
                    disabled={isExecuting}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isExecuting ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Computing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Snippet</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Console Box */}
                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-xs font-mono-code text-emerald-500 whitespace-pre-wrap animate-in fade-in duration-150">
                  {consoleLogs}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section 2.B Requirement: Full-Width Metric Strip Below Hero Split */}
        <div className="mt-14 pt-8 border-t border-[var(--border-hairline)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono-code">
              1st Year
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
              B.Tech CSE (AI) · Joy University
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono-code">
              02 Apps
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
              Live Interactive Web Software
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono-code">
              Python & AI
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
              Algorithms, Data & Foundations
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono-code">
              Founder
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
              Future AI Technology Startup
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
