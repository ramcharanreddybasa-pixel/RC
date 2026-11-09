import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard.ts';
import { playClickSound } from '../utils/sound.ts';

const USER_EMAIL = 'ramchranreddybasa@gmail.com';
const USER_LINKEDIN = 'https://www.linkedin.com/in/basaramcharanreddy-undefined-5954b1439';
const USER_GITHUB = 'https://github.com/ramcharanreddybasa-pixel';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Project Collaboration');
  const [message, setMessage] = useState('');
  const [composedMailto, setComposedMailto] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    playClickSound('success');
    const success = await copyToClipboard(USER_EMAIL);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound('success');
    const mailto = `mailto:${USER_EMAIL}?subject=${encodeURIComponent(
      `[Portfolio Inquiry - ${subject}] from ${name || 'Colleague'}`
    )}&body=${encodeURIComponent(
      `Hi Ramcharan,\n\n${message}\n\nBest regards,\n${name}`
    )}`;
    setComposedMailto(mailto);
    try {
      window.location.href = mailto;
    } catch {
      // Fallback handled by in-app button
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${USER_EMAIL}&su=Hello%20Ramcharan`;

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono-code mb-3">
            05 / Direct Communication Hub
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Let’s build something intelligent.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4">
            Have an idea, project, or internship inquiry? Reach out directly.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Direct Links & Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-7 rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)] uppercase mb-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Primary Email</span>
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 select-all">
                {USER_EMAIL}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] hover:bg-[var(--surface-card)] text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm"
                >
                  <span>Open in Gmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social & Professional Connections */}
            <div className="p-7 rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-xs space-y-4">
              <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase">
                Verified Profiles
              </div>

              {/* LinkedIn Button Card */}
              <a
                href={USER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] hover:border-[var(--border-active)] hover:bg-[var(--surface-card)] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0a66c2]/10 border border-[#0a66c2]/20 flex items-center justify-center text-[#0a66c2] shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      Connect on LinkedIn
                    </div>
                    <div className="text-xs font-mono-code text-[var(--text-muted)] truncate max-w-[240px]">
                      /in/basaramcharanreddy-undefined-5954b1439
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0" />
              </a>

              {/* GitHub Button Card */}
              <a
                href={USER_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] hover:border-[var(--border-active)] hover:bg-[var(--surface-card)] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      Explore on GitHub
                    </div>
                    <div className="text-xs font-mono-code text-[var(--text-muted)]">
                      @ramcharanreddybasa-pixel
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0" />
              </a>
            </div>

          </div>

          {/* Right Column: Direct Inquiry Message Dispatcher (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-md">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
                Compose your message below. It will open directly in your mail client addressed to Ramcharan.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-[var(--text-secondary)]">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-[var(--text-secondary)]">Subject Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    >
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="AI / Tech Internship">AI / Tech Internship</option>
                      <option value="Mentorship & Advice">Mentorship & Advice</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-[var(--text-secondary)]">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Ramcharan, I came across your portfolio and wanted to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                    required
                  />
                </div>

                {composedMailto && (
                  <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono-code text-emerald-400 flex items-center justify-between gap-3 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Message generated! Opening mail client...</span>
                    </div>
                    <a
                      href={composedMailto}
                      className="underline font-bold hover:text-white"
                    >
                      Click here to launch ↗
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Ramcharan</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
