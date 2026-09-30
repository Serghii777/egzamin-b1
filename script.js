const BUY_URL = 'https://iramelnyk91gmailcom.lms.softbook.app/shop/item/12999';

// Tomorrow's date – changes automatically every day.
(() => {
  const months = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const value = `${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`;
  document.querySelectorAll('[data-tomorrow]').forEach(el => el.textContent = value);
})();

// One-hour countdown shared between all timer blocks.
(() => {
  const KEY = 'b1_sale_deadline_49';
  let deadline = Number(sessionStorage.getItem(KEY));
  if (!deadline || deadline <= Date.now()) {
    deadline = Date.now() + 60 * 60 * 1000;
    sessionStorage.setItem(KEY, String(deadline));
  }

  const pad = n => String(n).padStart(2, '0');
  function render() {
    let diff = Math.max(0, deadline - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.querySelectorAll('[data-hours]').forEach(el => el.textContent = pad(h));
    document.querySelectorAll('[data-minutes]').forEach(el => el.textContent = pad(m));
    document.querySelectorAll('[data-seconds]').forEach(el => el.textContent = pad(s));
  }
  render();
  setInterval(render, 250);
})();

// Program accordion.
const programToggle = document.getElementById('programToggle');
const programList = document.getElementById('programList');
if (programToggle && programList) {
  programToggle.addEventListener('click', () => {
    const open = programList.classList.toggle('is-open');
    programList.setAttribute('aria-hidden', open ? 'false' : 'true');
    programToggle.textContent = open ? 'згорнути ↑' : 'детальніше ↓';
    programToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Review carousel arrows.
const track = document.getElementById('reviewsTrack');
if (track) {
  const amount = () => Math.min(track.clientWidth * 0.85, 430);
  document.querySelector('.carousel-arrow.next')?.addEventListener('click', () => track.scrollBy({left: amount(), behavior:'smooth'}));
  document.querySelector('.carousel-arrow.prev')?.addEventListener('click', () => track.scrollBy({left: -amount(), behavior:'smooth'}));
}

// Meta InitiateCheckout before leaving for Softbook.
document.querySelectorAll('.purchase-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        value: 49.00,
        currency: 'PLN',
        content_name: 'Інтенсив B1 — 7 днів'
      });
    }
    setTimeout(() => { window.location.href = BUY_URL; }, 350);
  });
});
