import React, { useState } from "react";
import "./AddToCart.scss";
import { Box, IconButton, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart/cartSlice";

function AddToCart({ addCartCount, product }) {
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    }
  };

  const addProductsToCart = () => {
    dispatch(addToCart({ product, counter }));
    addCartCount(counter);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        height: "50px",
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: "10px",
        ml: "5%",
        mt: "10vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "25%",
          height: "100%",
          ml: "3%",
        }}
      >
        <IconButton
          onClick={handleDecrement}
          sx={{
            width: "20%",
            height: "100%",
          }}
        >
          <RemoveIcon />
        </IconButton>

        <Box
          sx={{
            width: "60%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              mt: "25%",
            }}
          >
            {counter}
          </Typography>
        </Box>
        <IconButton
          onClick={handleIncrement}
          sx={{
            width: "20%",
            height: "100%",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Button
        onClick={addProductsToCart}
        sx={{
          width: "70%",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "grey",
          },
          ml: "5%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            "&:hover": {
              color: "black",
            },
          }}
        >
          ADD TO CART
        </Typography>
      </Button>
    </Box>
  );
}

export default AddToCart;
