# Retail Sales Management System - Frontend

Frontend application for the TruEstate SDE Intern Assignment.

## Tech Stack

- React 18
- Vite
- Axios
- CSS (Custom styling based on Figma design)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install

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

bash
npm run preview
Project Structure
text
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
Features
✅ Full-text search (Customer Name, Phone Number)
✅ Multi-select filters (7 filter types)
✅ Sorting (Date, Quantity, Customer Name)
✅ Pagination (10 items per page)
✅ Dark theme UI based on Figma design
✅ Responsive design
✅ Loading states
✅ Error handling
text

---

# 📄 DOCUMENTATION

## `docs/architecture.md`

```markdown
# Architecture Document

## Overview

The Retail Sales Management System is a full-stack web application that provides advanced search, filtering, sorting, and pagination capabilities for retail sales data.

## System Architecture
┌─────────────────────────────────────────────────────────────────┐
│ CLIENT (Browser) │
│ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ React Application │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │ │
│ │ │ Sidebar │ │ Search │ │ Filters │ │ Transaction │ │ │
│ │ │ │ │ Bar │ │ Panel │ │ Table │ │ │
│ │ └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────────────────────┐ │ │
│ │ │ Stats │ │ Sort │ │ Pagination │ │ │
│ │ │ Cards │ │ Dropdown │ │ │ │ │
│ │ └──────────┘ └──────────┘ └──────────────────────────┘ │ │
│ └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
│
│ HTTP (REST API)
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ SERVER (Node.js/Express) │
│ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Routes │ │
│ │ GET /api/sales - Get sales data │ │
│ │ GET /api/sales/filters - Get filter options │ │
│ │ GET /api/sales/:id - Get single transaction │ │
│ └────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Controllers │ │
│ │ - Parse query parameters │ │
│ │ - Validate input │ │
│ │ - Call services │ │
│ │ - Format response │ │
│ └────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Services │ │
│ │ - Business logic │ │
│ │ - Data processing pipeline │ │
│ │ - Statistics calculation │ │
│ └────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Utils │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │ │
│ │ │ CSV │ │ Search │ │ Filter │ │ Pagination │ │ │
│ │ │ Parser │ │ Utils │ │ Utils │ │ Utils │ │ │
│ │ └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │ │
│ │ ┌──────────────────────────────────────────────────────┐ │ │
│ │ │ Sort Utils │ │ │
│ │ └──────────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Data Layer │ │
│ │ (CSV File) │ │
│ │ sales.csv │ │
│ └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

text

## Data Flow
User Action → React Component → API Service → Backend Controller
│
▼
Sales Service
│
┌─────────────────────────────────┼─────────────────────────────────┐
│ │ │
▼ ▼ ▼
Search Utils Filter Utils Sort Utils
│ │ │
└─────────────────────────────────┼─────────────────────────────────┘
│
▼
Pagination Utils
│
▼
Response Data
│
▼
React State Update → UI Re-render

text

## Backend Architecture

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `index.js` | Server initialization, middleware setup, route mounting |
| `salesRoutes.js` | Route definitions and endpoint mapping |
| `salesController.js` | Request parsing, validation, response formatting |
| `salesService.js` | Business logic, data processing orchestration |
| `csvParser.js` | CSV file reading, data normalization, caching |
| `searchUtils.js` | Full-text search implementation |
| `filterUtils.js` | Multi-select and range filtering |
| `sortUtils.js` | Multi-field sorting |
| `paginationUtils.js` | Data pagination with metadata |

### Data Processing Pipeline

1. **Load Data**: CSV file is parsed and cached on server start
2. **Search**: Filter data by customer name or phone number
3. **Filter**: Apply multi-select and range filters
4. **Calculate Stats**: Compute statistics on filtered data
5. **Sort**: Order data by specified field
6. **Paginate**: Slice data for current page

## Frontend Architecture

### Component Hierarchy
App
├── Sidebar
├── Header
│ ├── SearchBar
│ └── Avatars
├── FilterPanel
│ ├── FilterDropdown (Customer Region)
│ ├── FilterDropdown (Gender)
│ ├── AgeRangeFilter
│ ├── FilterDropdown (Product Category)
│ ├── FilterDropdown (Tags)
│ ├── FilterDropdown (Payment Method)
│ └── DateRangeFilter
├── SortDropdown
├── StatsCards
├── TransactionTable
│ └── TableRows
├── Pagination
└── Loader (conditional)

application uses React's built-in useState and useEffect hooks for state management. State is lifted to the App component and passed down via props.

text
App State
├── salesData[]        - Current page transaction data
├── stats{}            - Statistics for filtered data
├── filterOptions{}    - Available filter options from API
├── loading            - Loading state boolean
├── error              - Error message string
├── searchQuery        - Current search term
├── filters{}          - Active filter selections
│   ├── customerRegion[]
│   ├── gender[]
│   ├── ageMin
│   ├── ageMax
│   ├── productCategory[]
│   ├── tags[]
│   ├── paymentMethod[]
│   ├── dateFrom
│   └── dateTo
├── sortBy             - Current sort field
├── sortOrder          - Sort direction (asc/desc)
├── currentPage        - Current page number
└── pagination{}       - Pagination metadata
    ├── currentPage
    ├── totalPages
    ├── totalItems
    ├── itemsPerPage
    ├── hasNextPage
    └── hasPrevPage