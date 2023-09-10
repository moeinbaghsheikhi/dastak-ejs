const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async factor1(req, res, next) {
		// let factors = await request.get('factors')
		// return res.render('admin/factor',{ data: factors.data, page: req.originalUrl.substr(1).toLowerCase() })
		return res.render('template/factor1',{page: req.originalUrl.substr(1).toLowerCase()})
		
	}
};
