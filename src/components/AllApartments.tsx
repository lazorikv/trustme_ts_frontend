import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRootStore } from "../stores/RootStore";
import { Address } from "../stores/apartment";
import { ApartmentGrid } from "./ApartmentCard";
import styles from "../styles/apartment.module.css";

export interface ApartmentCardProps {
  id: number;
  floor: number;
  area: number;
  room_count: number;
  cost: number;
  address: Address;
  photos: string[];
}

const AllApartments: React.FC = observer(() => {
  const { apartmentStore } = useRootStore();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log(apartmentStore.currentPage, apartmentStore.itemsPerPage);
      try {
        await apartmentStore.fetchAllApartments(
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
      <ApartmentGrid apartments={apartmentStore.apartments} />
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

export default AllApartments;
