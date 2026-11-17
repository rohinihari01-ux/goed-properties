/**
 * Goed Properties - Property Detail Page Interactive Scripts
 * Handles Gallery, Lightbox, Floor Plan Modal, Accordions, and Lead Ingestion
 */

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    initHeroVideoGallery();
    initFloorPlanSwiper();
    initLocationIntelligenceAnimation();
    initFaqAccordion();
    initFloorPlanModal();
    initEnquiryForm();
    initSiteVisitButtons();
    initAmenitiesExplorer();
    initTechSpecConsole();
});

/** Creates the responsive, continuously looping floor-plan carousel. */
function initFloorPlanSwiper() {
    const carousel = document.querySelector(".floorplan-swiper");
    if (!carousel || typeof Swiper === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    new Swiper(carousel, {
        loop: true,
        loopAdditionalSlides: 2,
        slidesPerView: 1,
        spaceBetween: 18,
        speed: prefersReducedMotion ? 0 : 850,
        grabCursor: true,
        watchOverflow: false,
        autoplay: prefersReducedMotion ? false : {
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: ".floorplan-carousel-next",
            prevEl: ".floorplan-carousel-prev"
        },
        pagination: {
            el: ".floorplan-carousel-pagination",
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
        }
    });
}

/** Reveals the location dashboard once it enters the viewport. */
function initLocationIntelligenceAnimation() {
    const section = document.querySelector(".location-intelligence-section");
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-in-view");
        return;
    }

    section.classList.add("location-motion-ready");
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            section.classList.add("is-in-view");
            currentObserver.unobserve(section);
        });
    }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });

    observer.observe(section);
}

/** Switches the property hero video when a preview is selected. */
function initHeroVideoGallery() {
    const player = document.getElementById("hero-video-player");
    const thumbnails = document.querySelectorAll(".hero-video-thumb[data-video-src]");
    if (!player || !thumbnails.length) return;

    thumbnails.forEach(button => {
        button.addEventListener("click", () => {
            const source = button.dataset.videoSrc;
            if (!source || player.getAttribute("src") === source) return;

            player.src = source;
            player.load();
            player.play().catch(() => {});

            thumbnails.forEach(thumbnail => {
                const isActive = thumbnail === button;
                thumbnail.classList.toggle("is-active", isActive);
                thumbnail.setAttribute("aria-pressed", String(isActive));
            });
        });
    });
}

