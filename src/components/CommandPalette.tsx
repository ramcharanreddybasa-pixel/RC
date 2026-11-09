import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sun, Moon, Calendar, Award, Copy, Check, ExternalLink, X, Volume2, VolumeX } from 'lucide-react';
import { playClickSound, isSoundEnabled, setSoundEnabled } from '../utils/sound.ts';
import { copyToClipboard } from '../utils/clipboard.ts';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  theme: 'dark' | 'light';
  onOpenRestaurantDemo: () => void;
  onOpenResultCardDemo: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  theme,
  onOpenRestaurantDemo,
  onOpenResultCardDemo,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      playClickSound('blip');
    }
  }, [isOpen]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound('success');
  };

  const openExternalLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard('ramchranreddybasa@gmail.com');
    if (success) {
      setCopied(true);
      playClickSound('success');
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1200);
    }
  };

  const scrollTo = (id: string) => {
    playClickSound('tick');
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 84;
      const elPosition = el.getBoundingClientRect().top;
      const offset = elPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const commands = [
    {
      id: 'proj-rest',
      category: 'Simulations',
      title: 'Run Restaurant Reservation Engine',
      subtitle: 'Table validation & capacity enforcement',
      icon: Calendar,
      action: () => {
        playClickSound('blip');
        onClose();
        onOpenRestaurantDemo();
      },
    },
    {
      id: 'proj-result',
      category: 'Simulations',
      title: 'Run Student Result Card Evaluator',
      subtitle: 'Multi-subject computational grading',
      icon: Award,
      action: () => {
        playClickSound('blip');
        onClose();
        onOpenResultCardDemo();
      },
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Jump to About & Philosophy',
      subtitle: 'Curiosity & engineering focus pillars',
      icon: ArrowRight,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Jump to Selected Works',
      subtitle: 'Interactive applications & systems',
      icon: ArrowRight,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Jump to Capability Matrix',
      subtitle: 'Python, HTML/CSS, Gen AI & Git',
      icon: ArrowRight,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-milestones',
      category: 'Navigation',
      title: 'Jump to Milestones & Trajectory',
      subtitle: 'Academic foundation & startup goal',
      icon: ArrowRight,
      action: () => scrollTo('milestones'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Jump to Contact Hub',
      subtitle: 'Direct email & message dispatcher',
      icon: ArrowRight,
      action: () => scrollTo('contact'),
    },
    {
      id: 'action-copy-email',
      category: 'Action',
      title: copied ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      subtitle: 'ramchranreddybasa@gmail.com',
      icon: copied ? Check : Copy,
      action: handleCopy,
    },
    {
      id: 'action-theme',
      category: 'Preference',
      title: theme === 'light' ? 'Switch to Dark Theme' : 'Switch to High-Contrast Light Theme',
      subtitle: 'Adjust contrast and interface lighting',
      icon: theme === 'light' ? Moon : Sun,
      action: () => {
        playClickSound('tick');
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'action-sound',
      category: 'Preference',
      title: soundOn ? 'Mute Interface Sound Effects' : 'Enable Tactile Audio Feedback',
      subtitle: 'Synthesized Web Audio clicks & blips',
      icon: soundOn ? VolumeX : Volume2,
      action: toggleSound,
    },
    {
      id: 'ext-linkedin',
      category: 'Social',
      title: 'Open LinkedIn Profile',
      subtitle: 'basaramcharanreddy-undefined-5954b1439',
      icon: ExternalLink,
      action: () => {
        playClickSound('tick');
        openExternalLink('https://www.linkedin.com/in/basaramcharanreddy-undefined-5954b1439');
        onClose();
      },
    },
    {
      id: 'ext-github',
      category: 'Social',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/ramcharanreddybasa-pixel',
      icon: ExternalLink,
      action: () => {
        playClickSound('tick');
        openExternalLink('https://github.com/ramcharanreddybasa-pixel');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      playClickSound('tick');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      playClickSound('tick');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--surface-card)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)]">
          <Search className="w-4 h-4 text-[var(--text-muted)] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. project, email, theme)..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none font-mono-code"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono-code text-[var(--text-muted)]">
              No matching commands found for "{query}".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'hover:bg-[var(--surface-card-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isSelected
                          ? 'border-white/20 bg-white/10 text-white'
                          : 'border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--accent-primary)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <div className="truncate">
                      <div className={`font-semibold ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                        {cmd.title}
                      </div>
                      <div className={`text-[11px] font-mono-code truncate ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono-code uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface-card-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Footer Hints */}
        <div className="px-4 py-2.5 border-t border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[11px] font-mono-code text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-[var(--accent-primary)] font-bold">⌘K Launcher</span>
        </div>
      </div>
    </div>
  );
};
