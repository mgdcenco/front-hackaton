import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";

function IngredientesModal() {
  const { recetaModal, setRecetaModal } = useContext(UserContext);

  const handleOutModal = (e) => {
    e.target.className === "modal-background" ? setRecetaModal(false) : "";
  };

  return recetaModal ? (
    <div className="modal-background" onClick={handleOutModal}>
      <div className="modal-container">
        <div className="modal-header login-modal-header">
          <p>Ingredientes</p>
        </div>
        <form action="" className="modal-form">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
        <Button description="Buscar Receta" className="sign-up-button" />
      </div>
    </div>
  ) : (
    ""
  );
}

export default IngredientesModal;
