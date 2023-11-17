const axios = require("axios").default;

export async function getSkincareProducts() {
  try {
    const data = await axios.get("http://localhost:9000/api/products/skincare");
   
    return data
  } catch (err) {
    console.log("Failed to get products", err);
  }
}

export async function getSkincareProductById(id){
  try{
    const data = await axios.get("http://localhost:9000/api/products", {params: {id: id}})
  }
  catch(err){
    console.log("Product does not exist!", err)
  }
}
