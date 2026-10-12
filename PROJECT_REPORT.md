# Lokmanya Tilak Jankalyan Shikshan Sanstha's
# Lokmanya Tilak College of Engineering
### An Autonomous Institute Affiliated to University of Mumbai
**(Approved by AICTE, Accredited by NAAC 'A' Grade & Four Programs by NBA)**  
**Sector-04, Koparkhairane, Navi Mumbai - 400 709**

---

### Department of Computer Science & Engineering
### (Artificial Intelligence & Machine Learning)

<br><br>

# Mini Project Report
### on

## WANDERLY: Intelligent Travel Exploration & Booking Management Platform

<br>

### Under the Guidance of
**Faculty Name:** Prof. _____________________

<br><br>

| Prepared By | Faculty Guide |
| :--- | :--- |
| **Nikhil Pandey** | **Prof. _____________________** |
| **Student 2** | |
| **Student 3** | |
| **Student 4** | |

<br>

**Submission Date:** October 2026

<div style="page-break-after: always;"></div>

---

# Lokmanya Tilak Jankalyan Shikshan Sanstha's
# Lokmanya Tilak College of Engineering
### Department of Computer Science & Engineering
### (Artificial Intelligence & Machine Learning)

---

## ACKNOWLEDGEMENT

I would like to express my special thanks of gratitude to our Head of the Department **[HOD Name]**, our respected Principal **[Principal Name]**, and my project guide **Prof. [Guide Name]**, who gave me the opportunity to undertake this mini-project on the topic **"Wanderly: Intelligent Travel Exploration & Booking Management Platform"**. Their guidance, valuable suggestions, and continuous encouragement helped me immensely in conducting research, architecting the solution, and mastering modern software development methodologies.

I would also like to extend my heartfelt thanks to my parents and friends who supported me morally and assisted me in finalizing this project within the stipulated timeframe.

Lastly, I am truly grateful to everyone who directly or indirectly contributed to the successful completion and deployment of this project.

<br>

**Nikhil Pandey**  
**[Roll No / Class / Div / Batch]**  
Department of Computer Science & Engineering (AIML)  
Lokmanya Tilak College of Engineering, Navi Mumbai  

**Date:** October 12, 2026  

<div style="page-break-after: always;"></div>

---

## TABLE OF CONTENTS

