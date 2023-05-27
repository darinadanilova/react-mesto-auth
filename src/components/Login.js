import React, { useState } from "react";

function Login({onSignInSubmit}) {
  
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');

    function handleChangeEmail (e) { 
        setSigninEmail(e.target.value);
      }
      function handleChangePassword (e) {
        setSigninPassword(e.target.value);
      }

    function handleLogin(evt) {
      evt.preventDefault();
      onSignInSubmit(signinEmail, signinPassword);
    }



  return (
    <div className="auths">
        <h2 className="auths__title">Вход</h2>
        <form
        className="auths__form"
        onSubmit={handleLogin}
        noValidate>

        <input
        required
        onChange={ handleChangeEmail }
        value={ signinEmail || "" }
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
        value={ signinPassword || '' }
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
    >Войти</button>

        </form>
    </div>
  );
}

export default Login;