import { useState, useEffect, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', name: 'Intro', num: '01' },
  { id: 'about', name: 'About', num: '02' },
  { id: 'skills', name: 'Skills', num: '03' },
  { id: 'projects', name: 'Work', num: '04' },
  { id: 'achievements', name: 'Credentials', num: '05' },
  { id: 'contact', name: 'Contact', num: '06' },
];

/**
 * Ownitt-Style Section Flipper & Kinetic Navigation Dock
 * Inspired by https://ownitt.fr/
 * Features:
 * - Sleek floating right-edge section pagination dock (01..06)
 * - Active section tracking with glowing capsule & progress dot
 * - 1-Click section flipping via PageTransitionVeil doors
 * - Keyboard paging support (PageDown/PageUp/Down/Up)
 * - Quick 'Next Section' flip trigger
 */
export default function SectionFlipper({ onNavigate }) {
  const [activeId, setActiveId] = useState('hero');

  // Track active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(s.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = useCallback((sectionId) => {
    if (onNavigate) {
      onNavigate(`#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onNavigate]);

  const goToNext = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeId);
    if (currentIndex < SECTIONS.length - 1) {
      goToSection(SECTIONS[currentIndex + 1].id);
    }
  }, [activeId, goToSection]);

  const goToPrev = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeId);
    if (currentIndex > 0) {
      goToSection(SECTIONS[currentIndex - 1].id);
    }
  }, [activeId, goToSection]);

  // Keyboard Navigation: PageDown / PageUp for smooth flipping like ownitt.fr
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <aside className="ownitt-section-flipper" aria-label="Section Flip Navigation">
      <div className="flipper-track">
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`flipper-item ${isActive ? 'active' : ''}`}
              onClick={() => goToSection(s.id)}
              title={`${s.num} · ${s.name}`}
              aria-label={`Go to ${s.name} section`}
            >
              <span className="flipper-label">{s.name}</span>
              <span className="flipper-num">{s.num}</span>
              <span className="flipper-bullet" />
            </button>
          );
        })}
      </div>

      {/* Floating Section Flip Control (Next Page) */}
      <button
        type="button"
        className="flipper-next-btn"
        onClick={goToNext}
        title="Flip to next section"
        aria-label="Next section"
      >
        <i className="fa-solid fa-chevron-down" />
      </button>
    </aside>
  );
}
