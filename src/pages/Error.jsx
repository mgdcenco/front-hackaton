import React from "react";
import Layout from "../components/Layout/Layout";
import cara from "../assets/icons8-comida-muerta-100.png";
import Button from "../components/Button/Button";
import "./error.css";
function Error() {
  return (
    <Layout>
      <div className="Error__total">
        <h1 ClassName="Error__title">ERROR 404</h1>
        <img className="error__img" src={cara} />
        <p className="Error__text1">Disculpa, Página No Encontrada</p>
        <p className="Error__text2">La página que deseas acceder no existe</p>
        <h2 className="Error__text2">
          Pero no te preocupes, tenemos miles de opciones!!!
        </h2>
        <Button description={"Inicio"} />
      </div>
    </Layout>
  );
}

export default Error;
