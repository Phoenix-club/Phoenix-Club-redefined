import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    registrant: '',
    registrant_email: '',
    registrant_phone: '',
    branch: '',
    year: '',
    event: 'celestial',
    team_name: '',
    payment_screenshot: null,
    team_members: [{ name: '', email: '', phone: '' }]
  });

  const [csrfToken, setCsrfToken] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, payment_screenshot: e.target.files[0] });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newMembers = [...formData.team_members];
    newMembers[index][field] = value;
    setFormData({ ...formData, team_members: newMembers });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      team_members: [...formData.team_members, { name: '', email: '', phone: '' }]
    });
  };

  const removeTeamMember = (index) => {
    const newMembers = formData.team_members.filter((_, i) => i !== index);
    setFormData({ ...formData, team_members: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'team_members') {
        formPayload.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        'https://vast-civil-fawn.ngrok-free.app/register',
        formPayload,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Event Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Registrant Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Registrant Name</label>
            <input
              type="text"
              name="registrant"
              value={formData.registrant}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Registrant Email</label>
            <input
              type="email"
              name="registrant_email"
              value={formData.registrant_email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Registrant Phone</label>
            <input
              type="tel"
              name="registrant_phone"
              value={formData.registrant_phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Team Name</label>
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Payment Screenshot Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Payment Screenshot</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>

        {/* Team Members Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Team Members</h3>
          {formData.team_members.map((member, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={member.phone}
                  onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                  className="p-2 border rounded"
                  pattern="[0-9]{10}"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="mt-2 text-red-600 text-sm hover:text-red-800"
                >
                  Remove Member
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTeamMember}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            + Add Team Member
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;