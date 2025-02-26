import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Registration = ({ eventId }) => {
  const client = axios.create({
    baseURL: "https://phoenixkkw.pythonanywhere.com/",
    headers:{
      'ngrok-skip-browser-warning': 'true' 
    }
  });


  const navigate = useNavigate(); // Used for redirection
  const [feesEvent, setFeesEvent] = useState(0)
  const location = useLocation();
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track success
  const [eventData, setEventData] = useState({ name: "", event_type: "", value: eventId });
  useEffect(() => {
    // First try to use data from location state
    if (location.state?.data) {
      setEventData({
        ...location.state.data
      });
      setFeesEvent(location.state.data.fees || 0);
      console.log("Event data from state:", location.state.data);
    }
    
    // Always fetch fresh data from API regardless of location state
    client.get(`/events/`)
      .then(response => {
        // Find the event with the matching ID
        const eventIndex = response.data.findIndex(event => event.id == eventId);
        
        if (eventIndex !== -1) {
          const event = response.data[eventIndex];
          setEventData({
            name: event.name, 
            event_type: event.event_type, 
            value: event.id
          });
          // In your useEffect when setting feesEvent
        if (event.fees) {
          setFeesEvent(event.fees);
          localStorage.setItem('eventFees', event.fees);
        }

// Then initialize feesEvent with localStorage value if available
          setFeesEvent(() => {
            const savedFees = localStorage.getItem('eventFees');
            return savedFees ? parseInt(savedFees) : 0;
          });
        } else {
          console.error("Event not found with ID:", eventId);
        }
      })
      .catch(error => {
        console.error("Failed to fetch event data:", error);
      });
  }, [eventId]); // Remove location.state from dependencies to prevent double fetching
  const [formData, setFormData] = useState({
    registrant: '',
    registrant_email: '',
    registrant_phone: '',
    branch: '',
    year: '',
    event: eventId,
    team_name: '',
    payment_screenshot: null,
    team_members: [{ name: '', email: '', phone: '' }]
  });

  const [csrfToken, setCsrfToken] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newMembers = [...formData.team_members];
    newMembers[index][field] = value;
    setFormData({ ...formData, team_members: newMembers });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, payment_screenshot: e.target.files[0] });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      team_members: [...formData.team_members, { name: '', email: '', phone: '' }]
    });<div>
    <label className="block text-sm font-medium mb-1">Team Name</label>
    <input
      type="text"
      name="team_name"
      value={formData.team_name}
      onChange={handleInputChange}
      className="w-full p-2 bg-backG/50 border rounded "
      />
  </div>
  };

  const removeTeamMember = (index) => {
    const newMembers = formData.team_members.filter((_, i) => i !== index);
    setFormData({ ...formData, team_members: newMembers });
  }; 

  // In your useEffect when setting feesEvent


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
      const response = await client.post('register/', formPayload, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      console.log('Registration successful:', response.data);
      
      // ✅ Show confirmation screen
      setRegistrationSuccess(true);

      // ✅ Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 4000);
      
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  // ✅ If registration is successful, show confirmation message
  if (registrationSuccess) {
    return (
      <div className="h-screen font-pixelSans w-screen flex flex-col items-center justify-center bg-[#F3BD9F] text-[#0F1F25]">
        <h1 className="text-4xl font-bold">Registration Successful!</h1>
        <p className="text-lg mt-2">You will soon receive your confirmation mail</p>
        <p className="text-lg mt-2">You will be redirected to home in a few seconds...</p>
        <NavLink to="/" className="mt-4 px-6 py-2 bg-[#F6CAB6] text-[#000] rounded-lg">
          Go to Home Now
        </NavLink>
      </div>
    );
  }

  // ✅ Otherwise, show the normal registration form
  if(eventData.name != null){
    return (
      <div className="registration bg-[url('/bakchodi/image.png')] w-screen font-pixelSans justify-center items-center h-screen bg-bottom bg-cover bg-no-repeat overflow-y-scroll  p-6 bg-[#FFCCBC] rounded-lg max-lg:flex-col flex text-[#fff]">

        <div className='w-fit h-full justify-self-center backdrop-blur-sm p-5 items-center'>
        <h2 className="max-lg:text-2xl text-4xl font-bold mb-6">Event Registration : {eventData.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 py-10">
          {/* Main Registrant Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <label className="block text-sm font-medium mb-1">Registrant Name</label>
              <input
                type="text"
                name="registrant"
                value={formData.registrant}
                onChange={handleInputChange}
                className="w-full bg-backG/50  p-2 border rounded "
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
                className="w-full p-2 bg-backG/50 border rounded "
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
                className="w-full p-2 bg-backG/50 border rounded "
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
                className="w-full p-2 bg-backG/50 border rounded "
                />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full p-2 bg-backG/50 border rounded "
                />
            </div>
            { eventData.event_type == "team" && <div>
              <label className="block text-sm font-medium mb-1">Team Name</label>
              <input
                type="text"
                name="team_name"
                value={formData.team_name}
                onChange={handleInputChange}
                className="w-full p-2 bg-backG/50 border rounded "
                />
            </div>}
          </div>
  
          {/* Payment Screenshot Upload */}
          {( feesEvent > 0) && <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Payment Screenshot <p>(warning: image should be under 2MB and transaction ID should be visible)</p></label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded "
              accept="image/*"
              />
          </div>}
  
          {/* Team Members Section */}
          { eventData.event_type=="team" && <div className="mt-6">
            <h3 className="text-lg text-[#fff] font-semibold mb-3">Team Members</h3>
            {formData.team_members.map((member, index) => (
              <div key={index} className="mb-4 text-[#fff] p-4 border rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                    className="p-2 border bg-backG/50 rounded"
                    required
                    />
                  <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                    className="p-2 border bg-backG/50 rounded"
                    required
                    />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                    className="p-2 border bg-backG/50 rounded "
                    pattern="[0-9]{10}"
                    />
                </div>
                {index > 0 && (
                  <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="mt-2 text-sm p-3 hover:text-[#A95B49] "
                  >
                    Remove Member
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="mt-2 rounded p-1 border bg-backG/50  bg-[#D3D3D3] text-[#fff] hover:text-[#000]/70"
              >
              + Add Team Member
            </button>
          </div>
  }
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FFF8DC]/60 text-[#000] hover:bg-[#256E42]/30 py-2 px-4 border-2 border-backG rounded hover:text-[#000]/70 transition-colors"
            >
            Register
          </button>
        </form>
    </div>
    <img className='w-1/2 h-1/2' src="/ss.jpeg" alt="" />
        <NavLink
          to='/'
          className='text-[#F6CAB6] group absolute z-50 max-lg:bottom-5 max-lg:left-5 bottom-10 left-10 text-5xl max-md:text-3xl bg-[#182225] rounded-lg font-pixelSans'
          >
          <span className='group-hover:border-[#F6CAB6] group-hover:bg-[#FDE37D]/30 group-hover:text-[#FDE37D] border-4 max-md:px-1 px-3 border-[#FDE37D] rounded-lg transition-all flex'>
            <img
              className='object-contain w-[50px] max-md:w-9 scale-x-[-1] group-hover:-translate-x-3 transition-all'
              src={"/play.png"}
              alt="Play icon"
              loading="lazy"
              />
            Home
          </span>
        </NavLink>
      </div>
      
    );}
    else{
      return(<div className='h-screen w-screen text-[#fff] bg-[#005] flex items-center justify-center'>
          <h1 className='text-3xl font-pixelSans'>
              Invalid Event
          </h1>
          <NavLink
          to='/'
          className='text-[#F6CAB6] group absolute z-50 bottom-10 left-10 text-5xl max-md:text-3xl font-pixelSans'
        >
          <span className='group-hover:border-[#F6CAB6] group-hover:bg-[#FDE37D]/30 group-hover:text-[#FDE37D] border-4 max-md:px-1 px-3 border-[#FDE37D] rounded-lg transition-all flex'>
            <img
              className='object-contain w-[50px] max-md:w-9 scale-x-[-1] group-hover:-translate-x-3 transition-all'
              src={"/play.png"}
              alt=""
              loading="lazy"
            />
            Home
          </span>
        </NavLink>
        </div>);
  }
};

export default Registration;
