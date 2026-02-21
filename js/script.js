/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Hamburger menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

function closeMobile() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
}

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Contact form (demo – no backend) ── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate sending
    const btn = document.getElementById('send-message-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
        form.reset();
        success.style.display = 'block';
        btn.style.display = 'none';
    }, 1200);
});

/* ── Typed subtitle effect ── */
const subtitlePhrases = [
    'Mechanical Engineering Student  |  Aspiring Robotics Engineer',
    'CAD & SolidWorks Enthusiast',
    'Arduino & Python Tinkerer',
    'Building Intelligent Machines'
];
const subtitleEl = document.querySelector('.hero-subtitle');
let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingSpeed  = 60;

function type() {
    const current = subtitlePhrases[phraseIndex];
    if (isDeleting) {
        charIndex--;
        typingSpeed = 30;
    } else {
        charIndex++;
        typingSpeed = 60;
    }

    const visibleText = current.substring(0, charIndex);
    subtitleEl.innerHTML = `<span class="highlight">${visibleText}</span><span style="color:var(--clr-blue);animation:blink 1s step-end infinite;">|</span>`;

    if (!isDeleting && charIndex === current.length) {
        isDeleting  = true;
        typingSpeed = 2000; // pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % subtitlePhrases.length;
        typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
}

// Start with a small delay
setTimeout(type, 900);
