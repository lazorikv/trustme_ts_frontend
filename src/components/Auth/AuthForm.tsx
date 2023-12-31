import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../../stores/RootStore';
import ErrorPopup from '../../popUps/Error';



const SignUpPage: React.FC = observer(() => {

    const { signUpStore, loginStore } = useRootStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState<string | null>(null);


  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        await signUpStore.signUpUser()
        if (signUpStore.error) {
          if (signUpStore.error['response'] && signUpStore.error['response']['status'] === 500) {
            setError('Internal server error. Please try again later.');
          }
        }
        loginStore.setUser(loginStore.user)
        loginStore.setToken(loginStore.token)
        navigate('/');
    } catch (error) {
      if (error.response.status === 409) {
          setErrorMessage(error.response.data.message)
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };


  return (
    <div className="auth_container">
      <h2>Sign up</h2>
      <form onSubmit={handleSignUpSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={signUpStore.name}
              onChange={(event) => signUpStore.setName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={signUpStore.email}
              onChange={(event) => signUpStore.setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={signUpStore.password}
              onChange={(event) => signUpStore.setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <select
              value={signUpStore.role}
              onChange={(event) => signUpStore.setRole(event.target.value)}
            >
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              value={signUpStore.phone}
              onChange={(event) => signUpStore.setPhone(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
        <p>
        Already registered? <a href="/login">Log in here</a>
        </p>
      </form>
      <div className="error-message">{errorMessage}</div>
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});

export default SignUpPage;