const express = require("express");
const fs = require("fs");
const Product = require("../models/Product");
const cors = require("cors");
const mongoose = require("mongoose");
var router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
require("dotenv").config();

const url = process.env.MONGO_URL;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define where to store the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});



const upload = multer({ storage: storage });

var corsOptions = {
  origin: "http://localhst:3000",
  optionsSuccessStatus: 200,
};

router.get("/api/products/skincare", async (req, res) => {
  try {
    
    const products = await Product.find({}).lean();
    console.log("endpoint hit");
    console.log(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/api/test", upload.array("pictures", 8), async (req, res) => {
  try {
    console.log("endpoint hit");
    console.log(req.files);
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

router.post("/product", upload.array("pictures", 8), async (req, res) => {
  const picturepaths = req.files.map((file) => file.path);

  for (var i = 0; i < picturepaths.length; i++) {
    picturepaths[i] = picturepaths[i].replace(/\\/g, "/");
  }
  
  console.log(picturepaths);
  const product = new Product({
    category: req.body.category,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    quantity: req.body.quantity,
    price: req.body.price,
    productPictures: picturepaths,
    brand: req.body.brand,
  });

  product
    .save()
    .then(() => {
      return res.status(201).json(product);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });

  
});

module.exports = router;
