import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin_style.css';
import { checkLogin, logout } from '../utils/auth';
import vitLogo from '../assets/images/vitlogo.jpg';

const AdminDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    checkLogin('admin');

    let events = JSON.parse(localStorage.getItem("events")) || {};
    
    // If no events, initialize with dummy data
    if (Object.keys(events).length === 0) {
      events = {
        '2025-03-15': {
          name: 'Tech Workshop: Web Development',
          club: 'Technical Club',
          time: '02:00 PM',
          venue: 'Tech Lab 101',
          capacity: 50,
          status: 'upcoming'
        },
        '2025-03-18': {
          name: 'Music Fest 2025',
          club: 'Music Club',
          time: '05:00 PM',
          venue: 'Auditorium',
          capacity: 200,
          status: 'upcoming'
        },
        '2025-03-20': {
          name: 'Basketball Tournament',
          club: 'Sports Club',
          time: '03:30 PM',
          venue: 'Sports Complex',
          capacity: 100,
          status: 'upcoming'
        },
        '2025-03-10': {
          name: 'Digital Art Exhibition',
          club: 'Art Club',
          time: '10:00 AM',
          venue: 'Gallery Hall',
          capacity: 75,
          status: 'ongoing'
        },
        '2025-02-28': {
          name: 'Literary Night',
          club: 'Literary Club',
          time: '06:00 PM',
          venue: 'Main Hall',
          capacity: 150,
          status: 'completed'
        },
        '2025-03-22': {
          name: 'Environment Cleanup Drive',
          club: 'Environment Club',
          time: '08:00 AM',
          venue: 'Campus Grounds',
          capacity: 80,
          status: 'upcoming'
        },
        '2025-03-25': {
          name: 'Coding Challenge 2025',
          club: 'Tech Club',
          time: '04:00 PM',
          venue: 'Computer Lab',
          capacity: 60,
          status: 'upcoming'
        },
        '2025-03-28': {
          name: 'Annual Sports Meet',
          club: 'Sports Club',
          time: '07:00 AM',
          venue: 'Sports Complex',
          capacity: 300,
          status: 'upcoming'
        }
      };
      localStorage.setItem("events", JSON.stringify(events));
    }
    
    const clubsSet = new Set();

    Object.values(events).forEach(event => {
      clubsSet.add(event.club);
    });

    setClubs(Array.from(clubsSet));

    // Convert events object to array
    const eventsArray = Object.entries(events).map(([date, event]) => ({
      ...event,
      date: date
    }));
    setAllEvents(eventsArray);
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(event => event.date === dateStr);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="header-top">
          <div className="header-left">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-dashboard" />
            <h2>Administrator Dashboard</h2>
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
        <div className="admin-grid">
          <div className="clubs-section">
            <h3>All Clubs Performance Overview</h3>
            <div id="clubCPIContainer" className="club-container">
              {clubs.map((club) => (
                <div key={club} className="club-card">
                  <h4>{club}</h4>
                  <div className="cpi-score">
                    CPI: {calculateClubCPI(club)}
                  </div>
                </div>
              ))}
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

        <div className="all-events-section">
          <h3>All Upcoming Events</h3>
          <div className="events-list">
            {allEvents.length === 0 ? (
              <p>No events created yet.</p>
            ) : (
              allEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event, idx) => (
                  <div key={idx} className="event-card-admin">
                    <h4>{event.name}</h4>
                    <div className="event-details">
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Club:</strong> {event.club}</p>
                      {event.venue && <p><strong>Venue:</strong> {event.venue}</p>}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
