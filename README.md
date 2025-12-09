# Retail Sales Management System

## 1. Overview

A full-stack Retail Sales Management System that enables users to view, search, filter, sort, and paginate sales transaction data. The application features a responsive UI with sidebar navigation, dynamic filter dropdowns, stats cards, and a data table displaying sales records. Built with React.js frontend and Node.js/Express backend connected to MongoDB database.

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, Vite, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) |
| **State Management** | React Hooks (useState, useEffect, useCallback) |
| **HTTP Client** | Fetch API | Axios

---

## 3. Search Implementation Summary

- **Debounced Search**: 300ms debounce to optimize API calls and reduce server load
- **Multi-field Search**: Searches across `customerName` and `phoneNumber` fields
- **Case-insensitive**: Uses MongoDB `$regex` with `$options: 'i'`
- **Real-time Results**: Updates table dynamically as user types

## 4. Filter Implementation Summary

Multi-select Filters: Customer Region, Gender, Product Category, Tags, Payment Method
Range Filters: Age Range (min/max), Date Range (from/to)
Preset Options: Quick selection for common age groups and date ranges
Select All / Clear All: Bulk selection controls
Combined Query: Filters combined with AND logic using MongoDB operators

## 5. Sorting Implementation Summary

Sortable Fields: Customer Name, Date, Quantity, Total Amount
Sort Orders: Ascending and Descending
Default Sort: Date (Newest First)
Server-side Sorting: Using MongoDB .sort()

## 6. Pagination Implementation Summary

Server-side Pagination: MongoDB .skip() and .limit()
Page Size: 10 items per page
Navigation: First, Previous, Page Numbers, Next, Last
Auto Reset: Page resets to 1 on filter/search/sort change

## 7. Setup Instructions (GitHub-Ready)

# Prerequisites

-Node.js (v18 or higher)
-MongoDB Atlas account or local MongoDB installation
-Git

# Clone Repository

```
git clone https://github.com/YOUR_USERNAME/retail-sales-management.git
cd retail-sales-management
```

# Backend Setup

```
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

# Add this inside .env:

```
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/retail_sales
NODE_ENV=development
```

```
# Seed database (optional – only if you have a seed script)
npm run seed

# Start backend server
npm run dev
```

## Frontend Setup 

```
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

# Add this inside .env:

```
VITE_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev
    
```

## Access Application

```
Frontend: http://localhost:5173

Backend API: http://localhost:5000/api
```