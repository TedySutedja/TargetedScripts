/**
 * TargetedScripts - Core Loader & Interactive Logic
 * Optimized for resilience, event delegation, and zero blocking UI.
 */

// 1. Helper function untuk memuat komponen individual dengan Error Handling
async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);
    if (!container) return; // Ignore jika kontainer tidak ditemukan di halaman aktif

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
        } else {
            console.warn(`[TargetedScripts] Gagal memuat ${filePath} (Status: ${response.status})`);
        }
    } catch (error) {
        console.error(`[TargetedScripts] Network error saat memuat ${filePath}:`, error);
    }
}

// 2. Main DOM Entry Point
document.addEventListener("DOMContentLoaded", async function() {
    // Jalankan inisialisasi UI dasar SEBELUM/SEJAJAR dengan fetch agar menu & listener langsung responsif
    initGlobalListeners();

    // List seluruh komponen modular index.html
    const components = [
        { id: 'header-root', path: 'components/header.html' },
        { id: 'hero-root', path: 'components/hero.html' },
        { id: 'services-root', path: 'components/services.html' },
        { id: 'portfolio-root', path: 'components/portfolio.html' },
        { id: 'dashboards-root', path: 'components/dashboards.html' },
        { id: 'pricing-root', path: 'components/pricing.html' },
        { id: 'faq-root', path: 'components/faq.html' },
        { id: 'about-root', path: 'components/about.html' },
        { id: 'contact-root', path: 'components/contact.html' },
        { id: 'footer-root', path: 'components/footer.html' }
    ];

    // Gunakan Promise.allSettled agar jika 1 komponen gagal/404, komponen lain TETAP muncul
    await Promise.allSettled(
        components.map(comp => loadComponent(comp.id, comp.path))
    );

    // Inisialisasi ulang fungsi interaktif khusus setelah DOM komponen ter-inject sepenuhnya
    initMobileMenu();
    initCalculator();
    initFormHandler();
});

// 3. Logika Mobile Navigation Menu (Safe Check)
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileBtn || !mobileMenu) return;

    // Remove existing listener jika ada untuk cegah duplikasi
    mobileBtn.replaceWith(mobileBtn.cloneNode(true));
    const newBtn = document.getElementById('mobile-menu-btn');

    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Otomatis tutup drawer menu saat salah satu link diklik
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// 4. Logika ROI Savings Calculator
function initCalculator() {
    const hoursSlider = document.getElementById('hours-slider');
    const rateSlider = document.getElementById('rate-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const rateDisplay = document.getElementById('rate-display');
    const annualHoursOutput = document.getElementById('annual-hours');
    const annualSavingsOutput = document.getElementById('annual-savings');

    if (!hoursSlider || !rateSlider) return;

    function updateCalculator() {
        const hours = parseInt(hoursSlider.value) || 0;
        const rate = parseInt(rateSlider.value) || 0;
        
        // Asumsi efisiensi 80% per minggu dari total jam kerja
        const annualHoursSaved = Math.round(hours * 52 * 0.8);
        const annualDollarSaved = annualHoursSaved * rate;

        if (hoursDisplay) hoursDisplay.textContent = hours + (hours === 1 ? ' hr' : ' hrs');
        if (rateDisplay) rateDisplay.textContent = '$' + rate + ' / hr';
        if (annualHoursOutput) annualHoursOutput.textContent = annualHoursSaved.toLocaleString() + ' Hours';
        if (annualSavingsOutput) annualSavingsOutput.textContent = '$' + annualDollarSaved.toLocaleString() + ' NZD';
    }

    hoursSlider.addEventListener('input', updateCalculator);
    rateSlider.addEventListener('input', updateCalculator);
    
    // Initial run
    updateCalculator();
}

// 5. Logika Form Contact Dispatcher
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || 'Not provided';
        const subject = document.getElementById('subject')?.value || 'General Enquiry';
        const message = document.getElementById('message')?.value || '';

        const emailSubject = encodeURIComponent(`Targeted Scripts Enquiry: ${subject} - ${name}`);
        const emailBody = encodeURIComponent(
            `Hello Tedy,\n\nNew enquiry from Targeted Scripts website:\n\n` +
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${subject}\n\nMessage:\n${message}`
        );

        // Buka mailto client
        window.location.href = `mailto:info@targetedscripts.com?subject=${emailSubject}&body=${emailBody}`;

        // Tampilkan pesan sukses UI
        contactForm.classList.add('hidden');
        document.getElementById('form-success')?.classList.remove('hidden');
    });
}

// 6. Global Event Listeners (Event Delegation)
function initGlobalListeners() {
    // Mencegah error jika fungsi dipanggil via inline HTML sebelum script selesai
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        initFormHandler();
    };
}