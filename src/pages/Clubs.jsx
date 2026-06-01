import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/clubs-style.css';
import vitLogo from '../assets/images/vitlogo.jpg';

const Clubs = () => {
  const [clubs] = useState([ 
    {
      id: 1,
      name: 'Technical Club',
      icon: '🔬',
      description: 'Explore technology, coding, and innovation',
      members: 150,
      events: 12,
      coordinator: 'Dr. Rajkumar S'
    },
    {
      id: 2,
      name: 'Sports Club',
      icon: '⚽',
      description: 'Excellence in athletics and team sports',
      members: 200,
      events: 18,
      coordinator: 'Dr. Srinivaasan R'
    },
    {
      id: 3,
      name: 'Art Club',
      icon: '🎨',
      description: 'Creative expression through visual arts',
      members: 120,
      events: 8,
      coordinator: 'Dr. Shanthi V'
    },
    {
      id: 4,
      name: 'Music Club',
      icon: '🎵',
      description: 'Celebrating the power of music and sound',
      members: 180,
      events: 15,
      coordinator: 'Dr. Kamala'
    },
    {
      id: 5,
      name: 'Literary Club',
      icon: '📚',
      description: 'Reading, writing, and storytelling passion',
      members: 95,
      events: 6,
      coordinator: 'Dr. Jhahnavi'
    },
    {
      id: 6,
      name: 'Environment Club',
      icon: '🌍',
      description: 'Sustainability and environmental awareness',
      members: 140,
      events: 10,
      coordinator: 'Dr. Tamilarasi'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState(clubs);
  /*This stores the clubs that match the search*/

  const handleSearch = (query) => {   //runs whenever user types in search box
    setSearchQuery(query);
    const filtered = clubs.filter(club =>
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClubs(filtered);
  };

  return (
    <>
      <header className="page-header">
        <div className="header-top">
          <div className="header-left">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-page" />
            <h1>Clubs & Communities</h1>
          </div>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search clubs by name or description"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <section className="page-content">
        <div className="clubs-grid">
          {filteredClubs.length === 0 ? (
            <p className="no-results">No clubs found matching your search.</p>
          ) : (
            filteredClubs.map(club => (
              <div key={club.id} className="club-card-detailed">
                <div className="club-icon">{club.icon}</div>
                <h3>{club.name}</h3>      {/*search for object named club*/}
                <p className="description">{club.description}</p>
                <div className="club-stats">
                  <div className="stat">
                    <span className="stat-label">Members</span>
                    <span className="stat-value">{club.members}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Events</span>
                    <span className="stat-value">{club.events}</span>
                  </div>
                </div>
                <p className="coordinator"><strong>Coordinator:</strong> {club.coordinator}</p>
                <Link to={`/club/${club.id}`} className="view-btn">
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Clubs;
