import { useEffect, useState } from 'react';
import { ApartmentGrid } from '../Apartments/ApartmentCard';
import { useRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from '../../popUps/Error';

export const Recommendations: React.FC = observer(() => {
  const { apartmentStore } = useRootStore();
  const navigator = useNavigate();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apartmentStore.fetchApartments();
    if (apartmentStore.error) {
      if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
        setError('Internal server error. Please try again later.');
      }
    }
  }, [apartmentStore]);
  return (
    <div>
      <div className="title">Apartments</div>
      <div className='line'></div>
      <ApartmentGrid apartments={apartmentStore.apartments}/>
      <div>
        <button className='casual_button' onClick={() => {navigator('/allapartments')}}>
          All Apartments
        </button>
      </div>
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});
export default Recommendations;
