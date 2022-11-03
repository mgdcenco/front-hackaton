import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import "./login-modal.css";
import { UserContext } from "../../context/UserContext";
import {loginUser} from "../../utils/apiConfig";

function LoginModal() {
  const [userLoginInfo, setUserLoginInfo] = useState({ email: "", password: "" });
  const { setShowLoginModal, isLogged, setIsLogged } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const res = await loginUser(userLoginInfo.email);
      if (res.status === 200) {
        if(res.data[0].password === userLoginInfo.password){
          setShowLoginModal(false);
          setIsLogged(true);
          localStorage.setItem("user", JSON.stringify({name: `${res.data[0].name}`, profile_image: `${res.data[0].profile_image}`, profile_background: `${res.data[0].profile_background}` ,email: `${res.data[0].email}`, profession: `${res.data[0].profession}`}) );
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
          <h4>Welcome Again!</h4>
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
              onChange={(e) => setUserLoginInfo({ ...userLoginInfo, password: e.target.value })}
            />
          </form>
        </div>
        <Button
          description="Login"
          className="sign-up-button"
          handleModal={fetchUser}
        />
        <div className="signup-sugest">
          <p>Don't have an account? Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
