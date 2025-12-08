# Retail Sales Management System - Backend

Backend API for the TruEstate SDE Intern Assignment.

## Tech Stack

- Node.js
- Express.js
- CSV Parser

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd backend
   npm install

Add your CSV data file:

Place your sales.csv file in backend/src/data/ directory
The CSV should contain columns matching the expected schema
Start the server:

bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
Server will run on: http://localhost:5000

API Endpoints
Get Sales Data
text
GET /api/sales

## Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── salesController.js
│   ├── services/
│   │   └── salesService.js
│   ├── utils/
│   │   ├── csvParser.js
│   │   ├── searchUtils.js
│   │   ├── filterUtils.js
│   │   ├── sortUtils.js
│   │   └── paginationUtils.js
│   ├── routes/
│   │   └── salesRoutes.js
│   ├── data/
│   │   └── sales.csv
│   └── index.js
├── package.json
└── README.md
```