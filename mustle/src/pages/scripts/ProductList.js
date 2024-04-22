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

    //Input for search field
    const searchText = ref(""); // Search text

    const products = ref([]); // Array to store products

    const showProductActionDialog = ref(false); // Boolean to control visibility of Add Product dialog

    const showSellDialog = ref(false); // Boolean to control visibility of Sell Dialog

    // isEditMode is a boolean to check if currently in edit mode or not
    let isEditMode = ref(false);

    // The product currently being edited
    let currentEditingProduct = ref(null);

    // The product currently being sold
    let currentSellProduct = ref(null);

    // The product currently being sold
    let sellQuantity = ref(0);

    const SetAllProductsData = async () => {
      const allProducts = await GetAllProducts();
      products.value = allProducts;
    };

    //Reset Product Information Inputs
    const ResetProductInformation = () => {
      productInfo.value = {
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      };
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
      ResetProductInformation();

      //Close dialog
      showProductActionDialog.value = false;

      //Refresh Table
      SetAllProductsData();
    };

    // Cancel Adding New Product
    const cancelAddProduct = () => {
      //Reset Product Information Inputs
      ResetProductInformation();

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
      ResetProductInformation();

      //Set the current editing product to none
      currentEditingProduct.value = null;

      //When Cancelling the dialog it sets edit mode to false
      isEditMode.value = false;

      //Close dialog
      showProductActionDialog.value = false;

      //Refresh Table
      SetAllProductsData();
    };

    // Edit Product
    const editProduct = async (productId) => {
      isEditMode.value = true;
      currentEditingProduct.value = productId;
      showProductActionDialog.value = true;

      //Store returned value of GetProductById in a variable
      const currentProduct = await GetProductById(productId);

      //Set the products information to save
      productInfo.value = {
        product_name: currentProduct.product_name,
        retail: currentProduct.retail,
        resell: currentProduct.resell,
        quantity: currentProduct.quantity,
      };

      console.log("Edit product:", currentEditingProduct.value);
    };

    // Method to delete a product
    const deleteProduct = (productId) => {
      DeleteProduct(productId);

      //Refresh Table
      SetAllProductsData();
      console.log("Deleted product:", productId);
    };

    const selectProductFromTable = async (productId) => {
      showSellDialog.value = true;
      currentSellProduct.value = productId;
      const productDetails = await GetProductById(productId);

      productInfo.value = {
        product_name: productDetails.product_name,
        resell: productDetails.resell,
      };
    };

    const cancelSell = () => {
      showSellDialog.value = false;
      currentSellProduct.value = null;
      //Reset Product Information Inputs
      ResetProductInformation();
    };

    const confirmSell = async () => {
      const productDetails = await GetProductById(currentSellProduct.value);

      let newProductInfo = {
        product_name: productDetails.product_name,
        retail: productDetails.retail,
        resell: productDetails.resell,
        quantity: parseInt(productDetails.quantity) - sellQuantity.value,
      };

      UpdateProduct(currentSellProduct.value, newProductInfo);
      currentSellProduct.value = 0;
      sellQuantity.value = 0;
      showSellDialog.value = false;
      SetAllProductsData();
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
      showSellDialog,
      sellQuantity,
      cancelSell,
      confirmSell,
      ProductActionDialog,
      addProduct,
      cancelAddProduct,
      editProduct,
      deleteProduct,
      updateProduct,
      selectProductFromTable,
    };
  },
};
