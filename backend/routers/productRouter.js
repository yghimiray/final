const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

productRouter.post('/',productController.addProduct);
productRouter.get('/:product_id',productController.searchProductById);
productRouter.get('/name/:name',productController.searchProductByName);
productRouter.get('/',productController.searchAllProducts);
productRouter.put('/:product_id', productController.updateProduct)
productRouter.put('/transactions/:name', productController.addAllTransactions)
productRouter.delete('/:product_id', productController.deleteProduct)



module.exports = productRouter;