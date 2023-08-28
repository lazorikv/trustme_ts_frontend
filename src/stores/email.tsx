import { makeObservable, observable, action } from "mobx";
import { api } from "../App";
import { AxiosResponse } from "axios";

export class Email {
  email: string;
  firstName: string;
  lastName: string;
  emailBody: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    emailBody: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.emailBody = emailBody;
  }
}

export class EmailFormModel {
  email = "";
  firstName = "";
  lastName = "";
  emailBody = "";
  emailSent = false;
  error: any;

  constructor() {
    makeObservable(this, {
      email: observable,
      firstName: observable,
      lastName: observable,
      emailBody: observable,
      emailSent: observable,
      error: observable,
      sendEmail: action,
      setEmailSent: action,
    });
  }

  setEmailSent(isSent: boolean) {
    this.emailSent = isSent;
  }

  async sendEmail(email: Email): Promise<any> {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await api.post(
        "/utils/send-email",
        {
          email,
        },
        config
      );
      return response;
    } catch (error) {
      this.error = error
    }
  }
}
