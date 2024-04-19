import axios from "axios";

export default {
  name: "ProductList",
  data() {
    return {
      products: [], // Array to store products
      showAddProductDialog: false, // Boolean to control visibility of Add Product dialog
      newProduct: {
        // Object to store data of new product being added
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      },
      columns: [
        // Define table columns
        {
          name: "product_name",
          label: "Product Name",
          align: "left",
          field: "product_name",
        },
        {
          name: "retail",
          label: "Retail Price",
          align: "left",
          field: "retail",
        },
        {
          name: "resell",
          label: "Resell Price",
          align: "left",
          field: "resell",
        },
        {
          name: "quantity",
          label: "Quantity",
          align: "left",
          field: "quantity",
        },
        { name: "actions", label: "Actions", align: "left", field: "actions" },
      ],
    };
  },
  methods: {
    // Method to fetch products from the backend
    async fetchProducts() {
      try {
        // Make an HTTP request to fetch products from the backend
        // Replace 'http://localhost:3000/products' with your actual backend endpoint
        const response = await axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    // Method to show the Add Product dialog
    showAddProductDialog() {
      this.showAddProductDialog = true;
    },
    // Method to add a new product
    async addProduct() {
      try {
        // Make an HTTP request to add the new product to the backend
        // Replace 'http://localhost:3000/products' with your actual backend endpoint
        await axios.post("http://localhost:3000/products", this.newProduct);
        // Refresh the list of products after adding the new product
        this.fetchProducts();
        // Reset the newProduct object and close the Add Product dialog
        this.newProduct = {
          product_name: "",
          retail: 0,
          resell: 0,
          quantity: 0,
        };
        this.showAddProductDialog = false;
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    // Method to cancel adding a new product
    cancelAddProduct() {
      // Reset the newProduct object and close the Add Product dialog
      this.newProduct = {
        product_name: "",
        retail: 0,
        resell: 0,
        quantity: 0,
      };
      this.showAddProductDialog = false;
    },
    // Method to edit a product
    editProduct(product) {
      // Implement edit functionality here
      console.log("Edit product:", product);
    },
    // Method to delete a product
    deleteProduct(product) {
      // Implement delete functionality here
      console.log("Delete product:", product);
    },
  },
  created() {
    // Fetch products when the component is created
    this.fetchProducts();
  },
};
