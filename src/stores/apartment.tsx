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

export class ApartmentCreate {
  floor: string;
  address: Address;
  is_rented: boolean;
  room_count: string;
  area: string;
  cost: string;
  title: string;
  description: string;
  photos?: File[] | undefined;

  constructor(
    floor: string,
    address: Address,
    room_count: string,
    area: string,
    is_rented: boolean,
    cost: string,
    title: string,
    description: string,
    photos?: File[] | undefined
  ) {
    this.floor = floor;
    this.address = address;
    this.room_count = room_count;
    this.area = area;
    this.cost = cost;
    this.title = title;
    this.description = description;
    this.photos = photos;
    this.is_rented = is_rented
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
  landlordId: number;
  tenantId?: number | undefined;
  photos: string[]

  constructor(
    id: number,
    floor: number,
    address: Address,
    room_count: number,
    area: number,
    cost: number,
    title: string,
    description: string,
    landlordId: number,
    tenantId: number | undefined,
    photos: string[]
  ) {
    this.id = id;
    this.floor = floor;
    this.address = address;
    this.room_count = room_count;
    this.area = area;
    this.cost = cost;
    this.title = title;
    this.description = description;
    this.landlordId = landlordId;
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

  constructor() {
    makeObservable(this, {
      apartments: observable,
      apartment: observable,
      totalCount: observable,
      currentPage:observable,
      itemsPerPage: observable,
      landlordApartments: observable,
      fetchApartments: action,
      setCurrentPage: action,
      fetchApartment: action,
      addApartment: action,
    });
  }


  async fetchApartments(): Promise<void> {
    try {
      const response = await api.get("/apartment/rec");
      this.apartments = await response.data;
    } catch (error) {
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
        
      });
      this.apartments = response.data[0];
      this.totalCount = response.data[1].length
      
    }
    catch(error) {
      console.error("Error fetching apartments:", error);
    }
   }

   setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

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
      console.error("Error fetching tasks:", error);
    }
  }

  async addApartment(apartment: ApartmentCreate): Promise<void> {
    const { photos, ...rest } = apartment;
    const data = JSON.stringify(rest);
  
    try {
      const formData = new FormData();
      formData.append("data", data);
      if (photos) {
        photos.forEach((photo) => {
          formData.append("photos", photo);
        });
      }
      const response = await api.post("/apartment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Token": localStorage.getItem('token')
        },
      });
  
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  get totalPages() {
    return Math.ceil(this.totalCount/ this.itemsPerPage);
  }
}
