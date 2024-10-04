const cloudinary = require('cloudinary').v2;
const productModel = require("../models/productModel.js")

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        // console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for update a product
// const updateProduct = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, description, price, category, subCategory } = req.body;
//       let updatedData = {
//         name,
//         description,
//         price,
//         category,
//         subCategory
//       };
  
//       if (req.files.image) {
//         const image = req.files.image[0];
//         const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
//         updatedData.image = result.secure_url;
//       }
  
//       const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
//       res.json({ success: true, product: updatedProduct });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//     }
//   };

const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
  
      // Extract and upload images if provided
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      let imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          return result.secure_url;
        })
      );
  
      // Prepare the update data object
      let updatedData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes: sizes ? JSON.parse(sizes) : undefined,
      };
  
      // If images are uploaded, add them to the update
      if (imagesUrl.length > 0) {
        updatedData.image = imagesUrl;  // This will update the images
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
      res.json({ success: true, product: updatedProduct });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

module.exports = { listProducts, addProduct, updateProduct, removeProduct, singleProduct };