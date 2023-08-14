import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Email } from "../../stores/email";
import { useRootStore } from "../../stores/RootStore";
import styles from "../../styles/contactUs.module.css";
import ErrorPopup from "../../popUps/Error";

const ContactForm: React.FC = observer(() => {
  const { emailStore } = useRootStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = new Email(emailValue, firstName, lastName, message);

      const response = await emailStore.sendEmail(email);
      if (emailStore.error) {
        if (emailStore.error['response'] && emailStore.error['response']['status'] === 500) {
          setError('Internal server error. Please try again later.');
        }
      }

      if (response.status === 200) {
        emailStore.setEmailSent(true);
        setStatusMessage("Email sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setStatusMessage("");
        }, 3000);
      } else {
        setStatusMessage("Failed to send email. Please try again later.");
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contactusform}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <div className="error-message">{statusMessage}</div>
      </form>
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});

export default ContactForm;
