import axios from "axios";

export default {
  name: "DashboardPage",
  data() {
    return {
      totalSales: 0,
      totalProfit: 0,
      bestSellingItems: [],
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:3000/account/1");
        this.totalSales = response.data.total_account;
        this.totalProfit = response.data.total_profit;

        const salesResponse = await axios.get("http://localhost:3000/sales");
        // Assuming the first sale contains the best selling items
        if (salesResponse.data.length > 0) {
          this.bestSellingItems = salesResponse.data[0].products;
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
  },
  mounted() {
    this.fetchDashboardData();
  },
};
