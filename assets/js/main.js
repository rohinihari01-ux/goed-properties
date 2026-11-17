/* ==========================================================================
   Elite Estate - Core Javascript & Bootstrapper
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Handler
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 600); // Elegant luxury delay
        });
        
        // Fallback if load event doesn't fire fast
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 3000);
    }

    // 2. Load Modular Header & Footer
    loadHeaderAndFooter();

    // 3. Setup Scroll Progress Indicator
    setupScrollProgress();

    // 4. Setup Back to Top Button
    setupBackToTop();

    // 5. Setup Client Journey Stepper
    setupJourneyStepper();

    // 6. Setup Testimonials Filter
    setupTestimonialsFilter();

    // 7. Setup FAQ Accordion & Live Search
    setupFaqAccordionAndSearch();

    // 8. Setup Services Portfolio Filter
    setupServicesFilter();
});

/**
 * Loads header and footer HTML parts asynchronously
 * to promote reuse across all static pages.
 */
function loadHeaderAndFooter() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Load Header
    if (headerPlaceholder && headerPlaceholder.dataset.staticHeader === "true") {
        // Header markup is inline in the page; just wire up behaviours
        highlightActiveLink();
        if (typeof initNavbar === "function") {
            initNavbar();
        }
    } else if (headerPlaceholder) {
        fetch("assets/compounent/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load header template");
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                highlightActiveLink();
                if (typeof initNavbar === "function") {
                    initNavbar();
                }
            })
            .catch(err => {
                console.error("Header injection error; using the built-in navigation:", err);
                renderFallbackHeader(headerPlaceholder);
            });
    }

    // Load Footer
    if (footerPlaceholder) {
        fetch("assets/compounent/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer template");
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                setupFooterNewsletter();
            })
            .catch(err => {
                console.error("Footer injection error; using fallback footer:", err);
                renderFallbackFooter(footerPlaceholder);
            });
    }
}

/**
 * Fallback footer markup in case component fetch fails (e.g., local file:// protocol)
 */
