import React, { useEffect } from "react";
import "./ProductsDisplay.scss";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clickProduct } from "../../../redux/slices/products/productSlice";
import { Buffer } from "buffer";
import picture from '../../../images/uploads/pictures-1699928680713-260269630.jpeg';

function ProductsDisplay({ products }) {
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(clickProduct(product));
  };

  useEffect(() => {
    
  }, []);
  

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
        {products.length > 0 &&
          products.map((item, index) => {
            // var displayPicture =
            //   "../../../skintastic-node-api/" +
            //   item.productPictures[0]
            var displayPicture = `http://localhost:9000/${item.productPictures[0]}`;
            console.log(displayPicture);
            console.log(item._id)
            // var displaysrc = require("" + displayPicture);
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="product-card"
              >
                <Link
                  to={`/${item.category}/Products/${item._id}`}
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
                      src={`http://localhost:9000/${item.productPictures[0]}`}
                    />
                    <Typography sx={{ fontFamily: "Raleway" }}>
                      {item.productName}
                    </Typography>
                  </Paper>
                </Link>
              </motion.div>
            );
          })}
      </Box>
    </div>
  );
}

export default ProductsDisplay;
