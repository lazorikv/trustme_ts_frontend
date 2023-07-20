import { useEffect } from "react";
import styles from "../styles/apartment.module.css";
import { useRootStore } from "../stores/RootStore";
import { observer } from "mobx-react";
import { Address } from "../stores/apartment";
import { apartmentDefaultPhoto, locationIcon } from "../constants";

interface ApartmentCardProps {
  floor: number;
  area: number;
  room_count: number;
  cost: number;
  address: Address;
  photos: string[];
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
    floor,
    area,
    room_count,
    cost,
    address,
    photos
  }) => {
    
    return (
      <div className={styles.apartment_card}>
        <img
          src={photos.length ? photos[0] : apartmentDefaultPhoto}
          alt="Apartment"
          className={styles.apartment_card__photo}
        />
        <div className={styles.apartment_card__content}>
          <p>
            <img className={styles.icon} src={locationIcon} alt="Icon" /> {address.district}, {address.city}, st. {address.street},{" "}
            {address.house_number}, {address.apart_number}{" "}
          </p>
          <p>Area: {area}</p>
          <p>Floor: {floor}</p>
          <p>Rooms: {room_count}</p>
          <p>Price: ${cost}</p>
        </div>
      </div>
    );
  };

export const ApartmentGrid: React.FC = observer(() => {
  const { apartmentStore } = useRootStore();

  useEffect(() => {
    apartmentStore.fetchApartments();
  }, [apartmentStore]);

  return (
    <div className={styles.apartment_grid}>
      {apartmentStore.apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          area={apartment.area}
          floor={apartment.floor}
          room_count={apartment.room_count}
          cost={apartment.cost}
          address={apartment.address}
          photos={apartment.photos}
        />
      ))}
    </div>
  );
});
