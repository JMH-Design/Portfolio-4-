// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only prevent default for anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.hero-greeting');

  if (!title) return;

  const text = title.textContent;

  title.textContent = '';

  const tokens = text.split(/(\s+)/);

  const line = document.createElement('span');
  line.classList.add('split-line');

  tokens.forEach((token) => {
    if (!token) return;

    if (/^\s+$/.test(token)) {
      line.appendChild(document.createTextNode(token));
    } else {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('split-word');
      wordSpan.textContent = token;
      line.appendChild(wordSpan);
    }
  });

  title.appendChild(line);

  if (window.gsap) {
    // Animate hero title words
    gsap.from('.split-word', {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3,
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const body = document.body;

  // Check for saved theme preference or default to dark mode
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  const toggleTheme = () => {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode')
      ? 'light'
      : 'dark';
    localStorage.setItem('theme', currentTheme);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-navigation .nav-link');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !hamburger.contains(e.target) &&
        !mobileNav.contains(e.target) &&
        mobileNav.classList.contains('active')
      ) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }
});
