import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/events-style.css';
import vitLogo from '../assets/images/vitlogo.jpg';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Load events from localStorage or use dummy data
    let savedEvents = JSON.parse(localStorage.getItem('events')) || {};
    //if there are no events, gives empty object
    
    // If no events, initialize with dummy data
    if (Object.keys(savedEvents).length === 0) {
      savedEvents = {
        '2025-03-15': {
          name: 'Tech Workshop: Web Development',
          club: 'Tech Club',
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
      localStorage.setItem('events', JSON.stringify(savedEvents));
    }
    
    //Object is a container for pieces of information. It has properties and values
    const eventsArray = Object.entries(savedEvents).map(([date, event]) => ({
      ...event,
      date: date
    }));
    //sorts the events by date in ascending order
    setEvents(eventsArray.sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.club.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, filterStatus]);

  return (
    <>
      <header className="page-header">
        <div className="header-top">
          <div className="header-left">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-page" />
            <h1>Events & Activities</h1>
          </div>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </header>

      <div className="filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Events
          </button>
          <button
            className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilterStatus('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${filterStatus === 'ongoing' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ongoing')}
          >
            Ongoing
          </button>
          <button
            className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
        </div>
        <input
          type="text"
          placeholder="Search events by name or club..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <section className="page-content">
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <p className="no-results">No events found. Check back soon!</p>
          ) : (
            filteredEvents.map((event, idx) => (
              <div key={idx} className="event-card-large">
                <div className="event-header">
                  <h3>{event.name}</h3>
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                </div>
                <div className="event-info">
                  <p><strong>📅 Date:</strong> {event.date}</p>
                  <p><strong>⏰ Time:</strong> {event.time || 'TBD'}</p>
                  <p><strong>📍 Venue:</strong> {event.venue || 'TBD'}</p>
                  <p><strong>🏢 Club:</strong> {event.club}</p>
                  <p><strong>👥 Capacity:</strong> {event.capacity} seats</p>
                </div>
                <button className="register-event-btn">Register Now</button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
