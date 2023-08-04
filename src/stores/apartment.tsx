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

export class Landlord {
  id: number;
  name: string;
  email: string;
  phone: string;

  constructor(
    id: number,
  name: string,
  email: string,
  phone: string
  ) {
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
  photos: string[];

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
  response: any;

  constructor() {
    makeObservable(this, {
      apartments: observable,
      apartment: observable,
      totalCount: observable,
      currentPage: observable,
      itemsPerPage: observable,
      landlordApartments: observable,
      error: observable,
      fetchApartments: action,
      setCurrentPage: action,
      fetchApartment: action,
      addApartment: action,
      searchApartments: action,
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
        headers : {
          Authorization: localStorage.getItem("token")
        }
      });
      this.apartments = response.data[0];
      this.totalCount = response.data[1].length;
    } catch (error) {
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
      console.error("Error fetching tasks:", error);
    }
  }

  async addApartment(apartment: ApartmentCreate): Promise<void> {
    const { photos, ...rest } = apartment;
    const data = JSON.stringify(rest);


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
          Authorization: localStorage.getItem("token"),
        },
      }).catch(err => {
          this.error = err
      });

  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }
}