/** Filters the amenity directory by lifestyle category. */
function initAmenitiesExplorer() {
    const grid = document.getElementById("amenity-grid");
    const count = document.getElementById("amenity-visible-count");
    const filters = document.querySelectorAll("[data-amenity-filter]");
    if (!grid) return;

    if (filters.length && typeof Swiper !== "undefined") {
        new Swiper(".amenity-filter-tabs", {
            loop: true,
            slidesPerView: 1.25,
            spaceBetween: 6,
            speed: 500,
            grabCursor: true,
            watchOverflow: false,
            navigation: {
                nextEl: ".amenity-carousel-next",
                prevEl: ".amenity-carousel-prev"
            },
            breakpoints: {
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 }
            }
        });
    }

    const categoryByName = {
        "amphitheater": "recreation",
        "badminton court": "recreation",
        "basketball": "recreation",
        "children's play area": "recreation",
        "cricket practice nets": "recreation",
        "game zone": "recreation",
        "infinity walk": "recreation",
        "kids play room": "recreation",
        "skateboard": "recreation",
        "snooker": "recreation",
        "shuttle court": "recreation",
        "table tennis": "recreation",
        "tennis court": "recreation",
        "volleyball": "recreation",
        "clubhouse lounge": "community",
        "co-working space": "community",
        "café/snack shop": "community",
        "library": "community",
        "mini theatre": "community",
        "multipurpose lawn": "community",
        "multipurpose hall": "community",
        "party/banquet area": "community",
        "party room": "community",
        "reading area": "community",
        "reception": "community",
        "rooftop mini theatre": "community",
        "seating plaza": "community",
        "senior social": "community",
        "senior citizens lounge": "community",
        "urbanrise club": "community",
        "outdoor gym": "wellness",
        "swimming pool": "wellness",
        "yoga": "wellness",
        "atm machine": "convenience",
        "ev charging points": "convenience",
        "pharmacy": "convenience",
        "power backup": "convenience",
        "shops": "convenience",
        "supermarket": "convenience",
        "green dining with nature": "sustainability",
        "rainwater harvesting": "sustainability",
        "solar panels": "sustainability",
        "zen garden": "sustainability"
    };

    const amenities = Array.from(grid.querySelectorAll(".amenity-chip"));
    let amenitySwiper = null;
    let amenityWrapper = null;

    if (typeof Swiper !== "undefined") {
        grid.classList.add("swiper", "amenity-swiper");
        amenityWrapper = document.createElement("div");
        amenityWrapper.className = "swiper-wrapper";
        amenities.forEach(amenity => {
            amenity.classList.add("swiper-slide");
            amenityWrapper.appendChild(amenity);
        });
        grid.appendChild(amenityWrapper);
    }

    amenities.forEach(amenity => {
        const label = amenity.querySelector("span")?.textContent.trim().toLocaleLowerCase();
        amenity.dataset.amenityCategory = categoryByName[label] || "community";
    });

    const refreshAmenitySwiper = selectedCategory => {
        if (!amenityWrapper) return;

        if (amenitySwiper) {
            amenitySwiper.destroy(true, true);
            amenitySwiper = null;
        }

        amenityWrapper.querySelectorAll(".amenity-loop-clone").forEach(clone => clone.remove());
        amenities.forEach(amenity => {
            amenity.remove();
        });

        const visibleAmenities = amenities.filter(amenity => selectedCategory === "all" || amenity.dataset.amenityCategory === selectedCategory);
        visibleAmenities.forEach(amenity => {
            amenity.hidden = false;
            amenityWrapper.appendChild(amenity);
        });

        const minimumLoopSlides = 8;
        for (let index = 0; index < minimumLoopSlides - visibleAmenities.length && visibleAmenities.length; index += 1) {
            const clone = visibleAmenities[index % visibleAmenities.length].cloneNode(true);
            clone.classList.add("amenity-loop-clone");
            clone.setAttribute("aria-hidden", "true");
            amenityWrapper.appendChild(clone);
        }

        const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        amenitySwiper = new Swiper(grid, {
            loop: visibleAmenities.length > 1,
            slidesPerView: "auto",
            spaceBetween: 12,
            speed: prefersReducedMotion ? 0 : 4800,
            grabCursor: true,
            allowTouchMove: true,
            watchOverflow: false,
            autoplay: prefersReducedMotion ? false : {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    };

    refreshAmenitySwiper("all");

    filters.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.amenityFilter;
            const visibleCount = amenities.filter(amenity => selectedCategory === "all" || amenity.dataset.amenityCategory === selectedCategory).length;
            refreshAmenitySwiper(selectedCategory);
            if (!amenityWrapper) {
                amenities.forEach(amenity => {
                    amenity.hidden = selectedCategory !== "all" && amenity.dataset.amenityCategory !== selectedCategory;
                });
            }

            filters.forEach(filter => {
                const isActive = filter.dataset.amenityFilter === selectedCategory;
                filter.classList.toggle("is-active", isActive);
                filter.setAttribute("aria-pressed", String(isActive));
            });

            if (count) count.textContent = String(visibleCount);
        });
    });
}

/**
 * Image Gallery & Lightbox controller
 */