function renderFallbackFooter(placeholder) {
    if (!placeholder) return;
    if (placeholder.querySelector("footer")) return; // Already has fallback content
    placeholder.innerHTML = `
<footer class="bg-slate-50 text-[#333333] pt-20 pb-12 px-6 md:px-12 font-inter border-t border-slate-200">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 pb-14 border-b border-slate-200">
        <div class="space-y-6 xl:col-span-1 md:col-span-2 lg:col-span-1">
            <a href="index.html" class="flex items-center" aria-label="Goed Properties Home">
                <img src="assets/images/icons/header-logo.svg" alt="Goed Properties Logo" class="h-10 w-auto object-contain">
            </a>
            <p class="text-[#666666] text-sm leading-relaxed font-light">
                For over 15 years, Goed Properties has been Chennai's premier real estate consultancy, connecting buyers with legally verified residential plots, premium apartments, luxury villas, and high-value investment properties.
            </p>
            <div class="flex items-center space-x-3 pt-2">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"><i class="fa-brands fa-youtube"></i></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="https://wa.me/919941843344" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"><i class="fa-brands fa-whatsapp text-lg"></i></a>
            </div>
        </div>
        <div class="space-y-4">
            <h4 class="text-sm font-bold uppercase tracking-widest text-[#C8102E] font-playfair border-b-2 border-[#C8102E]/20 pb-2 inline-block">Quick Links</h4>
            <ul class="space-y-2.5 text-sm text-[#666666] font-medium">
                <li><a href="index.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Home</a></li>
                <li><a href="about.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> About Us</a></li>
                <li><a href="properties.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Properties Portfolio</a></li>
                <li><a href="services.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Our Services</a></li>
                <li><a href="blogs.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Blogs &amp; Insights</a></li>
                <li><a href="contact.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Contact Us</a></li>
                <li><a href="privacy-policy.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[10px] text-[#C8102E]/60"></i> Privacy Policy</a></li>
            </ul>
        </div>
        <div class="space-y-4">
            <h4 class="text-sm font-bold uppercase tracking-widest text-[#C8102E] font-playfair border-b-2 border-[#C8102E]/20 pb-2 inline-block">Featured Projects</h4>
            <ul class="space-y-2 text-xs text-[#666666] font-medium">
                <li><a href="codename-king-life.html" class="hover:text-[#C8102E] transition-colors block truncate">Shriram Codename King Life</a></li>
                <li><a href="thirumazhisai-property.html" class="hover:text-[#C8102E] transition-colors block truncate">Urbanrise Next Big Thing</a></li>
                <li><a href="dra-astra.html" class="hover:text-[#C8102E] transition-colors block truncate">DRA Astra</a></li>
                <li><a href="godrej-azure.html" class="hover:text-[#C8102E] transition-colors block truncate">Godrej Azure</a></li>
                <li><a href="prestige-pallavaram-gardens.html" class="hover:text-[#C8102E] transition-colors block truncate">Prestige Pallavaram Gardens</a></li>
                <li><a href="prestige-palm-court.html" class="hover:text-[#C8102E] transition-colors block truncate">Prestige Palm Court</a></li>
                <li><a href="purva-windermere.html" class="hover:text-[#C8102E] transition-colors block truncate">Purva Windermere</a></li>
                <li><a href="radience-solitaire.html" class="hover:text-[#C8102E] transition-colors block truncate">Radiance Solitaire</a></li>
                <li><a href="tvs-emerald-verde-vista.html" class="hover:text-[#C8102E] transition-colors block truncate">TVS Emerald Verde Vista</a></li>
                <li><a href="urbanrise-the-world-of-joy.html" class="hover:text-[#C8102E] transition-colors block truncate">Urbanrise World of Joy</a></li>
            </ul>
        </div>
        <div class="space-y-4">
            <h4 class="text-sm font-bold uppercase tracking-widest text-[#C8102E] font-playfair border-b-2 border-[#C8102E]/20 pb-2 inline-block">Tools &amp; Insights</h4>
            <ul class="space-y-2.5 text-sm text-[#666666] font-medium">
                <li><a href="investment-calculator.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-calculator text-[11px] text-[#C8102E]/60"></i> Investment Calculator</a></li>
                <li><a href="area-converter.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-ruler-combined text-[11px] text-[#C8102E]/60"></i> Area Converter</a></li>
                <li><a href="calculator.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-coins text-[11px] text-[#C8102E]/60"></i> EMI / Loan Calculator</a></li>
                <li><a href="contact.html" class="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-calendar-check text-[11px] text-[#C8102E]/60"></i> Book Site Visit</a></li>
            </ul>
            <div class="pt-3 border-t border-slate-200">
                <span class="text-[10px] uppercase font-bold tracking-widest text-[#C8102E] block mb-1">RERA Verification</span>
                <p class="text-[11px] text-[#666666] leading-relaxed font-light">
                    Layouts &amp; projects registered under TNRERA. Verify at <a href="https://www.rera.tn.gov.in/" target="_blank" rel="noopener noreferrer" class="underline font-medium hover:text-[#C8102E]">rera.tn.gov.in</a>.
                </p>
            </div>
        </div>
        <div class="space-y-4">
            <h4 class="text-sm font-bold uppercase tracking-widest text-[#C8102E] font-playfair border-b-2 border-[#C8102E]/20 pb-2 inline-block">Corporate Office</h4>
            <ul class="space-y-3 text-xs text-[#666666] font-light">
                <li class="flex items-start gap-2.5">
                    <i class="fa-solid fa-location-dot text-[#C8102E] mt-1 flex-shrink-0"></i>
                    <span>No.42, 2nd Floor, Sindur shopping center, 2nd avenue, Anna Nagar, Chennai - 600040.</span>
                </li>
                <li class="flex items-start gap-2.5">
                    <i class="fa-solid fa-phone text-[#C8102E] mt-0.5 flex-shrink-0"></i>
                    <span class="space-y-0.5">
                        <a href="tel:+919941843344" class="hover:text-[#C8102E] transition-colors font-medium">+91 99418 43344</a><br>
                        <a href="tel:+917824824301" class="hover:text-[#C8102E] transition-colors font-medium">+91 78248 24301</a>
                    </span>
                </li>
                <li class="flex items-start gap-2.5">
                    <i class="fa-brands fa-whatsapp text-[#25D366] mt-0.5 text-sm flex-shrink-0"></i>
                    <a href="https://wa.me/919941843344" target="_blank" rel="noopener noreferrer" class="hover:text-[#C8102E] transition-colors font-medium">WhatsApp Support</a>
                </li>
                <li class="flex items-start gap-2.5">
                    <i class="fa-solid fa-envelope text-[#C8102E] mt-0.5 flex-shrink-0"></i>
                    <a href="mailto:srinivasan.c@goedproperties.in" class="hover:text-[#C8102E] transition-colors break-all">srinivasan.c@goedproperties.in</a>
                </li>
                <li class="flex items-start gap-2.5">
                    <i class="fa-solid fa-clock text-[#C8102E] mt-0.5 flex-shrink-0"></i>
                    <span>Mon – Sun: 10:00 AM – 6:00 PM</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="max-w-7xl mx-auto py-8 border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center lg:text-left">
            <h4 class="text-sm font-bold uppercase tracking-widest text-[#C8102E] font-playfair">Stay Ahead with Verified Property Updates</h4>
            <p class="text-xs text-[#666666] font-light">Subscribe to receive exclusive Chennai property launches, verified plots, and high-ROI investment alerts.</p>
        </div>
        <form class="flex w-full max-w-md gap-2" onsubmit="event.preventDefault(); alert('Thank you for subscribing! We will keep you updated.'); this.reset();">
            <input type="email" placeholder="Enter your email address" required 
                   class="flex-1 bg-white border border-slate-300 rounded-luxury py-3 px-4 text-xs text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#C8102E] transition-colors">
            <button type="submit" aria-label="Subscribe" 
                    class="bg-[#C8102E] hover:bg-[#A30B22] text-white text-xs font-semibold px-5 py-3 rounded-luxury transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow">
                <span>Subscribe</span>
                <i class="fa-solid fa-arrow-right-long text-[11px]"></i>
            </button>
        </form>
    </div>
    <div class="max-w-7xl mx-auto pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-[#666666] font-light gap-6 text-center lg:text-left">
        <p>&copy; 2026 Goed Properties. All rights reserved. 15+ years of trusted real estate advisory in Chennai.</p>
        <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span class="text-slate-600">Designed and Developed by <a href="https://rankraze.com/" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-900 hover:text-[#C8102E] transition-colors underline decoration-dotted underline-offset-4">Rankraze</a></span>
            <a href="https://rankraze.com/" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8102E] hover:bg-[#A30B22] text-white text-[11px] font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
               aria-label="Navigate to Rankraze">
                <span>Visit Rankraze</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
        </div>
        <div class="flex space-x-6 justify-center">
            <a href="privacy-policy.html" class="hover:text-[#C8102E] transition-colors duration-300">Privacy Policy</a>
            <a href="privacy-policy.html#terms" class="hover:text-[#C8102E] transition-colors duration-300">Terms of Service</a>
            <a href="contact.html" class="hover:text-[#C8102E] transition-colors duration-300">Contact</a>
        </div>
    </div>
</footer>`;
    setupFooterNewsletter();
}

