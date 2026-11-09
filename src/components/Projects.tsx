import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Calendar, Award, Code2, Layers, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../utils/sound.ts';

interface ProjectsProps {
  onOpenRestaurantDemo: () => void;
  onOpenResultCardDemo: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onOpenRestaurantDemo,
  onOpenResultCardDemo,
}) => {
  const [tab1, setTab1] = useState<'overview' | 'arch' | 'code'>('overview');
  const [tab2, setTab2] = useState<'overview' | 'arch' | 'code'>('overview');

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-[var(--border-hairline)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-3">
              02 / Selected Works & Systems
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Engineered software solutions.
            </h2>
          </div>
          <div className="text-sm text-[var(--text-muted)] font-mono-code max-w-sm">
            Interactive web applications with backend algorithmic logic, verifiable state constraints, and dynamic visualization.
          </div>
        </div>

        {/* 2 Featured Architectural Project Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Project 01: Restaurant Table Reservation Engine */}
          <article className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:border-[var(--border-active)] transition-all p-7 sm:p-9 flex flex-col justify-between shadow-lg group">
            <div>
              {/* Header with Title and Tab Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
                  <span className="text-[var(--accent-primary)] font-bold">01. Web App</span>
                  <span aria-hidden="true">·</span>
                  <span>Python Logic</span>
                  <span aria-hidden="true">·</span>
                  <span>HTML5 & CSS3</span>
                </div>

                {/* Sub-Tabs */}
                <div className="flex items-center gap-1 bg-[var(--surface-card-subtle)] p-1 rounded-lg border border-[var(--border-hairline)]">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab1('overview');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab1 === 'overview'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab1('arch');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab1 === 'arch'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Blueprint
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab1('code');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab1 === 'code'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Logic
                  </button>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-4">
                Restaurant Table Reservation Engine
              </h3>

              {/* Dynamic Content View based on Active Tab */}
              {tab1 === 'overview' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    A web application engineered to manage restaurant dining capacity with strict real-time constraints. It validates guest party sizes, verifies date schedules, prevents time-slot overbooking (maximum 3 tables per slot), and provides an interactive upcoming booking ledger with cancellation capability.
                  </p>
                  <div className="space-y-2 text-xs font-mono-code text-[var(--text-secondary)] pt-3 border-t border-[var(--border-hairline)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Capacity enforcement: Stops 4th reservation on filled slot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Restoration: Cancellation instantly frees table quota</span>
                    </div>
                  </div>
                </div>
              )}

              {tab1 === 'arch' && (
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] space-y-3 font-mono-code text-xs animate-in fade-in duration-150">
                  <div className="text-[11px] font-bold text-[var(--accent-primary)] uppercase">
                    System Data Flow Blueprint
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-[var(--text-secondary)]">
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>1. User Input Payload</span>
                      <span className="text-[var(--text-muted)]">[Name, Phone, Date, Slot, Guests]</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>2. Slot Registry Lookup</span>
                      <span className="text-[var(--text-muted)]">Check count &lt; MAX_TABLES (3)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>3. Ledger State Mutation</span>
                      <span className="text-emerald-500">Generate #TB-XXX and Append</span>
                    </div>
                  </div>
                </div>
              )}

              {tab1 === 'code' && (
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] font-mono-code text-xs text-[var(--text-secondary)] overflow-x-auto animate-in fade-in duration-150">
                  <pre>
                    <code>{`def reserve_table(date, time, party_size):
    active_in_slot = [b for b in registry if b.slot == time and b.date == date]
    if len(active_in_slot) >= 3:
        return {"status": "ERROR", "msg": "Slot capacity reached"}
    booking = Booking(id=f"TB-{uuid4()[:4]}", size=party_size)
    registry.append(booking)
    return {"status": "OK", "booking": booking}`}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-[var(--border-hairline)]">
              <button
                type="button"
                onClick={() => {
                  playClickSound('blip');
                  onOpenRestaurantDemo();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Launch Live Simulation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://github.com/ramcharanreddybasa-pixel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound('tick')}
                className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* Project 02: Student Academic Performance & Result Evaluator */}
          <article className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:border-[var(--border-active)] transition-all p-7 sm:p-9 flex flex-col justify-between shadow-lg group">
            <div>
              {/* Header with Title and Tab Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
                  <span className="text-[var(--accent-primary)] font-bold">02. Web App</span>
                  <span aria-hidden="true">·</span>
                  <span>Grading Algorithm</span>
                  <span aria-hidden="true">·</span>
                  <span>Data Visualizer</span>
                </div>

                {/* Sub-Tabs */}
                <div className="flex items-center gap-1 bg-[var(--surface-card-subtle)] p-1 rounded-lg border border-[var(--border-hairline)]">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab2('overview');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab2 === 'overview'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab2('arch');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab2 === 'arch'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Blueprint
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('tick');
                      setTab2('code');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded transition-colors cursor-pointer ${
                      tab2 === 'code'
                        ? 'bg-[var(--accent-primary)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Logic
                  </button>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-4">
                Student Academic Result Evaluator
              </h3>

              {/* Dynamic Content View based on Active Tab */}
              {tab2 === 'overview' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    An academic computational web tool that accepts student credentials and multi-discipline subject marks (0–100) to synthesize automated report cards. It applies conditional pass/fail logic, computes weighted totals, derives letter grade tiers (A+ through F), and generates visual distribution bars.
                  </p>
                  <div className="space-y-2 text-xs font-mono-code text-[var(--text-secondary)] pt-3 border-t border-[var(--border-hairline)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Minimum pass condition: All 5 disciplines ≥ 35 marks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Grading matrix: A+ (90%+), A (80%+), B (70%+), C (60%+)</span>
                    </div>
                  </div>
                </div>
              )}

              {tab2 === 'arch' && (
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] space-y-3 font-mono-code text-xs animate-in fade-in duration-150">
                  <div className="text-[11px] font-bold text-[var(--accent-primary)] uppercase">
                    Evaluation Matrix Flow
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-[var(--text-secondary)]">
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>1. Subject Vector Input</span>
                      <span className="text-[var(--text-muted)]">[Math, AI, Python, DS, English]</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>2. Threshold Evaluation</span>
                      <span className="text-[var(--text-muted)]">Check any &lt; 35 → Fail</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span>3. Vector Rendering</span>
                      <span className="text-emerald-500">Calculate % and Grade Badge</span>
                    </div>
                  </div>
                </div>
              )}

              {tab2 === 'code' && (
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] font-mono-code text-xs text-[var(--text-secondary)] overflow-x-auto animate-in fade-in duration-150">
                  <pre>
                    <code>{`def compute_report_card(student, marks_map):
    total = sum(marks_map.values())
    pct = (total / 500) * 100
    failed_any = any(m < 35 for m in marks_map.values())
    passed = not failed_any and pct >= 40
    grade = "A+" if pct >= 90 else ("A" if pct >= 80 else "B")
    return {"status": "PASS" if passed else "FAIL", "grade": grade}`}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-[var(--border-hairline)]">
              <button
                type="button"
                onClick={() => {
                  playClickSound('blip');
                  onOpenResultCardDemo();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Launch Live Simulation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://github.com/ramcharanreddybasa-pixel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound('tick')}
                className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
};
