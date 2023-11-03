const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        productName:{
            type: String,
            required: [true, "Please entera product name"]
        },
        productDescription: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default:0
        },
        price: {
            type: Number,
            required: true,
        },
        productPictures: [
           {
            img: {
                type: Buffer,
                required: true
            }
           }
        ],
        brand: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
