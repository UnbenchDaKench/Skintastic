import React, { useState, useEffect } from "react";
import "./Product.scss";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Breadcrumbs,
  Button,
  IconButton
} from "@mui/material";

import { RejuvinatingCreamPictures } from "../../../data/products/skincare/cream/RejuvinatingCream";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  productState,
} from "../../../redux/slices/products/productSlice";
import AddToCart from "../../addToCart/AddToCart";

function Product({addCartCount}) {
  const [displayPhotoIndex, setDisplayPhotoIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  let { category } = useParams();
  let { productId } = useParams();

  const products = useSelector((store) => store.product.skinCareProducts);

  const handlePhotoClick = (index) => {
    setDisplayPhotoIndex(index);
  };

  const getproduct = (category, productId) => {
    if (category === "Skincare") {
      setProduct(products[productId]);
    }
  };

  useEffect(() => {
    getproduct(category, productId);
    setLoading(false);
  }, []);


  return (
    <div>
      {!loading ? (
        <div className="Product">
          <Box
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <ImageList
              sx={{
                width: "100%",
                height: "100%",
              }}
              cols={1}
              rowHeight={300}
            >
              {product.productPictures.map((photo, index) => (
                <ImageListItem key={photo}>
                  <Box
                    component="img"
                    src={photo}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    onClick={() => handlePhotoClick(index)}
                  ></Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box
            sx={{
              width: "40%",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={product.productPictures[displayPhotoIndex]}
            />
          </Box>
          <Box
            sx={{
              width: "40%",
              textAlign: "left",
            }}
          >
            <Breadcrumbs
              sx={{
                ml: "5%",
              }}
            >
              <Link className="breadcrumb-link" to="/Skincare">
                {category}
              </Link>
              <Typography>{product.productName}</Typography>
            </Breadcrumbs>
            <Typography
              className="product-title"
              variant="h4"
              sx={{
                fontFamily: "Raleway",
                fontWeight: "700",
                mt: "5vh",
                width: "95%",
                ml: "5%",
              }}
            >
              {product.productName}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Raleway",
                fontWeight: "700",
                width: "95%",
                ml: "5%",
              }}
            >
              {product.productPrice}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Raleway",
                fontWeight: "500",
                width: "95%",
                ml: "5%",
                mt: "3vh",
              }}
            >
              {product.productDescription}
            </Typography>
            <AddToCart addCartCount={addCartCount} product={product}/>
          </Box>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
