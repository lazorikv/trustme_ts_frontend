import styles from "../../styles/apartment.module.css";
import { observer } from "mobx-react";
import { Address, Apartment } from "../../stores/apartment";
import { apartmentDefaultPhoto, locationIcon } from "../../constants";
import { useNavigate } from "react-router-dom";

export interface ApartmentCardProps {
  id: number,
  floor: number;
  area: number;
  room_count: number;
  cost: number;
  address: Address;
  photos: string[];
}

interface ApartmentGridProps {
  apartments: Apartment[] | null;
}

export const ApartmentCard: React.FC<ApartmentCardProps> = ({
    id,
    floor,
    area,
    room_count,
    cost,
    address,
    photos
  }) => {
    const navigator = useNavigate()

    const handleClick = () => {
      navigator(`/myapartments/${id}`)
    }

    return (
      <div className={styles.apartment_card} onClick={handleClick}>
        <img
          src={photos.length ? photos[0] : apartmentDefaultPhoto}
          alt="Apartment"
          className={styles.apartment_card__photo}
        />
        <div className={styles.apartment_card__content}>
          <p>
            <img className={styles.icon} src={locationIcon} alt="Icon" /> {address.city}, {address.district}, st. {address.street},{" "}
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

export const ApartmentGrid: React.FC<ApartmentGridProps> = observer(({ apartments }) => {
  return (
    <div className={styles.apartment_grid}>
      {apartments ? apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          id={apartment.id}
          area={apartment.area}
          floor={apartment.floor}
          room_count={apartment.room_count}
          cost={apartment.cost}
          address={apartment.address}
          photos={apartment.photos.map((photo) => (photo.url))}
        />
      )) : 'No apartments'}
    </div>
  );
});
