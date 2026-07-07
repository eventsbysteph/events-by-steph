// Events by Steph — site behavior

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav after clicking a link
    var navLinks = document.querySelectorAll('#site-nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal for elements marked .reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Contact form validation -> real submission to FormSubmit (emails Steph directly)
  var form = document.getElementById('contact-form');
  if (form) {
    var errorMessage = document.getElementById('form-error-message');
    var requiredFields = form.querySelectorAll('[required]');

    function clearInvalidStyles() {
      requiredFields.forEach(function (field) {
        var wrapper = field.closest('.form-field');
        if (wrapper) {
          wrapper.classList.remove('field-invalid');
        }
      });
    }

    function checkFormValidity() {
      if (form.checkValidity()) {
        errorMessage.classList.remove('visible');
        clearInvalidStyles();
      }
    }

    requiredFields.forEach(function (field) {
      field.addEventListener('input', checkFormValidity);
      field.addEventListener('change', checkFormValidity);
    });

    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        errorMessage.classList.add('visible');

        requiredFields.forEach(function (field) {
          var wrapper = field.closest('.form-field');
          if (!wrapper) return;
          if (!field.checkValidity()) {
            wrapper.classList.add('field-invalid');
          } else {
            wrapper.classList.remove('field-invalid');
          }
        });

        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // If valid, the form submits normally to FormSubmit, which emails Steph directly.
    });
  }

});
