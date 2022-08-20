import React from "react";
import api from "../utils/api";
import { Switch, Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConformation from "./PopupWithConformation";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPopupWithConformationOpen, setIsPopupWithConformationOpen] =
    React.useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardDelete, setCardDelete] = React.useState(null);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleNavMenuClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const handleDeleteCardClick = () => {
    setIsPopupWithConformationOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleCardDelete = (card) => {
    setCardDelete(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConformationOpen(false);
    setSelectedCard(null);
    setCardDelete(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleConformationCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onPopupWithConformation={handleDeleteCardClick}
              onNavMenu={handleNavMenuClick}
              isOpenNavMenu={isNavMenuOpen}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithConformation
          card={cardDelete}
          isOpen={isPopupWithConformationOpen}
          onClose={closeAllPopups}
          onConformationCardDelete={handleConformationCardDelete}
        />
        <ImagePopup {...selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
