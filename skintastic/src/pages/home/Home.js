import React from "react";
import "./Home.scss";
import Carousel from "../../components/carousel/Carousel";
import { motion, Variants } from "framer-motion";
import { Box, Paper, Typography } from "@mui/material";

const variants = {
  offscreen: {
    y: 50,
  },
  onscreen: {
    y: 20,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

function home({cartClicked}) {
  return (
    <div className={"Home" + (cartClicked ? " opacity" : "")}>
      <Carousel />
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Raleway",
          textAlign: "left",
          marginLeft: "3%",
          mt: "15vh",
        }}
      >
        Checkout our newest Line up
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          gap: "2%",
          mb: "2%",
        }}
      >
        <motion.div
          className="featured"
          initial="offscreen"
          whileInView="onscreen"
          variants={variants}
          viewport={{ once: false, amount: 0.8 }}
        >
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
            test
          </Paper>
        </motion.div>
        <motion.div
          className="featured"
          initial="offscreen"
          whileInView="onscreen"
          variants={variants}
          viewport={{ once: false, amount: 0.8 }}
        >
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}></Paper>
        </motion.div>
        <motion.div
          className="featured"
          initial="offscreen"
          whileInView="onscreen"
          variants={variants}
          viewport={{ once: false, amount: 0.8 }}
        >
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}></Paper>
        </motion.div>
      </Box>
    </div>
  );
}

export default home;
