import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Play,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Video,
  Wand2,
  Palette,
  Code2,
  BarChart3,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Copy,
  Check,
  Cpu,
  Layers,
  FileCode2,
  Terminal,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import './styles.css';

const BASE_PATH = import.meta.env.BASE_URL || './';
const cleanBase = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;

// Verification & Profile Links
const PROFILE = {
  name: 'Shivamkumar Chandrakant Mantri',
  shortName: 'Shivamkumar',
  role: 'Generative AI | Video Editing | Motion Graphics | AI Content Creation',
  email: 'shivammantri0020@gmail.com',
  phone: '+91-7385520065',
  phoneDisplay: '+91 73855 20065',
  location: 'Bhusawal, Maharashtra, India',
  linkedin: 'https://in.linkedin.com/in/shivamkumar-mantri-9bbaa7256',
  github: 'https://github.com/ShivamkumarMantri',
  resumeUrl: `${cleanBase}Shivamkumar_Resume.pdf`,
  photoUrl: `${cleanBase}shivam-profile.jpg`,
};

// SVG Icons for clean rendering without external dependency issues
function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// High-Performance 60-120fps 3D Tilt Card (Direct GPU Transform, Zero Re-renders)
function TiltCard({ children, className = '', maxTilt = 6, scale = 1.02, glare = true, ...props }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      }
      if (glare && glareRef.current) {
        const glareX = ((x / rect.width) * 100).toFixed(1);
        const glareY = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.opacity = '0.24';
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212, 255, 63, 0.22) 0%, rgba(0, 242, 254, 0.12) 30%, transparent 65%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {glare && <div ref={glareRef} className="tilt-card-glare" aria-hidden="true" />}
    </div>
  );
}

// Hardware-Accelerated Interactive Spotlight (Zero Main-Thread React Re-renders)
function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;
    let targetX = -600;
    let targetY = -600;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />;
}

// Navigation structure
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

// Projects verified strictly against prompt & resume
const PROJECTS = [
  {
    id: 'ai-video-creator',
    number: '01',
    title: 'AI-Powered Video Content Creator',
    tagline: 'Prompt-to-video automation engine with dynamic motion graphics',
    type: 'Generative AI • Motion • Automation',
    desc: 'An automated platform that converts prompts into scripts, scenes, and short-form videos. Built with automated workflow integration for captions, visual assets, motion graphics, smooth transitions, and multi-format video synthesis.',
    tags: ['Python', 'Generative AI', 'FFmpeg', 'JavaScript'],
    features: [
      'Prompt-to-script synthesis & scene segmentation',
      'Automated visual asset & transition generation',
      'Dynamic caption rendering with FFmpeg video pipeline',
      'Optimized for fast short-form content production',
    ],
    githubLink: 'https://github.com/ShivamkumarMantri/AI-Content-Creator',
    primaryLink: 'https://github.com/ShivamkumarMantri/AI-Content-Creator',
    icon: Video,
    accent: '#d4ff3f',
  },
  {
    id: 'smart-farm-ai',
    number: '02',
    title: 'Smart Farm AI',
    tagline: 'AI-driven agricultural monitoring and predictive crop intelligence',
    type: 'AI • Machine Learning • Agriculture',
    desc: 'An AI-powered smart farming solution engineered for real-time crop monitoring and intelligent decision-making. Utilizes artificial intelligence, automation, and predictive insights to improve farming efficiency and yield quality.',
    tags: ['Python', 'Artificial Intelligence', 'Machine Learning', 'GitHub'],
    features: [
      'Automated crop health & environmental condition analysis',
      'Predictive insights to assist farming interventions',
      'Intelligent decision engine for resource optimization',
      'Scalable Python-based ML architecture',
    ],
    githubLink: PROFILE.github,
    primaryLink: PROFILE.github,
    icon: Sparkles,
    accent: '#9b7cff',
  },
];

