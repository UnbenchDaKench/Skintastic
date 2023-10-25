import React from 'react'

function Body({ cartClicked }) {
  return <div className={"Boddy" + (cartClicked ? " opacity" : "")}>Body</div>;
}

export default Body