import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../stores/RootStore';
import { api } from '../App';

const LoginPage: React.FC = observer(() => {

    const { loginStore } = useRootStore();

    const navigate = useNavigate();
    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
        const response = await api.post('/login', {
            email: loginStore.email,
            password: loginStore.password,
        });

        const token = response.data.token;
            localStorage.setItem('token', token);
        navigate('/users'); // Перенаправление на страницу после успешного входа
        } catch (error) {
        // Обработка ошибки входа
        console.error('Ошибка входа:', error.response?.data);
        }
    };

    return (
        <div>
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
        </div>
    )

})

export default LoginPage;