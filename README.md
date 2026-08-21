# UrbanNest Lifestyle Store - Storefront & Integrations

> "Little Things. Beautiful Living."

UrbanNest is a premium, fully-responsive digital e-commerce storefront designed for a curated local boutique. It showcases home décor, stationery, gifts, and lifestyle accessories.

This application is built with **React**, **Vite**, **Tailwind CSS v4**, **Framer Motion** for micro-interactions, and integrates with **N8N webhooks** for customer query forms and AI chatbot services.

---

## 🌟 Key Features

1. **Curated Product Catalog (`/products`)**
   - Live client-side search indexing.
   - Dynamic sidebar categories filter & range slider.
   - Quick View dialog modal with detail specs.
2. **Shopping Cart Drawer**
   - persistent client cart using LocalStorage state hooks.
   - Drawer interface with incremental item count bubbles, qty adjust controls, and auto-updating tax summation.
3. **Contact Queries Form (`/contact`)**
   - Regex-validated email and phone checks.
   - Integrated with N8N Webhooks payloads.
4. **AI Assistant Widget**
   - Click-to-launch floating chatbot chat widget.
   - Suggested prompts templates.
   - Streamed typing loader.
   - Session stability via UUIDs.
5. **Modern Brand Aesthetics**
   - Styled dark/light warm sand palettes.
   - Google Font pairings (Playfair Display / Plus Jakarta / Outfit).

---

## 🛠️ Technology Stack

* **Frontend Framework:** React (v19)
* **Build System:** Vite (v8)
* **Styling Engine:** Tailwind CSS (v4)
* **Animation Library:** Framer Motion (v13)
* **Icon Set:** Lucide React
* **Router:** React Router Dom (v7)
* **API Client:** Axios

---

## 🚀 Setting Up the Application

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Installation
Clone or pull the source files and install the dependencies:
```bash
npm install
```

### 3. Environment Configurations
Rename `.env.example` to `.env` in the root folder and provide your N8N active URLs:
```env
VITE_N8N_QUERY_WEBHOOK_URL="https://your-n8n-instance.com/webhook/query-id"
VITE_N8N_CHATBOT_URL="https://your-n8n-instance.com/webhook/chatbot-id"
```
*Note: If these environment variables are left blank, the application will automatically enter **Demo/Offline Mode**, allowing the contact forms and AIchatbot widgets to function as normal local simulations.*

### 4. Development Server
Run the local dev compiler:
```bash
npm run dev
```

### 5. Production Compilation
Build compilation output into `dist/` directory:
```bash
npm run build
```

---

## 🌍 Depoyment on Render

UrbanNest is structured for static deployment on **Render**:

1. Log in to your Render dashboard and click **New > Static Site**.
2. Connect your Git repository.
3. Use the following configurations:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Under **Advanced**, add your `.env` keys (`VITE_N8N_QUERY_WEBHOOK_URL` / `VITE_N8N_CHATBOT_URL`) to connect your live automation webhooks.
5. Click **Create** to deploy.
