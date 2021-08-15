// @ts-nocheck
const usersAPI = {
  key: 'AIzaSyCY9hFqEsHbKKt6peNpA436igiDd6lvzqo',
  baseUrl: 'https://identitytoolkit.googleapis.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  errors: {
    INVALID_PASSWORD: 'Неверный пароль',
    EMAIL_NOT_FOUND: 'Аккаунт не зарегистрирован',
    USER_DISABLED: 'Ваша учетная запись была заблокирована',
    EMAIL_EXISTS: 'Учетная запись с таким email уже существует',
    OPERATION_NOT_ALLOWED: 'Операция невозможна',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Слишком много неудачных попыток входа, попробуйте позднее',
  },
  async signup(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/accounts:signUp?key=${this.key}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const userData = await response.json();

      console.log(userData);

      return userData;
    } catch (err) {
      throw err;
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/accounts:signInWithPassword?key=${this.key}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      const userData = await response.json();

      console.log(userData);

      if (!response.ok) {
        throw new Error(this.errors[userData.error.message] || 'Непредвиденная ошибка');
      }

      return userData;
    } catch (err) {
      throw err;
    }
  },
};

export default usersAPI;
