import { Box, IconButton, Typography } from "@mui/material";
import React, {useState} from "react";
import "./CartHeader.scss";
import CloseIcon from "@mui/icons-material/Close";

function CartHeader({handleCartClicked, counter}) {
    const [itemCount, setItemCount] = useState(counter)
    console.log(counter)
  return (
    <Box
      sx={{
        width: "100%",
        height: "3em",
        display: "flex",
        justifyContent: "space-between",
        mb: "4vh"
      }}
    >
      <Typography
      variant="h5"
        sx={{
          fontFamily: "Raleway",
          mt: "1em",
          fontWeight: "600",
          ml: "1vw"
        }}
      >
        Your Cart
      </Typography>
      <Typography
        sx={{
          fontFamily: "Raleway",
          mt: "1.8em",
          fontWeight: "600",
        }}
      >
        Items: {counter}
      </Typography>

      <IconButton
        sx={{
          //justifySelf: "flex-end"
          height: "75%",
        }}
        onClick={handleCartClicked}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default CartHeader;
