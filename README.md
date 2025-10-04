# 📅 Council Calendar - MERN Stack Application

<div align="center">

![Council Calendar](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A comprehensive calendar management system for council organizations with advanced role-based access control**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

Council Calendar is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to streamline event and meeting management for council organizations. It features a robust role-based access control system, interactive calendar visualization, and intuitive interfaces for managing organizational activities.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 👥 **4-Tier Role System** - User, Member, Secretary, and Convenor roles with granular permissions
- 📆 **Interactive Calendar** - Visual calendar with color-coded event and meeting indicators
- 🎯 **Real-time Updates** - Instant notifications and calendar refreshes
- 📱 **Responsive Design** - Mobile-friendly interface with modern UI/UX
- 🔒 **Protected Routes** - Server-side and client-side route protection
- ⚡ **Fast & Efficient** - Optimized API calls and database queries

---

## 🎯 Features

### 🔐 Role-Based Access Control

The application implements a sophisticated 4-tier permission system:

| Role | Permissions |
|------|------------|
| **👤 User** | • View public events only<br>• Basic read access |
| **👥 Member** | • View all events (public & private)<br>• View all meetings<br>• Access meeting schedules |
| **📝 Secretary** | • All Member permissions<br>• Create, edit, and delete events<br>• Create, edit, and delete meetings<br>• Manage meeting attendees<br>• Set event visibility |
| **🎖️ Convenor** | • All Secretary permissions<br>• Full administrative control<br>• User management capabilities |

### 📅 Event Management

- **Create Events** - Add new events with detailed information
- **Event Types** - Categorize as Event, Workshop, Seminar, Conference, or Other
- **Public/Private** - Control event visibility (public or members-only)
- **Rich Details** - Title, description, date, time, location, and type
- **Edit & Delete** - Full CRUD operations for authorized users
- **Calendar View** - Visual representation on interactive calendar

### 🤝 Meeting Management

- **Schedule Meetings** - Set date, start time, and end time
- **Attendee Management** - Select members from the council
- **Meeting Agenda** - Add detailed agenda and description
- **Status Tracking** - Scheduled, Ongoing, Completed, or Cancelled
- **Recurring Meetings** - Support for daily, weekly, or monthly patterns
- **Meeting Details** - Location, agenda, attendees, and status

### 🗓️ Interactive Calendar

- **Visual Calendar** - Month view with date navigation
- **Event Indicators** - Blue badges showing event count per day
- **Meeting Indicators** - Pink badges showing meeting count per day
- **Date Details** - Click any date to view all events and meetings
- **Color Coding** - Easy visual distinction between events and meetings
- **Date Filtering** - Filter by date range and type

### � Additional Features

- **Toast Notifications** - Real-time success/error messages
- **Form Validation** - Client and server-side input validation
- **Secure Sessions** - JWT token management with automatic refresh
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Comprehensive error messages and fallbacks

---

## 🚀 Demo

### Screenshots

#### Login Page
Beautiful gradient-themed authentication with role selection

#### Dashboard
Role-specific sidebar with calendar and management options

#### Calendar View
Interactive calendar with event and meeting indicators

#### Event/Meeting Forms
Intuitive forms for creating and editing entries

---

## 🛠️ Tech Stack

### Backend
- **Node.js** v14+ - JavaScript runtime
- **Express.js** v4.18+ - Web application framework
- **MongoDB** v8.0+ - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** v18.3.1 - UI library
- **Vite** v7.1+ - Build tool and dev server
- **React Router** v6.20+ - Client-side routing
- **Axios** v1.6+ - HTTP client
- **React Calendar** v5.1+ - Calendar component
- **date-fns** v3.0+ - Date utility library
- **React Toastify** v10.0+ - Toast notifications
- **CSS3** - Modern styling with gradients and animations

### Development Tools
- **nodemon** - Auto-restart on changes (backend)
- **ESLint** - Code linting
- **Git** - Version control

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/council-calendar.git
cd council-calendar
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ..
npm install
```

### Step 4: Configure Environment Variables

**Backend Configuration** - Create/edit `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/council-calendar
JWT_SECRET=your_super_secure_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Frontend Configuration** - Create/edit `.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

### Step 5: Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

Or use **MongoDB Atlas** (cloud) and update the `MONGODB_URI` accordingly.

### Step 6: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5001`

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173` or next available port

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📖 Usage

### Getting Started

1. **Register an Account**
   - Click on "Register here" on the login page
   - Fill in your details (name, email, password, phone)
   - Select your role (User, Member, Secretary, or Convenor)
   - Click "Register"

2. **Login**
   - Enter your email and password
   - Click "Login"
   - You'll be redirected to the dashboard

3. **Navigate the Dashboard**
   - **Calendar** - View all events and meetings
   - **Add Event** - Create new events (Secretary/Convenor only)
   - **Add Meeting** - Schedule meetings (Secretary/Convenor only)

### Creating an Event (Secretary/Convenor)

1. Click "Add Event" in the sidebar
2. Fill in the event details:
   - Title (required)
   - Description
   - Date (required)
   - Time (required)
   - Location
   - Event Type
   - Public visibility checkbox
3. Click "Create Event"

### Scheduling a Meeting (Secretary/Convenor)

1. Click "Add Meeting" in the sidebar
2. Fill in the meeting details:
   - Title (required)
   - Description
   - Agenda
   - Date (required)
   - Start Time (required)
   - End Time (required)
   - Location
   - Select Attendees (Ctrl/Cmd + Click)
   - Status
   - Recurring options
3. Click "Create Meeting"

### Viewing Calendar

1. Click on any date to see events and meetings
2. Events are shown with blue indicators
3. Meetings are shown with pink indicators
4. Click on items to see full details

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member",
  "phone": "1234567890"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

### Event Endpoints

#### Get All Events
```http
GET /events?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer {token}
```

#### Create Event (Secretary/Convenor only)
```http
POST /events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Annual Meeting",
  "description": "Yearly council meeting",
  "date": "2025-10-15",
  "time": "14:00",
  "location": "Council Hall",
  "type": "conference",
  "isPublic": true
}
```

#### Update Event (Secretary/Convenor only)
```http
PUT /events/:id
Authorization: Bearer {token}
```

#### Delete Event (Secretary/Convenor only)
```http
DELETE /events/:id
Authorization: Bearer {token}
```

### Meeting Endpoints

#### Get All Meetings (Members only)
```http
GET /meetings?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer {token}
```

#### Create Meeting (Secretary/Convenor only)
```http
POST /meetings
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Budget Review",
  "description": "Q4 budget discussion",
  "agenda": "Review expenses and plan next quarter",
  "date": "2025-10-20",
  "startTime": "10:00",
  "endTime": "11:30",
  "location": "Conference Room A",
  "attendees": ["user_id_1", "user_id_2"],
  "status": "scheduled"
}
```

### User Endpoints

#### Get All Users (Secretary/Convenor only)
```http
GET /users
Authorization: Bearer {token}
```

#### Get Members List
```http
GET /users/members
Authorization: Bearer {token}
```

---

## 📁 Project Structure

```
council-calendar/
├── backend/                    # Backend Node.js/Express application
│   ├── middleware/            # Authentication & authorization middleware
│   │   └── auth.js           # JWT verification and role checks
│   ├── models/               # Mongoose schemas
│   │   ├── User.js          # User model with roles
│   │   ├── Event.js         # Event model
│   │   └── Meeting.js       # Meeting model
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── events.js        # Event CRUD routes
│   │   ├── meetings.js      # Meeting CRUD routes
│   │   └── users.js         # User management routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server entry point
├── src/                      # Frontend React application
│   ├── components/          # Reusable React components
│   │   ├── CalendarView.jsx       # Interactive calendar
│   │   ├── CalendarView.css
│   │   ├── EventForm.jsx          # Event creation/edit form
│   │   ├── MeetingForm.jsx        # Meeting creation/edit form
│   │   ├── Forms.css
│   │   └── PrivateRoute.jsx       # Protected route wrapper
│   ├── context/             # React Context API
│   │   └── AuthContext.jsx        # Authentication state
│   ├── pages/               # Page components
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── Dashboard.css
│   │   └── Auth.css               # Auth pages styling
│   ├── utils/               # Utility functions
│   │   └── api.js                 # Axios configuration
│   ├── App.jsx              # Main App component with routing
│   ├── App.css              # Global styles
│   └── main.jsx             # React entry point
├── .env                      # Frontend environment variables
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
├── README.md                # This file
└── .gitignore              # Git ignore rules
```

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds for secure password storage
- **JWT Authentication** - Stateless token-based authentication
- **Protected Routes** - Both client and server-side route protection
- **Role-Based Access** - Granular permissions based on user roles
- **Input Validation** - Server-side validation using express-validator
- **XSS Protection** - React's built-in XSS protection
- **CORS Configuration** - Controlled cross-origin requests
- **Environment Variables** - Sensitive data stored in .env files

---

## 🧪 Testing

### Testing Accounts

Create these accounts to test different permission levels:

1. **Secretary Account**
   - Email: secretary@council.com
   - Password: test123
   - Role: Secretary

2. **Member Account**
   - Email: member@council.com
   - Password: test123
   - Role: Member

3. **User Account**
   - Email: user@council.com
   - Password: test123
   - Role: User

### Test Scenarios

1. **User Role Testing**
   - Login as User → Should only see public events
   - Try to access meetings → Should be denied

2. **Member Role Testing**
   - Login as Member → Should see all events and meetings
   - Try to create event → Should be denied

3. **Secretary/Convenor Testing**
   - Login as Secretary/Convenor → Full access
   - Create, edit, and delete events and meetings
   - Manage attendees

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**Issue: MongoDB Connection Error**
```
Solution: Ensure MongoDB is running
- Windows: net start MongoDB
- macOS/Linux: sudo systemctl start mongod
```

**Issue: Port Already in Use**
```
Solution: Change port in .env files
- Backend: Change PORT in backend/.env
- Frontend: Vite will auto-select next available port
```

**Issue: Dependencies Error**
```
Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue: JWT Token Expired**
```
Solution: Clear localStorage and login again
localStorage.clear()
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB team for the excellent database
- Express.js community
- All open-source contributors

---

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Your Name]

</div>
