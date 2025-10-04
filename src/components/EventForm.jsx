import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Forms.css';

const EventForm = ({ onSuccess, eventData = null }) => {
  const [formData, setFormData] = useState({
    title: eventData?.title || '',
    description: eventData?.description || '',
    date: eventData?.date ? new Date(eventData.date).toISOString().split('T')[0] : '',
    time: eventData?.time || '',
    location: eventData?.location || '',
    type: eventData?.type || 'event',
    isPublic: eventData?.isPublic !== undefined ? eventData.isPublic : true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (eventData) {
        // Update existing event
        await api.put(`/events/${eventData._id}`, formData);
        toast.success('Event updated successfully!');
      } else {
        // Create new event
        await api.post('/events', formData);
        toast.success('Event created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'event',
        isPublic: true,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save event');
      console.error(error);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!eventData || !window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/events/${eventData._id}`);
      toast.success('Event deleted successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete event');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="title">Event Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter event title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Enter event description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Event Type *</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="event">Event</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="conference">Conference</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          <span>Make this event public (visible to all users)</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : eventData ? 'Update Event' : 'Create Event'}
        </button>
        {eventData && (
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Event
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
