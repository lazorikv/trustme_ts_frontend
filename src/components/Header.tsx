import { Link } from 'react-router-dom';
import styles from '../headerStyles.module.css';
import { useRootStore } from '../stores/RootStore';
import React from 'react';

export const Header: React.FC = () => {
  const { loginStore } = useRootStore();

  const LogOut = () => {
    loginStore.setToken('');
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
            <Link to="/aboutus" className={styles.link}>About Us</Link>
          </li>
          <li>
            <Link to="/apartments" className={styles.link}>Apartments</Link>
          </li>
          <li>
            <Link to="/news" className={styles.link}>News</Link>
          </li>
          <li>
            <Link to="/login" className={styles.link} onClick={LogOut}>Logout</Link>
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
    <a href="https://www.flaticon.com/free-icons/twitter-social-badge" title="twitter social badge icons">Twitter</a>
      <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin</a>
      <a href="https://www.flaticon.com/free-icons/instagram-logo" title="instagram logo icons">Instagram</a>
    </div>
  </div>
  )
}
