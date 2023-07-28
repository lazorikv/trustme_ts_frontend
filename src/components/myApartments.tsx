import { ApartmentGrid } from './ApartmentCard';
import { useRootStore } from "../stores/RootStore";
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

const MyApartments: React.FC = observer(() => {
    const { loginStore, apartmentStore } = useRootStore();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = loginStore.user;
            if (user) {
                await apartmentStore.fetchLandlordApartments(user.id);
              }
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchData();
      }, [apartmentStore, loginStore.user]);
  
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      return (
        <div>
            <div className='title'>
                <h2>My Apartments</h2>
            </div>
            <div>
          {apartmentStore.landlordApartments && (
            <ApartmentGrid apartments={apartmentStore.landlordApartments} />
          )}
        </div>
        </div>
      );
    });

  export default MyApartments;