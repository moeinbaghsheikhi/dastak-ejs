const axios = require('axios');
const base_URL = process.env.API_URL

class RequestService {
	static async post(url, data = {}) {
		return await this.axiosCall(this.config(service, method, 'post', data, apiCode));
	}

	static async put(url, data = {}) {
		return await this.axiosCall(this.config(service, method, 'put', data, apiCode));
	}

	static async delete(url, data = {}) {
		return await this.axiosCall(this.config(service, method, 'delete', data, apiCode));
	}

	static async get(url, data = {}) {
		return await this.axiosCall(this.config(url, 'get', data));
	}

	static config(url, type, data) {
		data = type == 'get' ? { params: data } : { data };
		let config = {
			method: type,
			url: base_URL + url,
			headers: {
				Accept: 'application/json',
				// 'x-api-key': apiCode,
			},
			...data,
		};
		// console.log(JSON.stringify(config));
		return config;
	}

	static async axiosCall(config) {
		let result = { data: null, status: null };
    
		await axios(config)
			.then((response) => {
				result.data = response.data.data;
				result.status = response.status;
			})
			.catch((error) => {
				if (error.response) {
					result.data = error.response.data;
					result.status = error.response.status;
				} else if (error.request) {
					result.data = error.request.data;
					result.status = error.request.status;
				} else {
					result.data = error.data;
					result.status = error.status;
				}
			});
		return result;
	}
}

module.exports = RequestService;
