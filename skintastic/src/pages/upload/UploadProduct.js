import React, { useState } from "react";
import "./Upload.scss";
import axios from "axios";

function UploadProduct() {
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    productDescription: "",
    brand: "",
    quantity: "",
    price: "",
    pictures: [],
  });

  const {
    category,
    productName,
    productDescription,
    brand,
    quantity,
    price,
    pictures,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const newPictures = Array.from(e.target.files);
      setFormData({ ...formData, pictures: [...pictures, ...newPictures] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="Upload">
      <h1>Add a New Product</h1>
      <form
        action="/product"
        method="post"
        encType="multipart/form-data"
        name="images"
      >
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={productDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pictures">Pictures:</label>
          <input
            type="file"
            id="pictures"
            name="pictures"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadProduct;
