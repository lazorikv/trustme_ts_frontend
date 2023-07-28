import { useEffect } from 'react';
import styles from '../styles/recomend.module.css';
import { ApartmentGrid } from './ApartmentCard';
import { useRootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

export const Recommendations: React.FC = observer(() => {
  const { apartmentStore } = useRootStore();
  const navigator = useNavigate();

  useEffect(() => {
    apartmentStore.fetchApartments();
  }, [apartmentStore]);
  return (
    <div>
      <div className="title">Apartments</div>
      <div className={styles.line}></div>
      <ApartmentGrid apartments={apartmentStore.apartments}/>
      <div>
        <button className='casual_button' onClick={() => {navigator('/allapartments')}}>
          All Apartments
        </button>
      </div>
    </div>
  );
});
export default Recommendations;
