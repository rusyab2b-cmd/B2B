// Scroll reveal + veri barı büyümesi.
// prefers-reduced-motion: hareket kapatılır, son değerler anında gösterilir.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setBars = (scope) =>
  scope.querySelectorAll('[data-h]').forEach((b) => (b.style.height = b.dataset.h + '%'));

if (reduced) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  setBars(document);
} else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          setBars(e.target);
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
