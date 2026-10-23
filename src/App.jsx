import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import CinematicSceneBackdrop from './components/CinematicSceneBackdrop';
import SectionFlipper from './components/SectionFlipper';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';
import CinematicWipe from './components/CinematicWipe';
import IntroVideo from './components/IntroVideo';

const SECTION_IDS = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];

export default function App() {
  const animationEnabled = true;
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [activeScene, setActiveScene] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (SECTION_IDS.includes(hashId)) return hashId;
    }
    return 'hero';
  });
  const wipeRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Cinematic Full-Screen Wipe Navigation (Jason Bergh Inspiration)
  const handleNavigate = useCallback((href) => {
    const targetId = typeof href === 'string' ? href.replace(/^#/, '') : '';
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('in-view');
    }

    if (wipeRef.current) {
      wipeRef.current.navigate(href);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Support Browser Back / Forward Button Navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash || '#hero';
      const target = document.getElementById(hash.replace(/^#/, ''));
      if (target) target.classList.add('in-view');
      if (wipeRef.current) {
        wipeRef.current.navigate(hash, { isBrowserHistory: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle direct URL access with hash on initial mount (e.g., /#projects)
  useEffect(() => {
    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash);
      if (initialTarget) {
        initialTarget.classList.add('in-view');
        setTimeout(() => {
          initialTarget.scrollIntoView({ behavior: 'auto' });
          initialTarget.classList.add('in-view');
        }, 50);
      }
    }
  }, []);

  // Coordinated Scene Tracking via IntersectionObserver with eager trigger margins
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (!wipeRef.current?.isTransitioning()) {
            setActiveScene(entry.target.id);
          }
        }
      });
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const observer = new IntersectionObserver(observerCallback, {
      threshold: isMobile ? 0.01 : 0.05,
      rootMargin: isMobile ? '240px 0px 80px 0px' : '140px 0px -20px 0px',
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('section-reveal-ready');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Background Interactive Particles (paused during intro for max video GPU/CPU performance) */}
      <ParticleCanvas animationEnabled={animationEnabled && !showIntro} />
      <CinematicSceneBackdrop activeScene={activeScene} />

      {/* Full-Screen Upward Cinematic Wipe (Jason Bergh Inspired) */}
      <CinematicWipe
        ref={wipeRef}
        onScenePrepare={(nextScene) => setActiveScene(nextScene)}
      />

      {/* Ownitt-style Section Flipper & Kinetic Navigation Dock */}
      <SectionFlipper onNavigate={handleNavigate} />

      {/* Sticky Glass Navigation Bar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Portfolio Sections */}
      <main id="main-content">
        <Hero onScrollNext={handleNavigate} />
        <About />
        <Education />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Contact onShowToast={showToast} />
      </main>

      {/* Global Footer with transition navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* Detailed Project Architecture Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

      {/* Cinematic Full-Screen Video Intro (ekko.mp4) */}
      {showIntro && (
        <IntroVideo onComplete={() => setShowIntro(false)} />
      )}
    </div>
  );
}
