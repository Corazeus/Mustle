import { ref, onMounted } from "vue";
import { GetAccount } from "../api/api_requests";

export default {
  name: "DashboardPage",
  setup() {
    // Define reactive variables using ref()
    const totalAccount = ref(0);
    const totalCapital = ref(0);
    const totalProfit = ref(0);
    //const bestSelling = ref([]);

    //Function that is called when component is mounted
    const SetAccountData = () => {
      //GetAccount is a function from api_requests js.
      GetAccount().then((response) => {
        //Set the values from response data
        totalAccount.value = response.total_account;
        totalCapital.value = response.total_capital;
        totalProfit.value = response.total_profit;
      });
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
