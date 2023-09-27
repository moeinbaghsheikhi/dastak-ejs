const axios = require('axios');
const base_URL = process.env.API_URL

class RequestService {
	static async post(url, data = {}, header= "") {
		return await this.axiosCall(this.config(service, method, 'post', data, header));
	}

	static async put(url, data = {}, header= "") {
		return await this.axiosCall(this.config(service, method, 'put', data, header));
	}

	static async delete(url, data = {}, header= "") {
		return await this.axiosCall(this.config(service, method, 'delete', data, header));
	}

	static async get(url, data = {}, header= "") {
		return await this.axiosCall(this.config(url, 'get', data, header));
	}

	static config(url, type, data, header) {
		data = type == 'get' ? { params: data } : { data };
		let config = {
			method: type,
			url: base_URL + url,
			headers: {
				Accept: 'application/json',
				// 'x-api-key': apiCode,
				Authorization: "Bearer "+ header
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
				result.data = response.data.result;
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
