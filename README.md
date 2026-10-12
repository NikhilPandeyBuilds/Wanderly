# 🧭 Wanderly — Intelligent Travel Platform & Explorer

> **Java & Web Technologies Mini Project**  
> An aesthetic, modern travel exploration platform designed to discover iconic and off-the-beaten-path journeys across India.

---

## 🌟 Overview

**Wanderly** is a college mini-project combining modern front-end web design with a lightweight **Java 21** HTTP backend service. It bridges clean UI/UX aesthetics with practical software engineering patterns to provide travellers with destination guides, curated packages, interactive cost estimators, and real-time booking enquiry handling.

---

## ✨ Key Features

1. **Rich Visual Design & Curated Photography**:
   - High-definition authentic photography across 12+ Indian destinations (Goa, Kashmir, Ladakh, Kerala, Rajasthan, Sikkim, Meghalaya, Andaman, Manali, Jaipur, Varanasi, Munnar).
   - Cohesive earthy aesthetic: deep forest green (`#18463e`), warm sand backdrop (`#f8f7f2`), and golden amber accents (`#d89b5b`).
   - Editorial typography powered by Google Fonts (*Outfit* and *Playfair Display*).

2. **Live Category Filtering & Real-time Search**:
   - Filter destinations instantly by travel style: *Coast, Mountains, Nature, Heritage, Adventure, Spiritual*.
   - Dynamic search bar with instant card filtering and result count updates without page reload.

3. **Interactive Trip Cost Calculator & Customizer**:
   - Live interactive widget on the Packages page.
   - Adjust destination, number of travellers (`+` / `-`), duration in days, and travel tier (*Backpacker, Comfort, Luxury*).
   - Real-time calculation of total and per-person cost breakdown.

4. **Interactive Day-by-Day Itinerary Tabs**:
   - Detailed destination guides (`destination-goa.html`, `destination-kashmir.html`, `destination-rajasthan.html`) featuring interactive tab switchers for daily timelines, key facts, and packing essentials.

5. **Quick-View Preview Modal**:
   - Clicking "Quick View" on any destination card opens an animated modal preview with best visiting seasons, reviews, and quick booking links.

6. **Wishlist / Heart Toggle**:
   - Interactive heart buttons with instant animated Toast notifications.

7. **Zero-Dependency Java 21 Backend Server (`WanderlyServer.java`)**:
   - Embedded web server built using Java's standard library `com.sun.net.httpserver.HttpServer`.
   - Utilizes Java 21 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`).
   - Serves static assets (HTML, CSS, JS, JPG, SVG) and exposes REST JSON endpoints.

---

## 🏗️ Project Architecture

```
Wanderly/
├── css/
│   └── style.css            # Complete design system, responsive grids & tokens
├── images/
│   ├── hero.jpg             # High-res scenic banner
│   ├── goa.jpg              # Coastal photography
│   ├── kashmir.jpg          # Dal Lake shikara photography
│   ├── ladakh.jpg           # High-altitude mountain photography
│   ├── kerala.jpg           # Backwaters photography
│   ├── rajasthan.jpg        # Desert palace photography
│   ├── sikkim.jpg           # Mountain monastery photography
│   ├── meghalaya.jpg        # Living root bridge photography
│   ├── andaman.jpg          # Coral islands photography
│   ├── manali.jpg           # Pine valley photography
│   ├── jaipur.jpg           # Royal architecture photography
│   ├── varanasi.jpg         # Sacred ghats photography
│   ├── munnar.jpg           # Tea garden hills photography
│   ├── gallery-1..4.jpg     # Inspiration photo gallery
│   └── about-hero.jpg       # About story visual
├── js/
│   └── main.js              # Interactive filters, calculator, modal, toasts, navbar
├── index.html               # Main homepage with trust stats & highlights
├── destinations.html        # All destinations with live search & category filters
├── packages.html            # Curated packages & interactive cost estimator
├── about.html               # Mission, technical architecture & FAQ accordion
├── contact.html             # Trip brief booking enquiry form & concierge info
├── destination-goa.html     # Dedicated Goa travel guide & itinerary
├── destination-kashmir.html # Dedicated Kashmir travel guide & itinerary
├── destination-rajasthan.html # Dedicated Rajasthan travel guide & itinerary
├── WanderlyServer.java      # Java 21 REST HTTP server
└── README.md                # Project documentation
```

---

## 🚀 How to Run the Project

You can run Wanderly in **two ways**:

### Option 1: Run via the Java 21 Web Server (Recommended for Viva/Evaluation)

Requires Java 21 (or Java 11+):

```bash
# Direct run with single-source-file launch (Java 11+)
java WanderlyServer.java
```

Or compile and run traditionally:
```bash
javac WanderlyServer.java
java WanderlyServer
```

Open your browser and navigate to:
```
http://localhost:8080
```

### Option 2: Open Directly in Any Web Browser

Simply double-click `index.html` or open it with your browser of choice. All pages, interactive filters, calculators, and client-side notifications function completely offline without external server dependencies.

---

## 📡 REST API Reference (Java Backend)

When running `WanderlyServer.java`, the following endpoints are available:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/destinations` | `GET` | Returns JSON array of curated destinations with pricing and ratings. |
| `GET /api/packages` | `GET` | Returns JSON array of travel packages with inclusions. |
| `GET /api/stats` | `GET` | Returns platform metrics (happy travellers, average rating, etc.). |
| `POST /api/contact` | `POST` | Accepts booking enquiries, assigns a unique `WND-XXXX` reference, and logs enquiry details. |

---

## 🎓 Academic / Viva Talking Points

1. **Why Java `HttpServer` instead of heavy frameworks?**
   - Demonstrates core Java SE networking, HTTP protocol understanding, request routing, and MIME type handling without hiding mechanics behind Spring Boot or Tomcat.
2. **Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`)**:
   - Leverages modern Java 21 Project Loom lightweight threads to handle concurrent HTTP requests with minimal overhead.
3. **Progressive Enhancement**:
   - The frontend works seamlessly as a static client or dynamically powered by the Java REST API.
4. **Responsive Layouts**:
   - Implements CSS Grid, Flexbox, custom properties (CSS variables), and media queries tailored from mobile (320px) to ultra-wide desktop monitors.

---

## 👥 Authors & Academic Credits

- **Project:** Wanderly Travel Explorer
- **Subject:** Java & Web Technologies Mini Project
- **Developer:** Nikhil Pandey