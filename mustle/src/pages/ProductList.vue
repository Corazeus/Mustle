<template>
    <div class="product-list-page">
        <div class="page-header">
            <h5>Product List</h5>
            <!-- Add a button to add new product -->
            <q-btn @click="showAddProductDialog" color="primary" label="Add Product" />
        </div>

        <!-- Display a table of products -->
        <q-table :rows="products" :columns="columns" row-key="id" row-class="row-class" virtual-scroll>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="product_name" :props="props">{{ props.row.product_name }}</q-td>
                    <q-td key="retail" :props="props">{{ props.row.retail }}</q-td>
                    <q-td key="resell" :props="props">{{ props.row.resell }}</q-td>
                    <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
                    <!-- Add edit and delete buttons for each row -->
                    <q-td key="actions" :props="props">
                        <q-btn @click="editProduct(props.row)" color="primary" icon="edit" dense flat />
                        <q-btn @click="deleteProduct(props.row)" color="negative" icon="delete" dense flat />
                    </q-td>
                </q-tr>
            </template>
        </q-table>

        <!-- Add Product Dialog -->
        <q-dialog v-model="showAddProductDialog">
            <q-card>
                <q-card-section>
                    <h4>Add Product</h4>
                </q-card-section>
                <q-card-section>
                    <!-- Form to add a new product -->
                    <q-input v-model="newProduct.product_name" label="Product Name" />
                    <q-input v-model="newProduct.retail" label="Retail Price" type="number" />
                    <q-input v-model="newProduct.resell" label="Resell Price" type="number" />
                    <q-input v-model="newProduct.quantity" label="Quantity" type="number" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Cancel" color="negative" @click="cancelAddProduct" />
                    <q-btn label="Add" color="primary" @click="addProduct" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script src="./scripts/ProductList.js"></script>
<style lang="scss" src="./styles/ProductList.scss"></style>