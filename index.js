// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.querySelector('.pre-loader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, 2000);
});

// ===== PARALLAX SCROLLING =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-shape');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== MOUSE TILT EFFECT FOR CARDS =====
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');
const statCards = document.querySelectorAll('.stat-card');
const caseCards = document.querySelectorAll('.case-study-card');

function addTiltEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
}

projectCards.forEach(card => addTiltEffect(card));
skillCards.forEach(card => addTiltEffect(card));
statCards.forEach(card => addTiltEffect(card));
caseCards.forEach(card => addTiltEffect(card));

// ===== THEME TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
    
    // Save preference
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });

  // Load saved theme preference
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('i').classList.add('fa-sun');
    themeToggle.querySelector('i').classList.remove('fa-moon');
  }
}

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close menu when link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks) {
      navLinks.classList.remove('active');
    }
  });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== STATS COUNTER ANIMATION =====
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

if (statsSection && statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          let current = 0;
          const increment = Math.ceil(target / 60);
          
          const counterInterval = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(counterInterval);
            } else {
              stat.textContent = current;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// ===== TESTIMONIALS CAROUSEL =====
let currentSlide = 1;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');
let autoRotateInterval;

function showSlide(n) {
  currentSlide = n; // Update global currentSlide
  
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show current slide
  if (slides[n - 1]) {
    slides[n - 1].classList.add('active');
    if (dots[n - 1]) {
      dots[n - 1].classList.add('active');
    }
  }
}

function nextSlide() {
  let next = currentSlide + 1;
  if (next > slides.length) {
    next = 1;
  }
  showSlide(next);
}

function prevSlide() {
  let prev = currentSlide - 1;
  if (prev < 1) {
    prev = slides.length;
  }
  showSlide(prev);
}

function autoRotate() {
  nextSlide();
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = setInterval(autoRotate, 5000);
}

// Initialize carousel
if (slides.length > 0) {
  showSlide(1);
  autoRotateInterval = setInterval(autoRotate, 5000);
  
  // Add click listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index + 1);
      resetAutoRotate();
    });
  });
  
  // Add click listeners to prev/next buttons
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoRotate();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoRotate();
    });
  }
}

// ===== SCROLL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  observer.observe(section);
});

// ===== GLOW EFFECT ON SCROLL =====
window.addEventListener('scroll', () => {
  const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const glow = Math.sin(scrollProgress * Math.PI * 4) * 0.3 + 0.5;
  
  document.querySelectorAll('.stat-number').forEach(el => {
    el.style.opacity = Math.min(1, glow + 0.5);
  });
});
