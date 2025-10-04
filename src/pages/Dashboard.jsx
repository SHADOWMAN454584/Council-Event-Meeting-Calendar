import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import MeetingForm from '../components/MeetingForm';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const canManage = user && ['secretary', 'convenor'].includes(user.role);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('calendar');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>Council Calendar</h2>
        </div>
        <div className="nav-user">
          <span className="user-name">{user?.name}</span>
          <span className={`user-role role-${user?.role}`}>{user?.role}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button
            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>

          {canManage && (
            <>
              <button
                className={`tab-btn ${activeTab === 'add-event' ? 'active' : ''}`}
                onClick={() => setActiveTab('add-event')}
              >
                ➕ Add Event
              </button>
              <button
                className={`tab-btn ${activeTab === 'add-meeting' ? 'active' : ''}`}
                onClick={() => setActiveTab('add-meeting')}
              >
                ➕ Add Meeting
              </button>
            </>
          )}

          <div className="role-info">
            <h4>Your Access Level:</h4>
            {user?.role === 'user' && (
              <p>✓ View public events</p>
            )}
            {user?.role === 'member' && (
              <>
                <p>✓ View all events</p>
                <p>✓ View all meetings</p>
              </>
            )}
            {(user?.role === 'secretary' || user?.role === 'convenor') && (
              <>
                <p>✓ View all events & meetings</p>
                <p>✓ Create events & meetings</p>
                <p>✓ Edit events & meetings</p>
                <p>✓ Delete events & meetings</p>
              </>
            )}
          </div>
        </div>

        <div className="main-content">
          {activeTab === 'calendar' && (
            <div>
              <h1>Calendar View</h1>
              <CalendarView key={refreshKey} userRole={user?.role} />
            </div>
          )}

          {activeTab === 'add-event' && canManage && (
            <div>
              <h1>Add New Event</h1>
              <EventForm onSuccess={handleRefresh} />
            </div>
          )}

          {activeTab === 'add-meeting' && canManage && (
            <div>
              <h1>Add New Meeting</h1>
              <MeetingForm onSuccess={handleRefresh} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
