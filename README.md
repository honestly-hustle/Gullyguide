# GullyGuide

### Big markets. Little shortcuts.

GullyGuide is a hyperlocal shop-discovery web application concept designed to help shoppers explore shops in crowded Indian markets.

Instead of wandering through busy market lanes without a plan, users can discover local businesses, search by shop name or category, filter by market, save favourites, and view shop details.

> **Project status:** Academic prototype. Shop listings and market information are illustrative and are not independently verified.

## Problem Statement

Large, crowded markets can make it difficult for shoppers to identify relevant shops, locate specific products, and plan their visits efficiently.

GullyGuide explores how a digital discovery directory can make local market exploration more organised and convenient.

## Features

* **Shop discovery:** Browse available shop listings.
* **Search:** Find shops using search terms.
* **Market filtering:** Narrow results by market.
* **Category filtering:** Explore shops by category.
* **Shop details:** Open individual shop detail pages.
* **Favourites:** Save shops for later and revisit them.
* **Shop registration:** Submit a demo listing through the shop-owner form.
* **Pricing page:** Explore the proposed listing plans.
* **Responsive interface:** Designed for desktop and mobile use.

## Technology Stack

* React
* Vite
* JavaScript
* CSS
* Lucide React icons
* Browser Local Storage

## Getting Started

### Prerequisites

* Node.js and npm
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

Open the local URL printed in your terminal.

### Production Build

Run:

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

## Data Storage

This prototype uses browser Local Storage for saved favourites and submitted shop listings.

Consequently:

* Data persists across refreshes in the same browser profile.
* Data is not automatically shared between different users or devices.
* Clearing browser storage can remove saved prototype data.
* Shop registration does not create a verified business account.

## Limitations

* Shop and market information is illustrative and not independently verified.
* Registration is a local demonstration rather than a production onboarding service.
* There is no shared backend database or authentication system.
* Listing plans are proposed concepts; no payments are processed.
* Location and map information are illustrative rather than live navigation data.

## Future Improvements

* Add a backend API and shared database.
* Introduce secure shop-owner authentication.
* Verify business listings and contact information.
* Integrate live maps and lane-level navigation.
* Add product availability and price updates.
* Implement secure payments and subscription management.
* Add automated tests and monitoring.

## Deployment

The application is deployed through Vercel. The live website URL should be added here after deployment verification.

## Academic Project

GullyGuide is an academic prototype demonstrating frontend development, search and filtering, browser-side persistence, reusable React components, and product-oriented problem solving.
