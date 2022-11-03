import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import "./login-modal.css";
import { UserContext } from "../../context/UserContext";
import {loginUser} from "../../utils/apiConfig";

function LoginModal() {
  const [userLoginInfo, setUserLoginInfo] = useState({ email: "", contrasena: "" });
  const { setShowLoginModal, isLogged, setIsLogged } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const res = await loginUser(userLoginInfo.email);
      if (res.status === 200) {
        if(res.data[0].contrasena === userLoginInfo.contrasena){
          setShowLoginModal(false);
          setIsLogged(true);
          localStorage.setItem("user", JSON.stringify({nombre: `${res.data[0].nombre}`, imagen: `${res.data[0].imagen}`, imagen_fondo: `${res.data[0].imagen_fondo}` ,email: `${res.data[0].email}`}) );
        }else{
          console.log("Datos inválidos");
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal-background">
      <div className="login-modal modal-container">
        <div className="modal-header login-modal-header">
          <h4>Hola de nuevo!</h4>
        </div>
        <div className="modal-form-container">
          <form action="" className="modal-form">
            <input
              type="text"
              name="email"
              placeholder="username"
              onChange={(e) => setUserLoginInfo({ ...userLoginInfo, email: e.target.value })}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setUserLoginInfo({ ...userLoginInfo, contrasena: e.target.value })}
            />
          </form>
        </div>
        <Button
          description="Inicia Sesión"
          className="sign-up-button"
          handleModal={fetchUser}
        />
        <div className="signup-sugest">
          <p>No tienes cuenta? Regístrate</p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
