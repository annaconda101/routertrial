var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var hbs = require('hbs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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
  res.redirect('/products');
});

var productsController = require('./controllers/productsController');

var router = express.Router();

router.param('id', productsController.findById);
router.get('/products', productsController.index); 
router.get('/products/new', productsController.new);
router.post('/products', productsController.create);
router.get('/products/:id/edit', productsController.edit);
router.put('/products/:id', productsController.update);
router.get('/products/:id', productsController.show);
router.delete('/products/:id', productsController.destroy);


app.use('/', router);

app.listen(port);

console.log('Your home page is now welcoming your new app!  Very Exciting ' + port);

