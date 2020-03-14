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
    if (req.body.quantity < 0) {
        console.error('Please Provide valid Number of Quantity. ' + req.body.quantity + ' is not a valid Quantity.')
        return res.json({ success: false, message: 'Please Provide valid Number of Quantity. ' + req.body.quantity + ' is not a valid Quantity.' });
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

//Update Existing Product
module.exports.updateProduct = (req, res) => {
    if (!req.params.id || !req.query.number) {
        console.error('Please Provide ID of product and number which needs to be updated.');
        return res.json({ success: false, message: 'Please Provide ID of product and number which needs to be updated.' });
    }
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            console.error('Error while Updating Existing Product. ' + err)
            return res.json({ success: false, message: 'Error while Updating Existing Product.' });
        }
        if (!product) {
            console.error('Product is Not Exists with this ID. ' + err)
            return res.json({ success: false, message: 'Product is Not Exists with this ID.' });
        }
        product.quantity = Number.parseInt(product.quantity) + Number.parseInt(req.query.number);
        product.save((err) => {
            if (err) {
                console.error('Error while Updating Existing Product. ' + err)
                return res.json({ success: false, message: 'Error while Updating Existing Product.' });
            }
            res.json({ success: true, data: { product: product, message: 'updated successfully.' } });
        })
    })
}

//Delete Existing Product
module.exports.deleteProduct = (req, res) => {
    if (!req.params.id) {
        console.error('Please Provide ID of product which needs to be deleted.');
        return res.json({ success: false, message: 'Please Provide ID of product which needs to be deleted.' });
    }
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            console.error('Error while Updating Existing Product. ' + err)
            return res.json({ success: false, message: 'Error while Updating Existing Product.' });
        }
        if (!product) {
            console.error('Product is Not Exists with this ID. ' + err)
            return res.json({ success: false, message: 'Product is Not Exists with this ID.' });
        }
        res.json({ success: true, data: { message: 'Product Deleted.' } });
    })
}