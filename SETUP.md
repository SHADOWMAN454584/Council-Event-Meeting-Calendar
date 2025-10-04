# Council Calendar - Setup Instructions

## Quick Start Guide

Follow these steps to get your Council Calendar application running:

### Step 1: Install Backend Dependencies

Open PowerShell and navigate to the backend folder:

\`\`\`powershell
cd backend
npm install
\`\`\`

### Step 2: Install Frontend Dependencies

Return to the root folder and install frontend dependencies:

\`\`\`powershell
cd ..
npm install
\`\`\`

### Step 3: Start MongoDB

Make sure MongoDB is installed and running on your system:

- **Local MongoDB**: Start the MongoDB service
- **MongoDB Atlas**: Use the connection string from your Atlas cluster

Update `backend/.env` with your MongoDB connection string.

### Step 4: Start Backend Server

In the backend folder:

\`\`\`powershell
cd backend
npm run dev
\`\`\`

The backend will start on http://localhost:5000

### Step 5: Start Frontend Development Server

In a new PowerShell window, from the root folder:

\`\`\`powershell
npm run dev
\`\`\`

The frontend will start on http://localhost:5173

### Step 6: Access the Application

Open your browser and go to: http://localhost:5173

## First Time Setup

1. **Register an account** with the appropriate role
2. **Login** with your credentials
3. Start using the calendar!

## Default Credentials for Testing

You'll need to create your own accounts through the registration page.

### Recommended Test Accounts

Create these accounts for testing:

1. **Secretary Account**
   - Name: Test Secretary
   - Email: secretary@council.com
   - Role: Secretary
   - Password: test123

2. **Member Account**
   - Name: Test Member
   - Email: member@council.com
   - Role: Member
   - Password: test123

3. **User Account**
   - Name: Test User
   - Email: user@council.com
   - Role: User
   - Password: test123

## Troubleshooting

### MongoDB Connection Error

If you see MongoDB connection errors:
- Ensure MongoDB is running
- Check the MONGODB_URI in `backend/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use

If port 5000 or 5173 is already in use:
- Backend: Change PORT in `backend/.env`
- Frontend: It will prompt you to use a different port

### Module Not Found Errors

Run npm install again:
\`\`\`powershell
npm install
cd backend
npm install
\`\`\`

## Need Help?

Check the main README.md for detailed documentation and API endpoints.
