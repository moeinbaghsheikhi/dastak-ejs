const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async factor1(req, res, next) {
		let factor = await request.get('factors/'+req.params.code)
		console.log(factor)
		return res.render('template/factor1',{ data: factor.data, page: req.originalUrl.substr(1).toLowerCase() })
		
	}
};