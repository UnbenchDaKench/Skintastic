import React from 'react'
import './Makeup.scss'

function Makeup({ cartClicked }) {
  return (
    <div className={"Makeup" + (cartClicked ? " opacity" : "")}>Makeup</div>
  );
}

export default Makeup