export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const updateProduct = (id, title, description, imageURL, price) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      price,
      description,
      imageURL,
    },
  };
};

export const createProduct = (title, description, imageURL, price) => {
  return {
    type: CREATE_PRODUCT,
    payload: { title, description, imageURL, price },
  };
};
