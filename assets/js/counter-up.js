// assets/js/counter-up.js
document.addEventListener('DOMContentLoaded', function() {
  const countingSection = document.querySelector('.by-numbers');
  if (!countingSection) return;

  const counters = countingSection.querySelectorAll('.number-value[data-count]');
  let hasStarted = false;

  const runCount = () => {
    counters.forEach(function($this) {
      const countTo = +$this.getAttribute('data-count');
      const suffix = $this.getAttribute('data-suffix') || '+';
      const suffixEl = $this.querySelector('.number-plus');

      // Hide suffix during animation
      if (suffixEl) suffixEl.style.opacity = '0';

      $({ countNum: 0 }).animate(
        { countNum: countTo },
        {
          duration: 2200,
          easing: 'swing',
          step: function(now) {
            const val = Math.floor(now);
            if (suffixEl) {
              $this.childNodes[0].textContent = val;
            } else {
              $this.textContent = val;
            }
          },
          complete: function() {
            if (suffixEl) {
              $this.childNodes[0].textContent = countTo;
              suffixEl.style.opacity = '1';
            } else {
              $this.textContent = countTo + suffix;
            }
          }
        }
      );
    });
  };

  const observer = new IntersectionObserver(
    function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasStarted) {
          runCount();
          hasStarted = true;
          obs.unobserve(countingSection);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(countingSection);
});
