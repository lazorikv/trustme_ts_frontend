import styles from '../styles/recomend.module.css';
import { ApartmentGrid } from './Apartment';

export const Recommendations: React.FC = () => {
  return (
    <div>
      <div className="title">Apartments</div>
      <div className={styles.line}></div>
      <ApartmentGrid />
    </div>
  );
};
export default Recommendations;
