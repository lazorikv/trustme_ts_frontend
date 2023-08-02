import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApartmentGrid } from "./ApartmentCard";
import { useRootStore } from "../stores/RootStore";
import { observer } from "mobx-react";
import styles from "../styles/apartment.module.css";

export interface SearchApartmentProps {
    locationValue: string,
    floor: string,
    rooms: string,
    minPrice: string,
    maxPrice: string
  }

const SearchApartments: React.FC<SearchApartmentProps> = observer((
    {
        locationValue,
        floor,
        rooms,
        minPrice,
        maxPrice
      }
) => {
    const { apartmentStore } = useRootStore();
  
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await apartmentStore.searchApartments(
            locationValue,
            rooms,
            floor,
            minPrice,
            maxPrice,
            apartmentStore.currentPage,
            apartmentStore.itemsPerPage
          );
        } catch (error) {
          console.error("Error fetching apartment:", error);
        }
      };
  
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", apartmentStore.currentPage.toString());
      searchParams.set("limit", apartmentStore.itemsPerPage.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
  
      fetchData();
    }, [apartmentStore.currentPage]);
  
    const handlePageClick = (page: number) => {
      window.scrollTo(0, 0);
      apartmentStore.setCurrentPage(page);
    };
  
    return (
      <div>
        <div className="title">Apartments</div>
        {apartmentStore.apartments.length ? <ApartmentGrid apartments={apartmentStore.apartments} /> : "No Apartments"}
        <div className={styles.pagination}>
          {Array.from({ length: apartmentStore.totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={
                apartmentStore.currentPage === index + 1 ? styles.active : ""
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  });

export default SearchApartments;