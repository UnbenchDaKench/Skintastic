import React from 'react'
import './Nails.scss'

function Nails({ cartClicked }) {
  return <div className={"Nails" + (cartClicked ? " opacity" : "")}>Nails</div>;
}

export default Nails