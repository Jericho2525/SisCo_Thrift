import express from "express"
const router = express.Router();
import { signup , login, addToCart, verifyToken, profile, authenticate } from "../Controllers/User.js";
import { checkout } from "../Controllers/CreateProduct.js";


router.route("/signup").post(signup)
router.route("/profile").get(profile , authenticate)
router.route("/login").post(login)
router.route("/addToCart").post(addToCart)
router.route("/checkout").post( checkout , verifyToken   )



export default router;