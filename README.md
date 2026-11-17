# Goed Properties — Website Clone

A high-fidelity, responsive clone of [Goed Properties](https://www.goedproperties.in/), Chennai's premier real estate consultancy and developer agency founded by Mr. Srinivasan C.

---

## 🌟 Features Included

- **Brand-Accurate Aesthetic & Typography**:
  - Color palette: Crimson Red (`#D91C24` / `#C8102E`), Deep Navy (`#0B132B`), Charcoal (`#1E293B`), Off-White (`#F8FAFC`), and WhatsApp Green (`#25D366`).
  - Typography: Playfair Display (Serif headings) and Inter (Sans-serif UI & body text).
  - Icons: Font Awesome 6.4 + Lucide icons.
- **Complete Page Suite**:
  - `index.html`: Hero section with search & filter, metrics trust bar, featured projects carousel, founder story, 6 core advantages, client acquisition roadmap stepper, 9 service desks, premium farmland showcase, testimonials carousel, searchable FAQs, and newsletter.
  - `about.html`: Detailed history, leadership vision, and Chennai real estate market expertise.
  - `properties.html`: Comprehensive catalog of apartments, villas, and DTCP/CMDA approved layouts.
  - `services.html`: 9 specialized advisory desks (Residential, Farmland, Villas, Bank E-Auctions, Luxury Condos, Due Diligence, etc.).
  - `contact.html`: Corporate office details (Anna Nagar, Chennai), phone lines, email, and interactive inquiry form.
  - `investment-calculator.html`: Yield and ROI calculation tools for real estate investors.
  - `area-converter.html`: Ground to Sq.Ft., Cent to Acre, and local Tamil Nadu land unit conversion tool.
  - `blogs.html`: Market insights and property buying guide.
  - `privacy-policy.html`: Standard compliance & legal disclosures.
  - **Individual Project Detail Pages**:
    - *Urbanrise World of Joy* (`urbanrise-the-world-of-joy.html`)
    - *Shriram Codename King Life* (`codename-king-life.html`)
    - *DRA Astra* (`dra-astra.html`)
    - *Godrej Azure* (`godrej-azure.html`)
    - *Purva Windermere* (`purva-windermere.html`)
    - *TVS Emerald Udyana Phase 3* (`tvs-emerald-udyana-phase-3.html`)
    - *TVS Emerald Verde Vista* (`tvs-emerald-verde-vista.html`)
    - *Prestige Palm Court* (`prestige-palm-court.html`)
    - *Prestige Pallavaram Gardens* (`prestige-pallavaram-gardens.html`)
    - *Radiance Solitaire* (`radience-solitaire.html`)
    - *Thirumazhisai Property* (`thirumazhisai-property.html`)

- **Interactive Functionality**:
  - Mobile slide-out drawer navigation with accordion submenus.
  - Dynamic sticky glass navbar with blur and scroll detection.
  - Interactive Property Search / Filter bar.
  - 6-Stage Client Journey Stepper (Discovery -> Possession) with auto-play and manual controls.
  - Searchable and categorized FAQ accordion.
  - Swiper carousels for featured projects and client testimonials.
  - Floating WhatsApp, Phone, and Scroll-to-Top quick action buttons.

---

## 🚀 Quick Start Guide

### Option 1: Direct in Browser
You can directly open `index.html` in any web browser:
```bash
start index.html
```

### Option 2: Run with Built-in Node.js Server (Recommended)
From this project directory:
```bash
npm start
# or:
node server.js
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Use with VS Code Live Server / Any Static Host
Deploy or open directly with VS Code Live Server, GitHub Pages, Vercel, or Netlify.

---

## 📁 Directory Structure

```
goed-properties-clone/
│
├── index.html                      # Homepage
├── about.html                      # About Us
├── properties.html                 # Properties Catalog
├── services.html                   # 9 Advisory Desks
├── contact.html                    # Contact & Corporate Office
├── blogs.html                      # Market Insights & Blogs
├── investment-calculator.html      # ROI & Investment Calculator
├── area-converter.html             # Land Area Conversion Tool
├── privacy-policy.html             # Legal & Privacy Policy
├── *.html                          # 11 Dedicated Project Showcase Pages
├── server.js                       # Zero-dependency local Node.js static server
├── package.json                    # Project configuration
│
└── assets/
    ├── css/
    │   ├── style.css               # Core styling & custom themes
    │   └── animation.css           # Keyframe transitions & animations
    ├── js/
    │   ├── main.js                 # App bootstrapper, FAQ search, stepper
    │   ├── navbar.js               # Sticky glass nav & mobile drawer
    │   ├── slider.js               # Swiper slider configurations
    │   └── animations.js           # AOS & scroll reveal setups
    ├── compounent/                 # Modular headers & footers
    └── images/
        ├── brand-logo/             # Goed Properties SVG branding
        ├── icons/                  # Header icons & favicons
        ├── about/                  # Founder photo (Mr. Srinivasan C)
        └── properties/             # High-res project photos & farmland renders
```
