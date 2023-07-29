import React, { useEffect, useState } from 'react';
import { Manager } from './types';
import styles from '../../styles/managers.module.css'

type ManagerListProps = {
  managers: Manager[];
  onManagerSelect: (manager: Manager) => void;
};

const ManagerList: React.FC<ManagerListProps> = ({ managers, onManagerSelect }) => {

    const [activeManager, setActiveManager] = useState<Manager | null>(null);

    const handleManagerClick = (manager: Manager) => {
        setActiveManager(manager);
        onManagerSelect(manager);
      };

      useEffect(() => {
        if (managers.length > 0) {
          setActiveManager(managers[0]);
          onManagerSelect(managers[0]);
        }
      }, [managers]);

      return (
        <div>
          <ul>
            {managers.map((manager) => (
              <li
                key={manager.id}
                onClick={() => handleManagerClick(manager)}
                className={activeManager === manager ? styles.active : ''}
              >
                <img className={styles.small_photo} src={manager.photo} alt={`${manager.firstName} ${manager.lastName}`} />
                <div className={styles.info}>
                <p>{`${manager.firstName} ${manager.lastName}`}</p>
                <p className={styles.position}>{manager.position}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default ManagerList;