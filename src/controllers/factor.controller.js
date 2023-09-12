const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		// let factors = await request.get('factors',localStorage.getItem('token'))
		return res.render('admin/factor',{ page: req.originalUrl.substr(1).toLowerCase() })
		
	}
};
