import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/headerStyles.module.css";
import { useRootStore } from "../../stores/RootStore";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./accountDropDown";
import { observer } from "mobx-react";

export const Header: React.FC = observer(() => {
  const { loginStore } = useRootStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();

  const dropdownItems = [
    {
      text: 'Profile',
      action: () => {
        navigator('/profile');
        setIsDropdownOpen(false);
      },
    },
    {
      text: 'My Apartments',
      action: () => {
        setIsDropdownOpen(false);
        navigator('/myapartments');
      },
    },
    {
      text: 'Logout',
      action: () => {
        loginStore.setToken("");
        setIsDropdownOpen(false);
        navigator('/login');
      },
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/" className={styles.logo}>
          TRUST ME
        </Link>
      </h1>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/aboutus" className={styles.link}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/news" className={styles.link}>
              News
            </Link>
          </li>
          <li>
            <div
              className={styles.dropDown}
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {user.name ? (
                <div className={styles.dropdownToggle}>
                  <span className={styles.link}>{user.name}</span>
                  <span className={styles.dropdownArrow}></span>
                  {isDropdownOpen && <Dropdown items={dropdownItems} />}
                </div>
              ) : (
                <>
                  <Link to="/signup" className={styles.link}>
                    Sign Up
                  </Link>
                  <Link to="/login" className={styles.link}>
                    Login
                  </Link>
                </>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;

export const SubHeader: React.FC = () => {
  return (
    <div className={styles.subheader}>
      <div className={styles.contact_info}>
        <span className={styles.phone}>+1-123-456-7890</span>
        <span className={styles.email}>Email: lazorkinv@gmail.com</span>
      </div>
      <div className={styles.social_icons}>
        <a
          href="https://github.com/lazorikv"
          title="My GitHub"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/vladyslav-lazoryk-705631217/"
          title="Linkedin"
        >
          Linkedin
        </a>
        <a
          href="https://www.instagram.com/pan_ado1f/"
          title="Instagram"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};
