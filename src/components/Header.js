import React from "react";
import headerLogo from "../images/logo_header.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Лого Mesto Russia" />

      <Routes>
        <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__signin">
            Войти
          </Link>
        }/>

        <Route path="/sign-in" element={
          <Link to="/sign-up" className="header__signup">
            Регистрация
          </Link>
        }/>

        <Route path="/react-mesto-auth" element={
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link to="sign-in" className="header__signout" onClick={props.onSignout}>
              Выйти
            </Link>
          </div>
        }/>
      </Routes>

    </header>
  );
}

export default Header;