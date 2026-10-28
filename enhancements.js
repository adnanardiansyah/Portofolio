// Shared resilience and keyboard accessibility for all portfolio pages.
window.portfolioStorage = {
  getItem(key) { try { return localStorage.getItem(key); } catch { return null; } },
  setItem(key, value) { try { localStorage.setItem(key, value); } catch {} }
};

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('hamburger');
  const theme = document.getElementById('themeToggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateTheme() {
    const light = document.body.classList.contains('light-mode');
    document.documentElement.classList.toggle('dark', !light);
    document.documentElement.style.colorScheme = light ? 'light' : 'dark';
    theme?.setAttribute('aria-label', light ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
    theme?.setAttribute('aria-pressed', String(light));
  }
  updateTheme();
  theme?.addEventListener('click', updateTheme);

  if (menu && toggle) {
    toggle.setAttribute('aria-controls', menu.id);
    function syncMenu() {
      const open = menu.style.display === 'flex';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
    }
    function closeMenu() {
      if (menu.style.display === 'flex') toggle.click();
    }
    syncMenu();
    new MutationObserver(syncMenu).observe(menu, { attributes: true, attributeFilter: ['style'] });
    document.addEventListener('keydown', event => {
      if (menu.style.display !== 'flex') return;
      if (event.key === 'Escape') { closeMenu(); toggle.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle, ...menu.querySelectorAll('a[href], button:not([disabled])')];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  // Keep content readable when optional animation CDNs are unavailable.
  if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
  }
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href], #mobileMenu a[href]').forEach(link => {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('.filter-btn').forEach(button => {
    const sync = () => button.setAttribute('aria-pressed', String(button.classList.contains('on')));
    sync();
    new MutationObserver(sync).observe(button, { attributes: true, attributeFilter: ['class'] });
  });
});
