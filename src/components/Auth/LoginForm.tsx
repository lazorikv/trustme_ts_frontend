import React, { useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../../stores/RootStore";
import ErrorPopup from "../../popUps/Error";

const LoginPage: React.FC = observer(() => {
  const { loginStore } = useRootStore();
  const [errorValue, setErrorValue] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await loginStore.loginUser();
      if (loginStore.error) {
        if (loginStore.error['response'] && loginStore.error['response']['status'] === 500) {
          setError('Internal server error. Please try again later.');
        }
      }
      loginStore.setToken(loginStore.token);
      loginStore.setUser(loginStore.user)
      navigate("/");
    } catch (error) {
      setErrorValue(true);
      setTimeout(() => {
        setErrorValue(false);
      }, 2000);
    }
  };

  return (
    <div className="auth_container">
      <h2>Log in</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={loginStore.email}
              onChange={(event) => loginStore.setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={loginStore.password}
              onChange={(event) => loginStore.setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Not registered yet? <a href="/signup">Register here</a>
      </p>
      {errorValue && <div className="error-message">Incorrect data</div>}
      {error && <ErrorPopup message={error}/>}
    </div>
  );
});

export default LoginPage;
