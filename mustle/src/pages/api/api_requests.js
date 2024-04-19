import { httpGet, httpPost, httpPut, httpDel } from "boot/axios";
import { ref, readonly } from "vue";

let GetProductDetails = ref(null);
/**
 * A request that is used to fetch all or numbers from the database
 *
 * @returns Array
 */
let SetProduct = ref([]);
let GetProduct = readonly(SetProduct);

const GetAllProducts = () => {
  return new Promise((resolve, reject) => {
    httpGet("http://localhost:3000/requestquotation", {
      success(response) {
        response.data.status === "success" &&
          (SetProduct.value = response.data.data);
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

const GetProductById = (id) => {
  return new Promise((resolve, reject) => {
    httpGet(`http://localhost:3000/requestquotation/${id}`, {
      success(response) {
        response.data.status === "success" &&
          (SetProduct.value = response.data.data);
        resolve(response.data);
        console.log("ID retrieved From Quotaion.js: ", id);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

const InsertProduct = (payload) => {
  return new Promise((resolve, reject) => {
    httpPost("http://localhost:3000/requestquotation", payload, {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

const UpdateProduct = (payloadId, payload) => {
  return new Promise((resolve, reject) => {
    httpPut(`http://localhost:3000/requestquotation/${payloadId}`, payload, {
      success(response) {
        resolve(response.data);
        reject(response);
      },
    });
  });
};

export {
  SetProduct,
  GetProduct,
  GetProductDetails,
  InsertProduct,
  UpdateProduct,
  GetProductById,
  GetAllProducts,
};
