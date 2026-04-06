# 💰 Finance Dashboard UI

A fully responsive, professional **Finance Dashboard** web application built with **React 18**, **Vite**, **Tailwind CSS**, **Recharts**, and **Zustand**. Designed with a modern fintech aesthetic, it provides rich data visualizations, transaction management, and a seamless dark/light mode experience.

---

## ✨ Features

- 📊 **Interactive Charts** — Spending donut chart, income vs expense bar chart, and monthly trend lines powered by Recharts
- 💳 **Transaction Management** — Add, edit, delete, and filter transactions with a polished modal UI
- 🔍 **Smart Filters** — Filter by category, type, status, and date range
- 📤 **CSV Export** — Export transaction data to CSV instantly
- 🌙 **Dark / Light Mode** — Persistent theme toggle using Zustand
- 🔐 **Role-Based Access** — Viewer and Admin roles with conditional UI controls
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile screens
- 💡 **Insights Bar** — Smart financial summaries and spending insights
- ⚡ **Fast Dev Experience** — Powered by Vite for near-instant HMR

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Data visualization |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 📁 Project Structure

```
finance-dashboard-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard charts and widgets
│   │   │   ├── InsightBar.jsx
│   │   │   ├── RecentTransactions.jsx
│   │   │   └── SpendingDonutChart.jsx
│   │   ├── transactions/       # Transaction list and modals
│   │   │   ├── AddEditModal.jsx
│   │   │   ├── DeleteConfirmDialog.jsx
│   │   │   └── TransactionRow.jsx
│   │   ├── insights/           # Financial insights panel
│   │   ├── layout/             # Sidebar, navbar, layout shell
│   │   └── ui/                 # Reusable UI primitives
│   ├── context/                # React context providers
│   ├── data/
│   │   └── mockData.js         # Seed transaction data & categories
│   ├── utils/
│   │   ├── dateHelpers.js      # Date formatting utilities
│   │   └── exportCSV.js        # CSV export utility
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.jsx                # App entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "Finance Dashboard UI"

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📊 Mock Data

The app comes with rich mock transaction data in `src/data/mockData.js` covering **November 2025 – April 2026** across 9 categories:

| Category | Type |
|---|---|
| 💼 Salary | Income |
| 💻 Freelance | Income |
| 📈 Investment | Expense |
| 🛒 Food | Expense |
| 🚗 Transport | Expense |
| 🛍️ Shopping | Expense |
| 🎬 Entertainment | Expense |
| 🏥 Health | Expense |
| ⚡ Utilities | Expense |

---

## 🎨 Design Highlights

- **Glassmorphism** cards with backdrop blur
- **HSL-tuned** color palette for charts and categories
- **Smooth animations** on hover and transitions
- **Inter / system font** stack for clean typography
- Dark mode with Tailwind's `dark:` variant

---

## 📝 License

This project is for **educational purposes** as part of a Complete ReactJS learning series.

---

> Built with ❤️ using React + Vite + Tailwind CSS
