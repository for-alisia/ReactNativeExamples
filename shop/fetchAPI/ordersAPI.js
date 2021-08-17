const ordersAPI = {
  baseUrl: 'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  async getOrders(userId, token) {
    try {
      const response = await fetch(
        `${this.baseUrl}orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Ошибка получения заказов');
      }

      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push({ id: key, ...resData[key] });
      }

      return loadedOrders;
    } catch (err) {
      throw err;
    }
  },
  async addOrder(order) {
    try {
      const response = await fetch(`${this.baseUrl}orders.json`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Ошибка размещения заказа');
      }

      const resData = await response.json();

      return { ...order, id: resData.name };
    } catch (err) {
      throw err;
    }
  },
};

export default ordersAPI;
