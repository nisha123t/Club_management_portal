import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/club-detail-style.css';
import vitLogo from '../assets/images/vitlogo.jpg';

const ClubDetail = () => {
  const { id } = useParams();
  
  const clubs = {
    1: {
      id: 1,
      name: 'Technical Club',
      icon: '🔬',
      description: 'Explore technology, coding, and innovation',
      fullDescription: 'The Technical Club at VIT Chennai brings together students passionate about technology and innovation. It provides a platform to learn, build, and collaborate through workshops, hackathons, coding competitions, and technical projects in areas like AI, web development, data science, and cybersecurity. The club encourages practical learning, creativity, and teamwork while helping students stay updated with emerging technologies.',
      members: 150,
      events: 12,
      coordinator: 'Dr. Rajkumar S',
      email: 'techclub@vit.edu',
      focus: ['Web Development', 'AI/ML', 'App Development', 'Cybersecurity']
    },
    2: {
      id: 2,
      name: 'Sports Club',
      icon: '⚽',
      description: 'Excellence in athletics and team sports',
      fullDescription: 'The Sports Club at VIT Chennai promotes fitness, teamwork, and sportsmanship among students. It provides opportunities to participate in various indoor and outdoor sports, organize tournaments, and encourage an active and healthy lifestyle. The club aims to build discipline, leadership, and team spirit while creating a vibrant sporting culture on campus. 🏆⚽🏸',
      members: 200,
      events: 18,
      coordinator: 'Dr. Srinivaasan R',
      email: 'sportsclub@vit.edu',
      focus: ['Football', 'Basketball', 'Badminton', 'Tennis']
    },
    3: {
      id: 3,
      name: 'Art Club',
      icon: '🎨',
      description: 'Creative expression through visual arts',
      fullDescription: 'The Art Club at VIT Chennai is a creative space for students to explore and express their artistic talents. It encourages creativity through activities such as painting, sketching, digital art, and crafts. The club organizes workshops, exhibitions, and events that allow members to learn, collaborate, and showcase their artwork while fostering a vibrant artistic community on campus. 🎨',
      members: 120,
      events: 8,
      coordinator: 'Dr. Shanthi V',
      email: 'artclub@vit.edu',
      focus: ['Painting', 'Digital Art', 'Sculpture', 'Photography']
    },
    4: {
      id: 4,
      name: 'Music Club',
      icon: '🎵',
      description: 'Celebrating the power of music and sound',
      fullDescription: 'The Music Club at VIT Chennai brings together students who share a passion for music. It provides a platform to explore singing, instrumental music, and band performances. Through jam sessions, workshops, and cultural events, the club encourages creativity, collaboration, and musical expression while building a vibrant music community on campus. 🎵🎤',
      members: 180,
      events: 15,
      coordinator: 'Dr. Kamala',
      email: 'musicclub@vit.edu',
      focus: ['Classical', 'Contemporary', 'Jazz', 'Instrumental']
    },
    5: {
      id: 5,
      name: 'Literary Club',
      icon: '📚',
      description: 'Reading, writing, and storytelling passion',
      fullDescription: 'The Literary Club at VIT Chennai provides a platform for students who are passionate about reading, writing, and public speaking. It encourages creativity and critical thinking through activities such as debates, storytelling, poetry, and writing competitions, helping members develop their communication and literary skills. 📚✍️',
      members: 95,
      events: 6,
      coordinator: 'Dr. Jhahnavi',
      email: 'literaryclub@vit.edu',
      focus: ['Creative Writing', 'Poetry', 'Fiction', 'Book Reviews']
    },
    6: {
      id: 6,
      name: 'Environment Club',
      icon: '🌍',
      description: 'Sustainability and environmental awareness',
      fullDescription: 'The Environment Club at VIT Chennai promotes awareness and action toward environmental sustainability. It encourages students to participate in activities like tree planting, clean-up drives, and awareness campaigns to protect nature and promote eco-friendly practices on campus and beyond. 🌱🌍',
      members: 140,
      events: 10,
      coordinator: ' Dr. Tamilarasi',
      email: 'envclub@vit.edu',
      focus: ['Conservation', 'Sustainability', 'Green Initiatives', 'Awareness']
    }
  };

  const [interested, setInterested] = useState(false);
  const club = clubs[id];

  if (!club) {
    return <div className="error-page">Club not found</div>;
  }

 

  const handleInterest = () => {
    setInterested(!interested);
    if (!interested) {
      alert(`You've expressed interest in ${club.name}! Check your email for further details.`);
    }
  };

  return (
    <>
      <header className="page-header">
        <div className="header-top">
          <div className="header-left">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-page" />
            <h1>{club.name}</h1>
          </div>
          <Link to="/clubs" className="back-btn">← Back to Clubs</Link>
        </div>
      </header>

      <section className="club-detail-content">
        <div className="club-hero">
          <div className="club-icon-large">{club.icon}</div>
          <h2>{club.name}</h2>
          <p className="tagline">{club.description}</p>
        </div>

        <div className="detail-grid">
          <div className="main-content">
            <section className="about-section">
              <h3>About {club.name}</h3>
              <p>{club.fullDescription}</p>
            </section>

            <section className="focus-areas">
              <h3>Focus Areas & Interests</h3>
              <div className="focus-grid">
                {club.focus.map((area, idx) => (
                  <div key={idx} className="focus-item">
                    ✓ {area}
                  </div>
                ))}
              </div>
            </section>

            <section className="recent-events">
              <h3>Recent & Upcoming Events</h3>
              <div className="events-mini">
                <div className="event-mini">
                  <h4>Club Meeting</h4>
                  <p>📅 Next week • Every Tuesday at 5 PM</p>
                </div>
                <div className="event-mini">
                  <h4>Workshop Session</h4>
                  <p>📅 Coming this month</p>
                </div>
                <div className="event-mini">
                  <h4>Annual Showcase</h4>
                  <p>📅 End of semester</p>
                </div>
              </div>
            </section>
          </div>

          <div className="sidebar">
            <div className="info-box">
              <h3>Club Information</h3>
              <div className="info-item">
                <span className="label">Coordinator</span>
                <span className="value">{club.coordinator}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{club.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Members</span>
                <span className="value">{club.members}+</span>
              </div>
              <div className="info-item">
                <span className="label">Events This Year</span>
                <span className="value">{club.events}</span>
              </div>
            </div>

            <button
              className={`action-btn ${interested ? 'interested' : ''}`}
              onClick={handleInterest}
            >
              {interested ? '✓ Interested' : '+ Express Interest'}
            </button>

            <Link to="/events" className="events-link-btn">
              View All Events
            </Link>

            <div className="contact-box">
              <h4>Want to learn more?</h4>
              <p>Connect with the club coordinator for membership details and upcoming activities.</p>
              <a href={`mailto:${club.email}`} className="email-link">
                Send Email →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubDetail;
