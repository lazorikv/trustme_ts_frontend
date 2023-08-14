import React, { useEffect, useState } from "react";
import { useRootStore } from "../../stores/RootStore";
import { observer } from "mobx-react";
import ErrorPopup from "../../popUps/Error";

interface ApartmentPhoto {
  id: number;
  url: string;
}

interface ApartmentProps {
  apartmentId: number;
}

const ApartmentPhotos: React.FC<ApartmentProps> = observer(
  ({ apartmentId }) => {
    const { apartmentStore } = useRootStore();

    const [error, setError] = useState<string | null>(null);
    const [photos, setPhotos] = useState<ApartmentPhoto[]>([]);

    useEffect(() => {
      const loadPhotos = async () => {
        await apartmentStore.fetchApartmentPhotos(apartmentId);
        if (apartmentStore.error) {
          if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
            setError('Internal server error. Please try again later.');
          }
        }
        setPhotos(apartmentStore.apartmentPhotos);
      };
      loadPhotos();
    }, [apartmentId]);

    const handleAddPhoto = async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("photos", file));
      apartmentStore.isLoading = true;
      await apartmentStore.addApartmentPhoto(apartmentId, formData);
      if (apartmentStore.error) {
        if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
          setError('Internal server error. Please try again later.');
        }
      }
      if (!apartmentStore.isLoading) {
        await apartmentStore.fetchApartmentPhotos(apartmentId);
        if (apartmentStore.error) {
          if (apartmentStore.error['response'] && apartmentStore.error['response']['status'] === 500) {
            setError('Internal server error. Please try again later.');
          }
        }
        setPhotos(apartmentStore.apartmentPhotos);
      }
    };

    const handleDeletePhoto = async (photoId: number) => {
      await apartmentStore.deleteApartmentPhoto(photoId);
      await apartmentStore.fetchApartmentPhotos(apartmentId);
      setPhotos(apartmentStore.apartmentPhotos);
    };

    return (
      <div>
        <h2>Apartment Photos</h2>
        <div className="photoCard">
          {photos.map((photo) => (
            <div className="photoCardElement" key={photo.id}>
              <img src={photo.url} alt="Apartment" />
              <div>
                <button
                  type="submit"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const fileList = Array.from(e.target.files);
                handleAddPhoto(fileList);
              }
            }}
            className="input-file"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="custom-file-input">
            Choose Files
          </label>
        </div>
        {error && <ErrorPopup message={error}/>}
      </div>
    );
  }
);

export default ApartmentPhotos;
