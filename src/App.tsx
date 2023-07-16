import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { RootStore, RootStoreContext } from './stores/RootStore';
import SignUpPage from './components/AuthForm';
import LoginPage from './components/LoginForm';


const apiUrl = process.env.TRUST_ME_API_URL = 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: apiUrl
});

const App: React.FC = () => {
  const rootStore = new RootStore();
  return (
    <div>
      <h1>TRUST ME</h1>
      <RootStoreContext.Provider value={rootStore}>
        <Router>
          <Routes>
            <Route path="/" Component={UserForm} />
            <Route path="/users" Component={UserList} />
            <Route path="/signup" Component={SignUpPage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </Router>
      </RootStoreContext.Provider>
    </div>
  );
};

export default App;
