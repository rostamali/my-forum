import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
	baseURL: process.env.BASE_URL,
	timeout: 25000,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json',
	},
	withCredentials: true,
};
export const instance: AxiosInstance = axios.create(axiosConfig);

class axiosReq {
	async getAll(url: string) {
		return await instance.get(url).then((res) => res.data);
	}
	async getSingle(url: string) {
		return await instance.get(url).then((res) => res.data);
	}
	async create(url: string, data: any) {
		return await instance.post<any>(url, data).then((res) => res.data);
	}
	async createMultipart(url: string, data: any) {
		return await instance
			.post<any>(url, data, {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			})
			.then((res) => res.data);
	}
	async updateMultipart(url: string, data: any) {
		return await instance
			.put(url, data, {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			})
			.then((res) => res.data);
	}
	async update(url: string, data: any) {
		return await instance.put(url, data).then((res) => res.data);
	}
	async delete(url: string) {
		return await instance.delete(url).then((res) => res.data);
	}
}
const httpReq = new axiosReq();

export default httpReq;
