import React from 'react'

function Face({ cartClicked }) {
  return <div className={"Face" + (cartClicked ? " opacity" : "")}>Face</div>;
}

export default Face