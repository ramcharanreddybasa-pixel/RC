import React, { useState } from 'react';
import { Sun, Moon, ArrowUpRight, Search, Volume2, VolumeX, Mail } from 'lucide-react';
import { playClickSound, isSoundEnabled, setSoundEnabled } from '../utils/sound.ts';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  onToggleTheme,
  onOpenCommandPalette,
}) => {
  const isLight = theme === 'light';
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound('success');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    playClickSound('tick');
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 84;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
        >
          Basa Ramcharan Reddy
        </a>

        {/* Zone 2: 4–5 Clean Single-Line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Command Launcher (⌘K) */}
          <button
            type="button"
            onClick={() => {
              playClickSound('blip');
              onOpenCommandPalette();
            }}
            aria-label="Open command palette"
            title="Open command palette (Ctrl+K or ⌘K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer text-xs font-mono-code"
          >
            <Search className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[10px] bg-[var(--surface-card-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
              ⌘K
            </kbd>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundOn ? 'Mute sound effects' : 'Enable tactile audio feedback'}
            className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              playClickSound('tick');
              onToggleTheme();
            }}
            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
            title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
            className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {isLight ? <Moon className="w-4 h-4 text-slate-800" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Social & Contact Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-1.5 pl-1 border-l border-[var(--border-hairline)]">
            <a
              href="https://www.linkedin.com/in/basaramcharanreddy-undefined-5954b1439"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[#0a66c2] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
            <a
              href="https://github.com/ramcharanreddybasa-pixel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="mailto:ramchranreddybasa@gmail.com?subject=Hello%20Ramcharan"
              aria-label="Send Email"
              title="Send Email to ramchranreddybasa@gmail.com"
              className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Primary Action Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