/**
 * Provides the shared navigation when fetching the HTML partial is unavailable
 * (for example, when a page is opened directly with the file:// protocol).
 */
function renderFallbackHeader(headerPlaceholder) {
    headerPlaceholder.innerHTML = `
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-6">
            <a href="index.html" class="flex items-center flex-shrink-0" aria-label="Goed Properties Home">
                <img src="assets/images/icons/header-logo.svg" alt="Goed Properties Logo" class="h-10 md:h-12 w-auto object-contain">
            </a>
            <nav class="hidden lg:flex items-center gap-8 font-inter text-sm font-semibold tracking-wider uppercase text-luxuryDark" aria-label="Primary">
                <a href="index.html" class="nav-link hover:text-brandRed transition-colors">Home</a>
                <a href="about.html" class="nav-link hover:text-brandRed transition-colors">About</a>
                <a href="properties.html" class="nav-link hover:text-brandRed transition-colors">Properties</a>
                <div class="relative group">
                    <a href="#" class="nav-link inline-flex items-center gap-2" aria-haspopup="true" onclick="event.preventDefault()">Tools <i class="fa-solid fa-chevron-down text-[10px]" aria-hidden="true"></i></a>
                    <div class="absolute left-0 top-full hidden w-56 pt-4 group-hover:block group-focus-within:block">
                        <div class="rounded-xl border border-luxuryBorder bg-white p-2 shadow-xl">
                            <a href="investment-calculator.html" class="block rounded-lg px-4 py-3 text-xs font-semibold tracking-wide text-luxuryDark transition hover:bg-brandRed/10 hover:text-brandRed">Investment Calculator</a>
                            <a href="area-converter.html" class="block rounded-lg px-4 py-3 text-xs font-semibold tracking-wide text-luxuryDark transition hover:bg-brandRed/10 hover:text-brandRed">Area Converter</a>
                        </div>
                    </div>
                </div>
                <a href="services.html" class="nav-link hover:text-brandRed transition-colors">Services</a>
                <a href="blogs.html" class="nav-link hover:text-brandRed transition-colors">Blogs</a>
                <a href="contact.html" class="nav-link hover:text-brandRed transition-colors">Contact</a>
            </nav>
            <a href="contact.html" class="hidden lg:inline-block btn-brand-gradient text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-luxury">Book Consultation</a>
            <button id="mobile-menu-btn" class="lg:hidden text-luxuryDark p-2" aria-label="Toggle Navigation Menu">
                <span class="block w-6 h-0.5 bg-luxuryDark mb-1.5"></span>
                <span class="block w-6 h-0.5 bg-luxuryDark mb-1.5"></span>
                <span class="block w-6 h-0.5 bg-luxuryDark"></span>
            </button>
        </div>
        <div id="drawer-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] opacity-0 pointer-events-none transition-opacity duration-500"></div>
        <div id="mobile-nav-drawer" class="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-[210] shadow-2xl translate-x-full transition-transform duration-500 flex flex-col p-8 font-inter">
            <div class="flex items-center justify-between pb-6 border-b border-luxuryBorder">
                <img src="assets/images/icons/header-logo.svg" alt="Goed Properties Logo" class="h-8 w-auto">
                <button id="close-drawer-btn" class="text-luxuryDark text-2xl" aria-label="Close Mobile Drawer">&times;</button>
            </div>
            <nav class="flex flex-col space-y-3 py-6 text-base font-semibold text-luxuryDark tracking-wide" aria-label="Mobile">
                <a href="index.html" class="block py-3 px-4">Home</a>
                <a href="about.html" class="block py-3 px-4">About</a>
                <a href="properties.html" class="block py-3 px-4">Properties</a>
                <div class="px-4 pt-2">
                    <span class="block py-2 font-bold text-brandRed">Tools</span>
                    <a href="investment-calculator.html" class="block py-2 pl-3 text-sm text-luxuryGray">Investment Calculator</a>
                    <a href="area-converter.html" class="block py-2 pl-3 text-sm text-luxuryGray">Area Converter</a>
                </div>
                <a href="services.html" class="block py-3 px-4">Services</a>
                <a href="blogs.html" class="block py-3 px-4">Blogs</a>
                <a href="contact.html" class="block py-3 px-4">Contact</a>
            </nav>
            <a href="contact.html" class="mt-auto block text-center btn-brand-gradient font-bold text-sm uppercase tracking-widest py-4 rounded-luxury">Book Consultation</a>
        </div>`;

    highlightActiveLink();
    if (typeof initNavbar === "function") {
        initNavbar();
    }
}

