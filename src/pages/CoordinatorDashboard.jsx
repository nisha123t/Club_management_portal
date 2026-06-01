import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/coordinator-style.css';
import { checkLogin, logout } from '../utils/auth';
import vitLogo from '../assets/images/vitlogo.jpg';

const CoordinatorDashboard = () => {
  const [cpiScore, setCpiScore] = useState(85);
  const [clubEvents, setClubEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [clubName, setClubName] = useState('');

  const calculateClubCPI = (clubName) => {
    const events = JSON.parse(localStorage.getItem("events")) || {};
    const participants = JSON.parse(localStorage.getItem("eventParticipants")) || {};
    const ratings = JSON.parse(localStorage.getItem("eventRatings")) || {};

    let totalParticipants = 0;
    let totalRatings = 0;
    let ratingCount = 0;
    let eventCount = 0;

    Object.keys(events).forEach(date => {
      const event = events[date];

      if (event.club === clubName) {
        eventCount++;
        const eventName = event.name;

        if (participants[eventName]) {
          totalParticipants += participants[eventName].length;
        }

        if (ratings[eventName]) {
          Object.values(ratings[eventName]).forEach(r => {
            totalRatings += r;
            ratingCount++;
          });
        }
      }
    });

    const avgRating = ratingCount === 0 ? 0 : totalRatings / ratingCount;
    const CPI = (eventCount * 0.3) + (totalParticipants * 0.3) + (avgRating * 0.4);

    return CPI.toFixed(2);
  };

  useEffect(() => {
    checkLogin('coordinator');

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      const club = user.club || "Tech Club";
      setClubName(club);
      setCpiScore(calculateClubCPI(club));

      // Get club's events
      const events = JSON.parse(localStorage.getItem("events")) || {};
      const clubEventsArray = Object.entries(events)
        .filter(([_, event]) => event.club === club)
        .map(([date, event]) => ({
          ...event,
          date: date
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setClubEvents(clubEventsArray);
    }
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return clubEvents.filter(event => event.date === dateStr);
  };

  const handleLogout = () => {
    logout();
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      name: document.getElementById('eventTitle').value,
      date: document.getElementById('eventDate').value,
      time: document.getElementById('eventTime').value,
      venue: document.getElementById('eventVenue').value,
      capacity: parseInt(document.getElementById('registrationCapacity').value),
      status: document.getElementById('eventStatus').value,
      club: clubName
    };

    // Save to localStorage
    const events = JSON.parse(localStorage.getItem("events")) || {};
    events[eventData.date] = eventData;
    localStorage.setItem("events", JSON.stringify(events));

    // Update local state
    const updated = [...clubEvents, eventData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setClubEvents(updated);

    // Reset form
    document.getElementById('eventForm').reset();
    alert('Event created successfully!');
  };

  const handleDeleteEvent = (eventDate) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const events = JSON.parse(localStorage.getItem("events")) || {};
      delete events[eventDate];
      localStorage.setItem("events", JSON.stringify(events));

      const updated = clubEvents.filter(event => event.date !== eventDate);
      setClubEvents(updated);
    }
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="header-top">
          <div className="header-left">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-dashboard" />
            <h2>Coordinator Dashboard</h2>
          </div>
          <div className="header-right">
            <Link to="/" className="nav-btn">Home</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="coordinator-grid">
          <div className="cpi-section">
            <h3>Club Performance Index (CPI)</h3>
            <h2 style={{ fontSize: '2em' }}>CPI Score: <span id="cpiScore">{cpiScore}</span></h2>
            <div className="memberCountBox" style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', padding: '15px', marginTop: '20px' }}>
              <p><strong>Club:</strong> {clubName}</p>
              <p><strong>Total Members:</strong> <span id="totalMembers">150</span></p>
            </div>
          </div>

          <div className="activity-graph-section">
            <h3>Activities in Last 6 Months</h3>
            <div className="activity-chart">
              <div className="chart-bar">
                <div className="month-label">September</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '45%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">8 events</div>
                </div>
              </div>
              <div className="chart-bar">
                <div className="month-label">October</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '65%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">12 events</div>
                </div>
              </div>
              <div className="chart-bar">
                <div className="month-label">November</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '75%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">14 events</div>
                </div>
              </div>
              <div className="chart-bar">
                <div className="month-label">December</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '55%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">10 events</div>
                </div>
              </div>
              <div className="chart-bar">
                <div className="month-label">January</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '70%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">13 events</div>
                </div>
              </div>
              <div className="chart-bar">
                <div className="month-label">February</div>
                <div className="bar-container">
                  <div className="bar" style={{height: '80%', background: 'linear-gradient(135deg, #533B4D 0%, #FAA4BD 100%)'}}></div>
                  <div className="bar-value">15 events</div>
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h3>Event Calendar</h3>
            <div className="calendar">
              <div className="calendar-header">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>&larr;</button>
                <h4>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>&rarr;</button>
              </div>
              <div className="calendar-days">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-empty"></div>
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = getEventsForDate(day).length > 0;
                  return (
                    <div key={day} className={`calendar-day ${hasEvent ? 'has-event' : ''}`}>
                      {day}
                      {hasEvent && <div className="event-indicator"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div id="createEventDiv" className="event-form-section">
          <h3>Create an Event</h3>
          
          <form id="eventForm" onSubmit={handleEventSubmit}>
            <div className="form-group">
              <label htmlFor="eventTitle">Event Title:</label>
              <input type="text" id="eventTitle" name="eventTitle" required />
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">Date:</label>
              <input type="date" id="eventDate" name="eventDate" required />
            </div>

            <div className="form-group">
              <label htmlFor="eventTime">Time:</label>
              <input type="time" id="eventTime" name="eventTime" required />
            </div>

            <div className="form-group">
              <label htmlFor="eventVenue">Venue:</label>
              <input type="text" id="eventVenue" name="eventVenue" required />
            </div>

            <div className="form-group">
              <label htmlFor="registrationCapacity">Registration Capacity:</label>
              <input type="number" id="registrationCapacity" name="registrationCapacity" required />
            </div>

            <div className="form-group">
              <label htmlFor="eventStatus">Status:</label>
              <select id="eventStatus" name="eventStatus">
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Create Event</button>
          </form>
        </div>

        <div className="events-section">
          <h3>Club Events</h3>
          <div className="events-list-coordinator">
            {clubEvents.length === 0 ? (
              <p>No events created yet.</p>
            ) : (
              clubEvents.map((event, idx) => (
                <div key={idx} className="event-card-coordinator">
                  <h4>{event.name}</h4>
                  <div className="event-details">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Capacity:</strong> {event.capacity}</p>
                    <p><strong>Status:</strong> <span className={`status ${event.status}`}>{event.status}</span></p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(event.date)}
                  >
                    Delete Event
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoordinatorDashboard;
