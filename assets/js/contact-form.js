const contactNavLink = document.querySelector('header a[href="/#contact"]');

contactNavLink?.addEventListener('click', (event) => {
  if (window.innerWidth >= 992 || window.location.pathname !== '/') return;

  const nav = document.getElementById('navbarSupportedContent');
  const toggler = document.querySelector('.navbar-toggler');

  event.preventDefault();
  event.stopPropagation();

  const scrollToContact = () => {
    if (location.hash !== '#contact') history.pushState(null, '', '/#contact');
    requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView());
  };
  const closeMenu = () => {
    nav.addEventListener('hidden.bs.collapse', scrollToContact, { once: true });
    toggler.click();
  };

  if (nav?.classList.contains('show')) {
    closeMenu();
  } else if (nav?.classList.contains('collapsing')) {
    if (toggler?.getAttribute('aria-expanded') === 'true') {
      nav.addEventListener('shown.bs.collapse', closeMenu, { once: true });
    } else {
      nav.addEventListener('hidden.bs.collapse', scrollToContact, { once: true });
    }
  } else {
    scrollToContact();
  }
}, true);

document.querySelectorAll('form[data-contact-form]').forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton.disabled) {
    form.addEventListener('submit', (event) => event.preventDefault());
    return;
  }

  form.addEventListener('submit', (event) => {
    if (form.dataset.submitting === 'true') {
      event.preventDefault();
      return;
    }

    if (form.checkValidity()) {
      form.dataset.submitting = 'true';
      submitButton.disabled = true;
    }
  });

  window.addEventListener('pageshow', () => {
    form.dataset.submitting = 'false';
    submitButton.disabled = false;
  });
});
