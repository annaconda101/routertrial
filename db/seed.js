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

var productAttrs = {
	item: 'toothpaste',
	quantity: 4,
	brand: 'Sensodyne'
};

var product = new Product(productAttrs);
  product.save(function(err, product) {
    if (err) return console.log(err);

    console.log('Product saved');
  });