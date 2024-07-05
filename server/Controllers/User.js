import asyncHandler from 'express-async-handler';
import { CartModel } from '../Model/Cart.js'; 
import { ProductModel } from '../Model/Product.js'; 
import { UserModel } from '../Model/User.js';
// import { UserErrors } from '../Err/Error.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



export const signup = asyncHandler(async (req , res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
      return res.status(400).json({ message: process.env.USERNAME_ALREADY_EXISTS });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "Record registered" });
});

export const login = asyncHandler(async(req ,res) =>{
  try{
    const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json(400).json({message: process.env.NO_USER_FOUND});
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: process.env.NO_USER_FOUND});
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
  
 }catch(err){
  res.status(500).json({ type: err });
 }
});



 





export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
  };

  export const verifyToken = asyncHandler(async(req , res) =>{
    try{
      const products = await ProductModel.find({});
      res.json({products});
    }catch(err){
      res.status(400).json({err})
    }
  })


  export const verifyTokens = asyncHandler(async(req ,res)=>{
    const authHeader = req.header.authorization;
    if(authHeader){
      jwt.verify(authHeader , "secret",(err)=>{
        if(err){
          return res.sendStatus(403)
        }
        next()
      })
    }
  })


  export const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.decode(token, secret);
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token.' });
    }
};

export const profile = async(req ,res)=>{
  const user = req.user;
  if (user) {
      console.log('User data:', user);
      res.send({ username: user.username });
  } else {
      console.log('User data is not available.');
      res.status(500).send({ message: 'User data is not available.' });
  }
}



export const addToCart = asyncHandler(async (req, res) => {
  try {
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1; 

    
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }


    let cart = await CartModel.findOne({ user: req.user._id }); 
    if (!cart) {

      cart = new CartModel({
        user: req.user._id,
        products: [{ product: productId, quantity: quantity }]
      });
    } else {

      const index = cart.products.findIndex(item => item.product.toString() === productId);
      if (index !== -1) {
      
        cart.products[index].quantity += quantity;
      } else {

        cart.products.push({ product: productId, quantity: quantity });
      }
    }

    // Save the updated cart
    await cart.save();
    
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send("Error while adding product to cart: " + error.message);
  }
});
