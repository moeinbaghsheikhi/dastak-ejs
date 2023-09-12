const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		// let product = await request.get('products')
		return res.render('admin/product',{ page: req.originalUrl.substr(1).toLowerCase()})
	}
};

