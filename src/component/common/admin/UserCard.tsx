import { useDeleteData } from '@/hooks/useApi';
import { handleDeleteConfirm } from '@/utils/confirmation';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';

type UserCardType = {
	createdAt: Date;
	lastActivity: Date;
	isVerified: boolean;
	role: string;
	userName: string;
	_id: string;
};

const UserCard = ({ users }: { users: UserCardType[] }) => {
	const { mutate: deleteUser } = useDeleteData('admin-users');
	const handleDeleteUser = (id: string) => {
		handleDeleteConfirm('Want to delete?', 'User will be deleted').then(
			(result) => {
				if (result.isConfirmed) {
					deleteUser(`/api/auth/deleteuser/${id}`);
				}
			},
		);
	};

	return (
		<>
			<div className="user-card-wrapper">
				<div className="user-items-header grid grid-cols-9 px-6 py-5 bg-white">
					<h5 className="col-span-4 text-[#303344] font-medium text-base">
						User
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Join date
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Verified
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center col-span-2">
						Last Activity
					</h5>
					<h5 className="text-[#303344] font-medium text-base text-center">
						Action
					</h5>
				</div>
				{users.map((item, index) => (
					<div className="user-item" key={index}>
						<div className="thread-card grid grid-cols-9 gap-4 bg-[#f1f3f5] py-5 px-6 border-b border-b-[#e1e7e9]">
							<div className="user flex items-center col-span-4 gap-4">
								<Link
									href="/"
									className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
								>
									D
								</Link>
								<h3 className="flex items-center text-base text-[#303344] font-medium">
									@{item.userName}
								</h3>
							</div>

							<div className="flex items-center justify-center">
								{new Date(item.createdAt).toLocaleString(
									'en-US',
									{
										timeZone: 'UTC',
										year: '2-digit',
										month: 'short',
										day: 'numeric',
									},
								)}
							</div>
							<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
								{item.isVerified ? 'Verified' : 'Not Verified'}
							</h5>
							<h5 className="flex col-span-2 items-center justify-center text-base text-[#182730] font-medium">
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
							<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
								<div className="flex items-center gap-2">
									<button
										className="bg-[#c53030] h-[30px] w-[30px] flex items-center justify-center rounded-md"
										onClick={() =>
											handleDeleteUser(item._id)
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

export default UserCard;
