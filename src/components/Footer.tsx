import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)] font-mono-code transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span>© 2026 </span>
          <span className="text-[var(--text-primary)] font-bold">Basa Ramcharan Reddy</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>B.Tech CSE (AI), Joy University</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ramcharanreddybasa-pixel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/basaramcharanreddy-undefined-5954b1439"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ramchranreddybasa@gmail.com&su=Hello%20Ramcharan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Email
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--surface-card)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
