import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { Box, Divider, Paper, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import CartHeader from "./cartHeader/CartHeader";
import {
  addToCounter,
  removeFromCounter,
  deleteItem
} from "../../redux/slices/cart/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart({ ref, ...props }) {
  const [counter, setCounter] = useState(0);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(addToCounter(id));
    setCounter((prev) => prev + 1);
    props.addCartCount(1)
  };
  const handleDecrement = (id) => {
    dispatch(removeFromCounter(id));
    if (counter > 0) {
      setCounter((prev) => prev - 1);
      props.removeFromCartCount(1)
    }
  };
  const handleDelete = (id, itemCount) => {
    dispatch(deleteItem(id))
    setCounter(prev => prev - itemCount)
      props.removeFromCartCount(itemCount);
    
  };

  useEffect(() => {
    if (cart.length > 0) {
      cart.forEach((item) => {
        setCounter((prev) => prev + item.counter);
      });
    }
  }, []);

  return (
    <div ref={ref}>
      <Paper
        className={"cart-page" + (props.cartClicked ? " opacity" : "")}
        elevation={5}
        sx={{
          width: "40vw",
          height: "100vh",
          //marginTop: "8vh",
          position: "absolute",
          overflowY: "scroll",
          right: "0",
          zIndex: 10,
        }}
      >
        <CartHeader
          handleCartClicked={props.handleCartClicked}
          counter={counter}
        />

        <Divider />

        {cart.length > 0
          ? cart.map((item, index) => (
              <React.Fragment key={index}>
                <Paper
                  sx={{
                    width: "80%",
                    height: "15vh",
                    mb: "1vh",
                    display: "flex",
                    ml: "10%",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "40%",
                      height: "90%",
                      mt: "2.5%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={item.product.productPictures[0]}
                  />
                  <Box
                    sx={{
                      width: "60%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Ralewway",
                        textAlign: "center",
                      }}
                    >
                      {item.product.productName}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "40%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: "60%",
                          height: "70%",
                          display: "flex",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleDecrement(item.product.productId)
                          }
                          sx={{
                            width: "30%",
                            height: "100%",
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Box
                          sx={{
                            width: "40%",
                            height: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              mt: "25%",
                            }}
                          >
                            {item.counter}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() =>
                            handleIncrement(item.product.productId)
                          }
                          sx={{
                            width: "30%",
                            height: "100%",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <IconButton
                        sx={{
                          color: "red",
                        }}
                        onClick={() => handleDelete(item.product.productId, item.counter)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </React.Fragment>
            ))
          : ""}
      </Paper>
    </div>
  );
}

export default Cart;
