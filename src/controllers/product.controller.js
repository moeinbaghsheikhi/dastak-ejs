const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		let product = await request.get('products')
		console.log(product)
		return res.render('admin/product',{ data: product.data, page: req.originalUrl.substr(1).toLowerCase()})
	}
};

