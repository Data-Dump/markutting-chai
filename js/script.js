
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


const servicesSection = document.getElementById('what-we-build');
const serviceSlides = document.querySelectorAll('.service-slide');
const slideTabs = document.querySelectorAll('.slide-tab');
let currentSlideIdx = 0;

function updateServicesSlides() {
    if (!servicesSection) return;
    const rect = servicesSection.getBoundingClientRect();
    const scrollRange = servicesSection.offsetHeight - window.innerHeight;
    const scrolledIn = Math.max(0, Math.min(scrollRange, -rect.top));
    const progress = scrollRange > 0 ? scrolledIn / scrollRange : 0;
    const idx = Math.min(2, Math.max(0, Math.floor(progress * 3)));
    if (idx === currentSlideIdx) return;
    currentSlideIdx = idx;
    serviceSlides.forEach((s, i) => s.classList.toggle('slide-active', i === idx));
    slideTabs.forEach((t, i) => t.classList.toggle('tab-active', i === idx));
}


slideTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        if (!servicesSection) return;
        const sectionTop = servicesSection.getBoundingClientRect().top + window.scrollY;
        const scrollRange = servicesSection.offsetHeight - window.innerHeight;
        const target = sectionTop + (i / 2) * scrollRange;
        window.scrollTo({ top: target, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', updateServicesSlides, { passive: true });
updateServicesSlides();




const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    const [s0, s1, s2] = navToggle.querySelectorAll('span');
    if (open) {
        s0.style.transform = 'translateY(6.5px) rotate(45deg)';
        s1.style.opacity = '0';
        s2.style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
        s0.style.transform = s1.style.opacity = s2.style.transform = '';
    }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = s.style.opacity = ''; });
}));


const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const delay = Math.min(siblings.indexOf(entry.target) * 80, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
        const form = e.target;
        const thanks = document.getElementById('leadThanks');
        const submitBtn = form.querySelector('button[type="submit"]');

        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzmqi9HtesvxEBaK7NRU5kwKhOweCSpRNV-WlyydZ4nXhwZEA_zd9sliUZ-Qze_MEnl/exec';

        let iframe = document.getElementById('hiddenConfirm');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.name = 'hiddenConfirm';
            iframe.id = 'hiddenConfirm';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }

        form.action = googleScriptUrl;
        form.method = 'POST';
        form.target = 'hiddenConfirm';

        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            const pdfUrl = 'assets/downloads/Brand-Clarity-Checklist.pdf';
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = 'Markutting_Chai_Brand_Checklist.pdf';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            form.style.display = 'none';
            thanks.classList.add('show');
        }, 800);
    });
}

const snapSections = document.querySelectorAll('.services-snap-section');

function updateSnapSections(forceInit = false) {
    snapSections.forEach(section => {
        const slides = section.querySelectorAll('.service-slide');
        const tabs = section.querySelectorAll('.slide-tab');
        if (!slides.length) return;

        const rect = section.getBoundingClientRect();
        const scrollRange = section.offsetHeight - window.innerHeight;
        const scrolledIn = Math.max(0, Math.min(scrollRange, -rect.top));
        const progress = scrollRange > 0 ? scrolledIn / scrollRange : 0;

        const numSlides = slides.length;
        const idx = Math.min(numSlides - 1, Math.max(0, Math.floor(progress * numSlides)));

        const currentIdx = parseInt(section.dataset.currentIdx || '-1', 10);
        if (idx !== currentIdx || forceInit) {
            section.dataset.currentIdx = idx;
            slides.forEach((s, i) => s.classList.toggle('slide-active', i === idx));
            tabs.forEach((t, i) => t.classList.toggle('tab-active', i === idx));
        }
    });
}

snapSections.forEach(section => {
    const tabs = section.querySelectorAll('.slide-tab');
    const numSlides = section.querySelectorAll('.service-slide').length;

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const scrollRange = section.offsetHeight - window.innerHeight;
            const target = sectionTop + ((i + 0.5) / numSlides) * scrollRange;
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    });
});

window.addEventListener('scroll', updateSnapSections, { passive: true });
updateSnapSections(true);

