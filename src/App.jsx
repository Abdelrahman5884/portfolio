import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import BackgroundBlobs from './components/BackgroundBlobs';
import SectionFlipper from './components/SectionFlipper';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';

const SECTION_IDS = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];

export default function App() {
  const animationEnabled = true;
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Silky Smooth Section Navigation (No jarring door lines or wheel hijacking)
  const handleNavigate = useCallback((href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Ownitt-Style Section Reveal Animations via IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
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
      {/* Background Interactive Particles & Ambient Blobs */}
      <ParticleCanvas animationEnabled={animationEnabled} />
      <BackgroundBlobs />

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

      {/* Global Footer */}
      <Footer />

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
    </div>
  );
}