1. [Abstract](#1-abstract)
2. [Literature Survey](#2-literature-survey)
3. [Problem Statement](#3-problem-statement)
4. [System Design & Diagrams (Solution Demonstration)](#4-system-design--diagrams)
   - 4.1 System Architecture Flowchart
   - 4.2 Use Case Diagram
   - 4.3 Interactive Workflow
5. [Hardware & Software Specifications (Tools)](#5-hardware--software-specifications)
   - 5.1 Front-End Tools & Technologies
   - 5.2 Back-End Tools & Technologies
   - 5.3 Hardware Specifications
   - 5.4 Software & Environment Specifications
6. [Future Scope](#6-future-scope)
7. [References](#7-references)

---

## 1. ABSTRACT

In the contemporary digital landscape, travel planning often involves navigating fragmented, cluttered, and ad-heavy platforms that overwhelm users with unstructured data and rigid package itineraries. **Wanderly** is an end-to-end, responsive web platform engineered to deliver an intuitive, aesthetic, and interactive travel discovery experience across premier destinations in India (spanning coastal getaways, Himalayan passes, heritage desert circuits, and tranquil backwaters).

The platform implements an asynchronous client-server architecture. The presentation layer is built utilizing semantic HTML5, modern CSS3 variables, fluid grid layouts, and modular vanilla JavaScript (ES6+). It features real-time client-side search and category filtering, an interactive trip cost estimator with dynamic pricing formulas, day-by-day interactive itinerary switchers, quick-preview modals, and toast notification queues. 

The backend service is powered by a zero-dependency **Java 21 HTTP Server** utilizing `com.sun.net.httpserver.HttpServer` with Project Loom's **Virtual Threads** (`Executors.newVirtualThreadPerTaskExecutor()`). The server delivers high-throughput static asset hosting and exposes REST API endpoints for destination catalog retrieval, dynamic stats, and booking inquiry persistence. Wanderly bridges the gap between clean editorial aesthetics and scalable engineering principles, providing an optimized tool for personalized itinerary exploration.

---

## 2. LITERATURE SURVEY

| Sr. No. | Paper / Platform Reviewed | Methodology / Technology | Advantages | Identified Limitations / Gaps |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Commercial Portals (MakeMyTrip, Yatra, Goibibo) | Multi-tier cloud microservices, heavy dynamic advertisements, pre-packaged group tours. | Extensive commercial inventory, flights & hotel booking integration. | Cluttered interfaces, high cognitive load, lack of curated narrative itineraries for independent explorers. |
| **2** | TripAdvisor & Travel Blogs | Crowd-sourced user ratings, unstructured forum content, static blog entries. | Rich user reviews, community photos. | Absence of real-time custom cost estimations, fragmented planning tools, poor offline usability. |
| **3** | Lightweight Web Architecture Studies (W3C / Mozilla Dev) | Modern CSS Grid, Flexbox, Progressive Web Design, Component-based CSS. | High render performance, accessibility, minimal bandwidth consumption. | Often lacks lightweight, standalone backend implementations for academic benchmarking. |
| **4** | Java Modern Concurrency (JEP 444 / Project Loom) | Virtual Threads for lightweight HTTP request per task models. | Massive concurrency scaling without reactive callback complexity. | Underutilized in traditional undergraduate academic servlets/JSP projects. |

---

## 3. PROBLEM STATEMENT

### 3.1 Existing Challenges
Traditional travel portals are frequently characterized by:
1. **Cognitive Overload:** Interfaces are saturated with popup banners, dynamic surge-pricing timers, and redundant ads, detaching the user from the inspiration of travel.
2. **Rigid Itineraries & Opaque Costing:** Users cannot easily customize travellers, duration, and accommodation tiers interactively without initiating an intrusive sign-up or checkout process.
3. **Heavy Framework Overheads:** Most modern web implementations rely on extensive multi-gigabyte dependency trees (Node modules, Webpack bundles), creating significant deployment friction and security vulnerabilities.

### 3.2 Proposed Solution
The objective of **Wanderly** is to design and implement a lightweight, visually compelling travel explorer that:
- Provides clean, distraction-free visual discovery with curated high-definition photography and clear regional itineraries.
- Features **client-side instantaneous filtering** and a **live interactive cost calculator**.
- Operates on a **zero-dependency Java 21 HTTP Server** providing REST API endpoints while maintaining 100% offline-compatible fallback execution.

---

## 4. SYSTEM DESIGN & DIAGRAMS

### 4.1 System Architecture Flowchart

```
+--------------------------------------------------------------------------+
|                              USER CLIENT                                 |
|   (Web Browser: Chrome / Edge / Firefox / Safari / Mobile Devices)       |
+--------------------------------------------------------------------------+
                                     │
                    HTTP Requests / User Interactions
                                     ▼
+──────────────────────────────────────────────────────────────────────────+
|                        PRESENTATION LAYER (FRONTEND)                     |
|  - Semantic HTML5 Pages (index, destinations, packages, about, contact)   |
|  - Modern CSS3 (Variables, Flexbox, Grid, Glassmorphic Navbar, Badges)    |
|  - Vanilla JavaScript ES6+ Engine:                                       |
|    • Live Search & Category Filter (Coast, Mountains, Nature, Heritage)  |
|    • Interactive Trip Cost Estimator Widget                              |
|    • Dynamic Modal Preview & Day-by-Day Itinerary Tab Switcher           |
|    • Wishlist Toggle & Toast Notification System                         |
+──────────────────────────────────────────────────────────────────────────+
                                     │
                      REST API Calls (JSON) / POST Inquiries
                                     ▼
+──────────────────────────────────────────────────────────────────────────+
|                        APPLICATION LAYER (JAVA BACKEND)                  |
|                   WanderlyServer.java (Java 21 HTTP Server)              |
|                                                                          |
|   ┌──────────────────────────────────────────────────────────────────┐   |
|   │         Virtual Threads Executor (Per-Task Concurrency)          │   |
|   └──────────────────────────────────────────────────────────────────┘   |
|        │                        │                       │                |
|        ▼                        ▼                       ▼                |
|  Static Asset Handler     REST API Handler      Inquiry Controller       |
|  (MIME Types: HTML,      - /api/destinations   - /api/contact            |
|   CSS, JS, JPG, SVG)     - /api/packages       - Validation & Booking    |
|                          - /api/stats            Ref Generation (WND-XX) |
+──────────────────────────────────────────────────────────────────────────+
                                     │
                              Data Persistence
                                     ▼
+--------------------------------------------------------------------------+
|                          IN-MEMORY DATA STORE                            |
|             ConcurrentLinkedQueue / Data Records (Thread-Safe)           |
+--------------------------------------------------------------------------+
```

### 4.2 Use Case Diagram

```
                       WANDERLY TRAVEL PLATFORM
      +---------------------------------------------------------+
      |                                                         |
      |   (UC-1: Browse Destinations & Curated Photos)          |
      |                    ^                                    |
      |                    |                                    |
      |   (UC-2: Real-time Search & Category Filter)            |
      |                    ^                                    |
      |                    |                                    |
(User) ───+── (UC-3: View Day-by-Day Destination Itineraries)    |
      |   |                                                     |
      |   +── (UC-4: Calculate Trip Cost via Interactive Widget)|
      |   |                                                     |
      |   +── (UC-5: Save Destinations to Wishlist)             |
      |   |                                                     |
      |   +── (UC-6: Submit Travel Brief / Booking Enquiry) ────┼───> (Java Backend /
      |   |                                                     |     Travel Admin)
      |   +── (UC-7: Subscribe to Travel Newsletter)            |
      |                                                         |
      +---------------------------------------------------------+
```

---

## 5. HARDWARE & SOFTWARE SPECIFICATIONS

### 5.1 Front-End Tools & Technologies
- **Semantic HTML5:** Clean document outline, accessibility landmarks (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- **Modern CSS3 (Vanilla):** CSS Custom Properties (Design Tokens), Flexbox, CSS Grid layouts, glassmorphism (`backdrop-filter`), CSS transitions, and media queries for complete responsiveness (320px mobile to 4K displays).
- **Google Web Fonts:** *Outfit* (contemporary sans-serif UI typography) and *Playfair Display* (classic editorial serif headings).
- **JavaScript (ES6+):** Vanilla JavaScript implementing DOM manipulation, URLSearchParams handling, event delegation, dynamic calculator logic, and asynchronous `fetch()` API calls.

### 5.2 Back-End Tools & Technologies
- **Language & Runtime:** **Java 21 (OpenJDK / Oracle JDK 21 LTS)**.
- **Embedded Web Server:** `com.sun.net.httpserver.HttpServer` (zero external dependencies).
- **Concurrency Architecture:** Java 21 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`).
- **API Architecture:** RESTful JSON endpoints (`GET /api/destinations`, `GET /api/packages`, `GET /api/stats`, `POST /api/contact`).
- **Data Structures:** Java Collections framework (`ConcurrentLinkedQueue`, `Map`, `List`) with thread-safe state management.

### 5.3 Hardware Specifications
- **Processor:** Intel Core i3 / i5 / AMD Ryzen 3 or higher.
- **Memory (RAM):** 4 GB RAM minimum (8 GB recommended).
- **Storage:** Minimum 250 MB free disk space (for code assets and high-res imagery).
- **Display:** 1024x768 resolution minimum (responsive across mobile, tablet, and desktop).

### 5.4 Software & Environment Specifications
- **Operating System:** Windows 10/11, Linux (Ubuntu/Debian), or macOS.
- **Development Tool / IDE:** VS Code / Antigravity IDE / IntelliJ IDEA / Eclipse.
- **Web Browser:** Google Chrome v110+, Microsoft Edge v110+, Mozilla Firefox, or Safari.
- **Version Control:** Git & GitHub.

---

## 6. FUTURE SCOPE

1. **AI-Powered Recommendation Engine:** Integration of Machine Learning models (collaborative filtering and content-based recommendation) to tailor itineraries based on past traveller preferences and season.
2. **Database Persistence & JDBC:** Migration of in-memory enquiry stores to relational databases (PostgreSQL / MySQL) or NoSQL databases via JPA/Hibernate.
3. **Payment Gateway Integration:** Secure payment transaction processing (Razorpay / Stripe) for direct package deposits and instant booking receipts.
4. **Live Weather & Airfare APIs:** Integration with open APIs (e.g., OpenWeatherMap, Amadeus) to display real-time weather forecasts and live airfares on destination guide pages.
5. **Interactive Mapping & Geo-Tracking:** Integration of Leaflet.js or Mapbox GL for interactive route mapping and GPS-guided trail navigation.

---

## 7. REFERENCES

1. Oracle Corporation, *"Java Platform, Standard Edition Documentation - Class HttpServer"*, Oracle Java SE 21 Docs, 2024.
2. JEP 444, *"Virtual Threads - OpenJDK Project Loom"*, OpenJDK Documentation, 2023.
3. MDN Web Docs, *"Responsive Web Design Basics, Grid, and Flexbox"*, Mozilla Developer Network, 2025.
4. W3C, *"HTML5: A Vocabulary and Associated APIs for HTML and XHTML"*, World Wide Web Consortium Recommendation.
5. Nielsen, J., *"Usability Engineering and Clean Information Architecture in Web Portals"*, Nielsen Norman Group.
6. Ministry of Tourism, Government of India, *"Incredible India Destination Guidelines and Curated Routes"*, 2025.
