import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import "./navbar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLogged, showLoginModal, setShowLoginModal, strUser } =
    useContext(UserContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const user = strUser ? JSON.parse(strUser) : "";

  const handleLoginModal = () => {
    setShowLoginModal(true);
  };
  const handleSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "modal-background") {
      setShowSignUpModal(false);
      setShowLoginModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <Link to="/">
          <img src={logo} alt="App Logo" />
          </Link>
        </div>

        {isLogged ? (
          <div className="navbar_usercard_img_container">
            <Link to="/profile">
              <img
                src={user.imagen}
                alt="User Profile Image"
                className="usercard_img"
              />
            </Link>
          </div>
        ) : (
          <div className="navbar__buttons">
            <Button
              className="navbar_buttons_login"
              description="Inicia Sesión"
              handleModal={handleLoginModal}
            />
            <Button
              className="navbar_buttons_signup"
              description="Regístrate"
              handleModal={handleSignUpModal}
            />
            {showSignUpModal ? (
              <SignUpModal setShowSignUpModal={setShowSignUpModal} />
            ) : (
              ""
            )}
            {showLoginModal ? <LoginModal /> : ""}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
