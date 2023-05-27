import React from "react";
import imgSuccess from "../images/success.png";
import imgUnsuccess from "../images/unsuccess.png";
import PopupWithForm from "./PopupWithForm.js";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <PopupWithForm
      name={"notification"}
      isOpen={isOpen}
      onClose={onClose}
    >
    <img className="popup__notification-img" src={isSuccess ? imgSuccess : imgUnsuccess} alt=""/>
        <h2 className="popup__notification-title">{isSuccess ? "Вы успешно зарегестрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</h2>
        <button
          onClick={onClose}
          className="popup__close"
          aria-label="Close"
          type="button"
          name="close"
          id="closenotification"
        ></button>

    </PopupWithForm>
  );
}

export default InfoTooltip;