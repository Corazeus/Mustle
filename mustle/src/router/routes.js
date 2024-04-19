const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("pages/ProductList.vue"),
      },
      {
        path: "sales",
        name: "sales",
        component: () => import("pages/SalesList.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
