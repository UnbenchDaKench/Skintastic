import React, { useState } from "react";
import "./Carousel.scss";
import { CarouselImages } from "../../data/carousel/CarouselImages";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function Carousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? CarouselImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === CarouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  console.log(CarouselImages[currentImageIndex]);
  return (
    <div
    className="Carousel"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: '100%',
        
      }}
    >
      <Paper elevation={12} style={{ minWidth: "100%", minHeight: '100%', position: "relative" }}>
        <Box
          component="img"
          src={CarouselImages[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          style={{
            width: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "16px",
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={prevImage}>
            <ArrowBack />
          </IconButton>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={nextImage}>
            <ArrowForward />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

export default Carousel;
