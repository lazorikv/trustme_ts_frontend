import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../stores/RootStore';
import { api } from '../App';



const SignUpPage: React.FC = observer(() => {

    const { signUpStore } = useRootStore();
  const navigate = useNavigate();

  // Обработчик отправки формы регистрации
  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const config = {
        headers: {
            'Content-Type': 'application/json',
          },
    }
    try {
      const response = await api.post('/signup', {
        name: signUpStore.name,
        email: signUpStore.email,
        password: signUpStore.password,
        role: signUpStore.role,
        phone: signUpStore.phone,
      }, config);

      // Обработка успешной регистрации
      console.log('Регистрация прошла успешно!', response.data);
      navigate('/users'); // Перенаправление на страницу после успешной регистрации
    } catch (error) {
      // Обработка ошибки регистрации
      console.error('Ошибка регистрации:', error.response?.data);
    }
  };

  // Обработчик отправки формы входа
  

  return (
    <div className="container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSignUpSubmit}>
        <div>
          <label>
            Имя:
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
            Пароль:
            <input
              type="password"
              value={signUpStore.password}
              onChange={(event) => signUpStore.setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Роль:
            <select
              value={signUpStore.role}
              onChange={(event) => signUpStore.setRole(event.target.value)}
            >
              <option value="landlord">Арендодатель</option>
              <option value="tenant">Арендатор</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Телефон:
            <input
              type="text"
              value={signUpStore.phone}
              onChange={(event) => signUpStore.setPhone(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Зарегистрироваться</button>
        </div>
        <p>
          Уже зарегистрированы? <a href="/login">Войдите здесь</a>
        </p>
      </form>
    </div>
  );
});

export default SignUpPage;