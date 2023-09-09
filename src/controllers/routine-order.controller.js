const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		return res.render('website/routine-order',{ page: req.originalUrl.substr(1).toLowerCase() })
	}
};

