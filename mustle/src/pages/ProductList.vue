<template>
  <div class="product-list-page">
    <div class="page-header">
      <h5>Product List</h5>
      <!-- Add a button to add new product -->
      <q-btn @click="ProductActionDialog" color="primary" label="Add Product" />
    </div>

    <!-- Display a table of products -->
    <q-input
      v-model="searchText"
      label="Search"
      placeholder="Product Information"
      outlined
      dense
    />
    <q-table
      :rows="filteredProducts"
      :columns="columns"
      row-key="id"
      row-class="row-class"
      virtual-scroll
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="product_name"
            :props="props"
            @click="selectProductFromTable(props.row.id)"
            >{{ props.row.product_name }}</q-td
          >
          <q-td key="retail" :props="props">₱ {{ props.row.retail }}</q-td>
          <q-td key="resell" :props="props">₱ {{ props.row.resell }}</q-td>
          <q-td key="quantity" :props="props"
            >{{ props.row.quantity }} pcs.</q-td
          >
          <!-- Add edit and delete buttons for each row -->
          <q-td key="actions" :props="props">
            <q-btn
              @click="editProduct(props.row.id)"
              color="primary"
              icon="edit"
              dense
              flat
            />
            <q-btn
              @click="deleteProduct(props.row.id)"
              color="negative"
              icon="delete"
              dense
              flat
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Add Product Dialog -->
    <q-dialog v-model="showProductActionDialog" persistent>
      <q-card flat>
        <q-card-section>
          <b>
            <p align="center">
              {{ isEditMode ? "Edit Product" : "Add Product" }}
            </p>
          </b>
          <!-- Form to add a new product -->
          <q-input v-model="productInfo.product_name" label="Product Name" />
          <q-input
            v-model="productInfo.retail"
            label="Retail Price"
            type="number"
          />
          <q-input
            v-model="productInfo.resell"
            label="Resell Price"
            type="number"
          />
          <q-input
            v-model="productInfo.quantity"
            label="Quantity"
            type="number"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="negative"
            @click="cancelAddProduct"
          />
          <q-btn
            flat
            :label="isEditMode ? 'Save' : 'Add'"
            color="primary"
            @click="isEditMode ? updateProduct() : addProduct()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Sell Product Dialog -->
    <q-dialog v-model="showSellDialog" persistent>
      <q-card flat>
        <q-card-section>
          <b><p align="center">Sell Product</p></b>
          <!-- Form to add a new product -->
          <q-input
            v-model="productInfo.product_name"
            label="Product Name"
            readonly
            borderless
          />
          <q-input
            v-model="productInfo.resell"
            label="Resell Price"
            type="number"
            readonly
            borderless
          />
          <q-input v-model="sellQuantity" label="Quantity" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="cancelSell" />
          <q-btn flat label="Confirm" color="primary" @click="confirmSell" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./scripts/ProductList.js"></script>
<style lang="scss" src="./styles/ProductList.scss"></style>
