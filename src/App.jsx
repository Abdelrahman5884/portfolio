import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import BackgroundBlobs from './components/BackgroundBlobs';
import ProjectModal from './components/ProjectModal';
import ImagePreviewModal from './components/ImagePreviewModal';
import Toast from './components/Toast';

export default function App() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  return (
    <div className="app-container">
      {/* Background Interactive Particles & Ambient Blobs */}
      <ParticleCanvas animationEnabled={animationEnabled} />
      <BackgroundBlobs />

      {/* Sticky Glass Navigation Bar */}
      <Navbar
        animationEnabled={animationEnabled}
        setAnimationEnabled={setAnimationEnabled}
      />

      {/* Main Portfolio Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Achievements onPreviewCert={(imgSrc) => setPreviewImage(imgSrc)} />
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

      {/* Certificate / Image Full View Modal */}
      {previewImage && (
        <ImagePreviewModal
          imageSrc={previewImage}
          onClose={() => setPreviewImage(null)}
          title="Information Technology Institute (ITI) Credential"
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