/**
 * Adds styling classes to the navigation link
 * corresponding to the user's current page location.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const isToolPage = pageName === "investment-calculator.html" || pageName === "area-converter.html";
    const isBlogPage = pageName === "blogs.html" || currentPath.includes("/blogs/") || pageName.includes("blog");
    
    // Find all links in the header navbar
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        
        // Match home page cases: empty, /, index.html
        if ((pageName === "" || pageName === "index.html") && (linkHref === "index.html" || linkHref === "./")) {
            link.classList.add("active", "text-brandRed");
        } else if (isToolPage && (link.id === "nav-tools" || link.textContent.trim().startsWith("Tools"))) {
            link.classList.add("active", "text-brandRed");
        } else if (isBlogPage && (link.id === "nav-blogs" || link.textContent.trim().toLowerCase() === "blogs" || (linkHref && linkHref.includes("blog")))) {
            link.classList.add("active", "text-brandRed");
        } else if (pageName && linkHref && linkHref !== "#" && linkHref.includes(pageName)) {
            link.classList.add("active", "text-brandRed");
        } else {
            link.classList.remove("active", "text-brandRed");
        }
    });
}

/**
 * Tracks scrolling progress and updates top horizontal progress indicator.
 */
function setupScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });
}

/**
 * Manages visibility and click scroll behavior for the back-to-top button.
 */
