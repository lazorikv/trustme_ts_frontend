import { observer } from "mobx-react-lite";
import styles from "../../styles/RightSideComponent.module.css";
import { useEffect, useState } from "react";
import { useRootStore } from "../../stores/RootStore";
import UnauthorizedPopup from "../../popUps/unAuth";
import { handleLoginClick } from "../../utils";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../popUps/Error";

const UserComponent: React.FC = observer(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { userStore } = useRootStore();
  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setIsEditing(true);
  };

  useEffect(() => {
    handleEdit();
    setIsEditing(false);
  }, [userStore.user]);

  const handleSave = () => {
    const fetchData = async () => {
      const userId = user.id;

      const updatedUser = {
        userId,
        name,
        email,
        phone,
      };

      await userStore.editUser(updatedUser);
      if (userStore.error) {
        if (userStore.error && userStore.error["response"]["status"] === 401) {
          setShowUnauthorizedPopup(true);
        }
        if (
          userStore.error["response"] &&
          userStore.error["response"]["status"] === 500
        ) {
          setError("Internal server error. Please try again later.");
        }
      }
    };

    fetchData();

    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <h2>Personal Details</h2>
      <div className={styles.dataContainer}>
        <span className={styles.header}>FIRST NAME AND LAST NAME</span>
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </>
        ) : (
          <span className={styles.spanInput}>{user.name}</span>
        )}
      </div>
      <div className={styles.dataContainer}>
        <span className={styles.header}>EMAIL</span>
        {isEditing ? (
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        ) : (
          <span className={styles.spanInput}>{user.email}</span>
        )}
      </div>
      <div className={styles.dataContainer}>
        <span className={styles.header}>PHONE</span>
        {isEditing ? (
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
        ) : (
          <span className={styles.spanInput}>{user.phone}</span>
        )}
      </div>
      {isEditing ? (
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      ) : (
        <button onClick={handleEdit} className={styles.saveButton}>
          Edit
        </button>
      )}
      {showUnauthorizedPopup && (
        <UnauthorizedPopup onLoginClick={() => handleLoginClick(navigator)} />
      )}
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});

export default UserComponent;
