import React from "react";
import headerLogo from "../images/logo_header.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Лого Mesto Russia" />
    </header>
  );
}

export default Header;