function setupBackToTop() {
    const backBtn = document.getElementById("back-to-top");
    if (!backBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backBtn.classList.add("visible");
        } else {
            backBtn.classList.remove("visible");
        }
    });

    backBtn.addEventListener("click", () => {
        // If Lenis is active, let it handle the smooth scroll
        if (window.lenisInstance) {
            window.lenisInstance.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}

/**
 * Newsletter confirmation utility inside the injected footer
 */
function setupFooterNewsletter() {
    const form = document.querySelector("footer form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        if (input && input.value.trim() !== "") {
            alert(`Thank you for subscribing! Exquisite updates will be sent to ${input.value}.`);
            input.value = "";
        }
    });
}

/**
 * Interactive Client Journey Roadmap & Stage Intelligence HUD Synchronization
 */
function setupJourneyStepper() {
    const chips = document.querySelectorAll(".journey-step-chip");
    const svgNodes = document.querySelectorAll(".journey-svg-node");
    const stageCounter = document.getElementById("journey-stage-counter");
    const prevBtn = document.getElementById("journey-prev-btn");
    const nextBtn = document.getElementById("journey-next-btn");
    const tourBtn = document.getElementById("journey-tour-btn");
    const tourIcon = document.getElementById("journey-tour-icon");
    const tourText = document.getElementById("journey-tour-text");

    const hudCard = document.getElementById("hud-content-card");
    const hudPhaseKicker = document.getElementById("hud-phase-kicker");
    const hudPhaseNum = document.getElementById("hud-phase-num");
    const hudIcon = document.getElementById("hud-icon");
    const hudStageTitle = document.getElementById("hud-stage-title");
    const hudStageLocation = document.getElementById("hud-stage-location");
    const hudStageTimeline = document.getElementById("hud-stage-timeline");
    const hudStageDesc = document.getElementById("hud-stage-desc");
    const hudStageTags = document.getElementById("hud-stage-tags");
    const hudActionBtn = document.getElementById("hud-action-btn");
    const hudActionText = document.getElementById("hud-action-text");
    const hudStatusBadge = document.getElementById("hud-status-badge");

    const stagesData = [
        {
            kicker: "Phase 01 · Discovery",
            num: "STAGE 01 OF 06",
            icon: "fa-solid fa-compass-drafting",
            title: "Consultation & Strategy",
            location: "Anna Nagar Advisory HQ",
            timeline: "Day 01–02",
            desc: "We evaluate your budget parameters, preferred growth corridors, lifestyle expectations, and portfolio goals to construct your bespoke buying blueprint with verified CMDA / DTCP inventory.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "Requirement Matrix" },
                { icon: "fa-solid fa-check text-emerald-400", label: "Budget Modeling" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "100% CMDA Clearance" }
            ],
            actionText: "Book Discovery Call",
            actionHref: "contact.html?subject=Discovery+Consultation",
            statusText: "Zero Brokerage Direct"
        },
        {
            kicker: "Phase 02 · Exploration",
            num: "STAGE 02 OF 06",
            icon: "fa-solid fa-car-side",
            title: "Curated VIP Site Tours",
            location: "OMR · ECR · Porur · GST",
            timeline: "Day 03–07",
            desc: "Private chauffeur-driven inspections of pre-vetted gated communities, luxury villas, and prime plots. Receive real-time infrastructure, water table, and masterplan analytics on-site.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "Chauffeur Escort" },
                { icon: "fa-solid fa-check text-emerald-400", label: "Groundwater Testing" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "Infrastructure Audit" }
            ],
            actionText: "Schedule VIP Tour",
            actionHref: "contact.html?subject=VIP+Site+Tour",
            statusText: "Complimentary Chauffeur"
        },
        {
            kicker: "Phase 03 · Valuation",
            num: "STAGE 03 OF 06",
            icon: "fa-solid fa-handshake",
            title: "Commercials & Price Lock",
            location: "Direct Developer Desk",
            timeline: "Day 08–10",
            desc: "We negotiate directly with Tier-1 developers to lock in exclusive pre-launch pricing, payment plans, and zero-brokerage guarantees with absolute price protection.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "Exclusive Bulk Rates" },
                { icon: "fa-solid fa-check text-emerald-400", label: "Payment Milestones" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "Zero Hidden Charges" }
            ],
            actionText: "Request Price Matrix",
            actionHref: "contact.html?subject=Price+Lock+Inquiry",
            statusText: "Best Rate Guarantee"
        },
        {
            kicker: "Phase 04 · Verification",
            num: "STAGE 04 OF 06",
            icon: "fa-solid fa-scale-balanced",
            title: "30-Year Legal Due Diligence",
            location: "Madras High Court Cell",
            timeline: "Day 11–16",
            desc: "Comprehensive 30-year title search, Encumbrance Certificate validation, parent deed verification, CMDA/DTCP/RERA approval checks handled by veteran real estate attorneys.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "30-Yr Parent Deed Audit" },
                { icon: "fa-solid fa-check text-emerald-400", label: "Nil Encumbrance (EC)" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "100% Clean Legal Opinion" }
            ],
            actionText: "Review Legal Protocol",
            actionHref: "contact.html?subject=Legal+Due+Diligence",
            statusText: "High Court Cell Certified"
        },
        {
            kicker: "Phase 05 · Closing",
            num: "STAGE 05 OF 06",
            icon: "fa-solid fa-file-signature",
            title: "Sub-Registrar Registration",
            location: "Jurisdictional SRO Office",
            timeline: "Day 17–20",
            desc: "End-to-end management of stamp duty calculation, token generation, sale deed drafting, and VIP escort at the Sub-Registrar Office for a frictionless signing experience.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "Sale Deed Drafting" },
                { icon: "fa-solid fa-check text-emerald-400", label: "SRO Priority Appointment" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "Govt Receipt Delivery" }
            ],
            actionText: "Registration Support",
            actionHref: "contact.html?subject=Registration+Desk",
            statusText: "VIP Fast-Track Escort"
        },
        {
            kicker: "Phase 06 · Welcome Home",
            num: "STAGE 06 OF 06",
            icon: "fa-solid fa-key",
            title: "Key Handover & Possession",
            location: "Your New Property",
            timeline: "Day 21+",
            desc: "Final site walk-through, Snag List audit, physical key handover, Khata/Patta name transfer assistance, and lifetime post-acquisition asset management support.",
            tags: [
                { icon: "fa-solid fa-check text-emerald-400", label: "Snag-Free Inspection" },
                { icon: "fa-solid fa-check text-emerald-400", label: "Patta Transfer Support" },
                { icon: "fa-solid fa-shield-check text-brandRed", label: "Lifetime Advisory Access" }
            ],
            actionText: "Get Started Now",
            actionHref: "contact.html?subject=Get+Started",
            statusText: "100% Complete & Delivered"
        }
    ];

    let currentStep = 0;
    let tourTimer = null;

    function activateStep(index) {
        if (index < 0 || index >= stagesData.length) return;
        currentStep = index;
        const data = stagesData[index];

        // 1. Update Top Progress Chips
        chips.forEach((c, idx) => {
            const dot = c.querySelector(".journey-chip-dot");
            if (idx === index) {
                c.classList.add("is-active", "text-brandRed");
                c.classList.remove("text-luxuryGray");
                if (dot) dot.className = "journey-chip-dot w-2 h-2 rounded-full bg-brandRed shadow-[0_0_8px_rgba(200,16,46,0.6)]";
            } else {
                c.classList.remove("is-active", "text-brandRed");
                c.classList.add("text-luxuryGray");
                if (dot) dot.className = "journey-chip-dot w-2 h-2 rounded-full bg-luxuryBorder";
            }
        });

        // 2. Update SVG Roadmap Stations
        svgNodes.forEach((node, idx) => {
            if (idx === index) {
                node.classList.add("is-active");
            } else {
                node.classList.remove("is-active");
            }
        });

        // 3. Update Stage Counter
        if (stageCounter) {
            stageCounter.textContent = `Stage 0${index + 1} of 06`;
        }

        // 4. Update HUD Stage Content Card with smooth transition
        if (hudCard) {
            hudCard.style.opacity = "0.75";
            hudCard.style.transform = "translateY(2px)";
            
            setTimeout(() => {
                if (hudPhaseKicker) hudPhaseKicker.textContent = data.kicker;
                if (hudPhaseNum) hudPhaseNum.textContent = data.num;
                if (hudIcon) hudIcon.className = data.icon;
                if (hudStageTitle) hudStageTitle.textContent = data.title;
                if (hudStageLocation) hudStageLocation.textContent = data.location;
                if (hudStageTimeline) hudStageTimeline.textContent = data.timeline;
                if (hudStageDesc) hudStageDesc.textContent = data.desc;

                if (hudStageTags) {
                    hudStageTags.innerHTML = data.tags.map(t => `
                        <span class="client-journey-hud-tag">
                            <i class="${t.icon} text-[9px]"></i> ${t.label}
                        </span>
                    `).join("");
                }

                if (hudActionText) hudActionText.textContent = data.actionText;
                if (hudActionBtn) hudActionBtn.setAttribute("href", data.actionHref);
                if (hudStatusBadge) {
                    hudStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check text-[11px]"></i> ${data.statusText}`;
                }

                hudCard.style.opacity = "1";
                hudCard.style.transform = "translateY(0)";
            }, 120);
        }
    }

    // Attach click events to top chips
    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            stopTour();
            const step = parseInt(chip.getAttribute("data-step"), 10);
            if (!isNaN(step)) activateStep(step);
        });
    });

    // Attach click events to SVG nodes
    svgNodes.forEach((node) => {
        node.addEventListener("click", () => {
            stopTour();
            const step = parseInt(node.getAttribute("data-step"), 10);
            if (!isNaN(step)) activateStep(step);
        });
        node.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                stopTour();
                const step = parseInt(node.getAttribute("data-step"), 10);
                if (!isNaN(step)) activateStep(step);
            }
        });
    });

    // Prev / Next Buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            stopTour();
            const prev = (currentStep - 1 + stagesData.length) % stagesData.length;
            activateStep(prev);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            stopTour();
            const next = (currentStep + 1) % stagesData.length;
            activateStep(next);
        });
    }

    // Auto Tour
    function startTour() {
        if (tourTimer) return;
        if (tourIcon) tourIcon.className = "fa-solid fa-pause text-[10px]";
        if (tourText) tourText.textContent = "Pause Tour";
        if (tourBtn) tourBtn.classList.add("bg-brandRed", "text-white");

        tourTimer = setInterval(() => {
            const next = (currentStep + 1) % stagesData.length;
            activateStep(next);
        }, 3400);
    }

    function stopTour() {
        if (!tourTimer) return;
        clearInterval(tourTimer);
        tourTimer = null;
        if (tourIcon) tourIcon.className = "fa-solid fa-play text-[10px]";
        if (tourText) tourText.textContent = "Auto Tour";
        if (tourBtn) tourBtn.classList.remove("bg-brandRed", "text-white");
    }

    if (tourBtn) {
        tourBtn.addEventListener("click", () => {
            if (tourTimer) {
                stopTour();
            } else {
                startTour();
            }
        });
    }
}

