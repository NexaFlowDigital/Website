/* ============================================================
   NexaFlow Digital: Quote form
   Works with any <form class="js-quote-form">. Sends the same
   payload to the same Apps Script endpoint as before and fires
   the submit_lead_form GA4 conversion.
   Also exposes window.nfPrefillQuote(service, message) so the
   interactive demos can drop their result into the form.
   ============================================================ */
(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxeq76hZqYSFTnUHVhq8URi1DmKKYuI-OtzB6dmU0wJNtIBzYYVu6bWRDhbGXvdpCnsXQ/exec';

  function wire(form) {
    var submit = form.querySelector('[type="submit"]');
    var msg = form.querySelector('.alert');
    var method = form.querySelector('[name="contact_method"]');
    var phone = form.querySelector('[name="phone"]');
    var service = form.querySelector('[name="service"]');
    var other = form.querySelector('.js-other-service');
    var btnText = submit ? submit.innerHTML : '';

    function togglePhone() {
      if (!method || !phone) return;
      var need = method.value === 'phone' || method.value === 'text';
      phone.style.display = need ? 'block' : 'none';
      phone.required = need;
      if (!need) phone.value = '';
    }
    function toggleOther() {
      if (!service || !other) return;
      var need = service.value === 'other';
      other.style.display = need ? 'block' : 'none';
      other.required = need;
      if (!need) other.value = '';
    }
    if (method) method.addEventListener('change', togglePhone);
    if (service) service.addEventListener('change', toggleOther);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!submit) return;
      submit.disabled = true;
      submit.textContent = 'Sending...';
      if (msg) msg.textContent = '';

      var el = form.elements;
      var payload = {
        name: (el['name'] && el['name'].value.trim()) || '',
        business: (el['business'] && el['business'].value.trim()) || '',
        email: (el['email'] && el['email'].value.trim()) || '',
        phone: (el['phone'] && el['phone'].value.trim()) || '',
        service: (el['service'] && el['service'].value.trim()) || '',
        other_service: other ? other.value.trim() : '',
        contact_method: (el['contact_method'] && el['contact_method'].value.trim()) || '',
        message: (el['message'] && el['message'].value.trim()) || '',
        captcha: (form.querySelector('[name="cf-turnstile-response"]') || {}).value || ''
      };

      fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function () {
          if (msg) msg.textContent = 'Thanks! Your quote request was sent. We will be in touch soon.';
          form.reset();
          togglePhone();
          toggleOther();
          if (typeof gtag === 'function') gtag('event', 'submit_lead_form');
          if (window.turnstile) { try { window.turnstile.reset(); } catch (err) {} }
        })
        .catch(function (err) {
          console.error(err);
          if (msg) msg.textContent = 'That did not go through. Please try again or email erika@nexaflowdigital.com.';
        })
        .finally(function () {
          submit.disabled = false;
          submit.innerHTML = btnText;
        });
    });
  }

  document.querySelectorAll('form.js-quote-form').forEach(wire);

  /* Prefill from interactive demos */
  window.nfPrefillQuote = function (serviceValue, message) {
    var form = document.querySelector('form.js-quote-form');
    if (!form) return;
    var service = form.querySelector('[name="service"]');
    var box = form.querySelector('[name="message"]');
    if (service && serviceValue) {
      service.value = serviceValue;
      service.dispatchEvent(new Event('change'));
    }
    if (box && message) box.value = message;
    var target = document.getElementById('quote') || document.getElementById('contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () {
      var first = form.querySelector('[name="name"]');
      if (first) first.focus({ preventScroll: true });
    }, 700);
  };
})();
