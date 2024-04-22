//imports
import { ref } from "vue";
import { GetAllProducts } from "../api/api_requests";

export default {
  setup() {
    let products;

    let columns = ref({});

    products = GetAllProducts();

    console.log(products);
    return {
      //return functions
    };
  },
};
