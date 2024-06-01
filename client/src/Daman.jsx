import { useState } from "react";
import axios from "axios";

function Daman() {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stockQuantity', stockQuantity);

    axios.post("http://localhost:5000/upload", formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error uploading the file!", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Stock Quantity" onChange={(e) => setStockQuantity(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default Daman;
