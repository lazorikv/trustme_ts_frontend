import React from "react";
import { Manager } from "./types";
import styles from "../../styles/managers.module.css";

type ManagerDetailsProps = {
  manager: Manager | null;
};

const ManagerDetails: React.FC<ManagerDetailsProps> = ({ manager }) => {
  if (!manager) return null;

  return (
    <div className={styles.details}>
      <div>
        <p
          className={styles.name}
        >{`${manager.firstName} ${manager.lastName}`}</p>
      </div>
      <div className={styles.position}>
        <p>{manager.position}</p>
        <div className={styles.social_media_icons}>
          <img
            src="https://img.freepik.com/free-icon/twitter_318-177987.jpg"
            alt="twitter"
          />
          <img
            src="https://w7.pngwing.com/pngs/722/1011/png-transparent-logo-icon-instagram-logo-instagram-logo-purple-violet-text-thumbnail.png"
            alt="instagram"
          />
          <img
            src="https://img.freepik.com/premium-vector/telegram-icon-social-media-popular-messenger-app_277909-203.jpg?w=2000"
            alt="telegram"
          />
        </div>
      </div>
      <div className="line"></div>
      <div className={styles.details_info}>
        <p>
        District: {manager.district}
        </p>
        <p>
            {manager.discription}
        </p>
      </div>
      <div className="line"></div>
      <div className={styles.deals}>
        Successful deals: {manager.deals}
      </div>
    </div>
  );
};

export default ManagerDetails;
