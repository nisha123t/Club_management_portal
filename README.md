# 🎓 Club Management Portal

A comprehensive web-based frontend platform for managing college clubs, events, and student activities at VIT Chennai using ReactJS, Js, HTML and CSS. This application streamlines club management by connecting students, coordinators, and administrators on a single, easy-to-use platform.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Available Pages](#available-pages)
- [Contributing](#contributing)
- [License](#license)

##  Features:
### Core Functionality
- **User Authentication**: Secure login and registration system
- **Role-Based Access**: Different dashboards for Admin, Coordinator, and Student users
- **Club Management**: Browse, discover, and join clubs with detailed information
- **Event Management**: View, create, and manage club events
- **Meeting Coordination**: Schedule and track club meetings
- **Announcements**: Stay updated with club announcements and news
- **Student Network**: Connect with other club members and coordinators

### User-Friendly Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Navigation**: Easy-to-navigate interface for all user types
- **Rich Content**: Visual club cards with icons and member counts
- **Contact System**: Direct communication with club coordinators

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive components
- **React Router** - Client-side routing for multi-page navigation
- **CSS3** - Custom styling with responsive design

### Development Tools
- **Create React App** - Project setup and build tooling
- **Node.js & npm** - Package management and development server

## 📁 Project Structure

```
CLUB MANAGEMENT PORTAL/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── auth.js                 # Authentication logic
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── AdminDashboard.jsx      # Admin dashboard
│   │   ├── CoordinatorDashboard.jsx # Coordinator dashboard
│   │   ├── StudentDashboard.jsx    # Student dashboard
│   │   ├── Clubs.jsx               # Clubs listing
│   │   ├── ClubDetail.jsx          # Club details page
│   │   ├── Events.jsx              # Events listing
│   │   ├── Meetings.jsx            # Meetings listing
│   │   ├── Announcements.jsx       # Announcements page
│   │   ├── Contact.jsx             # Contact page
│   │   ├── Login.jsx               # Login page
│   │   └── Register.jsx            # Registration page
│   ├── styles/
│   │   ├── style.css               # Global styles
│   │   ├── admin_style.css
│   │   ├── coordinator_style.css
│   │   ├── student-dashboard-style.css
│   │   ├── clubs-style.css
│   │   ├── club-detail-style.css
│   │   ├── events-style.css
│   │   ├── meetings-style.css
│   │   ├── announcements-style.css
│   │   ├── contact-style.css
│   │   ├── login_style.css
│   │   └── register_style.css
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── utils/
│   │   └── auth.js                # Authentication utilities
│   ├── App.js                     # Main App component
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## 💻 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/club-management-portal.git
cd club-management-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000` in your default browser.

## 🚀 Getting Started

### Development Mode
```bash
npm start
```
Runs the app in development mode with hot-reload enabled.

### Build for Production
```bash
npm run build
```
Creates a production-ready build in the `build/` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 👥 User Roles

### Student
- View available clubs and their details
- Browse events and meetings
- Join clubs of interest
- Read announcements
- Contact club coordinators
- Access personal student dashboard

### Coordinator
- Manage club information and members
- Create and manage events
- Schedule and track meetings
- Post announcements
- Access coordinator dashboard
- View member information

### Administrator
- Full system access
- Manage all clubs and categories
- Oversee all events and meetings
- Monitor user accounts
- System-wide announcements
- Access admin dashboard with analytics

## 📄 Available Pages

| Page | Route | Access Level |
|------|-------|--------------|
| Home | `/` | Public |
| Clubs | `/clubs` | Public |
| Club Details | `/club/:id` | Public |
| Events | `/events` | Public |
| Meetings | `/meetings` | Public |
| Announcements | `/announcements` | Public |
| Contact | `/contact` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Student Dashboard | `/student-dashboard` | Student |
| Coordinator Dashboard | `/coordinator-dashboard` | Coordinator |
| Admin Dashboard | `/admin-dashboard` | Admin |

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow React best practices
- Use meaningful variable and component names
- Write responsive CSS
- Test changes before submitting PR

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Nisha**
- VIT Chennai, SEM 4
- WEBP Project

## 📞 Support

For support open an issue in the repository.

---

**Made with ❤️ for VIT Chennai Community**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
