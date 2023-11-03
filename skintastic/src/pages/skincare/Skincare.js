import React, { useEffect, useState } from "react";
import "./Skincare.scss";
import { Box } from "@mui/material";
import BannerPhoto from "../../images/products/skincare/skincare-banner.jpg";
import ProductsDisplay from "../../components/products/productsDisplay/ProductsDisplay";
import { SkincareProducts } from "../../data/products/skincare/SkincareProducts";
import Filters from "../../components/filters/Filters";
import { getSkincareProducts } from "../../services/data/products";
import axios from "axios"

function Skincare({cartClicked}) {
  const [products, setProducts] = useState("")
  console.log(SkincareProducts[0].productPictures[0].displayPhoto);
 
  useEffect(()=>{
    const fetchData = async () =>{
      // await getSkincareProducts()
      //   .then((data) => {
      //     console.log(data);
      //     setProducts(data);
      //   })
      //   .catch((err) => {
      //     console.log("There are no prodducts to display", err);
      //   });
      // await axios
      //   .get("/api/products/skincare")
      //   .then((res) => {
      //     console.log(res.data);
      //     setProducts(res.data)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      const response = await getSkincareProducts()
      console.log(response)
      setProducts(response.data)
    }
    fetchData()
  },[])
  console.log(products.length)
  return (
    <div className={"Skincare" + (cartClicked ? " opacity": "")}>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "60%",
          objectFit: "cover",
          objectPosition: "center",
          paddingTop: "8vh",
          mb: "12px"
        }}
        src={BannerPhoto}
      />
      <Box
      sx={{
        display:'flex'
      }}
      >
        <Filters />
        {products.length > 0 && <ProductsDisplay products={products} />}
      </Box>
    </div>
  );
}

export default Skincare;
