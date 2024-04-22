import axios from "axios";

let server = "192.168.1.2:3000";

const GetAccount = async () => {
  try {
    const response = await axios.get("http://" + server + "/account/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
};

const GetAllProducts = async () => {
  try {
    const response = await axios.get("http://" + server + "/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
  }
};

const GetProductById = async (productId) => {
  try {
    const response = await axios.get(
      "http://" + server + "/products/" + productId
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

const AddProduct = async (data) => {
  try {
    await axios.post("http://" + server + "/products", data);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const UpdateProduct = async (productId, productInfo) => {
  try {
    const response = await axios.put(
      "http://" + server + "/products/" + productId,
      productInfo
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product data:", error);
  }
};

const DeleteProduct = async (productId) => {
  try {
    await axios.delete("http://" + server + "/products/" + productId);
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};

export {
  //Export functions here
  GetAccount,
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
