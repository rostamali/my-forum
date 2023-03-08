import SettingDrawer from '@/component/common/shared/SettingDrawer';
import UserAuthLayout from '@/component/layouts/UserAuthLayout';
import { Tabs } from 'flowbite-react';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { useDeleteData, useFetchData } from '../../hooks/useApi';
import Loader from '@/component/common/shared/Loader';
import NotFound from '@/component/common/shared/NotFound';
import ThreadCard from '@/component/common/shared/ThreadCard';
import { BiTrash } from 'react-icons/bi';
import { handleDeleteConfirm } from '@/utils/confirmation';

const User = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data, isLoading } = useFetchData(
		'/api/auth/dashboard',
		['userinfo'],
		1,
	);
	const { mutate: deleteComment, isLoading: isDeleting } =
		useDeleteData('userinfo');
	const handleDeleteReply = (id: string) => {
		handleDeleteConfirm('Want to delete?', 'Comment will be removed').then(
			(result) => {
				if (result.isConfirmed) {
					deleteComment(`/api/comment/deleteByUser/${id}`);
				}
			},
		);
	};

	return (
		<>
			<Head>
				<title>Welcome - My Account</title>
				<meta name="description" content="User Setting" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			{isLoading ? (
				<Loader />
			) : data.status === 'success' ? (
				<>
					<div id="user" className="py-20 bg-[#F1F3F5]">
						<div className="container">
							<div className="flex items-center justify-between">
								<div className="user-info flex items-center gap-2">
									<Link
										href="/"
										className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
									>
										{data.user &&
											data.user.userName.substring(0, 1)}
									</Link>
									<h3 className="text-base capitalize font-semibold text-[#182730]">
										{data.user && data.user.userName}
									</h3>
								</div>
								<div>
									<button onClick={() => setIsOpen(!isOpen)}>
										<AiTwotoneSetting className="text-xl text-[#656F73]" />
									</button>
								</div>
							</div>
							<Tabs.Group
								aria-label="User info"
								style="underline"
							>
								{data.threads.length > 0 ? (
									<Tabs.Item active={true} title="Threads">
										<div className="thread-list-header md:grid grid-cols-9 px-6 py-5 bg-white hidden">
											<h5 className="col-span-4 text-[#303344] font-medium text-sm">
												Topic
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Category
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Likes
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Replies
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Views
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Action
											</h5>
										</div>
										{data.threads.map(
											(
												item: {
													author: {
														userName: string;
													};
													category: {
														title: string;
														background: string;
													};
													comments: string[];
													upVote: string[];
													slug: string;
													tags: string[];
													title: string;
													topic: string;
													views: string[];
													_id: string;
												},
												index: number,
											) => (
												<ThreadCard
													key={index}
													id={item._id}
													title={item.title}
													category={
														item.category.title
													}
													categoryBG={
														item.category.background
													}
													likes={
														item.upVote
															? item.upVote.length
															: 0
													}
													replies={
														item.comments
															? item.comments
																	.length
															: 0
													}
													views={
														item.views
															? item.views.length
															: 0
													}
													activity={''}
													author={
														item.author.userName
													}
													slug={item.slug}
													action={true}
												/>
											),
										)}
									</Tabs.Item>
								) : (
									<Tabs.Item active={true} title="Threads">
										<h3>No Thread Found...</h3>
									</Tabs.Item>
								)}
								{data.replies.length > 0 ? (
									<Tabs.Item title="Replies">
										<div className="thread-list-header md:grid grid-cols-9 px-6 py-5 bg-white hidden">
											<h5 className="col-span-6 text-[#303344] font-medium text-sm">
												Topic
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center col-span-2 ">
												Created
											</h5>
											<h5 className="text-[#303344] font-medium text-sm text-center">
												Action
											</h5>
										</div>
										{data.replies.map(
											(
												item: {
													dateCreated: Date;
													text: string;
													thread: {
														title: string;
														slug: string;
													};
													upVote: string[];
													user: {
														userName: string;
													};
													_id: string;
												},
												index: number,
											) => (
												<div
													className="thread-card md:grid grid-cols-9 gap-4 bg-[#fff] py-4 px-6 border-b border-b-[#e1e7e9] hidden"
													key={index}
												>
													<div className="user flex items-center">
														<Link
															href="/"
															className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
														>
															{item.user &&
																item.user.userName.substring(
																	0,
																	1,
																)}
														</Link>
													</div>
													<Link
														href={`/thread/${item.thread.slug}`}
														className="col-span-5 flex flex-col gap-3"
													>
														<h3 className="text-base text-[#303344] font-medium">
															{item.thread
																.title &&
																item.thread.title.substr(
																	0,
																	40,
																)}
															...
														</h3>
														<p
															className="text-[#666f74] text-base font-normal user-replies-text text-ellipsis overflow-hidden w-[100%] h-[40px] whitespace-nowrap"
															dangerouslySetInnerHTML={{
																__html: item.text,
															}}
														></p>
													</Link>
													<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal col-span-2">
														{new Date(
															item.dateCreated,
														).toLocaleString(
															'en-US',
															{
																timeZone: 'UTC',
																year: '2-digit',
																month: 'short',
																day: 'numeric',
															},
														)}
													</h5>
													<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
														<button
															className="bg-[#c53030] h-[30px] w-[30px] flex items-center justify-center rounded-md"
															onClick={() =>
																handleDeleteReply(
																	item._id,
																)
															}
														>
															<BiTrash className="text-white text-lg" />
														</button>
													</h5>
												</div>
											),
										)}
									</Tabs.Item>
								) : (
									<Tabs.Item title="Replies">
										<h3>Noting Replies Found...</h3>
									</Tabs.Item>
								)}
							</Tabs.Group>
						</div>
					</div>
					<SettingDrawer
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						userInfo={data.user}
					/>
				</>
			) : (
				<NotFound text="Not Found" />
			)}
		</>
	);
};
User.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};

export default User;
