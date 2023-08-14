import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styles from "../../styles/sideComponent.module.css";
import UserComponent from "./UserComponent";
import MyApartments from "./myApartments";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const SideComponent: React.FC = observer(() => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  const handleComponentClick = (componentName: any) => {
    setActiveComponent(componentName);
  };
  const navigator = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    navigator("/login");
  };

  return (
    <Router>
    <div className={styles.container}>
      <div className={styles.slideContainer}>
        <div
          className={`${styles.slideItem} ${
            activeComponent === "Profile" ? styles.active : ""
          }`}
          onClick={() => handleComponentClick("Profile")}
        >
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1961584-1659814.png?f=avif&w=256"
            alt="Profile"
          />
          <span>Profile</span>
        </div>
        <div
          className={`${styles.slideItem} ${
            activeComponent === "MyApartments" ? styles.active : ""
          }`}
          onClick={() => handleComponentClick("MyApartments")}
        >
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/success-statics-tactics-business-marketing-solution-3-5350.png?f=avif&w=256"
            alt="My Apartments"
          />
          <span>My Apartments</span>
        </div>
        <div
          className={`${styles.slideItem} ${
            activeComponent === "Support" ? styles.active : ""
          }`}
          onClick={() => handleComponentClick("Support")}
        >
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/support-1772863-1508717.png?f=avif&w=256"
            alt="Support"
          />
          <span>Support</span>
        </div>
        <div
          className={`${styles.slideItem} ${
            activeComponent === "Log out" ? styles.active : ""
          }`}
          onClick={() => logOut()}
        >
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/log-out-5053044-4204102.png?f=avif&w=256"
            alt="Log out"
          />
          <span>Log out</span>
        </div>
      </div>
      <div className={styles.contentPanel}>
      <Routes>
          <div className={styles.contentPanel}>
            <Route path="/Profile" element={<UserComponent />} />
            <Route path="/MyApartments" element={<MyApartments />} />
          </div>
        </Routes>
      </div>
    </div>
    </Router>
  );
});

export default SideComponent;
