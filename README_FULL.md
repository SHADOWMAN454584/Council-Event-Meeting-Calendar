# Council Calendar - MERN Stack Application

A comprehensive calendar application for council management with role-based access control.

## Features

### 🔐 Role-Based Access Control

**Four User Roles:**
1. **User** - Can view public events only
2. **Member** - Can view all events and meetings
3. **Secretary** - Can create, edit, and delete events and meetings
4. **Convenor** - Can create, edit, and delete events and meetings

### 📅 Event Management
- Create, edit, and delete events (Secretary/Convenor only)
- Set event type (event, workshop, seminar, conference, other)
- Mark events as public or private
- View events on interactive calendar

### 🤝 Meeting Management
- Create, edit, and delete meetings (Secretary/Convenor only)
- Add meeting attendees from members list
- Set meeting agenda and status
- Support for recurring meetings
- View meetings on calendar (Members, Secretary, Convenor only)

### 🗓️ Interactive Calendar
- Visual calendar with color-coded indicators
- Click on dates to view events and meetings
- Filter by date range and type

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **React Calendar** for calendar view
- **React Toastify** for notifications
- **date-fns** for date manipulation

## Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ..
   npm install
   ```

3. **Configure Environment Variables**
   - Update `backend/.env` with your MongoDB connection string
   - Update `.env` with your API URL (default is set)

4. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start Frontend (in a new terminal)**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Secretary/Convenor)
- `PUT /api/events/:id` - Update event (Secretary/Convenor)
- `DELETE /api/events/:id` - Delete event (Secretary/Convenor)

### Meetings
- `GET /api/meetings` - Get all meetings (Members only)
- `POST /api/meetings` - Create meeting (Secretary/Convenor)
- `PUT /api/meetings/:id` - Update meeting (Secretary/Convenor)
- `DELETE /api/meetings/:id` - Delete meeting (Secretary/Convenor)

## Usage Guide

1. **Register** with appropriate role (User/Member/Secretary/Convenor)
2. **Login** with your credentials
3. **View Calendar** to see events and meetings
4. **Manage Events/Meetings** (if Secretary/Convenor)

## Project Structure

```
my-calender-app/
├── backend/              # Backend Express server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Entry point
├── src/                 # Frontend React app
│   ├── components/      # React components
│   ├── context/         # Auth context
│   ├── pages/           # Page components
│   ├── utils/           # Utilities (API)
│   └── App.jsx          # Main app component
└── README.md
```

## License

MIT License
