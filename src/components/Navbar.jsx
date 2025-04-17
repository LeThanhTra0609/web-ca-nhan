import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.css';

function Navbar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          <div className="brand-container d-flex align-items-center">
            <img
              src="/assets/logo.png"
              alt="Blog Thanh Trà"
              className="brand-logo me-2"
            />
            <div className="brand-text d-flex flex-column">
              <span className="brand-main">Blog Thanh Trà</span>
              <span className="brand-sub">Website cá nhân</span>
            </div>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {[
              { path: '/', name: 'Trang chủ', icon: 'bi-house-door' },
              {
                path: '/posts',
                name: 'Bài viết',
                icon: 'bi-file-earmark-text',
              },
              { path: '/youtube', name: 'Youtube', icon: 'bi-youtube' },
              { path: '/games', name: 'My Game', icon: 'bi-joystick' },
              { path: '/plans', name: 'Kế Hoạch', icon: 'bi-calendar-check' },
              { path: '/admin', name: 'Quản Trị', icon: 'bi-shield-lock' },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  to={item.path}
                  onClick={closeNavbar}
                >
                  <i className={`bi ${item.icon} me-1`}></i> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
