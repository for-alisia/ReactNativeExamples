const fetchAPI = {
  baseUrl: 'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  async getData(type) {
    try {
      const response = await fetch(`${this.baseUrl}${type}.json`);

      if (!response.ok) {
        throw new Error(`Упс... При загрузке что-то пошло не так`);
      }
      const resData = await response.json();

      return resData;
    } catch (err) {
      throw err;
    }
  },
  async createData(type, payload, token) {
    try {
      const response = await fetch(`${this.baseUrl}${type}.json?auth=${token}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Упс... При сохранении что-то пошло не так');
      }
      const resData = await response.json();

      return { id: resData.name, ...payload };
    } catch (err) {
      throw err;
    }
  },
  async updateData(type, payload, token, id) {
    try {
      const response = await fetch(`${this.baseUrl}${type}/${id}.json?auth=${token}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Упс... При обновлении что-то пошло не так');
      }

      return true;
    } catch (err) {
      throw err;
    }
  },

  async deleteData(type, id, token) {
    try {
      const response = await fetch(`${this.baseUrl}${type}/${id}.json?auth=${token}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Упс... При удалении что-то пошло не так');
      }

      return true;
    } catch (err) {
      throw err;
    }
  },
};

export default fetchAPI;
