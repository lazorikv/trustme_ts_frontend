import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../stores/RootStore';
import '../index.css';

const LoginPage: React.FC = observer(() => {

    const { loginStore } = useRootStore();
    const [errorValue, setErrorValue] = useState(false)

    const navigate = useNavigate();
    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          await loginStore.loginUser()
          loginStore.setToken(loginStore.token)
          navigate('/users');
          }
        catch (error) {
            setErrorValue(true);
            setTimeout(() => {
              setErrorValue(false);
            }, 2000);
        }
    };

    return (
      <div className="container">
      <h2>Вход</h2>
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
            Пароль:
            <input
              type="password"
              value={loginStore.password}
              onChange={(event) => loginStore.setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Войти</button>
        </div>
      </form>
      {errorValue && (
      <div className="error-message">Неправильно введенные данные</div>
    )}
    </div>
    )

})

export default LoginPage;