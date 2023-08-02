import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRootStore } from "../stores/RootStore";
import { Apartment } from "../stores/apartment";



const ApartmentDetails: React.FC = observer(() => {

    const { id } = useParams();
    const { apartmentStore } = useRootStore();

    const [isLoading, setIsLoading] = useState(true);
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (id) {
                await apartmentStore.fetchApartment(id)
            }
            const apartment = apartmentStore.apartment;
            setSelectedApartment(apartment);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching apartment:', error);
          }
        };

        fetchData();
      }, [apartmentStore, id]);

      if (isLoading) {
        return <div>Loading...</div>;
      }


  if (!selectedApartment) {
    return <div>Apartment not found.</div>;
  }

    return (
        <div>
      <h2>{selectedApartment.title}</h2>
      <p>{`Address: ${selectedApartment.address.city}, ${selectedApartment.address.street}, ${selectedApartment.address.house_number}`}</p>
      <p>{`Room count: ${selectedApartment.room_count}`}</p>
      <p>{`Area: ${selectedApartment.area} sq. m.`}</p>
      <p>{`Cost: ${selectedApartment.cost} USD`}</p>
      <p>{`Description: ${selectedApartment.description}`}</p>
      <div>
        <h3>Photos:</h3>
        <ul>
          {selectedApartment.photos.map((photo, index) => (
            <li key={index}>
              <img src={photo} alt={`Apartment ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
    )
});

export default ApartmentDetails;