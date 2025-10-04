import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Forms.css';

const MeetingForm = ({ onSuccess, meetingData = null }) => {
  const [formData, setFormData] = useState({
    title: meetingData?.title || '',
    description: meetingData?.description || '',
    date: meetingData?.date ? new Date(meetingData.date).toISOString().split('T')[0] : '',
    startTime: meetingData?.startTime || '',
    endTime: meetingData?.endTime || '',
    location: meetingData?.location || '',
    agenda: meetingData?.agenda || '',
    attendees: meetingData?.attendees?.map(a => a._id) || [],
    status: meetingData?.status || 'scheduled',
    isRecurring: meetingData?.isRecurring || false,
    recurringPattern: meetingData?.recurringPattern || 'none',
  });
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get('/users/members');
      setMembers(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAttendeeChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({ ...formData, attendees: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (meetingData) {
        // Update existing meeting
        await api.put(`/meetings/${meetingData._id}`, formData);
        toast.success('Meeting updated successfully!');
      } else {
        // Create new meeting
        await api.post('/meetings', formData);
        toast.success('Meeting created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        agenda: '',
        attendees: [],
        status: 'scheduled',
        isRecurring: false,
        recurringPattern: 'none',
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save meeting');
      console.error(error);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!meetingData || !window.confirm('Are you sure you want to delete this meeting?')) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/meetings/${meetingData._id}`);
      toast.success('Meeting deleted successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete meeting');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="title">Meeting Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter meeting title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter meeting description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="agenda">Agenda</label>
        <textarea
          id="agenda"
          name="agenda"
          value={formData.agenda}
          onChange={handleChange}
          rows="3"
          placeholder="Enter meeting agenda"
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
          <label htmlFor="startTime">Start Time *</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time *</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
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
          placeholder="Enter meeting location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="attendees">Attendees (Hold Ctrl/Cmd to select multiple)</label>
        <select
          id="attendees"
          name="attendees"
          multiple
          value={formData.attendees}
          onChange={handleAttendeeChange}
          size="5"
        >
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name} - {member.role}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {formData.isRecurring && (
          <div className="form-group">
            <label htmlFor="recurringPattern">Recurring Pattern</label>
            <select
              id="recurringPattern"
              name="recurringPattern"
              value={formData.recurringPattern}
              onChange={handleChange}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
          />
          <span>Recurring Meeting</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : meetingData ? 'Update Meeting' : 'Create Meeting'}
        </button>
        {meetingData && (
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Meeting
          </button>
        )}
      </div>
    </form>
  );
};

export default MeetingForm;
