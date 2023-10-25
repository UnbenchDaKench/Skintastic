import { RejuvinatingCreamPictures } from "./cream/RejuvinatingCream";
import { FaceWashPictures } from "./wash/faceWash/FaceWash";
import { BodyWashPictures } from "./wash/bodyWash/BodyWash";

export const SkincareProducts = [
  {
    category: "Skincare",
    productId: 0,
    productName: "Rejuvinating Hand Cream",
    productDescription:
      "Amazing hand lotion keeping skin smooth and fresh for up to 24 hours!",
    productPictures: RejuvinatingCreamPictures,
    productPrice: "$39.99",
    brand: "",
  },
  {
    category: "Skincare",
    productId: 1,
    productName: "Blemish Clearing Deep Cleanser",
    productDescription:
      "Top quality facial cleanser leaving your skin fresh and free of blemishes!",
    productPictures: FaceWashPictures,
    productPrice: "$29.99",
    brand: "",
  },
  {
    category: "Skincare",
    productId: 2,
    productName: "Alleviating Body Bar",
    productDescription:
      "This body bar is the one thing you need to feel 100% fresh afteryour showers.with the lasting scent and natural oils, your body wil be feeling brand new",
    productPictures: BodyWashPictures,
    productPrice: "$20.99",
    brand: "",
  },
];
