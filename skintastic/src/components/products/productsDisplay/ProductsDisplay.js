import React from "react";
import "./ProductsDisplay.scss";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clickProduct } from "../../../redux/slices/products/productSlice";
import { Buffer } from "buffer";

function ProductsDisplay({ products }) {
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(clickProduct(product));
  };
  console.log(products);

  try {
    const allProducts = products.map((item, index) => {
      const blob = new Blob([Int8Array.from(item.productPictures[0].img)], {
        type: "jpeg",
      });

      const image = window.URL.createObjectURL(blob);
      console.log(image)
      return (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="product-card"
        >
          <Link
            to={`/${item.category}/Products/${item.productId}`}
            onClick={(item) => handleClick()}
          >
            <Paper
              elevation={4}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "90%",
                  height: "70%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                // src={image}
                src={`data:JPEG;base64, ${Buffer.from(
                  item.productPictures[0].img
                ).toString('base64')}`}
              />
              <Typography sx={{ fontFamily: "Raleway" }}>
                {item.productName}
              </Typography>
            </Paper>
          </Link>
        </motion.div>
      );
    });
    return (
      <div className="ProductsDisplay">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "2%",
          }}
        >
          {allProducts}
          </Box>{" "}
      </div>
    );
  } catch (err) {
    return null;
  }
  
  return (
    <div className="ProductsDisplay">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2%",
        }}
      >
        {/* {products.map((item, index) => (
          
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="product-card"
          >
            
            <Link to={`/${item.category}/Products/${item.productId}`} onClick={(item) => handleClick()}>
              <Paper
                elevation={4}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "90%",
                    height: "70%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={item.productPictures[0]}
                />
                <Typography sx={{ fontFamily: "Raleway" }}>
                  {item.productName}
                </Typography>
              </Paper>
            </Link>
          </motion.div>
        ))} */}
      </Box>
    </div>
  );
}

export default ProductsDisplay;
