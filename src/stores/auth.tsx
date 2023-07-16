import { makeObservable, observable, action } from 'mobx';
import { api } from '../App';


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

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      token: observable,
      setEmail: action,
      setPassword: action,
      loginUser: action,
    });
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  async loginUser(): Promise<void> {

    const response = await api.post('/login', {
        email: this.email,
        password: this.password,
      })
      this.token = response.data.token;
    }
}