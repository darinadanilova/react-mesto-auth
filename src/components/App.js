import React, { useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import { register, login, checkToken } from "../utils/auth.js";
import { Routes, Route, useNavigate} from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [infoTooltipSuccess, setInfoTooltipSuccess] = React.useState(false);
  const [infoTooltipUnsuccess, setInfoTooltipUnsuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getInfo()
      .then(setCurrentUser)
      .catch((err) => {
        console.log(err);
      });
    api
      .getCard()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //function handleLogIn() {
  //  setLoggedIn(true);
  //}

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipSuccess(false);
    setInfoTooltipUnsuccess(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, about) {
    api
      .patchInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .patchAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .postCard(name, link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkTokens(token) {
    checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  function handleSignUp(email, password) {
    register(email, password)
      .then(() => {
        setInfoTooltipSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipUnsuccess(true);
      })
  }

  function handleSignIn(email, password) {
    login(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token);
          return res.token;
      })
      .then((token) => checkToken(token))
      .catch((err) => {
        console.log(err);
        setInfoTooltipUnsuccess(true);
      })  
  }


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkTokens(token);
    }
  });


    // Функция выхода пользователя
    function handleSignOut () {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
  }

     // Верификация токена
    // useEffect(() => {
    //  const token = localStorage.getItem('token')
    //  if (token) { checkToken(token)
    //      .then((res) => {
    //        setEmail(res.data.email);
    //        setLoggedIn(true);
    //        navigate('/') })
    //        .catch((err) => {
    //          console.log(err);
    //        })
    //  }
    //});


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
        loggedIn={loggedIn}
        email = {email}
        onSignout = {handleSignOut}
        />

<Routes>
<Route 
  path ="/sign-up"
          element = {<Register
            onSignUpSubmit={handleSignUp} />}>
</Route>

<Route 
  path ="/sign-in"
          element = {<Login
            onSignInSubmit={handleSignIn} loggedIn={loggedIn} />}>
</Route>

<Route 
  path ="/"
          element = {<ProtectedRoute
            loggedIn={loggedIn}
            component={<Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onUpdateAvatar={handleUpdateAvatar}
            />} />}>
</Route>
</Routes>
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          button="Да"
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
        isOpen={infoTooltipSuccess}
        onClose={closeAllPopups}
        isSuccess={true}
        />

        <InfoTooltip
        isOpen={infoTooltipUnsuccess}
        onClose={closeAllPopups}
        isSuccess={false}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;