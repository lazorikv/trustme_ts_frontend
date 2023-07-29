import React from 'react';
import { Manager } from './types';
import styles from '../../styles/managers.module.css'

type ManagerPhotoProps = {
  manager: Manager | null;
};

const ManagerPhoto: React.FC<ManagerPhotoProps> = ({ manager }) => {
  if (!manager) return null;

  return (
    <div>
      <img className={styles.big_photo} src={manager.largePhoto} alt={`${manager.firstName} ${manager.lastName}`} />
    </div>
  );
};

export default ManagerPhoto;