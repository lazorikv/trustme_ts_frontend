import { ApartmentGrid } from '../Apartments/ApartmentCard';
import { useRootStore } from "../../stores/RootStore";
import { useEffect, useState } from 'react';
import styles from '../../styles/RightSideComponent.module.css'
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from '../../popUps/Error';

const MyApartments: React.FC = observer(() => {
    const { loginStore, apartmentStore } = useRootStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigator = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const user = loginStore.user;
            if (user) {
                await apartmentStore.fetchLandlordApartments(user.id);
                if (apartmentStore.error) {
                  if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
                    setError('Internal server error. Please try again later.');
                  }
                }
              }
            setIsLoading(false);
        };

        fetchData();
      }, [apartmentStore, loginStore.user]);

      if (isLoading) {
        return <div>Loading...</div>;
      }

      return (
        <div className={styles.container}>
                <div className={styles.viewHeader}>
                <h2>My Apartments</h2>
                <button onClick={() => {navigator('/apartments')}}>
                  Add Apartment
                </button>
                </div>
            <div>
          {apartmentStore.landlordApartments && (
            <ApartmentGrid apartments={apartmentStore.landlordApartments} />
          )}
          </div>
          {error && <ErrorPopup message={error}/>}
          </div>
      );
    });

  export default MyApartments;