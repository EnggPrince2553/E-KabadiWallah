# E-KabadiWala Platform - Scrap Management System

A complete MERN stack application connecting users with scrap collectors to sell household scrap easily.

## 🚀 Features

- **Premium Landing Page**: A modern, startup-style homepage with smooth **Framer Motion** animations and a high-impact Hero section.
- **User Authentication**: Secure JWT-based login and registration for both Users and Admins.
- **Smart Scrap Booking**: Users can schedule pickups with real-time price estimation and **image uploads** for verification.
- **Admin Dashboard**: A powerful interface for admins to manage pickup requests, view scrap images, and update collection statuses.
- **User Profile Management**: Personalized profiles with **avatar upload** and a sleek, modern UI.
- **Responsive & Glassmorphism UI**: A mobile-friendly design featuring sticky glassmorphism navigation, tiered footers, and premium spacing.
- **Geolocation Restriction**: Pickup enforcement within a **5km radius** of the operational center (Admin's location).
- **Pickup History**: Detailed history for users to track their recycling journey and past earnings.

## 📁 Project Structure
- `/server` - Node.js & Express backend (MongoDB database).
- `/client` - React + Vite frontend application.

## 🛠️ How to Run Locally

### 1. Prerequisites
- Node.js installed on your system.
- MongoDB installed and running locally on port 27017.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the `.env` file exists in the `server` folder with the following contents:
   ```env
   PORT=***
   MONGO_URI=<add uri>
   JWT_SECRET=**********
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   *(Server will run on http://localhost:5000)*
5. **Seed Initial Scrap Prices**: Populate your database with scrap pricing by making a POST request:
   ```bash
   curl -X POST http://localhost:5000/api/v1/scrap/seed
   ```
   *(Or hit the route using Postman/Thunder Client)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *(Frontend will run on http://localhost:5173 or the port shown in your terminal)*

### 4. Usage
- Go to the frontend URL in your browser.
- Register a new account.
- Visit the Dashboard, view the live scrap prices, and book your first verified pickup!

---
*Built with React, Framer Motion, Node.js, Express, MongoDB & Tailwind CSS*
