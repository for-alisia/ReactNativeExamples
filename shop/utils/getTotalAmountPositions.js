const getTotalQty = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

export default getTotalQty;
