import { observable, action, makeObservable } from 'mobx';

export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
  
    constructor(id: number, title: string, email: string, role: string, phone: string) {
      this.id = id;
      this.name = title;
      this.email = email;
      this.role = role;
      this.phone = phone;
    }
  }
  
  export class UserStore {
    users: User[] = [];
  
    constructor() {
      makeObservable(this, {
          users: observable,
          fetchUsers: action,
          addUser: action
      })
    }
  
    async fetchUsers(): Promise<void> {
      try {
        const response = await fetch('http://localhost:8000/api/v1/user');
        const users = await response.json();
        this.users = users;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  
    async addUser(title: string): Promise<void> {
      try {
        const response = await fetch('http://localhost:8000/api/v1/user', {
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
  }