import { useEffect, useState, useRef } from 'react';

/**
 * CinematicSceneBackdrop
 * Reusable multi-scene atmospheric background engine inspired by jasonbergh.com
 * Provides individual, living visual atmospheres for each page/scene:
 * - Home/Hero: Layered charcoal, subtle radial light, slow ambient glow, filmic depth
 * - About: Charcoal & cold-blue tints, slowly shifting spotlight, architectural lines
 * - Education: Deep graphite, focused milestone timeline illumination conduit
 * - Skills: Deep black/graphite, restrained connected technical grid, gentle light sweep
 * - Projects: Dimensional showroom, localized top-down theatrical spotlight, floor haze
 * - Contact: Concentrated ambient core glow behind contact form, horizon light streaks
 */
export default function CinematicSceneBackdrop({ activeScene = 'hero' }) {
  const [scrollY, setScrollY] = useState(0);
  const backdropRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={backdropRef}
      className={`cinematic-scene-backdrop scene-${activeScene}`}
      aria-hidden="true"
    >
      {/* ====================================================
          SCENE 1: HOME / HERO (OPENING SCENE)
          Deep black, layered charcoal, slow radial key light, atmospheric depth
          ==================================================== */}
      <div className={`scene-layer layer-hero ${activeScene === 'hero' ? 'active' : ''}`}>
        <div className="hero-charcoal-base" />
        <div className="hero-key-light-glow" />
        <div className="hero-ambient-slow-drift" />
        <div className="hero-filmic-vignette" />
      </div>

      {/* ====================================================
          SCENE 2: ABOUT (THE NARRATIVE & BLUEPRINT)
          Dark charcoal, subtle blue tints, shifting moving spotlight, abstract lines
          ==================================================== */}
      <div
        className={`scene-layer layer-about ${activeScene === 'about' ? 'active' : ''}`}
        style={{
          transform: `translateY(${-scrollY * 0.04}px)`,
        }}
      >
        <div className="about-charcoal-gradient" />
        <div className="about-shifting-spotlight" />
        <div className="about-architectural-lines" />
        <div className="about-depth-silhouette" />
      </div>

      {/* ====================================================
          SCENE 3: EDUCATION (ACADEMIC MILESTONES)
          Deep graphite, focused timeline conduit light, celestial milestone depth
          ==================================================== */}
      <div className={`scene-layer layer-education ${activeScene === 'education' ? 'active' : ''}`}>
        <div className="edu-graphite-gradient" />
        <div className="edu-timeline-conduit-beam" />
        <div className="edu-milestone-starlight-aura" />
      </div>

      {/* ====================================================
          SCENE 4: SKILLS (TECHNICAL ARSENAL)
          Deep graphite & black, restrained connected grid, gentle light sweep
          ==================================================== */}
      <div className={`scene-layer layer-skills ${activeScene === 'skills' ? 'active' : ''}`}>
        <div className="skills-graphite-base" />
        <div className="skills-restrained-grid" />
        <div className="skills-ambient-light-sweep" />
      </div>

      {/* ====================================================
          SCENE 5: PROJECTS (SHOWCASE VAULT)
          Dimensional dark showroom, top theatrical spotlight, floor reflection
          ==================================================== */}
      <div className={`scene-layer layer-projects ${activeScene === 'projects' ? 'active' : ''}`}>
        <div className="projects-dimensional-base" />
        <div className="projects-theatrical-spotlight-top" />
        <div className="projects-showroom-floor-haze" />
      </div>

      {/* ====================================================
          SCENE 6: CONTACT (THE CLOSING SCENE)
          Deep black, concentrated ambient beacon glow behind form, horizon streaks
          ==================================================== */}
      <div className={`scene-layer layer-contact ${activeScene === 'contact' ? 'active' : ''}`}>
        <div className="contact-deep-base" />
        <div className="contact-concentrated-beacon-glow" />
        <div className="contact-horizon-light-streaks" />
      </div>
    </div>
  );
}
