import { makeObservable, observable, action } from 'mobx';


// Создаем модель для формы регистрации
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
}

// Создаем модель для формы входа
export class LoginFormModel {
  email = '';
  password = '';

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      setEmail: action,
      setPassword: action,
    });
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }
}