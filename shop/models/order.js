class Order {
  constructor(id, items, total, date, status) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.date = date;
    this.state = status;
  }

  get status() {
    if (this.state === 'created') return 'Оформлен';
    if (this.state === 'processing') return 'Выполняется';
    if (this.state === 'completed') return 'Завершен';
    return 'В архиве';
  }
}

export default Order;
