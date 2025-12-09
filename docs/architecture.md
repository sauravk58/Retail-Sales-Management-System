# Architecture Document

## 1. Overview

The Retail Sales Management System is a full-stack web application providing advanced search, filtering, sorting, and pagination for retail sales data.



## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                             CLIENT (Browser)                             │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                        React Application                          │ │
│   │                                                                   │ │
│   │   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────────────┐ │ │
│   │   │ Sidebar  │   │ Search   │   │ Filters  │   │ Transaction    │ │ │
│   │   │          │   │  Bar     │   │  Panel   │   │    Table       │ │ │
│   │   └──────────┘   └──────────┘   └──────────┘   └────────────────┘ │ │
│   │                                                                   │ │
│   │   ┌──────────┐   ┌────────────┐   ┌────────────────────────────┐ │ │
│   │   │  Stats   │   │   Sort      │   │        Pagination          │ │ │
│   │   │  Cards   │   │  Dropdown   │   │                            │ │ │
│   │   └──────────┘   └────────────┘   └────────────────────────────┘ │ │
│   └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

                                   │
                                   │ HTTP (REST API)
                                   ▼

┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVER (Node.js / Express)                    │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                               Routes                             │ │
│   │   GET /api/sales           - Get paginated sales data            │ │
│   │   GET /api/sales/filters   - Get filter options                  │ │
│   │   GET /api/sales/:id       - Get single transaction              │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                   │                                     │
│                                   ▼                                     │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                             Controllers                           │ │
│   │   - Parse query parameters                                        │ │
│   │   - Validate input                                                │ │
│   │   - Call services                                                 │ │
│   │   - Format response                                               │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                   │                                     │
│                                   ▼                                     │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                               Services                            │ │
│   │   - Build search query                                            │ │
│   │   - Build filter query                                            │ │
│   │   - Apply sorting                                                 │ │
│   │   - Apply pagination                                              │ │
│   │   - Calculate statistics                                          │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                   │                                     │
│                                   ▼                                     │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                         MongoDB Database                          │ │
│   │                          Sales Collection                         │ │
│   └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

```

## Frontend architecture
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                               │
├─────────────┬───────────────────────────────────────────────┤
│   Sidebar   │              Main Content                      │
│             │  ┌─────────────────────────────────────────┐  │
│  - Dashboard│  │ Header: Title + SearchBar + SortDropdown│  │
│  - Nexus    │  ├─────────────────────────────────────────┤  │
│  - Intake   │  │           FilterPanel                    │  │
│  - Services │  │ [Region][Gender][Age][Category][Tags]... │  │
│  - Invoices │  ├─────────────────────────────────────────┤  │
│             │  │           StatsCards                     │  │
│             │  │ [Units Sold] [Total Amount] [Discount]   │  │
│             │  ├─────────────────────────────────────────┤  │
│             │  │        TransactionTable                  │  │
│             │  │ ┌─────┬────┬────┬────┬────┬────┬────┐   │  │
│             │  │ │TxnID│Date│Cust│Name│Phone│Gen│Age │...│  │
│             │  │ ├─────┼────┼────┼────┼────┼────┼────┤   │  │
│             │  │ │ ... │ ...│ ...│ ...│ ...│ ...│ ...│   │  │
│             │  │ └─────┴────┴────┴────┴────┴────┴────┘   │  │
│             │  ├─────────────────────────────────────────┤  │
│             │  │           Pagination                     │  │
│             │  │     < Prev  [1] 2 3 ... 10  Next >       │  │
│             │  └─────────────────────────────────────────┘  │
└─────────────┴───────────────────────────────────────────────┘
## Data Flow
```
┌──────────────────────────────────────────────────────────────┐
│                    State Management                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │   Search    │    │   Filters   │    │    Sort     │       │
│  │   State     │    │   State     │    │   State     │       │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘       │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
│                            ▼                                  │
│                    ┌───────────────┐                          │
│                    │  API Request  │                          │
│                    │  with params  │                          │
│                    └───────┬───────┘                          │
│                            │                                  │
│                            ▼                                  │
│                    ┌───────────────┐                          │
│                    │   Backend     │                          │
│                    │   Processing  │                          │
│                    └───────┬───────┘                          │
│                            │                                  │
│                            ▼                                  │
│         ┌──────────────────┴──────────────────┐               │
│         │                                     │               │
│         ▼                                     ▼               │
│  ┌─────────────┐                       ┌─────────────┐        │
│  │   Table     │                       │   Stats     │        │
│  │   Data      │                       │   Update    │        │
│  └─────────────┘                       └─────────────┘        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```
## Complete Folder Structure
retail-sales-management/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   ├── utils/
│   │   │   ├── searchUtils.js
│   │   │   ├── filterUtils.js
│   │   │   ├── sortUtils.js
│   │   │   └── paginationUtils.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   ├── data/
│   │   │   └── sales.json
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Sidebar.css
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── SearchBar.css
│   │   │   ├── FilterPanel/
│   │   │   │   ├── FilterPanel.jsx
│   │   │   │   ├── FilterDropdown.jsx
│   │   │   │   ├── DateRangeFilter.jsx
│   │   │   │   ├── AgeRangeFilter.jsx
│   │   │   │   └── FilterPanel.css
│   │   │   ├── StatsCards/
│   │   │   │   ├── StatsCards.jsx
│   │   │   │   └── StatsCards.css
│   │   │   ├── TransactionTable/
│   │   │   │   ├── TransactionTable.jsx
│   │   │   │   └── TransactionTable.css
│   │   │   ├── SortDropdown/
│   │   │   │   ├── SortDropdown.jsx
│   │   │   │   └── SortDropdown.css
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── Pagination.css
│   │   │   └── common/
│   │   │       ├── Loader.jsx
│   │   │       └── Loader.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useDebounce.js
│   │   ├── utils/
│   │   │   └── formatters.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   │   └── vite.svg
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── README.md
│
├── docs/
│   └── architecture.md
│
├── README.md
└── package.json (optional - for monorepo)

## 6. Module Responsibilities

### Backend Modules

| Module | File | Responsibility |
|--------|------|----------------|
| **Server** | `index.js` | Express server setup, middleware, route mounting, MongoDB connection |
| **Routes** | `salesRoutes.js` | API endpoint definitions, route mapping |
| **Controller** | `salesController.js` | Request parsing, validation, response formatting |
| **Service** | `salesService.js` | Business logic, query building, data processing |
| **Model** | `Sale.js` | MongoDB schema definition, indexes |

### Frontend Modules

| Module | File | Responsibility |
|--------|------|----------------|
| **App** | `App.jsx` | Main component, state management, data fetching |
| **Sidebar** | `Sidebar.jsx` | Navigation menu, expandable sections |
| **SearchBar** | `SearchBar.jsx` | Debounced search input |
| **FilterPanel** | `FilterPanel.jsx` | Filter container, reset functionality |
| **FilterDropdown** | `FilterDropdown.jsx` | Multi-select dropdown with Select All/Clear All |
| **AgeRangeFilter** | `AgeRangeFilter.jsx` | Age range with presets and custom input |
| **DateRangeFilter** | `DateRangeFilter.jsx` | Date range with presets and date pickers |
| **SortDropdown** | `SortDropdown.jsx` | Sort field and order selection |
| **StatsCards** | `StatsCards.jsx` | Display statistics (units, amount, discount) |
| **TransactionTable** | `TransactionTable.jsx` | Data table with horizontal scroll |
| **Pagination** | `Pagination.jsx` | Page navigation controls |
| **API Service** | `api.js` | HTTP requests to backend |