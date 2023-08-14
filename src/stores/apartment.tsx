import { observable, action, makeObservable } from "mobx";
import { api } from "../App";

export class Address {
  city: string;
  district: string;
  street: string;
  house_number: string;
  apart_number: string;

  constructor(
    city: string,
    district: string,
    street: string,
    house_number: string,
    apart_number: string
  ) {
    this.city = city;
    this.district = district;
    this.street = street;
    this.house_number = house_number;
    this.apart_number = apart_number;
  }
}

export class ApartmentPhoto {
  id: number;
  url: string;
  apartmentId: string;

  constructor(id: number, url: string, apartmentId: string) {
    this.id = id;
    this.url = url;
    this.apartmentId = apartmentId;
  }
}

export class Landlord {
  id: number;
  name: string;
  email: string;
  phone: string;

  constructor(id: number, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

export class ApartmentCreate {
  floor: string;
  addressId: Address;
  is_rented: boolean;
  room_count: string;
  area: string;
  cost: string;
  title: string;
  description: string;
  photos?: File[] | undefined;

  constructor(
    floor: string,
    addressId: Address,
    room_count: string,
    area: string,
    is_rented: boolean,
    cost: string,
    title: string,
    description: string,
    photos?: File[] | undefined
  ) {
    this.floor = floor;
    this.addressId = addressId;
    this.room_count = room_count;
    this.area = area;
    this.cost = cost;
    this.title = title;
    this.description = description;
    this.photos = photos;
    this.is_rented = is_rented;
  }
}

export class Apartment {
  id: number;
  floor: number;
  address: Address;
  room_count: number;
  area: number;
  cost: number;
  title: string;
  description: string;
  landlord: Landlord;
  tenantId?: number | undefined;
  photos: ApartmentPhoto[];

  constructor(
    id: number,
    floor: number,
    address: Address,
    room_count: number,
    area: number,
    cost: number,
    title: string,
    description: string,
    landlord: Landlord,
    tenantId: number | undefined,
    photos: ApartmentPhoto[]
  ) {
    this.id = id;
    this.floor = floor;
    this.address = address;
    this.room_count = room_count;
    this.area = area;
    this.cost = cost;
    this.title = title;
    this.description = description;
    this.landlord = landlord;
    this.tenantId = tenantId;
    this.photos = photos;
  }
}

export class ApartmentStore {
  apartment: Apartment | null = null;
  apartments: Apartment[] = [];
  landlordApartments: Apartment[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalCount = 0;
  error = null;
  apartmentPhotos: ApartmentPhoto[] = [];
  response: any;
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      apartments: observable,
      apartment: observable,
      totalCount: observable,
      currentPage: observable,
      itemsPerPage: observable,
      landlordApartments: observable,
      apartmentPhotos: observable,
      error: observable,
      isLoading: observable,
      fetchApartments: action,
      fetchApartmentPhotos: action,
      deleteApartmentPhoto: action,
      setCurrentPage: action,
      fetchApartment: action,
      addApartment: action,
      searchApartments: action,
      addApartmentPhoto: action,
    });
  }

  async fetchApartments(): Promise<void> {
    try {
      const response = await api.get("/apartment/rec");
      this.apartments = await response.data;
    } catch (error) {
      this.error = error
      console.error("Error fetching apartments:", error);
    }
  }

  async fetchAllApartments(page: number, limit: number): Promise<void> {
    try {
      const response = await api.get("/apartment", {
        params: {
          page,
          limit,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      this.apartments = response.data[0];
      this.totalCount = response.data[1].length;
    } catch (error) {
      this.error = error
      console.error("Error fetching apartments:", error);
    }
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  async searchApartments(
    location: string,
    rooms: string | undefined,
    floor: string | undefined,
    minPrice: string | undefined,
    maxPrice: string | undefined,
    page: number | undefined,
    limit: number | undefined
  ): Promise<void> {
    try {
      const response = await api.get("/apartment/search", {
        params: {
          location,
          rooms,
          floor,
          minPrice,
          maxPrice,
          page,
          limit,
        },
      });
      this.apartments = response.data[0];
      this.totalCount = response.data[1];
    } catch (error) {
      this.error = error
      console.error("Error fetching apartments:", error);
    }
  }

  async fetchApartment(id: string): Promise<void> {
    try {
      const response = await api.get(`/apartment/${id}`);
      this.apartment = await response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async fetchLandlordApartments(id: number): Promise<void> {
    try {
      const response = await api.get(`/apartment/${id}/landlord`);
      this.landlordApartments = await response.data;
    } catch (error) {
      this.error = error
      console.error("Error fetching tasks:", error);
    }
  }

  async addApartment(apartment: ApartmentCreate): Promise<void> {
    try {
      const { photos, ...rest } = apartment;
      const data = JSON.stringify(rest);
  
      const formData = new FormData();
      formData.append("data", data);
  
      const response = await api.post("/apartment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token") || "",
        },
      });
  
      if (photos) {
        const photoFormData = new FormData();
        photos.forEach((file) => photoFormData.append("photos", file));
  
        await this.addApartmentPhoto(response.data.id, photoFormData);
      }
    } catch (error) {
      this.error = error
      console.error("Error adding apartment:", error);
    }
  }

  async fetchApartmentPhotos(apartmentId: number): Promise<void> {
    const response: any = await api
      .get(`/apartment/${apartmentId}/photos`)
      .catch((error) => {
        this.error = error;
      });
    this.apartmentPhotos = response.data;
  }

  async deleteApartmentPhoto(photoId: number): Promise<void> {
    await api.delete(`/apartment/photo/${photoId}`).catch((error) => {
      this.error = error;
    });
  }

  async addApartmentPhoto(
    apartmentId: number,
    formData: FormData
  ): Promise<void> {
    try {
      this.isLoading = true;
      const response = await api.post(
        `/apartment/${apartmentId}/photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.isLoading = false;
      this.apartmentPhotos.push(response.data);
    } catch (error) {
      this.isLoading = false;
      this.error = error;
    }
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }
}
