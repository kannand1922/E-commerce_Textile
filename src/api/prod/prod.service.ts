import { apiPath } from "../../Constants";
import axios from "axios";
class ProdService {
  async getProductsList() {
    const response = await axios.get(`${apiPath}/api/prod/prodList`);
    return response.data;
  }
  async addCartDetails(val) {
    const response = await axios.post(`${apiPath}/api/prod/add`, val);
    return response.data;
  }

  async removeCartItem(val) {
    console.log("jiii", val);
    const response = await axios.post(`${apiPath}/api/prod/remove`, {
      id: val,
    });
    return response.data;
  }
  async getCartList() {
    const response = await axios.get(`${apiPath}/api/prod/cartList`);
    return response.data;
  }
}

export default ProdService;
