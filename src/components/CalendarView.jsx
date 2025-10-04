import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = ({ userRole }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEventsAndMeetings();
  }, [date]);

  const fetchEventsAndMeetings = async () => {
    setLoading(true);
    try {
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      // Fetch events
      const eventsRes = await api.get('/events', {
        params: {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        },
      });
      setEvents(eventsRes.data.data || []);

      // Fetch meetings (only for members, secretary, convenor)
      if (['member', 'secretary', 'convenor'].includes(userRole)) {
        const meetingsRes = await api.get('/meetings', {
          params: {
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          },
        });
        setMeetings(meetingsRes.data.data || []);
      }
    } catch (error) {
      toast.error('Failed to fetch calendar data');
      console.error(error);
    }
    setLoading(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayEvents = events.filter(
        (event) => format(new Date(event.date), 'yyyy-MM-dd') === dateStr
      );
      
      const dayMeetings = meetings.filter(
        (meeting) => format(new Date(meeting.date), 'yyyy-MM-dd') === dateStr
      );

      return (
        <div className="tile-content">
          {dayEvents.length > 0 && (
            <div className="event-indicator" title={`${dayEvents.length} event(s)`}>
              {dayEvents.length}
            </div>
          )}
          {dayMeetings.length > 0 && (
            <div className="meeting-indicator" title={`${dayMeetings.length} meeting(s)`}>
              {dayMeetings.length}
            </div>
          )}
        </div>
      );
    }
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
  };

  const getSelectedDateItems = () => {
    if (!selectedDate) return { events: [], meetings: [] };

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const dayEvents = events.filter(
      (event) => format(new Date(event.date), 'yyyy-MM-dd') === dateStr
    );
    
    const dayMeetings = meetings.filter(
      (meeting) => format(new Date(meeting.date), 'yyyy-MM-dd') === dateStr
    );

    return { events: dayEvents, meetings: dayMeetings };
  };

  const { events: selectedEvents, meetings: selectedMeetings } = getSelectedDateItems();

  return (
    <div className="calendar-view">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDateClick}
          tileContent={tileContent}
        />
      </div>

      {selectedDate && (
        <div className="selected-date-details">
          <h3>{format(selectedDate, 'MMMM dd, yyyy')}</h3>
          
          {selectedEvents.length > 0 && (
            <div className="events-section">
              <h4>Events</h4>
              {selectedEvents.map((event) => (
                <div key={event._id} className="item-card event-card">
                  <h5>{event.title}</h5>
                  <p className="time">🕒 {event.time}</p>
                  {event.description && <p>{event.description}</p>}
                  {event.location && <p className="location">📍 {event.location}</p>}
                  <span className={`badge ${event.type}`}>{event.type}</span>
                </div>
              ))}
            </div>
          )}

          {selectedMeetings.length > 0 && (
            <div className="meetings-section">
              <h4>Meetings</h4>
              {selectedMeetings.map((meeting) => (
                <div key={meeting._id} className="item-card meeting-card">
                  <h5>{meeting.title}</h5>
                  <p className="time">
                    🕒 {meeting.startTime} - {meeting.endTime}
                  </p>
                  {meeting.description && <p>{meeting.description}</p>}
                  {meeting.location && <p className="location">📍 {meeting.location}</p>}
                  {meeting.agenda && <p className="agenda">📋 {meeting.agenda}</p>}
                  <span className={`badge ${meeting.status}`}>{meeting.status}</span>
                </div>
              ))}
            </div>
          )}

          {selectedEvents.length === 0 && selectedMeetings.length === 0 && (
            <p className="no-items">No events or meetings scheduled for this day.</p>
          )}
        </div>
      )}

      {loading && <div className="loading-overlay">Loading...</div>}
    </div>
  );
};

export default CalendarView;
