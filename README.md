# Nexora — Modern Angular SaaS Admin Dashboard & Template

**Nexora** is a clean, production-ready enterprise admin and dashboard template built with Angular. It features an integrated Dark & Light mode toggle powered by `angular-dark-mode`, a modular feature architecture inside the `auth` module, a real-time Notification Center, security Audit Logs, and a comprehensive suite of pre-built screens to kickstart your next SaaS application.

---

## 📁 Project Directory Structure

The application is structured following modular Angular best practices, encapsulating core dashboard screens, business logic, routing, and services inside the `modules/auth` feature module:

Nexora/
├── src/
│   ├── app/
│   │   ├── home/
│   │   ├── modules/
│   │   │   └── auth/
│   │   │       ├── account-settings/       # User profile & account preferences
│   │   │       ├── analytics/              # Deep-dive charts & metrics reporting
│   │   │       ├── audit-logs/             # Security compliance & activity tracker
│   │   │       ├── billing-subscription/   # Subscriptions, payments & invoices
│   │   │       ├── dashboard-component/    # Core SaaS performance overview
│   │   │       ├── interceptor/            # HTTP request/response interceptors
│   │   │       ├── login-sign-up/          # Authentication portal (Login/Signup)
│   │   │       ├── not-found/              # 404 Error handling view
│   │   │       ├── notifications/          # Notification center dropdown component
│   │   │       ├── pricing/                # SaaS pricing tiers & subscription plans
│   │   │       ├── users-component/        # User management grid & controls
│   │   │       ├── auth-routing.module.ts  # Child routes for authenticated views
│   │   │       ├── auth.interfaces.ts      # TypeScript models and interfaces
│   │   │       ├── auth.module.ts          # Feature module declaration
│   │   │       ├── auth.service.ts         # Authentication & API services
│   │   │       ├── auth.store.ts           # State management handling
│   │   │       ├── PagingResponse.ts       # Paginated API response wrapper model
│   │   │       ├── ResponseApi.ts          # Generic API response format
│   │   │       └── user-profile.ts         # User profile data model
│   │   ├── styles/
│   │   │   └── styles.scss                 # Global styling & light/dark theme rules
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/                             # Static images, icons, and avatars
│   └── environments/                       # Environment configuration files



---

## ✨ Included Pages & Features

* **Authentication Portal:** Complete secure authentication suite including Login, Sign Up, and Password Reset workflows housed within `login-sign-up`.
* **Core Dashboard Overview:** High-performance summary featuring key performance indicators, revenue/growth trend charts, and quick actions.
* **User Management:** Comprehensive table layout with search filtering, role tags, status indicators, and modal management.
* **Billing & Subscription:** Subscription plan management, active billing overview, saved payment methods, and downloadable invoice history.
* **Analytics & Reports:** Deep-dive reporting with user acquisition trends, traffic metrics, bounce rates, and conversion funnels.
* **Pricing Plans:** Transparent pricing tiers with billing interval options.
* **Security Audit Logs:** Enterprise compliance view tracking event IDs, timestamps, user actions, IP addresses, and status indicators.
* **Interactive Notification Center:** Real-time dropdown notification panel accessible via the top navigation bell icon.
* **Settings & Errors:** Profile settings, security preferences, and a clean 404 Not Found error fallback.
* **Theme Support:** Native Dark and Light mode switching with instant state persistence via `angular-dark-mode`.

---

## 🛠️ Prerequisites

Before running the project locally, ensure you have the following installed on your machine:

* **Node.js** (v14+ recommended)
* **Angular CLI** (`npm install -g @angular/cli`)

---

## 🚀 Getting Started (Installation & Setup)

Follow these steps to set up the project locally:

1. **Clone or Extract the Project:**
Unzip the template package and open your terminal inside the root project directory (`Nexora`).
2. **Install Dependencies:**
Run the following command to install all required npm packages including the dark mode manager:
----------
npm install --legacy-peer-deps
----------



3. **Run the Development Server:**
Execute the following command to spin up the local development server:
----------
ng serve
----------


4. **Access the Application:**
Open your browser and navigate to `http://localhost:4200/`.

