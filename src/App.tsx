import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ApartmentCreateForm from './components/Apartments/ApartmentCreateForm';
import { RootStore, RootStoreContext } from './stores/RootStore';
import SignUpPage from './components/Auth/AuthForm';
import LoginPage from './components/Auth/LoginForm';
import { Header, SubHeader} from './components/Header/Header';
import Footer from './components/Footer';
import MainPage from './components/mainPage/Main';
import ApartmentDetails from './components/Apartments/ApartmentPage';
import AllApartments from './components/Apartments/AllApartments';
import ContactForm from './components/contactUs/ContactForm';
import AboutUs from './components/mainPage/aboutUs';
import SearchPage from './components/searchApartments/searchPage';
import SideComponent from './components/Profile/SideComponent';
import PageTransitionWrapper from './utils';


export const host: string = "18.207.213.87"

const apiUrl = process.env.TRUST_ME_API_URL = `http://${process.env.REACT_APP_HOSTNAME}:8000/api/v1`

export const api = axios.create({
  baseURL: apiUrl
});

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
    <div className='container'>
    {location.pathname !== '/login' && location.pathname !== '/signup' && <SubHeader />}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/apartments' element={<ApartmentCreateForm />} />
        <Route path="/myapartments/:id" element={<ApartmentDetails />} />
        <Route path="/allapartments" element={<AllApartments />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<SideComponent />} />
      </Routes>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </div>
    
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
