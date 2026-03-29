// ===== Magnetic Cursor =====
(function() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0,  ringY = 0;
  let magnetTarget = null;

  const MAGNETIC_SELECTOR = 'a, button, .filter-btn, .about-tab, .project-card, .social-icon, .edu-prev, .edu-next, #scroll-top-btn, .floating-contact-btn';
  const MAGNETIC_STRENGTH = 0.35;
  const MAGNETIC_RADIUS   = 80;

  // Track raw mouse
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animate() {
    let targetX = mouseX;
    let targetY = mouseY;
    let ringW = 40, ringH = 40;
    let isMagnetic = false;

    // Find nearest magnetic element
    const els = document.querySelectorAll(MAGNETIC_SELECTOR);
    let closest = null, closestDist = MAGNETIC_RADIUS;

    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      if (dist < closestDist) { closestDist = dist; closest = el; }
    });

    if (closest) {
      const r = closest.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;

      // Pull ring toward element center
      targetX = mouseX + (cx - mouseX) * MAGNETIC_STRENGTH;
      targetY = mouseY + (cy - mouseY) * MAGNETIC_STRENGTH;

      // Ring resizes to wrap the element
      ringW = Math.max(r.width  + 20, 40);
      ringH = Math.max(r.height + 16, 40);
      isMagnetic = true;
    }

    // Lerp ring position
    ringX += (targetX - ringX) * 0.14;
    ringY += (targetY - ringY) * 0.14;

    ring.style.left   = ringX + 'px';
    ring.style.top    = ringY + 'px';
    ring.style.width  = ringW + 'px';
    ring.style.height = ringH + 'px';
    ring.style.borderRadius = isMagnetic ? '12px' : '50%';

    ring.classList.toggle('magnetic', isMagnetic);

    requestAnimationFrame(animate);
  }
  animate();

  // Click effect
  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking');
    ring.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking');
    ring.classList.remove('clicking');
  });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Dark Mode
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Restore saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('active');
  const isOpen = navLinks.classList.contains('active');
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== Scroll Spy =====
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
});

//Underlines in navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// ===== Hero Stat Counters =====
document.addEventListener('DOMContentLoaded', () => {
  const statNums = document.querySelectorAll('.hero-stat-num');
  let counted = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
      });
    }
  }, { threshold: 0.5 });

  const heroContent = document.querySelector('.hero-stats');
  if (heroContent) observer.observe(heroContent);
});

// ===== Scroll Indicator =====
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

//Decrypting effect
document.addEventListener('DOMContentLoaded', () => {
    const decodingText = document.getElementById('decoding-text');
    const sentences = [
        "Khen Ashley Limos",
        "IT Specialist",
        "Full-Stack Developer",
        "Problem Solver",
        "Hackathon Champion",
        "Lifelong Learner",
        "Building Solutions"
    ];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDecoding = true;
    let delay = 100;

    const randomChar = () => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
        return chars[Math.floor(Math.random() * chars.length)];
    };

    const decodeText = () => {
        const currentSentence = sentences[sentenceIndex];
        if (isDecoding) {
            // Show random characters for the entire sentence
            const decodedText = currentSentence
                .split('')
                .map((char, index) => (index < charIndex ? char : randomChar()))
                .join('');
            decodingText.textContent = decodedText;
            decodingText.setAttribute('data-text', decodedText); // Update glitch effect text

            // Move to the next character
            charIndex++;
            delay = 100;

            // If all characters are decoded, pause before revealing the next sentence
            if (charIndex > currentSentence.length) {
                isDecoding = false;
                delay = 2000; // Pause before starting the next sentence
            }
        } else {
            // Reset for the next sentence
            charIndex = 0;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            isDecoding = true;
            delay = 500; // Short delay before starting the next sentence
        }

        setTimeout(decodeText, delay);
    };

    decodeText();
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
  const form = this;
  const btn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const spinner = document.getElementById('btn-spinner');
  const status = document.getElementById('form-status');
  
  // Prevent default if JavaScript is enabled
  e.preventDefault();
  
  // Show loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  spinner.style.display = 'block';
  status.style.display = 'none';
  
  // Submit form data
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Success message
      status.textContent = 'Message sent successfully!';
      status.className = 'success';
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    // Error message
    status.textContent = 'Failed to send message. Please email me directly at your@email.com';
    status.className = 'error';
    console.error('Error:', error);
  })
  .finally(() => {
    // Reset button state
    status.style.display = 'block';
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    spinner.style.display = 'none';
  });
});

