import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Header>
        <Link to="sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <div className="content">
        <section className="sign">
          <form className="popup__body">
            <h2 className="popup__title popup__title_dark">Вход</h2>
            <div className="input-container">
              <input
                className="popup__input popup__input_light popup__input_email"
                required
                id="email"
                name="email"
                type="text"
                placeholder="Email"
              />
              <span className="popup__input-error email-error"></span>
            </div>
            <div className="input-container">
              <input
                className="popup__input popup__input_light popup__input_password"
                required
                id="password"
                name="email"
                type="password"
                placeholder="Пароль"
              />
              <span className="popup__input-error password-error"></span>
            </div>
            <button
              className="popup__save popup__save_light"
              type="submit"
              aria-label="Войти"
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
