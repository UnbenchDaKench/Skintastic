import React from 'react'

function Eye({ cartClicked }) {
  return <div className={"Eye" + (cartClicked ? " opacity" : "")}>Eye</div>;
}

export default Eye