function initGallery() {
    const mainImg = document.getElementById("gallery-main-img");
    const thumbs = document.querySelectorAll(".gallery-thumb");
    const lightbox = document.getElementById("property-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    let gallerySources = [];
    if (thumbs.length > 0) {
        gallerySources = Array.from(thumbs).map(t => t.getAttribute("data-full") || t.getAttribute("src"));
    } else if (mainImg) {
        gallerySources = [mainImg.getAttribute("src")];
    }

    let currentIndex = 0;

    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener("click", () => {
            const targetSrc = thumb.getAttribute("data-full") || thumb.getAttribute("src");
            if (mainImg) {
                mainImg.src = targetSrc;
            }
            thumbs.forEach(t => t.classList.remove("ring-2", "ring-brandRed", "opacity-100"));
            thumb.classList.add("ring-2", "ring-brandRed", "opacity-100");
            currentIndex = idx;
        });
    });

    if (mainImg && lightbox && lightboxImg) {
        mainImg.parentElement.addEventListener("click", () => {
            lightboxImg.src = mainImg.src;
            lightbox.classList.add("active");
            document.body.classList.add("overflow-hidden");
        });
    }

    const showLightboxIndex = (index) => {
        if (!gallerySources.length) return;
        currentIndex = (index + gallerySources.length) % gallerySources.length;
        if (lightboxImg) lightboxImg.src = gallerySources[currentIndex];
        if (mainImg) mainImg.src = gallerySources[currentIndex];
        thumbs.forEach((t, i) => {
            if (i === currentIndex) {
                t.classList.add("ring-2", "ring-brandRed", "opacity-100");
            } else {
                t.classList.remove("ring-2", "ring-brandRed", "opacity-100");
            }
        });
    };

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showLightboxIndex(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showLightboxIndex(currentIndex + 1);
        });
    }

    if (closeBtn && lightbox) {
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
        });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
                document.body.classList.remove("overflow-hidden");
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightbox || !lightbox.classList.contains("active")) return;
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
        } else if (e.key === "ArrowLeft") {
            showLightboxIndex(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            showLightboxIndex(currentIndex + 1);
        }
    });
}

/**
 * FAQ Accordion Controller
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".prop-faq-item");

    faqItems.forEach(item => {
        const btn = item.querySelector(".prop-faq-btn");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove("active");
                    const otherBtn = other.querySelector(".prop-faq-btn");
                    if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove("active");
                btn.setAttribute("aria-expanded", "false");
            } else {
                item.classList.add("active");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });
}

/**
 * Floor Plan Modal
 */
function initFloorPlanModal() {
    const modal = document.getElementById("floorplan-modal");
    const modalImg = document.getElementById("fp-modal-img");
    const modalTitle = document.getElementById("fp-modal-title");
    const modalDesc = document.getElementById("fp-modal-desc");
    const closeBtn = document.getElementById("fp-modal-close");
    const openBtns = document.querySelectorAll(".btn-view-floorplan");

    if (!modal) return;

    openBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const planImg = btn.getAttribute("data-plan-img") || "assets/images/landing-page/2-bhk-blueprint.webp";
            const planTitle = btn.getAttribute("data-plan-title") || "Floor Plan Layout";
            const planSize = btn.getAttribute("data-plan-size") || "";
            const planCarpet = btn.getAttribute("data-plan-carpet") || "";

            if (modalImg) modalImg.src = planImg;
            if (modalTitle) modalTitle.textContent = planTitle;
            if (modalDesc) modalDesc.textContent = [planSize, planCarpet].filter(Boolean).join(" • ");

            modal.classList.add("active");
            document.body.classList.add("overflow-hidden");
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
        }
    });
}

/**
 * Schedule Site Visit & CTA Button Links
 */
function initSiteVisitButtons() {
    const siteVisitBtns = document.querySelectorAll(".btn-schedule-visit");
    const formSection = document.getElementById("enquiry-section");
    const enquiryTypeSelect = document.getElementById("enquiry-type");

    siteVisitBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (enquiryTypeSelect) {
                enquiryTypeSelect.value = "Schedule Site Visit";
            }
            if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                const nameInput = document.getElementById("lead-name");
                if (nameInput) setTimeout(() => nameInput.focus(), 600);
            }
        });
    });

    const enquireNowBtns = document.querySelectorAll(".btn-enquire-now");
    enquireNowBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                const nameInput = document.getElementById("lead-name");
                if (nameInput) setTimeout(() => nameInput.focus(), 600);
            }
        });
    });
}

