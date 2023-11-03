const express = require("express");
const fs = require("fs");
const Product = require("../models/Product");
const cors = require("cors");
const mongoose = require("mongoose");
var router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

const url = process.env.MONGO_URL

// const storage = multer.diskStorage({
//   destination: "../public/images",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      //Otherwise save to default bucket
      return `${Date.now()}_${file.originalname}`;
    }
  }
})
const upload = multer({storage: storage})
// const upload = multer({
//   storage: storage,
//   // limits: { fieldSize: 10 * 1024 * 1024 }
// });
//const upload = multer({ dest: "uploads/" });

var corsOptions = {
  origin: "http://localhst:3000",
  optionsSuccessStatus: 200,
};

router.get("/api/products/skincare", async (req, res) => {
  try {
    const products = await Product.find({ category: "Skincare" }).lean();
    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/api/test",upload.array("pictures"), async (req, res) => {
  try{
    console.log("endpoint hit")
    console.log(req.files)
  }catch(err){
    console.log(err)
  }
  
  // console.log(req.body);
  
});

router.post("/product", async (req, res) => {
  try {
    const productData = {
      category: "Skincare",
      productName: "Alleviating Body Bar",
      productDescription:
        "This body bar is the one thing you need to feel 100% fresh afteryour showers.with the lasting scent and natural oils, your body wil be feeling brand new.",
      quantity: 0,
      price: 20.99,
      productPictures: [
        {
          img: fs.readFileSync(
            "C:/Users/aolad/Documents/Skintastic/skintastic/src/images/products/skincare/wash/bodyWash/body-bar.jpg"
          ),
        },
        {
          img: fs.readFileSync(
            "C:/Users/aolad/Documents/Skintastic/skintastic/src/images/products/skincare/wash/bodyWash/bar-stack.jpg"
          ),
        },
        {
          img: fs.readFileSync(
            "C:/Users/aolad/Documents/Skintastic/skintastic/src/images/products/skincare/wash/bodyWash/shower.jpg"
          ),
        },
      ],
      brand: "Generic",
    };
    const product = await Product.create(productData);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
