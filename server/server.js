import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Connection/DbConnection.js";
import getProduct from "./routes/Product.js";
import bodyParser from "body-parser";
import User from "./routes/User.js";
import multer from "multer";
import { ProductModel } from "./Model/Product.js";
import path from "path";
const app = express();
const port = 5000;

dotenv.config();

app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDb();

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

app.use("/", getProduct);
app.use("/user", User);


app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Extracting file information
    const filePath = req.file.path;

    const newProduct = new ProductModel({
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      imageURL: filePath, // Save the file path
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while saving the product: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
