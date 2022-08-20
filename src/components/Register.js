import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth";
import ok from "../images/Ok.svg";
import error from "../images/Error.svg";

function Register(props) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setUserInfo({
      email: "",
      password: "",
    });
  };

  function handleRespons(img, message) {
    props.onRespons(img, message);
  }

  function handleChange(evt) {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { password, email } = userInfo;
    props
      .onRegister(password, email)
      .then(resetForm)
      .then(() => {
        handleRespons(ok, "Вы успешно зарегистрировались!");
        history.push("/sign-in");
      })
      .catch(() => {
        handleRespons(error, "Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        props.onInfoTooltip();
      });
  }

  return (
    <>
      <Header>
        <Link to="sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <div className="content">
        <section className="sign">
          <form className="popup__body" onSubmit={handleSubmit}>
            <h2 className="popup__title popup__title_dark">Регистрация</h2>
            <div className="input-container">
              <input
                className="popup__input popup__input_light popup__input_email"
                required
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
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
                name="password"
                value={userInfo.password}
                onChange={handleChange}
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
