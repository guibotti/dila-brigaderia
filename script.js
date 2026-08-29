const message = encodeURIComponent('Olá! Vim pelo site da Dila Brigaderia e gostaria de pedir um orçamento.');
document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = `https://wa.me/5511911726856?text=${message}`;
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  document.documentElement.classList.add('motion-ready');

  const revealGroups = [
    ['.section-intro, .gallery-head, .process-copy > .eyebrow, .process-copy > h2, .cta-section > *', 'reveal-up'],
    ['.occasion-grid article, .process-copy li', 'reveal-up'],
    ['.gallery-grid figure, .process-photo', 'reveal-scale']
  ];

  const animated = [];
  revealGroups.forEach(([selector, effect]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.reveal = effect;
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
      animated.push(element);
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

  animated.forEach((element) => revealObserver.observe(element));

  const header = document.querySelector('.site-header');
  const parallaxImages = document.querySelectorAll('.hero-visual > img, .process-photo > img');
  let ticking = false;

  const updateMotion = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    parallaxImages.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const offset = Math.max(-18, Math.min(18, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.035));
      image.style.setProperty('--parallax-y', `${offset}px`);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateMotion);
      ticking = true;
    }
  }, { passive: true });

  updateMotion();
}
