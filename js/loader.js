async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } else {
            console.error(`Gagal memuat ${filePath}: Status ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    // Memuat seluruh komponen secara paralel
    await Promise.all([
        loadComponent('header-root', 'components/header.html'),
        loadComponent('portfolio-root', 'components/portfolio.html'),
        loadComponent('contact-root', 'components/contact.html'),
        loadComponent('footer-root', 'components/footer.html')
    ]);

    // Inisialisasi event listener SETELAH komponen HTML terpasang di DOM
    initMobileMenu();
    initCalculator();
});

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
        });

        // Tutup menu otomatis saat salah satu link navigasi diklik
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initCalculator() {
    const hoursSlider = document.getElementById('hours-slider');
    const rateSlider = document.getElementById('rate-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const rateDisplay = document.getElementById('rate-display');
    const annualHoursOutput = document.getElementById('annual-hours');
    const annualSavingsOutput = document.getElementById('annual-savings');

    function updateCalculator() {
        if (!hoursSlider || !rateSlider) return;
        const hours = parseInt(hoursSlider.value);
        const rate = parseInt(rateSlider.value);
        const annualHoursSaved = Math.round(hours * 52 * 0.8);
        const annualDollarSaved = annualHoursSaved * rate;

        if (hoursDisplay) hoursDisplay.textContent = hours + (hours === 1 ? ' hr' : ' hrs');
        if (rateDisplay) rateDisplay.textContent = '$' + rate + ' / hr';
        if (annualHoursOutput) annualHoursOutput.textContent = annualHoursSaved.toLocaleString() + ' Hours';
        if (annualSavingsOutput) annualSavingsOutput.textContent = '$' + annualDollarSaved.toLocaleString() + ' NZD';
    }

    if (hoursSlider && rateSlider) {
        hoursSlider.addEventListener('input', updateCalculator);
        rateSlider.addEventListener('input', updateCalculator);
        updateCalculator();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailSubject = encodeURIComponent(`Targeted Scripts Enquiry: ${subject} - ${name}`);
    const emailBody = encodeURIComponent(
        `Hello Tedy,\n\nNew enquiry from Targeted Scripts website:\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nInterest: ${subject}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:info@targetedscripts.com?subject=${emailSubject}&body=${emailBody}`;

    document.getElementById('contact-form')?.classList.add('hidden');
    document.getElementById('form-success')?.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", async function() {
    // Memuat seluruh komponen
    await Promise.all([
        loadComponent('header-root', 'components/header.html'),
        loadComponent('hero-root', 'components/hero.html'),
        loadComponent('services-root', 'components/services.html'),
        loadComponent('portfolio-root', 'components/portfolio.html'),
        loadComponent('contact-root', 'components/contact.html')
    ]);

    // Inisialisasi logika interaktif
    initMobileMenu();
    initCalculator();
});

document.addEventListener("DOMContentLoaded", async function() {
    // Memuat seluruh komponen
    await Promise.all([
        loadComponent('header-root', 'components/header.html'),
        loadComponent('hero-root', 'components/hero.html'),
        loadComponent('services-root', 'components/services.html'),
        loadComponent('dashboards-root', 'components/dashboards.html'),
        loadComponent('portfolio-root', 'components/portfolio.html'),
        loadComponent('pricing-root', 'components/pricing.html'),
        loadComponent('faq-root', 'components/faq.html'),
        loadComponent('contact-root', 'components/contact.html')
    ]);

    // Inisialisasi logika interaktif
    initMobileMenu();
    initCalculator();
});

document.addEventListener("DOMContentLoaded", async function() {
    await Promise.all([
        loadComponent('header-root', 'components/header.html'),
        loadComponent('hero-root', 'components/hero.html'),
        loadComponent('services-root', 'components/services.html'),
        loadComponent('dashboards-root', 'components/dashboards.html'),
        loadComponent('portfolio-root', 'components/portfolio.html'),
        loadComponent('pricing-root', 'components/pricing.html'),
        loadComponent('faq-root', 'components/faq.html'),
        loadComponent('about-root', 'components/about.html'),
        loadComponent('contact-root', 'components/contact.html')
    ]);

    initMobileMenu();
    initCalculator();
});
