<template>
  <div class="page-dashboard">
    <q-page class="q-pa-md">
      <div class="text-h6 q-mb-md">Dashboard</div>

      <!-- Total Sales Card -->
      <q-card class="dashboard-card">
        <q-card-section>
          <div class="text-h6">Account Total</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">PHP {{ totalAccount }}</div>
        </q-card-section>
      </q-card>

      <!-- Total Captital Card -->
      <q-card class="dashboard-card">
        <q-card-section>
          <div class="text-h6">Total Capital</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">PHP {{ totalCapital }}</div>
        </q-card-section>
      </q-card>

      <!-- Total Profit Card -->
      <q-card class="dashboard-card">
        <q-card-section>
          <div class="text-h6">Total Profit</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">PHP {{ totalProfit }}</div>
        </q-card-section>
      </q-card>

      <!-- Best Selling Items Card -->
      <q-card class="dashboard-card">
        <q-card-section>
          <div class="text-h6">Best Selling Items</div>
        </q-card-section>
        <q-card-section>
          <ul>
            <li v-for="item in bestSellingItems" :key="item.id">{{ item.product_name }}</li>
          </ul>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script src="./scripts/DashboardPage.js"></script>

<style lang="scss">
@import './styles/DashboardPage.scss';
</style>