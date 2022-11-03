import React from 'react'
import "./button.css"

function Button({description, handleModal, className}) {
  return (
    <>
    <button className={className ? `button ${className}` : "button"} onClick={handleModal}>{description}</button>
    </>
  )
}

export default Button