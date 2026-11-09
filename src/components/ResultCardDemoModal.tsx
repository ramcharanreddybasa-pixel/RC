import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, ExternalLink, RotateCcw } from 'lucide-react';
import { SubjectScore } from '../types.ts';

interface ResultCardDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SUBJECTS: SubjectScore[] = [
  { id: 'm-math', name: 'Mathematics & Logic', score: 94 },
  { id: 'm-ai', name: 'Artificial Intelligence Foundations', score: 96 },
  { id: 'm-py', name: 'Python Programming', score: 91 },
  { id: 'm-ds', name: 'Data Structures & Algorithms', score: 88 },
  { id: 'm-eng', name: 'Technical English & Communication', score: 85 },
];

export const ResultCardDemoModal: React.FC<ResultCardDemoModalProps> = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('Basa Ramcharan Reddy');
  const [rollNumber, setRollNumber] = useState('26JOYCS089');
  const [subjects, setSubjects] = useState<SubjectScore[]>(DEFAULT_SUBJECTS);

  const handleScoreChange = (id: string, value: string) => {
    let num = parseInt(value, 10);
    if (isNaN(num)) num = 0;
    num = Math.max(0, Math.min(100, num));
    setSubjects(subjects.map((sub) => (sub.id === id ? { ...sub, score: num } : sub)));
  };

  const handleResetSample = () => {
    setStudentName('Basa Ramcharan Reddy');
    setRollNumber('26JOYCS089');
    setSubjects(DEFAULT_SUBJECTS);
  };

  // Computations
  const total = subjects.reduce((sum, s) => sum + s.score, 0);
  const maxTotal = subjects.length * 100;
  const percentage = (total / maxTotal) * 100;
  const anyFailed = subjects.some((s) => s.score < 35);
  const isPassed = !anyFailed && percentage >= 40;

  let grade = 'F';
  if (isPassed) {
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else grade = 'D';
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)]">
          <div>
            <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase">
              Live Simulation · Academic Computation Algorithm
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--text-primary)]">
              Student Academic Result Evaluator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <span>Algorithm: 5-Subject Weighted Rubric (Pass ≥ 35/100 each)</span>
            </div>
            <a
              href="https://github.com/ramcharanreddybasa-pixel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>GitHub @ramcharanreddybasa-pixel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Adjust student credentials and subject marks below. The evaluator applies real-time threshold validation, calculates percentage, determines honors grade, and renders visual score bars.
          </p>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)]">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Basa Ramcharan Reddy"
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)]">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. 26JOYCS089"
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
            </div>

            {/* Subject Marks Sliders */}
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className={sub.id === 'm-eng' ? 'sm:col-span-2 space-y-1.5' : 'space-y-1.5'}
              >
                <div className="flex items-center justify-between text-xs font-mono-code text-[var(--text-secondary)]">
                  <span>{sub.name}</span>
                  <span className="font-bold text-[var(--accent-primary)] font-mono-code">{sub.score} / 100</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sub.score}
                    onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                    className="flex-1 accent-[var(--accent-primary)] cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sub.score}
                    onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                    className="w-16 px-2 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-center text-xs font-mono-code"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleResetSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] hover:bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Baseline</span>
            </button>
          </div>

          {/* Generated Result Card Display */}
          <div className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
              <div>
                <h4 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {studentName || 'Student Name'}
                </h4>
                <div className="text-xs font-mono-code text-[var(--text-secondary)]">
                  Roll No: <strong className="text-[var(--text-primary)]">{rollNumber || 'N/A'}</strong> · Joy University
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono-code font-bold uppercase tracking-wider ${
                  isPassed
                    ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/30'
                    : 'text-rose-500 bg-rose-500/10 border border-rose-500/30'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>{isPassed ? 'Status: PASS' : 'Status: FAIL'}</span>
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-3 font-mono-code text-xs">
              {subjects.map((sub) => (
                <div key={sub.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">{sub.name}</span>
                    <span className="font-bold text-[var(--text-primary)]">{sub.score} / 100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-canvas)] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        sub.score < 35 ? 'bg-rose-500' : 'bg-[var(--accent-primary)]'
                      }`}
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--border-hairline)] text-center font-mono-code">
              <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)]">
                <div className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {total} / {maxTotal}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Aggregate</div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)]">
                <div className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {percentage.toFixed(1)}%
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Percentage</div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)]">
                <div className="text-base sm:text-lg font-bold text-[var(--accent-primary)] flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{grade}</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Final Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
