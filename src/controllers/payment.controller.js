const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		// let categories = await request.get('categories')
		return res.render('admin/payment',{ page: req.originalUrl.substr(1).toLowerCase() })
	}
};

