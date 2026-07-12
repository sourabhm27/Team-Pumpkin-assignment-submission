// ---------- theme toggle ----------
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  function applyTheme(theme){
    if(theme === 'dark'){ root.setAttribute('data-theme','dark'); }
    else{ root.removeAttribute('data-theme'); }
  }

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // ---------- image slots: show real image if it loads ----------
  function wireImage(imgId, placeholderId){
    const img = document.getElementById(imgId);
    const ph = document.getElementById(placeholderId);
    img.addEventListener('load', () => {
      img.classList.remove('hidden');
      ph.style.display = 'none';
    });
    img.addEventListener('error', () => {
      img.classList.add('hidden');
      ph.style.display = 'flex';
    });
    if (img.complete && img.naturalWidth > 0){
      img.classList.remove('hidden');
      ph.style.display = 'none';
    }
  }

  wireImage('logoImg', 'logoPlaceholder');
  wireImage('aboutImg', 'aboutPlaceholder');
  wireImage('poster1', 'poster1Placeholder');
  wireImage('poster2', 'poster2Placeholder');
  wireImage('poster3', 'poster3Placeholder');

  // ---------- scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---------- header: hide on scroll down, show on scroll up ----------
  const headerEl = document.querySelector('header');
  let lastScrollY = window.scrollY;
  let ticking = false;
  const HIDE_AFTER = 140; // px scrolled before header is allowed to hide

  function onScroll(){
    const currentY = window.scrollY;
    const goingDown = currentY > lastScrollY;

    if (currentY <= HIDE_AFTER){
      headerEl.classList.remove('header-hidden');
    } else if (goingDown){
      headerEl.classList.add('header-hidden');
    } else {
      headerEl.classList.remove('header-hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
