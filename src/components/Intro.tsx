import React, { useState } from "react";
import styles from "../styles/main.module.css";
import { useNavigate } from "react-router-dom";

const Intro: React.FC = () => {
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

  const generateNumberOptions = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
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
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            >
              <option value="">Select Rooms</option>
              {generateNumberOptions(1, 4)}
            </select>
          </div>
          <div className={styles.section}>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            >
              <option value="">Select Floor</option>
              {generateNumberOptions(1, 9)}
            </select>
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