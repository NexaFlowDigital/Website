/* ============================================================
   NexaFlow Digital — Scroll Animations
   Lightweight Intersection Observer — no library needed
   Mobile optimized: reduced delay, lower threshold
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    var isMobile = window.innerWidth <= 768;

    // On mobile — skip animations entirely for performance
    // Sections appear instantly, no lag
    if (isMobile) return;

    var selectors = [
        '.heading',
        '.service-card',
        '.process-card',
        '.number-card',
        '.testi-card',
        '.about-brand-card',
        '.about-copy-col',
        '.contact-panel',
        '.partner-note',
        '.service-summary',
        '.by-numbers .numbers-heading',
    ].join(', ');

    var elements = document.querySelectorAll(selectors);

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    elements.forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(1.8rem)';
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        // Minimal stagger — max 0.12s delay so grids don't feel slow
        el.style.transitionDelay = Math.min(i % 3, 2) * 0.06 + 's';
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });

});