// Skills categorized exactly as per the resume
const SKILL_CATEGORIES = [
  {
    name: 'AI Technologies',
    icon: Wand2,
    badge: 'Core Focus',
    skills: [
      'Generative AI',
      'AI-Assisted Content Creation',
      'AI Video Generation',
      'AI Image Generation',
      'Prompt Engineering',
    ],
  },
  {
    name: 'UI/UX & Design',
    icon: Palette,
    skills: [
      'Figma',
      'Canva',
      'Adobe XD',
      'Visual Storytelling',
      'Typography',
      'Visual Composition',
    ],
  },
  {
    name: 'Video & Motion Graphics',
    icon: Video,
    badge: 'Creative',
    skills: [
      'Video Editing',
      'CapCut',
      'After Effects',
      'Motion Graphics',
      'Transitions',
      'Visual Effects',
      'Short-Form Video',
    ],
  },
  {
    name: 'Programming',
    icon: Code2,
    skills: ['Python Programming', 'SQL'],
  },
  {
    name: 'AI & Machine Learning',
    icon: Cpu,
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Analysis',
      'Data Visualization',
    ],
  },
  {
    name: 'Data Analytics',
    icon: BarChart3,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Data Cleaning'],
  },
  {
    name: 'Tools & Platforms',
    icon: Layers,
    skills: [
      'Git',
      'GitHub',
      'MS Excel',
      'MySQL',
      'Google Gemini',
      'OpenAI',
      'Claude',
    ],
  },
];

