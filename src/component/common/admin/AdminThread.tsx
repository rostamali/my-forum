import { useDeleteData } from '@/hooks/useApi';
import { handleDeleteConfirm } from '@/utils/confirmation';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';

type AdminThread = {
	author: { _id: string; userName: string };
	category: { _id: string; title: string; background: string };
	comments: string[];
	lastActivity: Date;
	title: string;
	upVote: string[];
	_id: string;
	status: boolean;
};

const AdminThread = ({ thread }: { thread: AdminThread[] }) => {
	const { mutate: deleteThread } = useDeleteData('admin-thread');
	const handleDeleteThread = (id: string) => {
		handleDeleteConfirm('Want to delete?', 'Thread will be deleted').then(
			(result) => {
				if (result.isConfirmed) {
					deleteThread(`/api/thread/admindelete/${id}`);
				}
			},
		);
	};

	return (
		<>
			<div className="user-card-wrapper">
				<div className="user-items-header grid grid-cols-9 px-6 py-5 bg-white">
					<h5 className="col-span-4 text-[#303344] font-medium text-base">
						Topic
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Category
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Last Activity
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Status
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Replies
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Action
					</h5>
				</div>
				{thread.map((item, index) => (
					<div className="user-item" key={index}>
						<div className="thread-card grid grid-cols-9 gap-4 bg-[#f1f3f5] py-5 px-6 border-b border-b-[#e1e7e9]">
							<div className="user flex items-center col-span-4 gap-4">
								<Link
									href="/"
									className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
								>
									D
								</Link>
								<h3 className="text-base text-[#303344] font-medium">
									{item.title && item.title.substr(0, 40)}...
								</h3>
							</div>
							<div className="flex items-center justify-center">
								<span
									className="text-white text-sm font-normal rounded-[4px] py-1 px-2 capitalize"
									style={{
										backgroundColor:
											item.category.background,
									}}
								>
									{item.category.title}
								</span>
							</div>
							<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
								{new Date(item.lastActivity).toLocaleString(
									'en-US',
									{
										timeZone: 'UTC',
										year: '2-digit',
										month: 'short',
										day: 'numeric',
									},
								)}
							</h5>
							<h5 className="flex items-center justify-center text-base text-[#182730] font-medium">
								{item.status ? (
									<span className="bg-green-200 py-[3px] px-[8px] rounded-sm">
										Publish
									</span>
								) : (
									<span className="bg-red-200 py-[3px] px-[8px] rounded-sm">
										Deleted
									</span>
								)}
							</h5>
							<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
								{item.comments ? item.comments.length : 0}
							</h5>
							<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
								<div className="flex items-center gap-2">
									<button
										className="bg-[#c53030] h-[30px] w-[30px] flex items-center justify-center rounded-md"
										onClick={() =>
											handleDeleteThread(item._id)
										}
									>
										<BiTrash className="text-white text-lg" />
									</button>
								</div>
							</h5>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AdminThread;
