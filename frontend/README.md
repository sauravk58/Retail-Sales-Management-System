# Retail Sales Management System - Frontend

Frontend application for the TruEstate SDE Intern Assignment.

## Tech Stack

- React 18
- Vite
- Axios
- CSS (Custom styling based on Figma design)

## Setup Instructions

1. **Install dependencies:**
   ```
   cd frontend
   npm install
```
Configure environment:

Create .env file (or use the existing one)
Set VITE_API_URL to your backend URL
Start development server:

bash
npm run dev
Build for production:

bash
npm run build
Preview production build:
```
npm run preview
```
## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar/          # Navigation sidebar
│   │   ├── SearchBar/        # Search input component
│   │   ├── FilterPanel/      # Filter dropdowns
│   │   ├── StatsCards/       # Statistics display
│   │   ├── TransactionTable/ # Data table
│   │   ├── SortDropdown/     # Sort options
│   │   ├── Pagination/       # Page navigation
│   │   └── Loader/           # Loading spinner
│   ├── services/
│   │   └── api.js            # API calls
│   ├── hooks/
│   │   └── useDebounce.js    # Debounce hook
│   ├── utils/
│   │   └── formatters.js     # Data formatters
│   ├── styles/
│   │   └── global.css        # Global styles
│   ├── App.jsx               # Main component
│   ├── App.css               # App styles
│   └── main.jsx              # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
---

