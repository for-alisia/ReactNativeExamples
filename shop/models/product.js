class Product {
  constructor(id, ownerId, title, imageUrl, description, price, rate, reviews, colors, salePrice) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.rate = rate;
    this.reviews = reviews;
    this.colors = colors;
    this.salePrice = salePrice;
  }
}

export default Product;
