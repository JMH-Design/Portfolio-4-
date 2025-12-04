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

// Hero grid functionality
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.hero-grid');
  if (!grid) return;

  const getColCount = () => {
    if (window.innerWidth <= 480) return 8;
    if (window.innerWidth <= 768) return 12;
    return 20;
  };

  const config = {
    cols: getColCount(),
    rows: 1,
  };

  const buildGrid = () => {
    const totalCells = config.cols * config.rows;
    grid.innerHTML = new Array(totalCells)
      .fill(0)
      .map(
        () => `
      <div style="
        --cell-grade: ${Math.floor(Math.random() * 12 - 6)};
        --cell-opacity: ${0.3 + Math.random() * 0.5};
        --cell-lightness-light: ${15 + Math.floor(Math.random() * 26)};
        --cell-lightness-dark: ${85 + Math.floor(Math.random() * 13)};
      ">+</div>
    `
      )
      .join('');
    grid.style.setProperty('--grid-cols', config.cols);
    grid.style.setProperty('--grid-rows', config.rows);
  };

  buildGrid();

  // Rebuild grid on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      config.cols = getColCount();
      buildGrid();
    }, 250);
  });

  // Touch device support
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    grid.addEventListener(
      'pointermove',
      (event) => {
        document.querySelector('[data-hover]')?.removeAttribute('data-hover');
        const element = document.elementFromPoint(event.x, event.y);
        if (element && element.parentElement === grid) {
          element.dataset.hover = 'true';
        }
      },
      true
    );

    grid.addEventListener(
      'pointerleave',
      () => {
        document.querySelector('[data-hover]')?.removeAttribute('data-hover');
      },
      true
    );
  }
});