//Smooth Trqnsition
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

// ===== Scroll to Top =====
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== About Tabs =====
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.about-tab');
  const panels = document.querySelectorAll('.about-tab-panel');
  let ringsAnimated = false;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      target.classList.add('active');

      if (tab.dataset.tab === 'skills' && !ringsAnimated) {
        ringsAnimated = true;
        setTimeout(() => {
          document.querySelectorAll('.ring-fill').forEach((ring, i) => {
            const filled = (parseInt(ring.dataset.level) / 100) * 251.2;
            setTimeout(() => {
              ring.style.strokeDasharray = `${filled} ${251.2 - filled}`;
            }, i * 120);
          });
        }, 50);
      }
    });
  });
});

// ===== Circular Progress Rings =====
document.addEventListener('DOMContentLoaded', () => {
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svgDefs.innerHTML = `
    <defs>
      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1abc9c"/>
        <stop offset="100%" stop-color="#3498db"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svgDefs);
});

// ===== Project Cards =====
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // --- Entrance animation on scroll ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));

  // --- Filter tabs ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // --- Mobile flip on tap ---
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      const inner = card.querySelector('.project-card-inner');
      const isFlipped = inner.style.transform === 'rotateY(180deg)';
      inner.style.transition = 'transform 0.8s';
      inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
  });

  // Reset on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      cards.forEach(card => {
        card.querySelector('.project-card-inner').style.transform = '';
      });
    }
  });
});

// ===== Console Text Animation =====
document.addEventListener('DOMContentLoaded', () => {
  const consoleText = document.getElementById('console-text');
  const bioLines = [
    "> Khen Ashley D. Limos\n",
    "> Professional Summary:\n",
    "  - Information Technology Student\n", 
    "  - Consistent Academic Achiever\n",
    "  - Technical & Soft Skills Developer\n",
    "> Key Attributes:\n",
    "  - Detail-oriented\n",
    "  - Fast Learner\n",
    "  - Collaborative Team Player",
  ];

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start typing when console is visible
        startTypingAnimation();
        observer.unobserve(entry.target); // Stop observing after triggering
      }
    });
  }, {
    threshold: 0.5, // Trigger when 50% of element is visible
    rootMargin: '0px 0px -100px 0px' // Adjust trigger point slightly higher
  });

  // Observe the console container
  const consoleContainer = document.querySelector('.console-container');
  observer.observe(consoleContainer);

  function startTypingAnimation() {
    let lineIndex = 0;
    let currentLine = 0;
    let currentChar = 0;
    let isNewLine = false;

    function typeConsole() {
      if (lineIndex < bioLines.length) {
        const line = bioLines[lineIndex];
        
        if (currentChar < line.length) {
          // Type character by character
          consoleText.textContent += line[currentChar];
          currentChar++;
          
          // Randomize typing speed slightly for more natural feel
          const speed = line[currentChar] === '\n' ? 100 : 30 + Math.random() * 40;
          setTimeout(typeConsole, speed);
        } else {
          // Move to next line
          lineIndex++;
          currentChar = 0;
          setTimeout(typeConsole, 200);
        }
      } else {
        // Add blinking cursor after completion
        consoleText.innerHTML += '<span class="blinking-cursor">_</span>';
      }
    }

    // Clear any existing content
    consoleText.textContent = '';
    
    // Start the animation
    setTimeout(typeConsole, 500); // Small delay after becoming visible
  }

  // Add blinking cursor styles if not already present
  if (!document.querySelector('style[data-blink-cursor]')) {
    const style = document.createElement('style');
    style.setAttribute('data-blink-cursor', '');
    style.textContent = `
      .blinking-cursor {
        animation: blink 1s step-end infinite;
        color: #1abc9c;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
});

// ===== Education Carousel =====
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.edu-carousel-track');
  const wrapper = document.querySelector('.edu-carousel-track-wrapper');
  const prevBtn = document.querySelector('.edu-prev');
  const nextBtn = document.querySelector('.edu-next');

  // Grab original slides before cloning
  const origSlides = Array.from(track.children);
  const total = origSlides.length;

  // Clone first and last for infinite loop
  const firstClone = origSlides[0].cloneNode(true);
  const lastClone  = origSlides[total - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, origSlides[0]);

  // All slides: [lastClone, ...originals, firstClone]
  const allSlides = Array.from(track.children);
  let current = 1; // start on first real slide (index 1)
  let locked = false;

  function slideWidth() {
    return allSlides[1].getBoundingClientRect().width + 12; // width + gap
  }

  function moveTo(index, animate) {
    track.style.transition = animate ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    track.style.transform = `translateX(${-index * slideWidth()}px)`;
    allSlides.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  // Initial position — no animation
  moveTo(current, false);

  function next() {
    if (locked) return;
    locked = true;
    current++;
    moveTo(current, true);
  }

  function prev() {
    if (locked) return;
    locked = true;
    current--;
    moveTo(current, true);
  }

  track.addEventListener('transitionend', () => {
    // Silently jump from clone to real slide
    if (current === allSlides.length - 1) {
      current = 1;
      moveTo(current, false);
    } else if (current === 0) {
      current = allSlides.length - 2;
      moveTo(current, false);
    }
    locked = false;
  });

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  window.addEventListener('resize', () => moveTo(current, false));
});

