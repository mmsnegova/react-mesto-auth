import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register() {
  return (
    <>
      <Header>
        <nav className="header__nav">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </nav>
      </Header>
      <div className="content">
        <section className="sign">
          <form className="popup__body">
            <h2 className="popup__title popup__title_light">Регистрация</h2>
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
              aria-label="Зарегистрироваться"
            >
              Зарегистрироваться
            </button>
          </form>
          <div className="sign__signin">
            <span>Уже зарегистрированы? </span>
            <Link to="sign-in" className="sign__link">
              Войти
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
