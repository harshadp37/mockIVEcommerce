const Product = require('../models/Product');

//Return List of Product
module.exports.getAllProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            console.error('Error while fetching list of Products. ' + err)
            return res.json({ success: false, message: 'Error while fetching list of Products.' });
        }
        res.json({ success: true, data: { products: products } });
    })
}

//Add New Product
module.exports.addProduct = (req, res) => {
    if (!req.body.name || !req.body.quantity) {
        console.error('Please Provide Name of Product And Quantity.')
        return res.json({ success: false, message: 'Please Provide Name of Product And Quantity.' });
    }
    const newProduct = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    Product.create(newProduct, (err, product) => {
        if (err) {
            console.error('Error while Adding new Product. ' + err)
            return res.json({ success: false, message: 'Error while Adding new Product.' });
        }
        res.json({ success: true, data: { product: product } });
    })
}