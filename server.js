var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var hbs = require('hbs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash'); 



app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(bodyParser.urlencoded());

app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/', function(req, res) {
  res.send('This is your Shopping list');	
});

app.listen(port);
console.log('Your home page is now welcoming your new app!   Very Exciting' + port);


var router = express.Router();
router.use(function(req, res, next){
  
  console.log(req.method, req.url);

  next();
});

var productsController = require('./controllers/productsController');

router.param('id', productsController.findById);
router.get('/products/:id', productsController.show),
router.get('/products', productsController.index); 
router.get('/products/new', productsController.new);
router.post('/products', productsController.create);
router.get ('/products/:id/edit', productsController.edit),
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.destroy);



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


  //app.post('/products', function (req, res) {
    //console.log(req.body.product);
    //var product = new Product(req.body.product);
  
    //product.save(function(err, product) {
    //if (err) return res.render('products/new', { product: product, errors: err.errors });

    //res.redirect('/products');
    //});
  //});

app.use('/', router);



