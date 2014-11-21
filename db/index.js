var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/shoppinglist_development');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
});

var ProductSchema = mongoose.Schema({
  item: String,
  quantity: Number,
  brand: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = {
  Product: Product
};