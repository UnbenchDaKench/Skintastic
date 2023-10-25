import React from 'react'
import './Brands.scss'

function Brands({cartClicked}) {
  return (
    <div className={"Brands" + (cartClicked ? " opacity": "")}>Brands</div>
  )
}

export default Brands