// ===== About Tabs =====
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.about-tab');
  const panels = document.querySelectorAll('.about-tab-panel');
  let ringsAnimated = false;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      target.classList.add('active');

      // Trigger rings animation when skills tab opens for the first time
      if (tab.dataset.tab === 'skills' && !ringsAnimated) {
        ringsAnimated = true;
        setTimeout(() => {
          document.querySelectorAll('.ring-fill').forEach((ring, i) => {
            const filled = (parseInt(ring.dataset.level) / 100) * 251.2;
            setTimeout(() => {
              ring.style.strokeDasharray = `${filled} ${251.2 - filled}`;
            }, i * 120);
          });
        }, 50);
      }
    });
  });
});

// ===== Circular Progress Rings =====
document.addEventListener('DOMContentLoaded', () => {
  // Inject shared SVG gradient
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svgDefs.innerHTML = `
    <defs>
      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1abc9c"/>
        <stop offset="100%" stop-color="#3498db"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svgDefs);
});

function initFloatingImages() {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  const floatingImages = document.querySelectorAll('.floating-image');
  const speed = 1.5;
  const maxRotation = 15;

  // Set boundaries
  const boundaries = {
    top: headerHeight + 20,
    right: hero.offsetWidth,
    bottom: hero.offsetHeight,
    left: 0
  };

  // Store animation frame IDs per image
  const animationFrameIds = new Map();

  floatingImages.forEach((img, index) => {
    // Initialize positions within bounds
    const startX = Math.random() * (boundaries.right - img.offsetWidth);
    const startY = boundaries.top + 
                  Math.random() * (boundaries.bottom - boundaries.top - img.offsetHeight);

    img.style.position = 'absolute';
    img.style.left = `${startX}px`;
    img.style.top = `${startY}px`;
    img.style.zIndex = '5';
    img.style.transform = 'rotate(0deg) scale(1)';
    img.style.transition = 'transform 0.3s ease';
    img.style.willChange = 'transform, left, top';
    img.style.cursor = 'grab';
    
    // Initialize animation data
    img.animateData = {
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      rotation: Math.random() * maxRotation * 2 - maxRotation,
      width: img.offsetWidth,
      height: img.offsetHeight,
      isDragging: false
    };

    // Make images draggable
    img.addEventListener('mousedown', startDrag);
    img.addEventListener('touchstart', startDrag, { passive: true });

    // Start individual animation
    animateImage(img, index);
  });

  function startDrag(e) {
    const img = e.currentTarget;
    const data = img.animateData;
    data.isDragging = true;
    
    // Get initial position
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    data.offsetX = clientX - data.x;
    data.offsetY = clientY - data.y;
    
    img.style.cursor = 'grabbing';
    img.style.zIndex = '100';
    img.style.transform = `rotate(${data.rotation}deg) scale(1.2)`;
    img.style.transition = 'transform 0.2s ease';
  }

  function dragMove(e) {
    const draggingImg = [...floatingImages].find(img => img.animateData.isDragging);
    if (!draggingImg) return;
    
    const data = draggingImg.animateData;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    // Calculate new position with boundary checks
    data.x = Math.max(boundaries.left, 
                     Math.min(clientX - data.offsetX, 
                             boundaries.right - data.width));
    data.y = Math.max(boundaries.top, 
                     Math.min(clientY - data.offsetY, 
                             boundaries.bottom - data.height));
    
    // Apply subtle rotation while dragging
    data.rotation = ((data.x / boundaries.right) * maxRotation * 2) - maxRotation;
    
    draggingImg.style.left = `${data.x}px`;
    draggingImg.style.top = `${data.y}px`;
    draggingImg.style.transform = `rotate(${data.rotation}deg) scale(1.2)`;
  }

  function endDrag() {
    const draggingImg = [...floatingImages].find(img => img.animateData.isDragging);
    if (!draggingImg) return;
    
    const data = draggingImg.animateData;
    data.isDragging = false;
    
    draggingImg.style.cursor = 'grab';
    draggingImg.style.zIndex = '5';
    draggingImg.style.transform = `rotate(${data.rotation}deg) scale(1)`;
    draggingImg.style.transition = 'transform 0.3s ease';
    
    // Give new random velocity when released
    data.vx = (Math.random() - 0.5) * speed * 2;
    data.vy = (Math.random() - 0.5) * speed * 2;
  }

  function animateImage(img, index) {
    const data = img.animateData;
    
    if (!data.isDragging) {
      // Update position only if not being dragged
      data.x += data.vx;
      data.y += data.vy;
      
      // Boundary checks - X axis
      if (data.x <= boundaries.left) {
        data.x = boundaries.left;
        data.vx *= -1;
        data.rotation = (Math.random() * maxRotation) * Math.sign(data.vx);
      } else if (data.x + data.width >= boundaries.right) {
        data.x = boundaries.right - data.width;
        data.vx *= -1;
        data.rotation = (Math.random() * -maxRotation) * Math.sign(data.vx);
      }
      
      // Boundary checks - Y axis
      if (data.y <= boundaries.top) {
        data.y = boundaries.top;
        data.vy *= -1;
        data.rotation = (Math.random() * maxRotation) * Math.sign(data.vy);
      } else if (data.y + data.height >= boundaries.bottom) {
        data.y = boundaries.bottom - data.height;
        data.vy *= -1;
        data.rotation = (Math.random() * -maxRotation) * Math.sign(data.vy);
      }
      
      // Gentle pulsing effect
      const pulse = Math.sin(Date.now() / 2000 + index) * 0.05 + 1;
      
      // Apply transformations
      img.style.left = `${data.x}px`;
      img.style.top = `${data.y}px`;
      img.style.transform = `rotate(${data.rotation}deg) scale(${pulse})`;
    }
    
    // Continue animation for this specific image
    animationFrameIds.set(index, requestAnimationFrame(() => animateImage(img, index)));
  }

  // Event listeners for drag
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  // Handle resize
  const resizeHandler = debounce(() => {
    boundaries.right = hero.offsetWidth;
    boundaries.bottom = hero.offsetHeight;
    boundaries.top = header.offsetHeight + 20;
  }, 100);
  
  window.addEventListener('resize', resizeHandler);

  // Cleanup function
  return () => {
    animationFrameIds.forEach(id => cancelAnimationFrame(id));
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
    window.removeEventListener('resize', resizeHandler);
  };
}

// Helper function
function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Initialize with cleanup capability
const cleanupFloatingImages = initFloatingImages();

// Call cleanupFloatingImages() when needed (e.g., on page transition)

// Add keyboard navigation for dark mode toggle
darkModeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    darkModeToggle.click();
  }
});

// Improve focus management for mobile menu
burger.addEventListener('click', () => {
  if (navLinks.classList.contains('active')) {
    // Focus first nav link when menu opens
    document.querySelector('.nav-links a').focus();
  }
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Floating contact button functionality
  const floatingContactBtn = document.createElement('div');
  floatingContactBtn.className = 'floating-contact-btn';
  floatingContactBtn.innerHTML = '<i class="fas fa-envelope"></i>';
  document.body.appendChild(floatingContactBtn);

  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-header">
            <h2>Get In Touch</h2>
            <p>Have a project in mind or want to discuss opportunities? Send me a message!</p>
        </div>
        <form id="modal-contact-form" action="https://formspree.io/f/xyzelzqe" method="POST">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" required>
                <i class="fas fa-user"></i>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="jdcruz@example.com" required>
                <i class="fas fa-envelope"></i>
            </div>
            
            <div class="form-group">
                <label for="message">Your Message</label>
                <textarea id="message" name="message" placeholder="Hello Khen, I'd like to talk about..." required></textarea>
                <i class="fas fa-comment"></i>
            </div>
            
            <input type="text" name="_gotcha" style="display:none">
            <input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">
            <input type="hidden" name="_subject" value="New message from portfolio!">
            
            <button type="submit" id="modal-submit-btn" class="submit-btn">
                <span id="modal-btn-text">Send Message</span>
                <div id="modal-btn-spinner" class="spinner"></div>
                <i class="fas fa-paper-plane"></i>
            </button>
            
            <div id="modal-form-status"></div>
        </form>
    </div>
`;
  document.body.appendChild(modal);

  // Move the original contact form's event listener to the modal form
  const originalForm = document.getElementById('contact-form');
  const modalForm = document.getElementById('modal-contact-form');
  if (originalForm && modalForm) {
      modalForm.addEventListener('submit', function(e) {
          // Copy the original form submission logic here
          const form = this;
          const btn = document.getElementById('modal-submit-btn');
          const btnText = document.getElementById('modal-btn-text');
          const spinner = document.getElementById('modal-btn-spinner');
          const status = document.getElementById('modal-form-status');
          
          e.preventDefault();
          
          btn.disabled = true;
          btnText.textContent = 'Sending...';
          spinner.style.display = 'block';
          status.style.display = 'none';
          
          fetch(form.action, {
              method: 'POST',
              body: new FormData(form),
              headers: {
                  'Accept': 'application/json'
              }
          })
          .then(response => {
              if (response.ok) {
                  status.textContent = 'Message sent successfully!';
                  status.className = 'success';
                  form.reset();
                  // Close modal after 2 seconds
                  setTimeout(() => {
                      modal.classList.remove('active');
                  }, 2000);
              } else {
                  throw new Error('Form submission failed');
              }
          })
          .catch(error => {
              status.textContent = 'Failed to send message. Please try again later.';
              status.className = 'error';
          })
          .finally(() => {
              btn.disabled = false;
              btnText.textContent = 'Send Message';
              spinner.style.display = 'none';
              status.style.display = 'block';
          });
      });
  }

  // Modal toggle functionality
  floatingContactBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });

  // Close modal when clicking X or outside
  modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('contact-modal') || e.target.classList.contains('close-modal')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
      }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
      }
  });
});

// Add input focus effects
document.addEventListener('DOMContentLoaded', function() {
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const icon = group.querySelector('i');
      
      input.addEventListener('focus', () => {
          group.classList.add('focused');
          if (icon) icon.style.color = '#1abc9c';
      });
      
      input.addEventListener('blur', () => {
          group.classList.remove('focused');
          if (icon) icon.style.color = '';
      });
  });
  
  // Add character counter for textarea
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
      const charCounter = document.createElement('div');
      charCounter.className = 'char-counter';
      charCounter.textContent = '0/500';
      messageTextarea.parentNode.appendChild(charCounter);
      
      messageTextarea.addEventListener('input', () => {
          const currentLength = messageTextarea.value.length;
          charCounter.textContent = `${currentLength}/500`;
          
          if (currentLength > 500) {
              charCounter.style.color = '#e74c3c';
          } else {
              charCounter.style.color = '#7f8c8d';
          }
      });
  }
});

// Add to your JS file
document.querySelectorAll('.recognition-card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.classList.toggle('show-badge');
  }, { passive: true });
});
