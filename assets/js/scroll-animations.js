/* ============================================================
   NexaFlow Digital — Scroll Animations
   Lightweight Intersection Observer — no library needed
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // Elements to animate — each gets a fade+slide-up on enter
    const selectors = [
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
        '.ap-why-card',
        '.ap-diff-card',
        '.ap-problem-card',
        '.ap-founder',
        '.prefooter-text',
        '.prefooter-actions',
        '.by-numbers .numbers-heading',
    ].join(', ');

    const elements = document.querySelectorAll(selectors);

    // Set initial hidden state via JS (avoids flash of unstyled content)
    elements.forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(2.4rem)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        // Stagger siblings in the same grid
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
        observer.observe(el);
    });

    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }

});
