import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../stores/RootStore';



const SignUpPage: React.FC = observer(() => {

    const { signUpStore, loginStore } = useRootStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')


  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        await signUpStore.signUpUser()
        localStorage.setItem('token', loginStore.token);
        navigate('/users');
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
      <div className="error-message">{errorMessage}</div>
    </div>
  );
});

export default SignUpPage;