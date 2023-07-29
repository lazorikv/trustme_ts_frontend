import { createContext, useContext } from 'react';
import { UserStore } from './user';
import { LoginFormModel, SignUpFormModel } from './auth';
import { ApartmentStore } from './apartment';
import { EmailFormModel } from './email';


export class RootStore {
   userStore: UserStore;
   signUpStore: SignUpFormModel;
   loginStore: LoginFormModel;
   apartmentStore: ApartmentStore;
   emailStore: EmailFormModel;

  constructor() {
    this.userStore = new UserStore();
    this.signUpStore = new SignUpFormModel();
    this.loginStore = new LoginFormModel();
    this.apartmentStore = new ApartmentStore();
    this.emailStore = new EmailFormModel()
  }
}

const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);

export const useRootStore = (): RootStore => useContext(RootStoreContext);