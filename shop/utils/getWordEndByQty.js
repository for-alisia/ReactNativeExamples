const getWordByQty = (qty) => {
  if (qty === 1) return '';
  if (qty === 2 || qty === 3 || qty === 4) return 'а';
  return 'ов';
};

export default getWordByQty;
