import express from "express"
const router = express.Router();
import { createProduct , getProductMen,getProductWomen , getProductById , updateProduct , deleteProduct, fetchAvailableMoney, getProductKid } from "../Controllers/CreateProduct.js";
import {verifyTokens, verifyUser} from "../Controllers/User.js"
import { upload } from "../Controllers/CreateProduct.js";

router.route("/createProduct").post(  upload , createProduct)
router.route("/getProductMen").get(getProductMen ,verifyUser)
router.route("/getProductById").post(getProductById)
router.route("/getProductWomen").get(getProductWomen , verifyUser)
router.route("/getProductKid").get(getProductKid , verifyUser)
router.route("/getProductById/:id").get(getProductById)
router.route("/updateProduct/:id").put(updateProduct)
router.route("/deleteProduct/:id").delete(deleteProduct)
router.route("/availMoney/:userID").get(fetchAvailableMoney, verifyTokens )








export default router;