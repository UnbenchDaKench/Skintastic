const axios = require("axios").default;

export async function getSkincareProducts() {
  try {
    const data = await axios.get("/api/products/skincare");
    // .then((res) =>{
    //     console.log(res.data)
    //     return res.data
    // })
    // .catch((err) =>{
    //     console.log(err)
    // })
    return data
  } catch (err) {
    console.log("Failed to get products", err);
  }
}
