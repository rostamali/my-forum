import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useUpdateData } from '@/hooks/useApi';
import ButtonLoader from './ButtonLoader';
import { userInfoValidation } from '@/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import Router from 'next/router';

const SettingDrawer = ({ isOpen, setIsOpen, userInfo }: any) => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userInfoValidation),
		mode: 'onChange',
	});
	const { mutate: updateInfo, isLoading } = useUpdateData(['auth', 'user']);

	const onSubmit = async (data: any) => {
		updateInfo({
			url: '/api/auth/update/user',
			body: data,
		});
		Router.reload();
	};
	useEffect(() => {
		setValue('userName', userInfo.userName ? userInfo.userName : '');
		setValue('email', userInfo.email ? userInfo.email : '');
		setValue('location', userInfo.location ? userInfo.location : '');
		setValue('website', userInfo.website ? userInfo.website : '');
		setValue('about', userInfo.about ? userInfo.about : '');
	}, [setValue, userInfo]);

	return (
		<main
			className={
				' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
				(isOpen
					? ' transition-opacity opacity-100 duration-500 translate-x-0  '
					: ' transition-all delay-200 opacity-0 translate-x-full  ')
			}
		>
			<section
				className={
					' w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
					(isOpen ? ' translate-x-0 ' : ' translate-x-full ')
				}
			>
				<article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full px-12 py-10">
					<div className="header border-b border-b-[#E2E7EA] pb-6">
						<h3 className="text-[#303344] text-base font-semibold">
							User Setting
						</h3>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5">
							<span className="bg-[#73D2DE] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full">
								{userInfo.userName
									? userInfo.userName.substr(0, 1)
									: ''}
							</span>
						</div>
						{UserField.map((item, index) => (
							<div className="input__group mb-3" key={index}>
								<label
									htmlFor={item.name}
									className="create-thread-label text-[#182730] font-semibold text-base"
								>
									{item.label}
								</label>
								<input
									id={item.name}
									type={item.type}
									className="bg-[#E2E7EA] outline-0 border-0 h-[48px] rounded-sm px-3"
									{...register(item.name)}
								/>
								<ErrorMessage
									errors={errors}
									name={item.name}
									render={({ message }) => (
										<p className="text-red-500 text-sm font-normal">
											{message}
										</p>
									)}
								/>
							</div>
						))}
						<div className="input__group mb-3">
							<label
								htmlFor="about"
								className="create-thread-label text-[#182730] font-semibold text-base"
							>
								About
							</label>
							<textarea
								id="about"
								className="bg-[#E2E7EA] outline-0 border-0 h-[120px] rounded-sm px-3"
								placeholder="Few words about you"
								{...register('about')}
							/>
						</div>
						<div>
							<button
								className="bg-[#2171cd] h-[50px] text-white font-medium text-base rounded py-[12px] px-8"
								disabled={isLoading}
							>
								{isLoading ? <ButtonLoader /> : 'Save'}
							</button>
						</div>
					</form>
				</article>
			</section>
			<section
				className=" w-screen h-full cursor-pointer "
				onClick={() => {
					setIsOpen(false);
				}}
			></section>
		</main>
	);
};
const UserField = [
	{
		name: 'userName',
		label: 'Username',
		type: 'text',
	},
	{
		name: 'email',
		label: 'Email',
		type: 'email',
	},
	{
		name: 'location',
		label: 'Location',
		type: 'text',
	},
	{
		name: 'website',
		label: 'Website',
		type: 'url',
	},
];
export default SettingDrawer;
