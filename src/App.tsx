/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Projects } from './components/Projects.tsx';
import { Skills } from './components/Skills.tsx';
import { Milestones } from './components/Milestones.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { RestaurantDemoModal } from './components/RestaurantDemoModal.tsx';
import { ResultCardDemoModal } from './components/ResultCardDemoModal.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isRestaurantDemoOpen, setIsRestaurantDemoOpen] = useState(false);
  const [isResultCardDemoOpen, setIsResultCardDemoOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Theme state: initialized from localStorage or default 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'milestones', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut: close modals on Escape key, open Command Palette on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsRestaurantDemoOpen(false);
        setIsResultCardDemoOpen(false);
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] font-body selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-200">
      {/* Top Bar following Top Bar Contract */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          theme={theme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <About />
        <Projects
          onOpenRestaurantDemo={() => setIsRestaurantDemoOpen(true)}
          onOpenResultCardDemo={() => setIsResultCardDemoOpen(true)}
        />
        <Skills />
        <Milestones />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Simulation Modals */}
      <RestaurantDemoModal
        isOpen={isRestaurantDemoOpen}
        onClose={() => setIsRestaurantDemoOpen(false)}
      />
      <ResultCardDemoModal
        isOpen={isResultCardDemoOpen}
        onClose={() => setIsResultCardDemoOpen(false)}
      />

      {/* Developer Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        theme={theme}
        onOpenRestaurantDemo={() => setIsRestaurantDemoOpen(true)}
        onOpenResultCardDemo={() => setIsResultCardDemoOpen(true)}
      />
    </div>
  );
}
