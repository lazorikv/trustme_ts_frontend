import { observable, action, makeObservable } from 'mobx';
import { Apartment } from './apartment';
import { api, host } from '../App';
import { AxiosResponse } from 'axios';


export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    apartmentLandlord?: Apartment[]

    constructor(id: number, title: string, email: string, role: string, phone: string, apartmentLandlord: Apartment[]) {
      this.id = id;
      this.name = title;
      this.email = email;
      this.role = role;
      this.phone = phone;
      this.apartmentLandlord = apartmentLandlord;
    }
  }

  export class UserStore {
    users: User[] = [];
    user: User | null = null;
    error: any;

    

    constructor() {
      makeObservable(this, {
          users: observable,
          user: observable,
          error: observable,
          fetchUsers: action,
          addUser: action
      })
    }

    async fetchUsers(): Promise<void> {
      try {
        const response = await fetch(`http://${host}:8000/api/v1/user`);
        const users = await response.json();
        this.users = users;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    async fetchUser(id:number): Promise<void> {
      try {
        const response = await fetch(`http://${host}:8000/api/v1/user/landlords/${id}`);
        const user = await response.json();
        this.user = user;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    async addUser(title: string): Promise<void> {
      try {
        const response = await fetch(`http://${host}:8000/api/v1/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: Date.now(), title }),
        });
        const user = await response.json();
        this.users.push(user);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }

    async editUser(userData:any): Promise<void> {

      const {userId, ...rest} = userData;

      const data = JSON.stringify(rest);

      try {
        const response: AxiosResponse = await api.put(`/user/${userId}`, data, {
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          }
        });
        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    }
  }