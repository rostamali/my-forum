import httpReq from './http.service';

class HttpService {
	async getAll(url: string) {
		const data = await httpReq.getAll(url);
		return data;
	}
	async getSingle(url: string) {
		const { data } = await httpReq.getSingle(url);
		return data;
	}
	async create(url: string, body: any) {
		const data = await httpReq.create(url, body);
		return data;
	}
	async delete(url: string) {
		const data = await httpReq.delete(url);
		return data;
	}
	async update(url: string, body: any) {
		const data = await httpReq.update(url, body);
		return data;
	}
	async uploadFile(url: string, body: any) {
		const data = await httpReq.createMultipart(url, body);
		return data;
	}
	async updateFile(url: string, body: any) {
		const data = await httpReq.updateMultipart(url, body);
		return data;
	}
}

const ApiService = new HttpService();

export default ApiService;