/**
 * Enquiry Form Submission & Validation
 */
function initEnquiryForm() {
    const form = document.getElementById("property-enquiry-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("lead-name");
        const phoneInput = document.getElementById("lead-phone");
        const emailInput = document.getElementById("lead-email");
        const propInput = document.getElementById("lead-property");
        const typeSelect = document.getElementById("enquiry-type");
        const messageInput = document.getElementById("lead-message");
        const responseBox = document.getElementById("form-response-msg");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const property = propInput ? propInput.value.trim() : "";
        const type = typeSelect ? typeSelect.value : "General Enquiry";
        const message = messageInput ? messageInput.value.trim() : "";

        // Phone validation (Indian 10-digit number or international with country code)
        const phoneRegex = /^[+]?[0-9\s\-()]{10,15}$/;
        if (!name) {
            alert("Please provide your full name.");
            if (nameInput) nameInput.focus();
            return;
        }

        if (!phone || !phoneRegex.test(phone.replace(/\s+/g, ''))) {
            alert("Please provide a valid contact telephone number.");
            if (phoneInput) phoneInput.focus();
            return;
        }

        // Store submission in local history
        try {
            const leads = JSON.parse(localStorage.getItem("goed_enquiries") || "[]");
            leads.push({
                timestamp: new Date().toISOString(),
                property,
                name,
                phone,
                email,
                type,
                message
            });
            localStorage.setItem("goed_enquiries", JSON.stringify(leads));
        } catch (err) {
            console.warn("Local storage not accessible", err);
        }

        // Format WhatsApp message to Goed Properties advisor (+919941843344)
        const waText = encodeURIComponent(
            `*New Property Enquiry via Goed Properties Website*\n\n` +
            `*Property:* ${property}\n` +
            `*Enquiry Type:* ${type}\n` +
            `*Name:* ${name}\n` +
            `*Phone:* ${phone}\n` +
            (email ? `*Email:* ${email}\n` : '') +
            (message ? `*Message:* ${message}\n` : '')
        );
        const waUrl = `https://wa.me/919941843344?text=${waText}`;

        // Render confirmation message in UI
        if (responseBox) {
            responseBox.innerHTML = `
                <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 text-emerald-950">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-circle-check text-2xl text-emerald-600"></i>
                        <h4 class="font-bold text-base font-playfair">Enquiry Registered for ${property}</h4>
                    </div>
                    <p class="text-xs text-emerald-800 leading-relaxed">
                        Thank you <strong>${name}</strong>! Your ${type.toLowerCase()} has been recorded. Our Senior Real Estate Advisor will contact you at <strong>${phone}</strong> shortly.
                    </p>
                    <div class="pt-2 flex flex-wrap gap-3">
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all">
                            <i class="fa-brands fa-whatsapp text-sm"></i> Connect Directly on WhatsApp
                        </a>
                        <a href="tel:+919941843344" 
                           class="inline-flex items-center gap-2 bg-luxuryDark hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all">
                            <i class="fa-solid fa-phone text-xs"></i> Call Us: 9941843344
                        </a>
                    </div>
                </div>
            `;
            responseBox.classList.remove("hidden");
            responseBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        form.reset();
        if (propInput) propInput.value = property;
    });
}

/**
 * Interactive Tech Spec Telemetry Console Filter
 */
function initTechSpecConsole() {
    const tabs = document.querySelectorAll(".tech-spec-tab");
    const rows = document.querySelectorAll(".tech-spec-row");
    if (!tabs.length || !rows.length) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const filter = tab.getAttribute("data-filter");

            rows.forEach(row => {
                const cat = row.getAttribute("data-category");
                if (filter === "all" || cat === filter || (filter === "residence" && cat === "units") || (filter === "plan" && cat === "masterplan")) {
                    row.style.display = "flex";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });
}

