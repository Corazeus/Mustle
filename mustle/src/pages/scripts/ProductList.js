import { ref, computed, onMounted } from "vue";
import {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from "../api/api_requests";

export default {
  name: "ProductList",
  setup() {
    // Define reactive variables using ref()
    const products = ref([]); // Array to store products

    const showProductActionDialog = ref(false); // Boolean to control visibility of Add Product dialog

    const productInfo = ref({
      // Object to store data of new product being added
      product_name: "",
      retail: 0,
      resell: 0,
      quantity: 0,
    });

    const columns = ref([
      // Define table columns
      {
        name: "product_name",
        label: "Product Name",
        align: "left",
        field: "product_name",
      },
      { name: "retail", label: "Retail Price", align: "left", field: "retail" },
      { name: "resell", label: "Resell Price", align: "left", field: "resell" },
      { name: "quantity", label: "Quantity", align: "left", field: "quantity" },
      { name: "actions", label: "Actions", align: "left", field: "actions" },
    ]);

    // isEditMode is a boolean to check if currently in edit mode or not
    let isEditMode = ref(false);

    // The product currently being edited
    let currentEditingProduct = ref(null);

    //Input for search field
    const searchText = ref(""); // Search text

    const SetAllProductsData = async () => {
      GetAllProducts().then((response) => {
        products.value = response;
      });
    };

    // Fetch products when the component is mounted
    onMounted(SetAllProductsData);

    // Computed property to filter products based on search text
    const filteredProducts = computed(() => {
      return products.value.filter((product) =>
        product.product_name
          .toLowerCase()
          .includes(searchText.value.toLowerCase())
      );
    });

    const ProductActionDialog = () => {
      showProductActionDialog.value = true;
    };

    // Method to add a new product
    const addProduct = async () => {
      //Call function from api_request that uses productInfo.value as Payload
      AddProduct(productInfo.value);

      //Reset Product Information Inputs
      productInfo.value = {
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      };

      //Close dialog
      showProductActionDialog.value = false;

      //Refresh Table
      SetAllProductsData();
    };

    // Cancel Adding New Product
    const cancelAddProduct = () => {
      // Reset the newProduct object and close the Add Product dialog
      productInfo.value = {
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      };

      //When Cancelling the dialog it sets edit mode to false
      isEditMode.value = false;

      //Close Dialog
      showProductActionDialog.value = false;
    };

    // Method to update a product
    const updateProduct = async () => {
      //Call function from api_request that uses productInfo.value as Payload and currentEditingProduct.value as id
      UpdateProduct(currentEditingProduct.value, productInfo.value);

      //Reset Product Information Inputs
      productInfo.value = {
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      };

      currentEditingProduct.value = null;

      //When Cancelling the dialog it sets edit mode to false
      isEditMode.value = false;

      //Close dialog
      showProductActionDialog.value = false;

      //Refresh Table
      SetAllProductsData();
    };

    // Edit Product
    const editProduct = (productId) => {
      isEditMode.value = true;
      currentEditingProduct.value = productId;
      showProductActionDialog.value = true;

      GetProductById(productId).then((response) => {
        productInfo.value = {
          product_name: response.product_name,
          retail: response.retail,
          resell: response.resell,
          quantity: response.quantity,
        };
      });

      console.log("Edit product:", currentEditingProduct.value);
    };

    // Method to delete a product
    const deleteProduct = (productId) => {
      DeleteProduct(productId);

      //Refresh Table
      SetAllProductsData();
      console.log("Deleted product:", productId);
    };

    // Return reactive variables and functions
    return {
      products,
      searchText,
      filteredProducts,
      productInfo,
      columns,
      showProductActionDialog,
      isEditMode,
      ProductActionDialog,
      addProduct,
      cancelAddProduct,
      editProduct,
      deleteProduct,
      updateProduct,
    };
  },
};
