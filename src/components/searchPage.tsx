import React from "react";
import { useLocation } from "react-router-dom";
import SearchApartments from "./searchApartments";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const locationValue = searchParams.get("locationValue") || "";
  const rooms = searchParams.get("rooms") || "";
  const floor = searchParams.get("floor") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  return (
    <div>
      <SearchApartments
        locationValue={locationValue}
        floor={floor}
        rooms={rooms}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default SearchPage