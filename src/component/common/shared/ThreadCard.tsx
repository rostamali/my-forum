import { useDeleteData } from '@/hooks/useApi';
import { handleDeleteConfirm } from '@/utils/confirmation';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';

type ThreadCardType = {
	id: string;
	title: string;
	category: string;
	categoryBG: string;
	likes: number;
	replies: number;
	views: number;
	activity: string;
	author: string;
	slug: string;
	action: boolean;
};

const ThreadCard: React.FC<ThreadCardType> = ({
	id,
	title,
	category,
	categoryBG,
	likes,
	replies,
	views,
	author,
	slug,
	action,
}) => {
	const { mutate: deleteThread } = useDeleteData('userinfo');
	const handleDeleteThread = (id: string) => {
		handleDeleteConfirm('Want to delete?', 'Thread will be deleted').then(
			(result) => {
				if (result.isConfirmed) {
					deleteThread(`/api/thread/delete/${id}`);
				}
			},
		);
	};

	return (
		<>
			<div className="thread-card md:grid grid-cols-9 gap-4 bg-[#fff] py-4 px-6 border-b border-b-[#e1e7e9] hidden">
				<div className="user flex items-center">
					<Link
						href="/"
						className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
					>
						{author && author.substring(0, 1)}
					</Link>
				</div>
				<Link
					href={`/thread/${slug}`}
					className="col-span-3 flex items-center"
				>
					<h3 className="text-base text-[#303344] font-medium">
						{title && title.substr(0, 40)}...
					</h3>
				</Link>
				<div className="flex items-center justify-center">
					<span
						className="text-white text-sm font-normal rounded-[4px] py-1 px-2 capitalize"
						style={{
							backgroundColor: categoryBG,
						}}
					>
						{category}
					</span>
				</div>
				<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
					{likes}
				</h5>
				<h5 className="flex items-center justify-center text-base text-[#182730] font-medium">
					{replies}
				</h5>
				<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
					{views}
				</h5>
				<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
					{action ? (
						<div className="flex items-center gap-2">
							<Link
								href={`/thread/update/${id}`}
								className="bg-green-500 h-[30px] w-[30px] flex items-center justify-center rounded-md"
							>
								<TbEdit className="text-white text-lg" />
							</Link>
							<button
								className="bg-[#c53030] h-[30px] w-[30px] flex items-center justify-center rounded-md"
								onClick={() => handleDeleteThread(id)}
							>
								<BiTrash className="text-white text-lg" />
							</button>
						</div>
					) : (
						'1d'
					)}
				</h5>
			</div>
			<div className="thread-mobile md:hidden block py-3 px-3 bg-[#fff] border-b border-b-[#e1e7e9]">
				<div className="grid grid-cols-8">
					<div className="col-span-2 flex items-center">
						<Link
							href="/"
							className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
						>
							{author && author.substring(0, 1)}
						</Link>
					</div>
					<div className="col-span-5 flex flex-col items-start justify-center gap-3">
						<Link
							href={`/thread/${slug}`}
							className="col-span-3 flex items-center"
						>
							<h3 className="text-base text-[#303344] font-medium">
								{title && title.substr(0, 20)}...
							</h3>
						</Link>
						<span
							className="text-white text-sm font-normal rounded-[4px] py-1 px-2 capitalize"
							style={{
								backgroundColor: categoryBG,
							}}
						>
							{category}
						</span>
					</div>
					<div className="col-span-1 flex items-center justify-center">
						<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
							{views}
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default ThreadCard;
