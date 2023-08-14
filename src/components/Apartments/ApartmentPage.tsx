import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRootStore } from "../../stores/RootStore";
import { Apartment } from "../../stores/apartment";
import styles from "../../styles/apartment.module.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import '../../styles/PhotoEditor.css'
import ApartmentPhotos from "./ApartmentPhotos";
import ErrorPopup from "../../popUps/Error";


interface ModalProps {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={styles.modal_backdrop} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close_btn} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};


const ApartmentDetails: React.FC = observer(() => {
  const { id } = useParams();
  const { apartmentStore } = useRootStore();
  const [showPhotos, setShowPhotos] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  const handleTogglePhotos = () => {
    setShowPhotos(!showPhotos);
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      selectedApartment
        ? prevIndex === 0
          ? selectedApartment.photos.length - 1
          : prevIndex - 1
        : prevIndex
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      selectedApartment
        ? prevIndex === selectedApartment.photos.length - 1
          ? 0
          : prevIndex + 1
        : prevIndex
    );
  };

  useEffect(() => {
    const fetchData = async () => {
        if (id) {
          await apartmentStore.fetchApartment(id);
        }
        if (apartmentStore.error) {
          if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
            setError('Internal server error. Please try again later.');
          }
        }
        const apartment = apartmentStore.apartment;
        setSelectedApartment(apartment);
        setIsLoading(false);
        
    };

    fetchData();
  }, [apartmentStore, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedApartment) {
    return <div>Apartment not found.</div>;
  }

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="title">Apartment</div>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.image_container} onClick={handleImageClick}>
            <img
              src={selectedApartment.photos[currentIndex].url}
              alt={`Image ${currentIndex}`}
            />
          </div>
          <div className="carousel-navigation">
            <button onClick={handlePrevClick}>
              <RiArrowLeftSLine />
            </button>
            <button onClick={handleNextClick}>
              <RiArrowRightSLine />
            </button>
          </div>
          <Modal show={showModal} onClose={handleModalClose}>
            <img
              src={selectedApartment.photos[currentIndex].url}
              alt={`Image ${currentIndex}`}
              className={styles.modal_image}
            />
          </Modal>
        </div>
        <div className={styles.apartment_data}>
          <h2>{selectedApartment.title}</h2>
          <p>{`Address: ${selectedApartment.address.city}, ${selectedApartment.address.street}, ${selectedApartment.address.house_number}`}</p>
          <p>{`Floor: ${selectedApartment.floor}`}</p>
          <p>{`Room count: ${selectedApartment.room_count}`}</p>
          <p>{`Area: ${selectedApartment.area} sq. m.`}</p>
          <p>{`Cost: ${selectedApartment.cost} USD`}</p>
          <p>{`Description: ${selectedApartment.description}`}</p>
          <p>{`Landlord phone number: ${selectedApartment.landlord.phone}`}</p>
        </div>
        <p>
          <button type='submit' onClick={handleTogglePhotos}>Edit Photos</button>
        </p>
      </div>
      {showPhotos && (
        <div className="overlay">
          <div className="photos_container">
            <button className="modal-close-button" onClick={handleTogglePhotos}>
              X
            </button>
            {apartmentStore.isLoading ? (
              <div className='loading'>Loading...</div> 
            ) : (
              <ApartmentPhotos apartmentId={selectedApartment.id} />
            )}
          </div>
        </div>
      )}
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});

export default ApartmentDetails;