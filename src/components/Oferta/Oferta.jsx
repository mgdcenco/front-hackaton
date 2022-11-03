import React from "react";
import qr from "../../assets/qr.jpeg";
import "oferta.css"


export const Oferta = () => {
  return (
    <div className="Oferta__total">
      <h1 className="Oferta__title">UTILIZA NUESTRO CUPON</h1>
      <h3 className="Oferta__text1">Escaneando este codigo QR</h3>
      <h2 className="Oferta__subTitle">OBTEN un 20% de DESCUENTO</h2>
      <img className="Oferta__img" src={qr} />
    </div>
  );
};
