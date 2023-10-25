import React from "react";
import "./Skincare.scss";
import { Box } from "@mui/material";
import BannerPhoto from "../../images/prducts/skincare/skincare-banner.jpg";
import ProductsDisplay from "../../components/products/productsDisplay/ProductsDisplay";
import { SkincareProducts } from "../../data/products/skincare/SkincareProducts";
import Filters from "../../components/filters/Filters";

function Skincare({cartClicked}) {
  console.log(SkincareProducts[0].productPictures[0].displayPhoto);
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
        <ProductsDisplay products={SkincareProducts} />
      </Box>
    </div>
  );
}

export default Skincare;
