/**
 * Portfolio Website - Main JavaScript
 * Handles data loading, animations, and interactivity
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  dataPath: './data.json',
  animationThreshold: 0.15,
  scrollOffset: 100
};

// ============================================
// DOM ELEMENTS
// ============================================
const DOM = {
  nav: document.getElementById('nav'),
  navMenu: document.getElementById('nav-menu'),
  navToggle: document.getElementById('nav-toggle'),
  navLinks: document.querySelectorAll('.nav-link'),
  
  // Content containers
  heroStats: document.getElementById('hero-stats'),
  skillsLanguages: document.getElementById('skills-languages'),
  skillsFrameworks: document.getElementById('skills-frameworks'),
  skillsTools: document.getElementById('skills-tools'),
  skillsDomains: document.getElementById('skills-domains'),
  projectsGrid: document.getElementById('projects-grid'),
  timelineExperience: document.getElementById('timeline-experience'),
  timelineResearch: document.getElementById('timeline-research'),
  timelineEducation: document.getElementById('timeline-education'),
  
  // Dynamic text elements
  heroName: document.getElementById('hero-name'),
  heroTitle: document.getElementById('hero-title'),
  heroTagline: document.getElementById('hero-tagline'),
  aboutBio: document.getElementById('about-bio'),
  aboutLocation: document.getElementById('about-location'),
  aboutEmail: document.getElementById('about-email'),
  contactEmail: document.getElementById('contact-email'),
  currentYear: document.getElementById('current-year')
};

// ============================================
// DATA LOADER
// ============================================
class DataLoader {
  static async load() {
    try {
      const response = await fetch(CONFIG.dataPath);
      if (!response.ok) throw new Error('Failed to load data');
      return await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }
}

// ============================================
// CONTENT RENDERER
// ============================================
class ContentRenderer {
  constructor(data) {
    this.data = data;
  }

  // Render all content
  renderAll() {
    if (!this.data) return;
    
    this.renderPersonalInfo();
    this.renderStats();
    this.renderSkills();
    this.renderProjects();
    this.renderTimeline();
    this.updateSocialLinks();
  }

  // Render personal information
  renderPersonalInfo() {
    const { personal } = this.data;
    if (!personal) return;

    // Update text content safely
    if (DOM.heroTagline) {
      DOM.heroTagline.textContent = personal.tagline || '';
    }
    if (DOM.aboutBio) {
      DOM.aboutBio.textContent = personal.bio || '';
    }
    if (DOM.aboutLocation) {
      DOM.aboutLocation.textContent = personal.location || '';
    }
    if (DOM.aboutEmail) {
      DOM.aboutEmail.textContent = personal.email || '';
    }
    if (DOM.contactEmail) {
      DOM.contactEmail.textContent = personal.email || '';
    }
  }

  // Render hero stats
  renderStats() {
    const { stats } = this.data;
    if (!stats || !DOM.heroStats) return;

    DOM.heroStats.innerHTML = stats.map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }

  // Render skills
  renderSkills() {
    const { skills } = this.data;
    if (!skills) return;

    const renderSkillTags = (container, items) => {
      if (!container || !items) return;
      container.innerHTML = items.map(skill => `
        <span class="skill-tag">
          <i data-lucide="${skill.icon || 'circle'}"></i>
          ${skill.name}
        </span>
      `).join('');
    };

    renderSkillTags(DOM.skillsLanguages, skills.languages);
    renderSkillTags(DOM.skillsFrameworks, skills.frameworks);
    renderSkillTags(DOM.skillsTools, skills.tools);
    renderSkillTags(DOM.skillsDomains, skills.domains);

    // Re-initialize Lucide icons for dynamically added content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Render projects
  renderProjects() {
    const { projects } = this.data;
    if (!projects || !DOM.projectsGrid) return;

    DOM.projectsGrid.innerHTML = projects.map((project, index) => `
      <article class="project-card animate-on-scroll" data-type="project" data-index="${index}">
        <div class="project-image">
          ${project.image 
            ? `<img src="${project.image}" alt="${project.title}">` 
            : '<i data-lucide="image"></i>'
          }
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-links">
              ${project.repoLink && project.repoLink !== '#' ? `
                <a href="${project.repoLink}" target="_blank" rel="noopener" class="project-link" aria-label="View code" onclick="event.stopPropagation()">
                  <i data-lucide="github"></i>
                </a>
              ` : ''}
              ${project.liveLink && project.liveLink !== '#' ? `
                <a href="${project.liveLink}" target="_blank" rel="noopener" class="project-link" aria-label="View live" onclick="event.stopPropagation()">
                  <i data-lucide="external-link"></i>
                </a>
              ` : ''}
            </div>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Render timeline (experience + education)
  renderTimeline() {
    const { experience, research, education } = this.data;

    // Render work experience
    if (DOM.timelineExperience && experience && experience.length > 0) {
      DOM.timelineExperience.innerHTML = experience.map((exp, index) => `
        <div class="timeline-item ${exp.current ? 'current' : ''} animate-on-scroll">
          <div class="timeline-marker"></div>
          <div class="timeline-content" data-type="experience" data-index="${index}">
            <div class="timeline-header">
              <h3 class="timeline-role">${exp.role}</h3>
              <span class="timeline-period">${exp.period}</span>
            </div>
            <p class="timeline-company">${exp.company} • ${exp.location}</p>
            <ul class="timeline-description">
              ${exp.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }

    // Render research experience
    if (DOM.timelineResearch && research && research.length > 0) {
      DOM.timelineResearch.innerHTML = research.map((res, index) => `
        <div class="timeline-item ${res.current ? 'current' : ''} animate-on-scroll">
          <div class="timeline-marker"></div>
          <div class="timeline-content" data-type="research" data-index="${index}">
            <div class="timeline-header">
              <h3 class="timeline-role">${res.role}</h3>
              <span class="timeline-period">${res.period}</span>
            </div>
            <p class="timeline-company">${res.institution} • ${res.location}</p>
            <ul class="timeline-description">
              ${res.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }

    // Render education
    if (DOM.timelineEducation && education && education.length > 0) {
      DOM.timelineEducation.innerHTML = education.map((edu, index) => `
        <div class="timeline-item ${edu.current ? 'current' : ''} animate-on-scroll">
          <div class="timeline-marker"></div>
          <div class="timeline-content" data-type="education" data-index="${index}">
            <div class="timeline-header">
              <h3 class="timeline-role">${edu.degree}</h3>
              <span class="timeline-period">${edu.period}</span>
            </div>
            <p class="timeline-company">${edu.institution} • ${edu.location}</p>
            <p class="timeline-field">${edu.field || ''}</p>
            <ul class="timeline-description">
              ${edu.details.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Update social links
  updateSocialLinks() {
    const { social } = this.data;
    if (!social) return;

    // Update GitHub links
    const githubLinks = document.querySelectorAll('[id*="github"], [href*="github.com/codeFafnir"]');
    githubLinks.forEach(link => {
      if (social.github && link.tagName === 'A') {
        link.href = social.github;
      }
    });

    // Update LinkedIn links
    const linkedinLinks = document.querySelectorAll('[id*="linkedin"]');
    linkedinLinks.forEach(link => {
      if (social.linkedin && link.tagName === 'A') {
        link.href = social.linkedin;
      }
    });
  }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
  constructor() {
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleNavLinks();
    this.setActiveLink();
  }

  // Handle scroll effects
  handleScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class for nav styling
      if (currentScroll > 50) {
        DOM.nav?.classList.add('scrolled');
      } else {
        DOM.nav?.classList.remove('scrolled');
      }

      // Update active nav link based on scroll position
      this.setActiveLink();

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Handle mobile menu toggle
  handleMobileMenu() {
    DOM.navToggle?.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen;
      DOM.navMenu?.classList.toggle('active', this.isMenuOpen);
      
      // Update toggle icon
      const icon = DOM.navToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', this.isMenuOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !DOM.navMenu?.contains(e.target) && 
          !DOM.navToggle?.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  // Handle nav link clicks
  handleNavLinks() {
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Close mobile menu
        this.closeMenu();

        // Smooth scroll to section
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Set active nav link based on scroll position
  setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - CONFIG.scrollOffset;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        DOM.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Close mobile menu
  closeMenu() {
    this.isMenuOpen = false;
    DOM.navMenu?.classList.remove('active');
    
    const icon = DOM.navToggle?.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', 'menu');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }
}

// ============================================
// ANIMATIONS
// ============================================
class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
  }

  // Setup Intersection Observer for scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: CONFIG.animationThreshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Re-observe newly added elements (after dynamic content load)
  observeNewElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: CONFIG.animationThreshold });

    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }
}

// ============================================
// HOVER TO REVEAL (CSS-based, no JS needed)
// ============================================
// The hover-to-reveal feature is now handled entirely by CSS.
// Descriptions are hidden by default and revealed on hover.
// No JavaScript class needed - keeping this comment for reference.

// ============================================
// UTILITIES
// ============================================
class Utilities {
  // Set current year in footer
  static setCurrentYear() {
    if (DOM.currentYear) {
      DOM.currentYear.textContent = new Date().getFullYear();
    }
  }

  // Initialize Lucide icons
  static initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Smooth scroll to element
  static scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Debounce function
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// ============================================
// MODAL SYSTEM
// ============================================
class Modal {
  constructor() {
    this.overlay = document.getElementById('modal-overlay');
    this.content = document.getElementById('modal-content');
    this.closeBtn = document.getElementById('modal-close');
    this.isOpen = false;
    this.currentData = null;
    
    this.init();
  }

  init() {
    // Close button click
    this.closeBtn?.addEventListener('click', () => this.close());

    // Close on overlay click (outside modal)
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(type, data) {
    this.currentData = data;
    this.isOpen = true;

    // Generate content based on type
    let html = '';
    switch (type) {
      case 'project':
        html = this.renderProjectModal(data);
        break;
      case 'experience':
        html = this.renderExperienceModal(data);
        break;
      case 'research':
        html = this.renderResearchModal(data);
        break;
      case 'education':
        html = this.renderEducationModal(data);
        break;
    }

    this.content.innerHTML = html;
    
    // Re-initialize Lucide icons in modal
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Show modal
    this.overlay.classList.add('active');
    document.body.classList.add('modal-open');
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  renderProjectModal(project) {
    return `
      <div class="modal-header">
        <span class="modal-tag">
          <i data-lucide="folder-git-2"></i>
          Project
        </span>
        <h2 class="modal-title">${project.title}</h2>
        ${project.featured ? '<span class="modal-subtitle">⭐ Featured Project</span>' : ''}
      </div>
      
      ${project.image ? `
        <div class="modal-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
      ` : `
        <div class="modal-image">
          <i data-lucide="image"></i>
        </div>
      `}
      
      <div class="modal-body">
        <div class="modal-description">
          <p>${project.description}</p>
        </div>
        
        ${project.technologies && project.technologies.length > 0 ? `
          <div class="modal-tech-section">
            <p class="modal-tech-label">Technologies Used</p>
            <div class="modal-tech-tags">
              ${project.technologies.map(tech => `
                <span class="modal-tech-tag">${tech}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      
      <div class="modal-footer">
        ${project.repoLink && project.repoLink !== '#' ? `
          <a href="${project.repoLink}" target="_blank" rel="noopener" class="btn btn-outline">
            <i data-lucide="github"></i>
            View Repository
          </a>
        ` : ''}
        ${project.liveLink && project.liveLink !== '#' ? `
          <a href="${project.liveLink}" target="_blank" rel="noopener" class="btn btn-primary">
            <i data-lucide="external-link"></i>
            Live Demo
          </a>
        ` : ''}
      </div>
    `;
  }

  renderExperienceModal(exp) {
    return `
      <div class="modal-header">
        <span class="modal-tag">
          <i data-lucide="briefcase"></i>
          Work Experience
        </span>
        <h2 class="modal-title">${exp.role}</h2>
        <p class="modal-subtitle">${exp.company}</p>
        
        <div class="modal-meta">
          <span class="modal-meta-item">
            <i data-lucide="map-pin"></i>
            ${exp.location}
          </span>
          <span class="modal-meta-item">
            <i data-lucide="calendar"></i>
            ${exp.period}
          </span>
          ${exp.current ? `
            <span class="modal-meta-item current">
              <i data-lucide="circle-dot"></i>
              Current Position
            </span>
          ` : ''}
        </div>
      </div>
      
      <div class="modal-body">
        <div class="modal-description">
          ${Array.isArray(exp.description) 
            ? exp.description.map(item => `<p>${item}</p>`).join('') 
            : `<p>${exp.description}</p>`
          }
        </div>
      </div>
    `;
  }

  renderResearchModal(res) {
    return `
      <div class="modal-header">
        <span class="modal-tag">
          <i data-lucide="flask-conical"></i>
          Research Experience
        </span>
        <h2 class="modal-title">${res.role}</h2>
        <p class="modal-subtitle">${res.institution}</p>
        
        <div class="modal-meta">
          <span class="modal-meta-item">
            <i data-lucide="map-pin"></i>
            ${res.location}
          </span>
          <span class="modal-meta-item">
            <i data-lucide="calendar"></i>
            ${res.period}
          </span>
          ${res.current ? `
            <span class="modal-meta-item current">
              <i data-lucide="circle-dot"></i>
              Current
            </span>
          ` : ''}
        </div>
      </div>
      
      <div class="modal-body">
        <div class="modal-description">
          ${Array.isArray(res.description) 
            ? res.description.map(item => `<p>${item}</p>`).join('') 
            : `<p>${res.description}</p>`
          }
        </div>
      </div>
    `;
  }

  renderEducationModal(edu) {
    return `
      <div class="modal-header">
        <span class="modal-tag">
          <i data-lucide="graduation-cap"></i>
          Education
        </span>
        <h2 class="modal-title">${edu.degree}</h2>
        <p class="modal-subtitle">${edu.institution}</p>
        
        <div class="modal-meta">
          <span class="modal-meta-item">
            <i data-lucide="map-pin"></i>
            ${edu.location}
          </span>
          <span class="modal-meta-item">
            <i data-lucide="calendar"></i>
            ${edu.period}
          </span>
          ${edu.current ? `
            <span class="modal-meta-item current">
              <i data-lucide="circle-dot"></i>
              Currently Enrolled
            </span>
          ` : ''}
        </div>
      </div>
      
      <div class="modal-body">
        ${edu.field ? `
          <div class="modal-description">
            <p><strong>Field of Study:</strong> ${edu.field}</p>
          </div>
        ` : ''}
        
        ${edu.details && edu.details.length > 0 ? `
          <ul class="modal-list">
            ${edu.details.map(item => `<li>${item}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  }
}

// ============================================
// TYPING EFFECT (Optional Enhancement)
// ============================================
class TypingEffect {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.typeSpeed = options.typeSpeed || 100;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.pauseTime = options.pauseTime || 2000;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ============================================
// MAIN INITIALIZATION
// ============================================
class App {
  constructor() {
    this.data = null;
    this.navigation = null;
    this.animations = null;
    this.modal = null;
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  async start() {
    // Initialize icons
    Utilities.initIcons();

    // Set current year
    Utilities.setCurrentYear();

    // Load data
    this.data = await DataLoader.load();

    // Render content
    if (this.data) {
      const renderer = new ContentRenderer(this.data);
      renderer.renderAll();
    }

    // Initialize navigation
    this.navigation = new Navigation();

    // Initialize animations
    this.animations = new Animations();

    // Initialize modal
    this.modal = new Modal();

    // Re-observe elements after content is loaded
    setTimeout(() => {
      this.animations.observeNewElements();
      Utilities.initIcons();
      
      // Attach click handlers to cards after content is loaded
      this.attachCardClickHandlers();
    }, 150);

    // Log success
    console.log('Portfolio loaded successfully!');
  }

  // Attach click handlers to project and timeline cards
  attachCardClickHandlers() {
    // Project cards
    document.querySelectorAll('.project-card[data-type="project"]').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on external links
        if (e.target.closest('.project-link')) return;
        
        const index = parseInt(card.dataset.index);
        if (this.data?.projects?.[index]) {
          this.modal.open('project', this.data.projects[index]);
        }
      });
    });

    // Experience cards
    document.querySelectorAll('.timeline-content[data-type="experience"]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        if (this.data?.experience?.[index]) {
          this.modal.open('experience', this.data.experience[index]);
        }
      });
    });

    // Research cards
    document.querySelectorAll('.timeline-content[data-type="research"]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        if (this.data?.research?.[index]) {
          this.modal.open('research', this.data.research[index]);
        }
      });
    });

    // Education cards
    document.querySelectorAll('.timeline-content[data-type="education"]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        if (this.data?.education?.[index]) {
          this.modal.open('education', this.data.education[index]);
        }
      });
    });
  }
}

// ============================================
// START APPLICATION
// ============================================
const app = new App();
app.init();

// ============================================
// EXPORT FOR DEBUGGING (Optional)
// ============================================
window.Portfolio = {
  app,
  Utilities,
  TypingEffect,
  Modal
};

