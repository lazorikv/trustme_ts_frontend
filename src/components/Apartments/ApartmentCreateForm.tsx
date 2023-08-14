import React, { useState } from "react";
import { useRootStore } from "../../stores/RootStore";
import { Address, ApartmentCreate } from "../../stores/apartment";
import styles from "../../styles/apartment.module.css";
import UnauthorizedPopup from "../../popUps/unAuth";
import { handleLoginClick } from "../../utils";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../popUps/Error";

const ApartmentCreateForm: React.FC = () => {
  const { apartmentStore } = useRootStore();
  const [floor, setFloor] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [area, setArea] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [addressId, setAddress] = useState<Address>({
    city: "",
    district: "",
    street: "",
    house_number: "",
    apart_number: "",
  });
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    const apartment = new ApartmentCreate(
      floor,
      addressId,
      roomCount,
      area,
      isRented,
      cost,
      title,
      description,
      photos
    );
    e.preventDefault();

    await apartmentStore.addApartment(apartment);
    if (
      apartmentStore.error &&
      apartmentStore.error["response"]["status"] === 401
    ) {
      setShowUnauthorizedPopup(true);
    }
    if (apartmentStore.error) {
      if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
        setError('Internal server error. Please try again later.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className={styles.apartment_container}>
      <form onSubmit={handleSubmit}>
        <label>
          Floor:
          <input
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </label>

        <label>
          Room Count:
          <input
            type="text"
            value={roomCount}
            onChange={(e) => setRoomCount(e.target.value)}
          />
        </label>

        <label>
          Area:
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>

        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Address ID:
          <label>
            Город:
            <input
              type="text"
              name="city"
              value={addressId.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Район:
            <input
              type="text"
              name="district"
              value={addressId.district}
              onChange={handleChange}
            />
          </label>
          <label>
            Улица:
            <input
              type="text"
              name="street"
              value={addressId.street}
              onChange={handleChange}
            />
          </label>
          <label>
            Дом:
            <input
              type="text"
              name="house_number"
              value={addressId.house_number}
              onChange={handleChange}
            />
          </label>
          <label>
            Квартира:
            <input
              type="text"
              name="apart_number"
              value={addressId.apart_number}
              onChange={handleChange}
            />
          </label>
        </label>

        <label>
          Is Rented:
          <input
            type="checkbox"
            checked={isRented}
            onChange={(e) => setIsRented(e.target.checked)}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Photos:
          <input
            type="file"
            name="photos"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const fileList = Array.from(e.target.files);
                setPhotos(fileList);
              } else {
                setPhotos([]);
              }
            }}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {showUnauthorizedPopup && (
        <UnauthorizedPopup onLoginClick={() => handleLoginClick(navigator)} />
      )}
      {error && <ErrorPopup message={error}/>}
    </div>
  );
};
export default ApartmentCreateForm;
