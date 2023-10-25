import React from 'react'

function Lip({ cartClicked }) {
  return <div className={"Lip" + (cartClicked ? " opacity" : "")}>Lip</div>;
}

export default Lip