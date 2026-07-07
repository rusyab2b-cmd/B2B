// RUSYA2B2 animasyonları (brief §7):
// scroll reveal + stagger, mini grafik barı büyümesi, hero count-up, hover lift (CSS).
// prefers-reduced-motion: hareket kapatılır, son değerler anında gösterilir.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setBars(scope) {
  scope.querySelectorAll('[data-h]').forEach((b) => {
    b.style.height = b.dataset.h + '%';
  });
}

function runCount(el) {
  if (el.dataset.done) return;
  el.dataset.done = 1;
  const target = parseFloat(el.dataset.count),
    dec = parseInt(el.dataset.dec || 0),
    suf = el.dataset.suffix || '',
    pre = el.textContent.trim().startsWith('%') ? '%' : '';
  const finish = () => (el.textContent = pre + target.toFixed(dec) + suf);
  if (reducedMotion) return finish();
  let start = null;
  const dur = 1100;
  function step(t) {
    if (!start) start = t;
    const p = Math.min((t - start) / dur, 1),
      val = target * (0.2 + 0.8 * p * (2 - p));
    el.textContent = pre + val.toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
    else finish();
  }
  requestAnimationFrame(step);
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        el.classList.add('in');
        const kids = el.classList.contains('stagger') ? [...el.children] : [];
        kids.forEach((k, i) => (k.style.transitionDelay = i * 70 + 'ms'));
        setBars(el);
        el.querySelectorAll('[data-count]').forEach(runCount);
        io.unobserve(el);
      }
    });
  },
  { threshold: 0.18 }
);
document.querySelectorAll('.reveal, .stagger').forEach((el) => io.observe(el));

// hero yüzen kart barları + hero istatistikleri sayfa açılışında çalışır
window.addEventListener('load', () => {
  document.querySelectorAll('.fbars [data-h]').forEach((b) => (b.style.height = b.dataset.h + '%'));
  document.querySelectorAll('.hero [data-count]').forEach(runCount);
});
