import { ref, onMounted } from "vue";
import { GetAccount, GetAllProducts } from "../api/api_requests";

export default {
  name: "DashboardPage",
  setup() {
    // Define reactive variables using ref()
    const totalAccount = ref(0);
    const totalCapital = ref(0);
    const totalProfit = ref(0);
    //const bestSelling = ref([]);

    //Function that is called when component is mounted
    const SetAccountData = async () => {
      const accountData = await GetAccount();
      totalAccount.value = accountData.total_account;
      totalCapital.value = accountData.total_capital;
      totalProfit.value = accountData.total_profit;

      //Store all products data here
      const productsData = await GetAllProducts();

      // Calculate total capital
      totalCapital.value = productsData.reduce((acc, product) => {
        return acc + parseFloat(product.retail) * parseInt(product.quantity);
      }, 0);

      // Calculate total profit
      totalProfit.value = productsData.reduce((acc, product) => {
        return (
          acc +
          (parseFloat(product.resell) - parseFloat(product.retail)) *
            parseInt(product.quantity)
        );
      }, 0);
    };

    // Fetch dashboard data when the component is mounted
    onMounted(SetAccountData);

    // Return reactive variables and functions
    return {
      totalCapital,
      totalProfit,
      totalAccount,
    };
  },
};
