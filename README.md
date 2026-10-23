# 🏢 Real Estate Community Platform (India)

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application tailored for the Indian real estate market. The platform connects property buyers, renters, certified RERA real estate agents, and direct owners across major Indian metro cities (Mumbai, Bengaluru, Delhi NCR, Kochi, Chennai, Hyderabad, and Pune).

---

## 🚀 Features

- 🏡 **Property Discovery & Search:** Filter by Indian cities, property categories (Apartment, Villa, Commercial, Plot), buy/rent purpose, and BHK configurations.
- 💰 **INR Pricing & Local Taxonomies:** Prices formatted in Indian Currency (₹ Lakhs & Crores).
- 🛡️ **RERA Verified Agent Directory:** Certified agent profiles with experience tracking, specializations, and direct client lead management.
- 💬 **Buyer Requirement Feed & Community Forum:** Open board where buyers post custom location/budget requests and seek property advice from agents.
- 📅 **Inquiry & Visit Scheduling:** Direct inquiry modal with preferred contact methods (Call, WhatsApp, Email) and visit date picker.
- 📊 **Role-Based Analytics Dashboard:** Overview metrics for buyers, agents, and platform admins.
- 🔐 **Authentication & Security:** JWT session management and Bcrypt password hashing.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router DOM (v6), Axios, Bootstrap 5, Lucide Icons, Glassmorphic CSS Design.
- **Backend:** Node.js, Express.js, JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`), CORS.
- **Database:** MongoDB with Mongoose ORM (includes zero-config in-memory MongoDB fallback server for instant testing).

---

## 📂 Project Structure

```text
PROJECTMERN/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, PropertyCard, AgentCard, InquiryModal, etc.
│   │   ├── context/            # AuthContext for JWT session state
│   │   ├── pages/              # Home, Login, Register, PropertyList, PropertyDetail, AddEditProperty, AgentDirectory, CommunityFeed, Dashboard
│   │   ├── App.jsx             # React Router Setup
│   │   └── main.jsx            # React Entry Point
│   └── package.json
│
├── server/                     # Node.js Express Backend
│   ├── config/                 # DB Connection (MongoDB / In-Memory Fallback)
│   ├── controllers/            # Auth, Property, Agent, Inquiry, Community & Dashboard Controllers
│   ├── middleware/             # JWT Protect & Role Middleware
│   ├── models/                 # User, Property, PropertyListing, Agent, Inquiry, CommunityPost, Notification
│   ├── routes/                 # Express API Routes
│   ├── seed.js                 # Sample Indian Property Data Auto-Seeder
│   └── server.js               # Express Server Entry Point
│
├── package.json                # Root package with unified scripts
└── README.md                   # Project Setup & Documentation
```

---

## 💻 How to Run the Application Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

---

### Step 1: Clone the Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Jovan-7/PROJECTMERN.git
cd PROJECTMERN

# Install Root & Backend Dependencies
npm install

# Install Frontend Dependencies
cd client
npm install
cd ..
```

---

### Step 2: Start the Application

You can launch the backend server and frontend client simultaneously:

#### Option A: Start Backend & Frontend Together
```bash
# Terminal 1: Start Backend Server (Runs on http://localhost:5000)
npm run server

# Terminal 2: Start React Frontend (Runs on http://localhost:3000)
npm run client
```

---

### Step 3: Access the Application in Your Browser

- **Frontend Website:** [http://localhost:3000](http://localhost:3000)
- **Backend REST API:** [http://localhost:5000/api/property](http://localhost:5000/api/property)

---

## 🔑 One-Click Demo Accounts

Use any of these pre-loaded accounts to test different roles:

| Role | Email | Password | Details |
|---|---|---|---|
| 👑 **Admin** | `admin@realestate.in` | `password123` | Platform Admin (Jovan K Thomas) |
| 🏢 **Agent (Mumbai)** | `rajesh.sharma@mumbairealty.in` | `password123` | Rajesh Sharma (Apex Realty, RERA Verified) |
| 🏢 **Agent (Bengaluru)** | `priya@bengaluruhomes.in` | `password123` | Priya Sundaram (Bengaluru Homes) |
| 🏢 **Agent (Kochi)** | `anand.nair@kochiproperties.in` | `password123` | Anand Nair (Kerala Prime Realty) |
| 👤 **Buyer / Renter** | `rohan.v@gmail.com` | `password123` | Rohan Verma (Delhi/Mumbai Buyer) |

---

## 📄 License & Author

- **Author:** Jovan K Thomas (`727824tuec102`)
- **Domain:** Real Estate Community Platform (India)
