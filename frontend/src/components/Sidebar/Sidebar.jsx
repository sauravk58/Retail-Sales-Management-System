import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState(['services', 'invoices']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="account-selector">
          <div className="account-info">
            <div className="account-logo">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#1e1b4b"/>
                <path d="M10 14L18 9L26 14V22L18 27L10 22V14Z" fill="#3b82f6"/>
                <path d="M18 9V27" stroke="#1e1b4b" strokeWidth="1"/>
                <path d="M10 14L26 22" stroke="#1e1b4b" strokeWidth="1"/>
                <path d="M26 14L10 22" stroke="#1e1b4b" strokeWidth="1"/>
              </svg>
            </div>
            <div className="account-details">
              <span className="account-name">Vault</span>
              <span className="account-user">Anurag Yadav</span>
            </div>
          </div>
          <svg 
            className="dropdown-arrow" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="nav-link">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span>Dashboard</span>
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              <span>Nexus</span>
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Intake</span>
            </button>
          </li>

          <li className={`nav-item nav-item-expandable ${expandedMenus.includes('services') ? 'expanded' : ''}`}>
            <button 
              className="nav-link nav-link-parent"
              onClick={() => toggleMenu('services')}
            >
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
                <path d="M9 21V9"/>
              </svg>
              <span>Services</span>
              <svg 
                className={`nav-arrow ${expandedMenus.includes('services') ? 'open' : ''}`} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {expandedMenus.includes('services') && (
              <div className="submenu-wrapper">
                <ul className="submenu">
                  <li>
                    <button className="submenu-link">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="8"/>
                      </svg>
                      <span>Pre-active</span>
                    </button>
                  </li>
                  <li>
                    <button className="submenu-link">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                      </svg>
                      <span>Active</span>
                    </button>
                  </li>
                  <li>
                    <button className="submenu-link">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="8"/>
                        <path d="M6 6l12 12"/>
                      </svg>
                      <span>Blocked</span>
                    </button>
                  </li>
                  <li>
                    <button className="submenu-link">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="8"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                      <span>Closed</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className={`nav-item nav-item-expandable ${expandedMenus.includes('invoices') ? 'expanded' : ''}`}>
            <button 
              className="nav-link nav-link-parent"
              onClick={() => toggleMenu('invoices')}
            >
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M10 9H8"/>
              </svg>
              <span>Invoices</span>
              <svg 
                className={`nav-arrow ${expandedMenus.includes('invoices') ? 'open' : ''}`} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {expandedMenus.includes('invoices') && (
              <div className="submenu-wrapper">
                <ul className="submenu">
                  <li>
                    <button className="submenu-link active">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <path d="M14 2v6h6"/>
                        <circle cx="12" cy="15" r="2"/>
                      </svg>
                      <span>Proforma Invoices</span>
                    </button>
                  </li>
                  <li>
                    <button className="submenu-link">
                      <svg className="submenu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <path d="M14 2v6h6"/>
                        <path d="M9 15l2 2 4-4"/>
                      </svg>
                      <span>Final Invoices</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;