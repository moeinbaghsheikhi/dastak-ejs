const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		// let property = await request.get('suggestion/property')
		// return res.render('admin/factor',{ data: property.data, page: req.originalUrl.substr(1).toLowerCase() })
		return res.render('admin/factor',{page: req.originalUrl.substr(1).toLowerCase() });
		
	}
};
