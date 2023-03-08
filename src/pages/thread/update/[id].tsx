import Loader from '@/component/common/shared/Loader';
import NotFound from '@/component/common/shared/NotFound';
import Picture from '@/component/common/shared/Picture';
import TagField from '@/component/common/shared/TagField';
const TextEditor = dynamic(
	() => import('@/component/common/shared/TextEditor'),
	{
		ssr: false,
	},
);
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import UserAuthLayout from '@/component/layouts/UserAuthLayout';
import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useFetchData, useUpdateData } from '@/hooks/useApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { NextPageContext } from 'next';
import ButtonLoader from '@/component/common/shared/ButtonLoader';

const UpdateThread = ({ id }: { id: string }) => {
	const { data, isLoading } = useFetchData(
		`/api/thread/singleById/${id}`,
		[id],
		1,
	);
	const { mutate: updateThread, isLoading: isUpdating } = useUpdateData([id]);
	const [description, setDescription] = useState<string>('');
	const [tag, setTag] = useState<string[]>([]);
	const { handleSubmit, register, watch, setValue } = useForm();
	const onSubmit = (info: any) => {
		info.description = description;
		info.tags = tag;
		if (info.tags.length === 0) {
			return toast.error('Tag is required');
		}
		if (info.category === 'default') {
			return toast.error('Category is required');
		}
		if (info.description.length < 30) {
			return toast.error('Description is required');
		}
		updateThread({
			url: `/api/thread/update/${data.thread._id}`,
			body: info,
		});
	};

	useEffect(() => {
		setValue(
			'title',
			isLoading ? '' : data.status === 'success' ? data.thread.title : '',
		);
		setValue(
			'topic',
			isLoading
				? 'discussion'
				: data.status === 'success'
				? data.thread.topic
				: 'discussion',
		);
		setValue(
			'category',
			isLoading
				? 'default'
				: data.status === 'success'
				? data.thread.category
				: 'default',
		);
		setTag(
			isLoading ? [] : data.status === 'success' ? data.thread.tags : [],
		);
		setDescription(
			isLoading
				? ''
				: data.status === 'success'
				? data.thread.description
				: '',
		);
	}, [data, isLoading, setValue]);
	return (
		<>
			<Head>
				<title>Update thread</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			{isLoading ? (
				<Loader />
			) : data.status === 'success' ? (
				data.thread && data.categorys.length > 0 ? (
					<section
						id="create-thread"
						className="bg-[#F8F9FA] pt-4 pb-24"
					>
						<div className="container mx-auto">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex items-center justify-between py-6 border-b border-b-[#e1e7e9]">
									<h3 className="text-[#303344] text-lg font-medium">
										Create New Topic
									</h3>
								</div>
								<div className="create-thread-wrapper pt-10">
									<div className="input__group">
										<label
											htmlFor="title"
											className="create-thread-label text-[#182730] font-semibold text-base"
										>
											Topic Title
										</label>
										<input
											id="title"
											type="text"
											className="bg-[#E2E7EA] outline-0 border-0 h-[48px] rounded-sm px-3"
											placeholder="Subject of your topic"
											{...register('title')}
										/>
									</div>
									<div className="mt-6">
										<label
											htmlFor=""
											className="create-thread-label text-[#182730] font-semibold text-base"
										>
											Topic Title
										</label>
										<div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-6 mt-5">
											{Topic.map((item, index) => (
												<label
													className={`topic__type group cursor-pointer ${
														watch('topic') ===
														item.id
															? 'bg-[#2171cd]'
															: 'bg-[#e1e7e9] hover:bg-[#2171cd]'
													}`}
													key={index}
													htmlFor={item.id}
												>
													<Picture
														link={`/assets/topic/${item.thumbnail}`}
														classList={
															'md:w-[80px] md:h-[80px] w-[60px] h-[60px]'
														}
														alt={''}
													/>
													<h6
														className={`topic__type-title  ${
															watch('topic') ===
															item.id
																? 'text-white'
																: 'text-[#182730]'
														}`}
													>
														{item.label}
													</h6>
													<input
														type="radio"
														id={item.id}
														value={item.id}
														className="hidden"
														{...register('topic')}
													/>
												</label>
											))}
										</div>
									</div>
									<div className="thread-body pt-6">
										<span className="create-thread-label text-[#182730] font-semibold text-base">
											Topic Body
										</span>
										<TextEditor
											defaultVal={EditorState.createWithContent(
												ContentState.createFromBlockArray(
													convertFromHTML(
														isLoading
															? ''
															: data.status ===
															  'success'
															? data.thread.description.replace(
																	/<p>(\s|&nbsp;)*<\/p>/g,
																	'&nbsp;',
															  )
															: '',
													).contentBlocks,
													convertFromHTML(
														isLoading
															? ''
															: data.status ===
															  'success'
															? data.thread.description.replace(
																	/<p>(\s|&nbsp;)*<\/p>/g,
																	'&nbsp;',
															  )
															: '',
													).entityMap,
												),
											)}
											handler={setDescription}
										/>
									</div>
									<div className="thread-meta pt-6 grid md:grid-cols-3 grid-cols-1 md:gap-8">
										<div className="input__group col-span-1">
											<label
												htmlFor="category"
												className="create-thread-label text-[#182730] font-semibold text-base"
											>
												Category
											</label>
											<select
												id="category"
												className="bg-[#E2E7EA] outline-0 h-[52px] border-0 rounded-sm px-3 capitalize"
												{...register('category')}
												defaultValue={'default'}
											>
												<option
													disabled
													value="default"
												>
													Default
												</option>
												{data.categorys.map(
													(
														item: {
															_id: string;
															title: string;
														},
														index: number,
													) => (
														<option
															value={item._id}
															key={index}
															className="capitalize"
														>
															{item.title}
														</option>
													),
												)}
											</select>
										</div>
										<div className="input__group col-span-2 md:mt-0 mt-3">
											<label
												htmlFor="tags"
												className="create-thread-label text-[#182730] font-semibold text-base"
											>
												Tags
											</label>
											<TagField
												defaultVal={tag}
												handler={setTag}
											/>
										</div>
									</div>
									<div className="mt-6 flex items-center justify-end">
										<button
											className="bg-[#2171cd] h-[48px] min-w-[140px] text-white font-medium text-base rounded py-[12px] px-8"
											disabled={isUpdating}
										>
											{isUpdating ? (
												<ButtonLoader />
											) : (
												'Update Post'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</section>
				) : (
					<NotFound text="Category not found" />
				)
			) : (
				<NotFound text="Category not found" />
			)}
		</>
	);
};
UpdateThread.getInitialProps = async (ctx: NextPageContext) => {
	const { id } = ctx.query;
	return { id };
};
const Topic = [
	{
		label: 'Discussion',
		thumbnail: 'discussion.svg',
		id: 'discussion',
	},
	{
		label: 'Question',
		thumbnail: 'question.svg',
		id: 'question',
	},
	{
		label: 'Poll',
		thumbnail: 'pool.svg',
		id: 'poll',
	},
	{
		label: 'Image Gallery',
		thumbnail: 'image.svg',
		id: 'image-gallery',
	},
	{
		label: 'Video',
		thumbnail: 'video.svg',
		id: 'video',
	},
	{
		label: 'Other',
		thumbnail: 'other.svg',
		id: 'other',
	},
];
UpdateThread.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};
export default UpdateThread;