/**
 * Testimonials Category Filtering
 */
function setupTestimonialsFilter() {
    const filterButtons = document.querySelectorAll("#testimonial-filter-group .testimonial-filter-chip");
    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            const filterValue = btn.getAttribute("data-filter");
            const slides = document.querySelectorAll(".testimonials-swiper .swiper-slide");

            slides.forEach(slide => {
                const category = slide.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    slide.style.display = "";
                } else {
                    slide.style.display = "none";
                }
            });

            // Refresh swiper instance if available
            if (window.testimonialsSwiperInstance) {
                window.testimonialsSwiperInstance.update();
                window.testimonialsSwiperInstance.slideToLoop(0, 400);
            }
        });
    });
}

/**
 * FAQ Accordion & Real-Time Keyword Search & Category Filter
 */
function setupFaqAccordionAndSearch() {
    const accordionContainer = document.getElementById("faq-accordion-container");
    if (!accordionContainer) return;

    const items = accordionContainer.querySelectorAll(".faq-luxury-item");
    const searchInput = document.getElementById("faq-search-input");
    const clearBtn = document.getElementById("faq-search-clear");
    const countBadge = document.getElementById("faq-count-badge");
    const emptyState = document.getElementById("faq-empty-state");
    const categoryButtons = document.querySelectorAll("#faq-category-filters .faq-filter-btn");

    let currentCategory = "all";
    let searchQuery = "";

    // 1. Accordion Toggle Logic
    items.forEach(item => {
        const trigger = item.querySelector(".faq-trigger-btn");
        if (!trigger) return;

        trigger.addEventListener("click", () => {
            const isCurrentlyExpanded = item.classList.contains("is-expanded");

            // Optional: Close other open items for accordion behavior
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("is-expanded");
                    const otherTrigger = otherItem.querySelector(".faq-trigger-btn");
                    if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
                }
            });

            if (isCurrentlyExpanded) {
                item.classList.remove("is-expanded");
                trigger.setAttribute("aria-expanded", "false");
            } else {
                item.classList.add("is-expanded");
                trigger.setAttribute("aria-expanded", "true");
            }
        });
    });

    // 2. Filter & Search Combined Logic
    function applyFaqFilters() {
        let visibleCount = 0;
        const normalizedQuery = searchQuery.trim().toLowerCase();

        items.forEach(item => {
            const itemCategory = item.getAttribute("data-category") || "";
            const itemKeywords = (item.getAttribute("data-keywords") || "").toLowerCase();
            const itemText = item.innerText.toLowerCase();

            const matchesCategory = (currentCategory === "all" || itemCategory === currentCategory);
            const matchesSearch = !normalizedQuery || itemKeywords.includes(normalizedQuery) || itemText.includes(normalizedQuery);

            if (matchesCategory && matchesSearch) {
                item.style.display = "";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        // Update Counter
        if (countBadge) {
            countBadge.textContent = visibleCount === 1 
                ? "Showing 1 Question" 
                : `Showing ${visibleCount} Questions`;
        }

        // Toggle Empty State
        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.classList.remove("hidden");
            } else {
                emptyState.classList.add("hidden");
            }
        }
    }

    // 3. Search Input Event
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            if (clearBtn) {
                if (searchQuery.length > 0) {
                    clearBtn.classList.remove("hidden");
                } else {
                    clearBtn.classList.add("hidden");
                }
            }
            applyFaqFilters();
        });
    }

    // Clear Search Button
    if (clearBtn && searchInput) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            clearBtn.classList.add("hidden");
            searchInput.focus();
            applyFaqFilters();
        });
    }

    // 4. Category Filter Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            currentCategory = btn.getAttribute("data-category") || "all";
            applyFaqFilters();
        });
    });
}

/**
 * Services Portfolio Category Filtering
 */
function setupServicesFilter() {
    const filterButtons = document.querySelectorAll("#services-filter-group .service-filter-btn");
    const serviceCards = document.querySelectorAll("#services-grid .service-card-luxury");
    if (!filterButtons.length || !serviceCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            const filterValue = btn.getAttribute("data-filter") || "all";

            serviceCards.forEach(card => {
                const category = card.getAttribute("data-category") || "";
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "";
                    card.style.opacity = "0";
                    card.style.transform = "translateY(8px)";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}


