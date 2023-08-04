import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ApartmentCreateForm from './components/ApartmentCreateForm';
import UserList from './components/UserList';
import { RootStore, RootStoreContext } from './stores/RootStore';
import SignUpPage from './components/AuthForm';
import LoginPage from './components/LoginForm';
import { Header, SubHeader} from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/Main';
import MyApartments from './components/myApartments';
import ApartmentDetails from './components/ApartmentPage';
import AllApartments from './components/AllApartments';
import PageTransitionWrapper from './components/PageTransition';
import ContactForm from './components/ContactForm';
import AboutUs from './components/aboutUs';
import SearchPage from './components/searchPage';
import SideComponent from './components/Profile/SideComponent';


export const host: string = "18.207.213.87"

const apiUrl = process.env.TRUST_ME_API_URL = `http://${process.env.REACT_APP_HOSTNAME}:8000/api/v1`

export const api = axios.create({
  baseURL: apiUrl
});

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
    <div id='container'>
    {location.pathname !== '/login' && location.pathname !== '/signup' && <SubHeader />}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/apartments' element={<ApartmentCreateForm />} />
        <Route path='/myapartments' element={<MyApartments />} />
        <Route path="/myapartments/:id" element={<ApartmentDetails />} />
        <Route path="/allapartments" element={<AllApartments />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<SideComponent />} />
      </Routes>
    </div>
    {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  const rootStore = new RootStore();

  return (
    <div>
      <RootStoreContext.Provider value={rootStore}>
        <Router>
        <PageTransitionWrapper>
          <AppContent />
          </PageTransitionWrapper>
        </Router>
      </RootStoreContext.Provider>
    </div>
  );
};

export default App;
