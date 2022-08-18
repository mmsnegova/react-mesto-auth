import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__bio">
          <div className="cover">
            <img
              className="profile__avatar"
              alt="Аватар"
              src={currentUser.avatar}
            />
            <button
              className="profile__update-avatar"
              type="button"
              aria-label="Редактировать аватар"
              onClick={props.onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                {...card}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                onPopupWithConformation={props.onPopupWithConformation}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
