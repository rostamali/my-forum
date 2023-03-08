import ApiService from 'src/HttpService/ApiService';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

export const useFetchData = (url: string, key: string[], page: number) => {
	return useQuery([...key, page], () => ApiService.getAll(url), {
		keepPreviousData: true,
		staleTime: 5000,
		onSuccess: (data: any) => {},
		onError: (err: any) => {
			toast.error(err.response.data.message);
		},
	});
};
export const useCreateData = (url: string, key: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		async (data: any) => await ApiService.create(url, data),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries([key]);
				toast.success(res.message);
			},
			onError: (err: any) => {
				toast.error(err.response.data.message);
			},
		},
	);
};
export const useUploadFile = () => {
	const queryClient = useQueryClient();
	return useMutation(
		async (data: any) => await ApiService.uploadFile(data.url, data.body),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries(['images']);
				toast.success(res.message);
			},
			onError: (err: any) => {
				toast.error(err.response.data.message);
			},
		},
	);
};
export const useUpdateData = (key: string[]) => {
	const queryClient = useQueryClient();
	return useMutation(
		async (data: any) => await ApiService.update(data.url, data.body),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries([...key]);
				toast.success(res.message);
			},
			onError: (err: any) => {
				toast.success(err.response.data.message);
			},
		},
	);
};
export const useUpdateMultipartData = (key: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		async (data: any) => await ApiService.updateFile(data.url, data.body),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries([key]);
				toast.success(res.message);
			},
			onError: (err: any) => {
				toast.success(err.response.data.message);
			},
		},
	);
};
export const useDeleteData = (key: string) => {
	const queryClient = useQueryClient();
	return useMutation(async (url: string) => await ApiService.delete(url), {
		onSuccess: (res) => {
			queryClient.invalidateQueries([key]);
			toast.success(res.message);
		},
		onError: (err: any) => {
			toast.error(err.response.data.message);
		},
	});
};
