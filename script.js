(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-tr]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-tr-ph]').forEach(function (el) {
      var val = el.getAttribute('data-ph-' + lang);
      if (val !== null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('.js-lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('nt-lang', lang); } catch (e) {}
  }
  window.setLang = setLang;

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('nt-lang'); } catch (e) {}
    if (saved === 'en') setLang('en');
  }

  function initNav() {
    var burger = document.getElementById('burger');
    var overlay = document.getElementById('nav-overlay');
    if (!burger || !overlay) return;
    function close() {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('nav-locked');
    }
    burger.addEventListener('click', function () {
      var isOpen = overlay.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-locked', isOpen);
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = encodeURIComponent(form.name.value);
      var email = encodeURIComponent(form.email.value);
      var message = encodeURIComponent(form.message.value);
      var subject = encodeURIComponent('Website contact form — ' + form.name.value);
      var body = encodeURIComponent(form.message.value + '\n\n— ' + form.name.value + ' (' + form.email.value + ')');
      window.location.href = 'mailto:merhaba@nilufertandogan.com?subject=' + subject + '&body=' + body;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
    initForm();
  });
})();
