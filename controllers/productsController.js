module.exports = {
  index: function (req, res) {
	  Product.find({}, function (err, products) {
	    if (err) return next(err);

	    res.render('products/index', { products: products });
	  });
	},
  show: function (req, res) {
    var product = req.product;	
 
    res.render('products/show', { product: product });
  },
  new:  function (req, res) {
    var product = new Product();
    
    res.render('products/new', { product: product });
  },
  create: function (req, res) {	
    var product = new Product(req.body.product);
  
    product.save(function(err, product) {
      if (err) return res.render('products/new', { product: product, errors: err.errors });
    
      res.redirect('/products');
    });
  },
  edit: function (req, res) {
    var product = req.product;
    res.render('products/edit', { product: product });
  },
  update:  function (req, res) {
    var product = req.product;
	var productAttrs = _.cloneDeep(req.body.product);

	_.extend(product, productAttrs);

	product.save(function(err) {
      if (err) return res.render('product/edit', { product: product, errors: err.errors });

      res.redirect('/products/' + product._id);
	}); 
  },
  destroy: function (req, res, next)  {
    var product = req.product;

    product.remove(function(err) {
  	  if (err) return next(err);

      res.redirect('/products');
    });
  },
  findById: function (req, res, next, id) {
    Product.findById(id, function(err, product) {
	  if (err) return next(err);
	    
	  req.product = product;
	    
	  next();
	});
  },
};
