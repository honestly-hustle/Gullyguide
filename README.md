# GullyGuide

### Big markets. Little shortcuts.

GullyGuide is a hyperlocal shop-discovery web application designed to help shoppers explore shops in crowded Indian markets. Users can discover local businesses, search for shops, filter by market and category, view shop details, save favourites, and submit demo shop listings.

> **Project Status:** Academic prototype. Shop and market information is illustrative and has not been independently verified.

## 🌐 Live Application

**Live Website:** https://gullyguide-wheat.vercel.app/

**GitHub Repository:** https://github.com/honestly-hustle/Gullyguide

## 🎥 Demo Video

Watch the demonstration of GullyGuide's main workflows, including shop discovery, search and filtering, shop details, favourites, and demo shop registration.

**[▶ Watch GullyGuide Demo Video](https://drive.google.com/file/d/11aSiZD-t60NYeZElcUUllXQTta_k-ps3/view?usp=drive_link)**

## Problem Statement

Large and crowded Indian markets offer a wide variety of products, but shoppers often struggle to find relevant shops, identify specific products, and navigate busy market lanes efficiently.

GullyGuide aims to simplify market exploration by providing a digital directory where users can discover shops, filter listings, and save places they want to visit.

## Features

* **Shop Discovery:** Browse shop listings across different markets.
* **Search:** Search for shops, products, and categories.
* **Market Filtering:** Filter shops by market.
* **Category Filtering:** Explore shops by category.
* **Shop Details:** View individual shop information.
* **Favourites:** Save and revisit preferred shops.
* **Shop Registration:** Submit demo listings through the shop-owner form.
* **Pricing Page:** Explore proposed shop listing plans.
* **Responsive UI:** User-friendly interface designed for different screen sizes.

## Technology Stack

* **React** — Component-based user interface.
* **Vite** — Development server and production build tooling.
* **JavaScript** — Application logic and interactive functionality.
* **CSS** — Styling and responsive layouts.
* **Lucide React** — Icons and interface elements.
* **Browser Local Storage** — Persistence of favourites and demo shop listings.
* **Git & GitHub** — Version control and source code hosting.
* **Vercel** — Application deployment.

## Getting Started

### Prerequisites

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/honestly-hustle/Gullyguide.git
cd Gullyguide
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

To create a production build, run:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

## Data Storage

GullyGuide uses browser Local Storage to persist favourite shops and submitted demo listings.

* Data persists across page refreshes in the same browser profile.
* Data is not automatically shared across different users or devices.
* Clearing browser storage may remove saved data.
* Shop registration is a demonstration workflow and does not create a verified business account.

## Limitations

* Shop and market listings are illustrative and have not been independently verified.
* The application does not currently use a shared backend database.
* Production authentication and business verification are not implemented.
* Listing plans are conceptual; no payments are processed.
* Map and location information is illustrative rather than live navigation data.

## Future Improvements

* Integrate a backend API and shared database.
* Implement secure shop-owner authentication.
* Introduce business verification.
* Integrate live maps and lane-level navigation.
* Add product availability and price updates.
* Implement secure payments and subscription management.
* Add automated testing and application monitoring.

## Deployment

The application is deployed on Vercel.

**Live URL:** https://gullyguide-wheat.vercel.app/

## Academic Project

GullyGuide is an academic software project demonstrating frontend development, interactive search and filtering, browser-side persistence, reusable React components, and product-oriented problem solving.
