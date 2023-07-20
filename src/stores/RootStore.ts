import { createContext, useContext } from 'react';
import { UserStore } from './user';
import { LoginFormModel, SignUpFormModel } from './auth';
import { ApartmentStore } from './apartment';


export class RootStore {
   userStore: UserStore;
   signUpStore: SignUpFormModel;
   loginStore: LoginFormModel;
   apartmentStore: ApartmentStore;

  constructor() {
    this.userStore = new UserStore();
    this.signUpStore = new SignUpFormModel();
    this.loginStore = new LoginFormModel();
    this.apartmentStore = new ApartmentStore();
  }
}

const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);

export const useRootStore = (): RootStore => useContext(RootStoreContext);