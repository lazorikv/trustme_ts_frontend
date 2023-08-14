import React from "react";
import styles from "../../styles/contactUs.module.css";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
  const navigator = useNavigate();
  return (
    <div className={styles.contact_us}>
      <div className={styles.contact_us_text}>
        Do you want to rent or lease an apartment? Contact us right now!
      </div>
      <button
        className={styles.contact_us_button}
        onClick={() => {
          navigator("/contactus");
        }}
      >
        Contact Us
      </button>
    </div>
  );
};

export default ContactUs;
