import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({onSignUpSubmit}) {

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    function handleChangeEmail (e) { 
        setSignupEmail(e.target.value);
      }
      function handleChangePassword (e) {
        setSignupPassword(e.target.value);
      }

    function handleRegister(evt) {
      evt.preventDefault();
      onSignUpSubmit(signupEmail, signupPassword);
    }



  return (
    <div className="auths">
        <h2 className="auths__title">Регистрация</h2>
        <form
        className="auths__form"
        onSubmit={handleRegister}
        noValidate>

        <input
        required
        onChange={ handleChangeEmail }
        value={ signupEmail || "" }
        type="email"
        className="auths__input auths__input_email"
        id="email"
        name="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
      />
      <span id="email-error" className="auths__error"></span>

      <input
        required
        onChange={ handleChangePassword }
        value={ signupPassword || '' }
        type="password"
        className="auths__input auths__input_password"
        id="password"
        name="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="200"
      />
      <span id="password-error" className="auths__error"></span>

    <button
         className="auths__button"
         aria-label="auths-button"
         type="button"
         name="auths-button"
         id="auths-button"
    >Зарегистрироваться</button>
    <p className="auths__subtitle">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auths__login">&nbsp;Войти</Link>
    </p>
        </form>
    </div>
  );
}

export default Register;