// Experience timeline verified strictly against resume
const EXPERIENCES = [
  {
    role: 'Trainee — Data Science & Analytics Engineer (Intern)',
    company: 'Cravita Technologies India Pvt. Ltd.',
    location: 'Pune',
    period: 'Feb 2026 — Present',
    status: 'Current Role',
    bullets: [
      'Developed interactive Power BI dashboards with filters, KPI cards, charts, and visual reports.',
      'Transformed datasets into engaging visual stories and data-driven presentations with clear visual hierarchy.',
      'Used Python, Power BI, and AI-assisted tools for analysis, visualization, ideation, and reporting.',
    ],
    tech: ['Power BI', 'Python', 'AI-Assisted Tools', 'Visual Storytelling', 'KPI Dashboards'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Happieloop',
    location: 'Pune',
    period: 'Nov 2025 — Jan 2026',
    status: 'Completed',
    bullets: [
      'Performed Exploratory Data Analysis (EDA) using Python on real-world datasets.',
      'Created interactive Power BI dashboards for KPI tracking and business reporting.',
      'Used SQL, Python, and data visualization for analysis and visual reporting.',
    ],
    tech: ['Python', 'SQL', 'EDA', 'Power BI', 'Data Visualization'],
  },
];

// Education history verified against resume
const EDUCATION = [
  {
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    institution: 'Shri Sant Gadge Baba College of Engineering & Technology, Bhusawal',
    university: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
    grade: 'CGPA 8.0 / 10',
    period: '2022 — 2026',
    featured: true,
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'D.L. Hindi Junior College, Bhusawal',
    grade: '80.67%',
    period: '2022',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'St. Aloysius Convent High School, Bhusawal',
    grade: '73.40%',
    period: '2020',
  },
];

// Certifications verified against resume
const CERTIFICATIONS = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified',
    subtitle: 'Certified Data Science Professional',
    issuer: 'Oracle',
    badge: 'Cloud & AI',
  },
  {
    title: 'Hashgraph Developer Certification',
    subtitle: 'Distributed Ledger & Smart Contracts',
    issuer: 'Hedera Hashgraph',
    badge: 'Developer',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const [skillFilter, setSkillFilter] = useState('All');

  // Handle active section scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll navigation
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Copy helper
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter skills for quick navigation
  const filteredSkills = SKILL_CATEGORIES.filter((cat) => {
    if (skillFilter === 'AI & Creative') {
      return (
        cat.name.includes('AI') ||
        cat.name.includes('Design') ||
        cat.name.includes('Motion')
      );
    }
    if (skillFilter === 'Data & Code') {
      return (
        cat.name.includes('Programming') ||
        cat.name.includes('Analytics') ||
        cat.name.includes('Tools') ||
        cat.name.includes('Machine Learning')
      );
    }
    return true;
  });

  return (
    <div className="app">
      {/* Interactive Cursor Spotlight (Zero Re-render GPU Transform) */}
      <CursorSpotlight />

      {/* Background Floating Animated Gradient Blobs (60fps motion) */}
      <div className="blobs-wrapper" aria-hidden="true">
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />
        <div className="gradient-blob blob-4" />
      </div>

      {/* Navigation Header */}
      <header className="nav-header">
        <div className="nav-container">
          <button
            className="brand-link"
            onClick={() => scrollTo('home')}
            aria-label="Shivamkumar Mantri Home"
          >
            <div className="brand-badge-wrapper">
              <img
                src={PROFILE.photoUrl}
                alt="Shivamkumar Mantri"
                className="brand-badge-img"
              />
            </div>
            <span className="brand-text">
              Shivam<span className="accent-dot">.</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Nav Quick Actions */}
          <div className="nav-actions">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-accent nav-cta"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
            <div className="mobile-drawer-cta">
              <a
                href={PROFILE.resumeUrl}
                download
                className="btn-secondary w-full"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="status-badge">
                <span className="status-indicator"></span>
                <span>AVAILABLE FOR OPPORTUNITIES</span>
              </div>

              <h1 className="hero-heading">
                Building <span className="highlight-lime">AI-Powered</span>
                <br />
                Development and Designs.
              </h1>

              <p className="hero-lead">
                I'm <strong>Shivamkumar Mantri</strong> — a B.Tech graduate focused on{' '}
                <span className="text-light">Generative AI</span>,{' '}
                <span className="text-light">video editing</span>,{' '}
                <span className="text-light">motion graphics</span>,{' '}
                <span className="text-light">AI content creation</span>, and visual storytelling.
              </p>

              <div className="hero-ctas">
                <button
                  className="btn-accent hero-btn"
                  onClick={() => scrollTo('projects')}
                >
                  <span>View My Work</span>
                  <ArrowUpRight size={18} />
                </button>
                <a
                  href={PROFILE.resumeUrl}
                  download="Shivamkumar_Resume.pdf"
                  className="btn-secondary hero-btn"
                >
                  <Download size={17} />
                  <span>Download Resume</span>
                </a>
              </div>

              <div className="hero-social-strip">
                <span className="strip-label">CONNECT:</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="social-pill"
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Visual Hero Art Composition with 3D Depth */}
            <div className="hero-art-wrapper">
              <TiltCard className="art-card-container" maxTilt={9} scale={1.03}>
                <div className="art-card-main">
                  <div className="art-card-img-wrapper">
                    <img
                      src={PROFILE.photoUrl}
                      alt="Shivamkumar Chandrakant Mantri"
                      className="hero-profile-photo"
                    />
                    <div className="art-card-overlay" />
                  </div>

                  <div className="card-top-row">
                    <span className="card-badge-id">SHIVAM / 2026</span>
                    <span className="card-badge-spec">AI × MOTION</span>
                  </div>

                  <div className="card-spacer" />

                  <div className="card-bottom-row">
                    <div className="card-pill">
                      <Sparkles size={13} className="pill-icon-lime" />
                      <span>Generative AI</span>
                    </div>
                    <div className="card-pill">
                      <Video size={13} className="pill-icon-lime" />
                      <span>Motion Graphics</span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Cards */}
                <div className="float-badge float-top-left">
                  <Wand2 size={16} className="float-icon" />
                  <div>
                    <div className="float-title">AI Video Synthesis</div>
                    <div className="float-sub">Automated pipelines</div>
                  </div>
                </div>

                <div className="float-badge float-bottom-right">
                  <Play size={16} className="float-icon" />
                  <div>
                    <div className="float-title">Visual Storytelling</div>
                    <div className="float-sub">Motion & dynamic cuts</div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          <div
            className="scroll-indicator"
            onClick={() => scrollTo('about')}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to About section"
          >
            <span>Scroll to explore</span>
            <ChevronDown size={16} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section-block">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">01 / ABOUT</span>
              <h2 className="section-title">
                Designing stories<br />
                <span className="title-highlight">with intelligence.</span>
              </h2>
            </div>

            <div className="about-layout">
              <div className="about-narrative">
                <p className="narrative-lead">
                  I specialize in combining creative thinking with artificial intelligence and engineering to turn ideas into engaging visual experiences. My work lives at the dynamic intersection of <strong>AI-assisted creation, motion graphics, video editing, and visual storytelling.</strong>
                </p>
                <p className="narrative-sub">
                  Alongside creative production, I leverage hands-on expertise in data analytics, Python, Power BI, and interactive reporting to build structured, data-driven narratives with crystal-clear visual hierarchy.
                </p>

                <div className="core-traits">
                  <span className="trait-pill">Curious Learner</span>
                  <span className="trait-pill">Visual Thinker</span>
                  <span className="trait-pill">Creative Technologist</span>
                  <span className="trait-pill">Problem Solver</span>
                </div>
              </div>

              {/* Defensible Resume-Only Stats */}
              <div className="about-stats-matrix">
                <div className="stat-card">
                  <div className="stat-value">2026</div>
                  <div className="stat-label">B.Tech Graduate</div>
                  <div className="stat-detail">AI & Data Science (DBATU)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">8.0<span className="stat-sub-val">/10</span></div>
                  <div className="stat-label">Academic CGPA</div>
                  <div className="stat-detail">B.Tech Engineering Degree</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">2</div>
                  <div className="stat-label">Featured Projects</div>
                  <div className="stat-detail">AI Content & Smart Farming</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">2</div>
                  <div className="stat-label">Internship Experiences</div>
                  <div className="stat-detail">Data Science & Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section-block section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">02 / SELECTED WORK</span>
              <h2 className="section-title">
                Things I've <span className="title-highlight">engineered.</span>
              </h2>
              <p className="section-subtext">
                Real-world projects applying Generative AI, automation, and predictive machine learning.
              </p>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((proj) => {
                const IconComponent = proj.icon;
                return (
                  <TiltCard key={proj.id} maxTilt={6} scale={1.02}>
                    <article className="project-card">
                      <div className="project-preview">
                        <div className="preview-mesh" />
                        <div className="preview-top">
                          <span className="proj-num">{proj.number}</span>
                          <span className="proj-category">{proj.type}</span>
                        </div>
                        <div className="preview-center-icon">
                          <IconComponent size={54} strokeWidth={1.3} />
                        </div>
                        <div className="preview-glow" />
                      </div>

                      <div className="project-info">
                        <h3 className="project-heading">{proj.title}</h3>
                        <p className="project-desc">{proj.desc}</p>

                        <div className="project-highlights">
                          {proj.features.map((feat, idx) => (
                            <div key={idx} className="highlight-item">
                              <span className="highlight-bullet" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="project-tags">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="project-actions">
                          <a
                            href={proj.primaryLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-project-link"
                          >
                            <span>View Project</span>
                            <ExternalLink size={15} />
                          </a>
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-project-secondary"
                          >
                            <GithubIcon size={15} />
                            <span>Code Repository</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section-block">
          <div className="container">
            <div className="section-header">
              <div className="section-header-top">
                <span className="section-eyebrow">03 / TOOLKIT</span>
                <div className="skills-filter-group">
                  {['All', 'AI & Creative', 'Data & Code'].map((filter) => (
                    <button
                      key={filter}
                      className={`filter-btn ${skillFilter === filter ? 'active' : ''}`}
                      onClick={() => setSkillFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <h2 className="section-title">
                Skills that turn<br />
                <span className="title-highlight">ideas into output.</span>
              </h2>
            </div>

            <div className="skills-category-grid">
              {filteredSkills.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="skill-card">
                    <div className="skill-card-header">
                      <div className="skill-icon-wrap">
                        <Icon size={19} />
                      </div>
                      <h3 className="skill-category-title">{category.name}</h3>
                      {category.badge && (
                        <span className="category-badge">{category.badge}</span>
                      )}
                    </div>
                    <div className="skill-chips-wrap">
                      {category.skills.map((skill) => (
                        <span key={skill} className="skill-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section-block section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">04 / EXPERIENCE</span>
              <h2 className="section-title">
                Professional <span className="title-highlight">journey.</span>
              </h2>
            </div>

            <div className="timeline-container">
              {EXPERIENCES.map((exp, index) => (
                <div key={index} className="timeline-block">
                  <div className="timeline-marker">
                    <div className="marker-dot" />
                    <div className="marker-line" />
                  </div>

                  <div className="timeline-card">
                    <div className="timeline-card-head">
                      <div>
                        <div className="timeline-time-badge">{exp.period}</div>
                        <h3 className="timeline-role">{exp.role}</h3>
                        <div className="timeline-company">
                          <Briefcase size={15} className="inline-icon" />
                          <strong>{exp.company}</strong>
                          <span className="sep">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <span className="status-tag">{exp.status}</span>
                    </div>

                    <ul className="timeline-bullets">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    <div className="timeline-tech-stack">
                      {exp.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <section id="education" className="section-block">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">05 / EDUCATION & CREDENTIALS</span>
              <h2 className="section-title">
                Academic foundation &<br />
                <span className="title-highlight">verified credentials.</span>
              </h2>
            </div>

            <div className="edu-grid-layout">
              {/* Primary Degree Card */}
              <div className="edu-main-card">
                <div className="edu-icon-bubble">
                  <GraduationCap size={28} />
                </div>
                <div className="edu-main-info">
                  <div className="edu-meta-top">
                    <span className="edu-period">2022 — 2026</span>
                    <span className="edu-grade-highlight">CGPA 8.0 / 10</span>
                  </div>
                  <h3 className="edu-degree">B.Tech — Artificial Intelligence & Data Science</h3>
                  <p className="edu-college">
                    Shri Sant Gadge Baba College of Engineering & Technology, Bhusawal
                  </p>
                  <p className="edu-univ">
                    Affiliated to Dr. Babasaheb Ambedkar Technological University (DBATU)
                  </p>
                </div>
              </div>

              {/* Secondary Education Column */}
              <div className="edu-secondary-column">
                <div className="edu-sub-card">
                  <div className="edu-sub-head">
                    <span className="edu-period">2022</span>
                    <span className="edu-score-badge">80.67%</span>
                  </div>
                  <h4 className="edu-sub-title">Higher Secondary Certificate (HSC)</h4>
                  <p className="edu-sub-school">D.L. Hindi Junior College, Bhusawal</p>
                </div>

                <div className="edu-sub-card">
                  <div className="edu-sub-head">
                    <span className="edu-period">2020</span>
                    <span className="edu-score-badge">73.40%</span>
                  </div>
                  <h4 className="edu-sub-title">Secondary School Certificate (SSC)</h4>
                  <p className="edu-sub-school">St. Aloysius Convent High School, Bhusawal</p>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="certifications-container">
              <div className="cert-header">
                <div className="cert-badge-icon">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="cert-heading">Professional Certifications</h3>
                  <p className="cert-subheading">Verified technical credentials and domain specializations</p>
                </div>
              </div>

              <div className="certs-matrix">
                {CERTIFICATIONS.map((cert, cIdx) => (
                  <div key={cIdx} className="cert-tile">
                    <div className="cert-tile-header">
                      <span className="cert-tag">{cert.badge}</span>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                    <h4 className="cert-tile-title">{cert.title}</h4>
                    <p className="cert-tile-sub">{cert.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section-block section-contact">
          <div className="container">
            <div className="contact-card">
              <div className="contact-main-col">
                <span className="section-eyebrow">06 / CONTACT</span>
                <h2 className="contact-hero-title">
                  Have an idea?<br />
                  <span className="title-highlight">Let's make it move.</span>
                </h2>
                <p className="contact-lead-text">
                  I'm open to creative projects, AI-powered content work, motion graphics opportunities, and full-time collaborations. Let’s build something impactful together.
                </p>

                <div className="contact-fast-cta">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="btn-accent btn-large"
                  >
                    <span>Start a conversation</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>

              <div className="contact-details-col">
                <div className="contact-info-list">
                  {/* Email block with copy action */}
                  <div className="contact-item-box">
                    <div className="item-icon-box">
                      <Mail size={18} />
                    </div>
                    <div className="item-details">
                      <div className="item-label">EMAIL</div>
                      <a href={`mailto:${PROFILE.email}`} className="item-value">
                        {PROFILE.email}
                      </a>
                    </div>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(PROFILE.email, 'email')}
                      title="Copy email"
                      aria-label="Copy email address"
                    >
                      {copiedType === 'email' ? <Check size={16} className="text-lime" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Phone block with copy action */}
                  <div className="contact-item-box">
                    <div className="item-icon-box">
                      <Phone size={18} />
                    </div>
                    <div className="item-details">
                      <div className="item-label">PHONE</div>
                      <a href={`tel:${PROFILE.phone}`} className="item-value">
                        {PROFILE.phoneDisplay}
                      </a>
                    </div>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(PROFILE.phone, 'phone')}
                      title="Copy phone"
                      aria-label="Copy phone number"
                    >
                      {copiedType === 'phone' ? <Check size={16} className="text-lime" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="contact-item-box">
                    <div className="item-icon-box">
                      <MapPin size={18} />
                    </div>
                    <div className="item-details">
                      <div className="item-label">LOCATION</div>
                      <span className="item-value">{PROFILE.location}</span>
                    </div>
                  </div>
                </div>

                <div className="contact-social-row">
                  <span className="social-label">PROFILES:</span>
                  <div className="social-icon-links">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <LinkedinIcon size={18} />
                    </a>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <GithubIcon size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-left">
            <span className="footer-name">© {new Date().getFullYear()} Shivamkumar Chandrakant Mantri</span>
            <span className="footer-spec">Generative AI • Motion Graphics • Visual Storytelling</span>
          </div>

          <div className="footer-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={PROFILE.resumeUrl} download>
              Resume
            </a>
            <button
              className="btn-back-to-top"
              onClick={() => scrollTo('home')}
              aria-label="Back to top"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const container = document.getElementById('root');
if (!container._reactRoot) {
  container._reactRoot = createRoot(container);
}
container._reactRoot.render(<App />);
