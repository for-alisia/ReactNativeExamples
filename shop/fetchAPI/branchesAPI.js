const branchesAPI = {
  baseUrl: 'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  async getBranches() {
    try {
      const response = await fetch(`${this.baseUrl}branches.json`);

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }
      const resData = await response.json();
      return resData;
    } catch (err) {
      throw err;
    }
  },
  async createBranch({ title, description, image, token }) {
    try {
      const response = await fetch(`${this.baseUrl}branches.json?auth=${token}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ title, description, image }),
      });

      if (!response.ok) {
        throw new Error('Упс... Что-то пошло не так');
      }
      const resData = await response.json();

      return { id: resData.name, title, description, image };
    } catch (err) {
      throw err;
    }
  },
};

export default branchesAPI;
