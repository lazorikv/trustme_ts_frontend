import React, { useState } from "react";
import styles from "../styles/main.module.css";
import { useNavigate } from "react-router-dom";

export const Intro: React.FC = () => {
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [floor, setFloor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    
    const queryParams = new URLSearchParams({
      locationValue: location,
      floor,
      rooms,
      minPrice,
      maxPrice
    });
    navigate(`/search?${queryParams.toString()}`);
    
    setLocation("");
    setRooms("");
    setFloor("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div>
      <div className={styles.background_image} />
      <div className={styles.content_wrapper}>
        <div className={styles.rectangle}>
          <div className={styles.section}>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <input
              type="text"
              placeholder="Rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <input
              type="text"
              placeholder="Floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <input
              type="text"
              placeholder="Min. price$"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <input
              type="text"
              placeholder="Max. price$"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className={styles.search_button} onClick={handleSearch}>
            Search
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;