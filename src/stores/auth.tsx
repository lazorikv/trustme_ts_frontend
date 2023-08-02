import { makeObservable, observable, action } from 'mobx';
import { api } from '../App';
import { Apartment } from './apartment';


export class User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  apartmentLandlord: Apartment[]

  constructor(id: number, title: string, email: string, role: string, phone: string, apartmentLandlord: Apartment[]) {
    this.id = id;
    this.name = title;
    this.email = email;
    this.role = role;
    this.phone = phone;
    this.apartmentLandlord = apartmentLandlord;
  }
}


export class SignUpFormModel {
  name = '';
  email = '';
  password = '';
  role = 'landlord';
  phone = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      email: observable,
      password: observable,
      role: observable,
      phone: observable,
      setName: action,
      setEmail: action,
      setPassword: action,
      setRole: action,
      setPhone: action,
      signUpUser: action,
    });
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setRole(role: string) {
    this.role = role;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  async signUpUser(): Promise<void> {
    const config = {
      headers: {
          'Content-Type': 'application/json',
        },
  }
    await api.post('/signup', {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
    }, config);
  }
}

export class LoginFormModel {
  email = '';
  password = '';
  token = '';
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      token: observable,
      user: observable,
      setEmail: action,
      setPassword: action,
      setUser: action,
      loginUser: action,
      setToken: action,
    });

    this.loadUserFromLocalStorage();
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setUser(user: User | null) {
    this.user = user;
    this.saveUserToLocalStorage(user);
  }


  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  private saveUserToLocalStorage(user: User| null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async loginUser(): Promise<void> {

    const response = await api.post('/login', {
        email: this.email,
        password: this.password,
      })
      this.token = response.data.token;
      this.user = response.data.user;
    }

    setToken(token:string) {
      localStorage.setItem('token', token);
    }
}