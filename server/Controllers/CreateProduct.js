// Import necessary modules
import multer from "multer";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../Model/Product.js";
import path from "path";
import { UserModel } from "../Model/User.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
}).single("file");

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = new ProductModel({
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      imageURL: req.body.imageURL,
    });



    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while saving the product: " + error.message);
  }
});

export const getProductMen = asyncHandler(async (req, res) => {
  try {
    const productList = await ProductModel.find({ category: "Men's" });
    res.send(JSON.stringify(productList));
  } catch (err) {
    console.log(err.response);
    res.status(500).send("Error while fetching products: " + err.message);
  }
});

export const getProductWomen = asyncHandler(async (req, res) => {
  try {
    const productList = await ProductModel.find({ category:"women"});
    res.send(JSON.stringify(productList));
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while fetching products: " + err.message);
  }
});

export const getProductKid = asyncHandler(async (req, res) => {
  try {
    const productList = await ProductModel.find({ category: "kids" });
    res.send(JSON.stringify(productList));
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while fetching products: " + err.message);
  }
});

// export const getProductByCategory = asyncHandler(async (req, res) => {
//   try {
//     const { category } = req.params;
//     const productList = await ProductModel.find({ category });
//     res.send(JSON.stringify(productList));
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error while fetching products: " + err.message);
//   }
// });

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const productList = await ProductModel.findById(productId);
    if (!productList) {
      return res.status(404).send("Product not found");
    }
    res.send(JSON.stringify(productList));
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while fetching products: " + err.message);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  await ProductModel.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  res.send("Product updated successfully!");
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  await ProductModel.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});
export const checkout = asyncHandler(async (req, res) => {
  const { customerID, cartItems } = req.body;
  try {
    const user = await UserModel.findById(customerID);

    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ message: process.env.NO_AVAILABLE_MONEY });
    }
    if (products.length !== productIDs.length) {
      return res.status(400).json({ message: process.env.NO_AVAILABLE_MONEY });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        return res.status(400).json({ message: process.env.NO_AVAILABLE_MONEY });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ message: process.env.NO_AVAILABLE_MONEY });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ message: process.env.NO_AVAILABLE_MONEY});
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    console.log(error);
  }
});


export const getProductByIds = asyncHandler(async(req,res) => {
  const {id} = req.params.id
  
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      console.log(`No user found for ID: ${userID}`); // Add logging
      return res.status(404).json("No User Found!"); // Correct status code for "not found"
    }

    console.log(`User found: ${user}`); // Add logging
    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    console.error(`Error fetching available money: ${err}`); // Add error logging
    res.status(500).json("Server Error");
  }
})




export const fetchAvailableMoney = asyncHandler(async(req,res) => {
  const {userID} = req.params
  
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      console.log(`No user found for ID: ${userID}`); // Add logging
      return res.status(404).json("No User Found!"); // Correct status code for "not found"
    }

    console.log(`User found: ${user}`); // Add logging
    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    console.error(`Error fetching available money: ${err}`); // Add error logging
    res.status(500).json("Server Error");
  }
})

