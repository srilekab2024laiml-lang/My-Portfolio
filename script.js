// Script.js - Srileka B Interactive Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initThemeToggle();
  initSkillsFilter();
  initTimelineTabs();
  initProjectModals();
  initStatsCounter();
  initContactForm();
  initMobileNav();
});

/* 1. Typing Effect for Hero Title */
function initTypingEffect() {
  const typedTextSpan = document.querySelector('.typed-text');
  const roles = [
    'MERN Full Stack Developer',
    'AI / ML & Data Engineer',
    'Streamlit & Python Specialist',
    'Problem Solver (LeetCode 80+)'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    if (!typedTextSpan) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* 2. Dark / Light Theme Toggle */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      let theme = document.body.getAttribute('data-theme');
      if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        showToast('Switched to Light Mode');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        showToast('Switched to Dark Mode');
      }
    });
  }
}

/* 3. Skills Filter */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* 4. Timeline Tab Switcher */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const tabPanels = document.querySelectorAll('.timeline-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

/* 5. Project Details Modal */
const projectDetails = {
  1: {
    title: 'Workforce Salary Forecasting Using Data Analytics',
    year: '2026',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Streamlit'],
    img: 'assets/project_workforce_salary.png',
    summary: 'A comprehensive Python machine learning & predictive analytics platform that evaluates corporate employee datasets to model and forecast future salary trends.',
    features: [
      'Automated Data Preprocessing & Outlier Cleaning',
      'Exploratory Data Analysis (EDA) with visual heatmaps & distribution plots',
      'Scikit-learn Regression Modeling (Random Forest & Linear Regression)',
      'Interactive Streamlit Web Dashboard for scenario forecasting'
    ],
    github: 'https://github.com/SrilekaB/Workforce-Salary-Forecasting'
  },
  2: {
    title: 'Employee Salary Prediction',
    year: '2026',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit'],
    img: 'assets/project_employee_salary.png',
    summary: 'Real-time machine learning web app giving Instant salary predictions tailored for job applicants and HR professionals based on demographic attributes and experience.',
    features: [
      'Multi-feature regression pipeline',
      'Real-time user parameter inputs via Streamlit widgets',
      'Feature importance rank visualizer',
      'Model precision & performance metrics breakdown'
    ],
    github: 'https://github.com/SrilekaB/Employee-Salary-Prediction'
  },
  3: {
    title: 'Hospital Management System',
    year: '2026',
    tech: ['Java', 'HTML', 'CSS', 'MySQL', 'JDBC'],
    img: 'assets/project_hospital_management.png',
    summary: 'An enterprise-grade Java application designed to streamline daily healthcare center operations, doctor scheduling, and electronic patient records.',
    features: [
      'Secure Admin & Staff Authentication',
      'Patient Record Management & Doctor Appointment Booking',
      'Relational Database Architecture built with MySQL and JDBC',
      'User-friendly responsive UI for medical staff usability'
    ],
    github: 'https://github.com/SrilekaB/Hospital-Management-System'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const projectBtns = document.querySelectorAll('.btn-view-project');
  const githubLink = document.getElementById('modal-github-link');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];

      if (data && modalBackdrop) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-img').src = data.img;
        document.getElementById('modal-summary').textContent = data.summary;
        
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = data.features.map(f => `<li><i class="fa-solid fa-check-circle" style="color: var(--accent-tertiary); margin-right: 0.5rem;"></i>${f}</li>`).join('');

        if (githubLink) {
          githubLink.href = data.github;
        }

        modalBackdrop.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
}

/* 6. Stats Counter Animation */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const position = heroSection.getBoundingClientRect();
    if (position.top < window.innerHeight && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let count = 0;
        const speed = target / 30;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = Math.ceil(count) + (target > 50 ? '+' : '');
            setTimeout(updateCount, 40);
          } else {
            stat.innerText = target + (target > 50 ? '+' : '');
          }
        };
        updateCount();
      });
    }
  });
}

/* 7. Contact Form & Toast */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent successfully.');
      form.reset();
    });
  }
}

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(err => {
    showToast(`Failed to copy ${label}`);
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

/* 8. Mobile Navigation Hamburger */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-secondary)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderRadius = 'var(--radius-md)';
        navLinks.style.boxShadow = 'var(--shadow-md)';
      }
    });
  }
}
