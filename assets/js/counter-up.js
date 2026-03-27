// assets/js/counter-up.js
document.addEventListener('DOMContentLoaded', function() {
  const countingSection = document.querySelector('.counting');
  const counters = countingSection.querySelectorAll('.count');
  let hasStarted = false;

  const runCount = () => {
    counters.forEach($this => {
      const countTo = +$this.getAttribute('data-count');
      $({ countNum: 0 }).animate(
        { countNum: countTo },
        {
          duration: 5000,
          step(now) {
            $this.textContent = Math.floor(now);
          },
          complete() {
            $this.textContent = countTo + '+';
          }
        }
      );
    });
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasStarted) {
          runCount();
          hasStarted = true;
          obs.unobserve(countingSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(countingSection);
});