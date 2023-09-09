const axios = require('axios');


const request = require('../services/request.service')

module.exports = {
	async index(req, res, next) {
		return res.render('admin/home',{ page: req.originalUrl.substr(1).toLowerCase() })
	},
	async landing(req, res, next) {
		return res.render('landing',{ page: req.originalUrl.substr(1).toLowerCase() })
	},
	async register(req, res, next) {
		return res.render('auth/register',{ page: req.originalUrl.substr(1).toLowerCase() })
	},
	async login(req, res, next) {
		return res.render('auth/login',{ page: req.originalUrl.substr(1).toLowerCase() })
	}
};

