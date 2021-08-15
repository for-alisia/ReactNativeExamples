const productsAPI = {
  baseUrl: 'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  async getProducts() {
    try {
      const response = await fetch(`${this.baseUrl}products.json`);

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }
      const resData = await response.json();

      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push({ id: key, ...resData[key], price: +resData[key].price });
      }

      return loadedProducts;
    } catch (err) {
      throw err;
    }
  },
  async createProduct({ title, description, imageUrl, price, token }) {
    try {
      const response = await fetch(`${this.baseUrl}products.json?auth=${token}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ title, description, imageUrl, price, rate: 3.5, reviews: [] }),
      });

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }
      const resData = await response.json();

      return { id: resData.name, title, description, imageUrl, price };
    } catch (err) {
      throw err;
    }
  },
  async updateProduct({ title, description, imageUrl, price, id, token }) {
    try {
      const response = await fetch(`${this.baseUrl}products/${id}.json?auth=${token}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ title, description, imageUrl, price }),
      });

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }

      return true;
    } catch (err) {
      throw err;
    }
  },

  async deleteProduct(id, token) {
    try {
      const response = await fetch(`${this.baseUrl}products/${id}.json?auth=${token}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }

      return true;
    } catch (err) {
      throw err;
    }
  },
};

export default productsAPI;
