import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/headerStyles.module.css";
import { useRootStore } from "../stores/RootStore";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./accountDropDown";
import { accountDropDownPhoto } from "../constants";

export const Header: React.FC = () => {
  const { loginStore } = useRootStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();

  const dropdownItems = [
    {
      text: 'Account',
      action: () => {
        navigator('/account');
        setIsDropdownOpen(false);
      },
    },
    {
      text: 'My Apartment',
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
            <Link to="/apartments" className={styles.link}>
              Apartments
            </Link>
          </li>
          <li>
            <Link to="/news" className={styles.link}>
              News
            </Link>
          </li>
          <li>
          <div className={styles.dropDown} ref={dropdownRef}>
          {isDropdownOpen && <Dropdown items={dropdownItems} />}
        <div onClick={toggleDropdown}>
          <img className={styles.accountDropDown_photo} src={accountDropDownPhoto} alt="User" />
        </div>
        </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const SubHeader: React.FC = () => {
  return (
    <div className={styles.subheader}>
      <div className={styles.contact_info}>
        <span className={styles.phone}>+1-123-456-7890</span>
        <span className={styles.email}>Email: example@example.com</span>
      </div>
      <div className={styles.social_icons}>
        <a
          href="https://www.flaticon.com/free-icons/twitter-social-badge"
          title="twitter social badge icons"
        >
          Twitter
        </a>
        <a
          href="https://www.flaticon.com/free-icons/linkedin"
          title="linkedin icons"
        >
          Linkedin
        </a>
        <a
          href="https://www.flaticon.com/free-icons/instagram-logo"
          title="instagram logo icons"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};
