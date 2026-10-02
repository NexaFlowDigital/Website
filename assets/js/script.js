$(document).ready(function(){

  $('.scroll-top').hide();

  /*--------------- Navbar Toggler ---------------*/
  $('#menu-btn').click(function(e){
    e.stopPropagation();
    $(this).toggleClass('fa-times fa-bars');
    $('.navbar').toggleClass('active');
  });

  // Close nav when a link is clicked
  $('.navbar a').click(function(){
    $('.navbar').removeClass('active');
    $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
  });

  // Close nav when clicking outside
  $(document).click(function(e){
    if (!$(e.target).closest('.navbar, #menu-btn').length) {
      $('.navbar').removeClass('active');
      $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
    }
  });

  /*--------------- Scroll-Top ---------------*/
  $(window).on('scroll', function(){

    $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
    $('.navbar').removeClass('active');

    // STICKY HEADER
    if($(window).scrollTop() > 0){
      $(".header").addClass("sticky");
    } else {
      $(".header").removeClass("sticky");
    }

    if ($(this).scrollTop() > 100) {
      $('.scroll-top').fadeIn();
    } else {
      $('.scroll-top').fadeOut();
    }

  });

});


/* ============================================================
   2026 refresh: mobile quote bar + project showcase tabs
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile "Get a free quote" bar (every page) ---- */
  var formSection = document.getElementById('quote') || document.getElementById('contact');
  var href = formSection ? '#' + formSection.id : '/#contact';
  var bar = document.createElement('div');
  bar.className = 'quote-bar';
  bar.innerHTML =
    '<a class="qb-main" href="' + href + '">Get a free quote <i class="fas fa-arrow-right"></i></a>' +
    '<a class="qb-call" href="tel:4698502644" aria-label="Call NexaFlow Digital"><i class="fas fa-phone-alt"></i></a>';
  document.body.appendChild(bar);
  document.body.classList.add('has-quote-bar');

  var formVisible = false;
  if (formSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      formVisible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(formSection);
  }
  function update() {
    bar.classList.toggle('show', window.scrollY > 420 && !formVisible);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();

  /* ---- Showcase tabs (service pages) ---- */
  document.querySelectorAll('.showcase').forEach(function (box) {
    var tabs = box.querySelectorAll('.showcase-tab');
    var panels = box.querySelectorAll('.showcase-panel');
    function select(i, focus) {
      tabs.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowDown' || k === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (k === 'ArrowUp' || k === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
  });
});
