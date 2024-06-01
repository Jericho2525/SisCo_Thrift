import axios from "axios";
import { useState } from "react";

function UploadImages() {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stockQuantity", stockQuantity);
        formData.append("image", imageFile);

        try {
            const result = await axios.post("http://localhost:5000/createProduct",formData)
            .then(res => res.json("Upload Success!" , result))
        } catch (error) {
            console.error("Upload failed:", error);
           
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="women">Women's</option>
                    <option value="Men's">Men's</option>
                </select>
            </div>
            
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Stock Quantity:</label>
                    <input
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        name="file"
                        id="file"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UploadImages;
