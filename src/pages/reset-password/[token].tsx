import Picture from '@/component/common/shared/Picture';
import { resetPasswordValidator } from '@/utils/validators';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { NextPageContext } from 'next';
import { useCreateData } from '@/hooks/useApi';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

const ResetPassword = ({ token }: { token: string }) => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState({
		newPassword: false,
		confirmPassword: false,
	});
	type ObjectKey = keyof typeof showPassword;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(resetPasswordValidator),
		mode: 'onChange',
	});

	const { mutate: resetPassword, isLoading } = useCreateData(
		'/api/auth/reset',
		'password',
	);

	const onSubmit = handleSubmit((user) => {
		user.token = token;
		resetPassword(user, {
			onSuccess: (res) => {
				setTimeout(() => {
					router.push('/login');
				}, 1800);
			},
		});
	});

	return (
		<>
			<Head>
				<title>Reset Password</title>
				<meta name="description" content="Unread Threads" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div
				id="reset-password"
				className="bg-[#F8F9FA] h-screen flex items-center"
			>
				<div className="container mx-auto">
					<div className="signup-form-wrapper bg-white sm:w-[420px] w-[100%] mx-auto sm:p-10 p-6">
						<Link href="/">
							<Picture
								link={'/assets/logo.png'}
								classList={'h-[55px] w-[50px]'}
								alt={'logo'}
							/>
						</Link>
						<h4 className="text-[#303344] text-lg font-semibold mt-5">
							Reset Password
						</h4>
						<p className="text-[#666f74] text-base font-normal mt-2">
							Create your new password
						</p>
						<span className="border-b border-b-[#E2E7EA] w-[100px] block my-5"></span>
						<form onSubmit={onSubmit}>
							{resetPass.map((item, index) => (
								<div
									className="flex flex-col gap-2 mb-4"
									key={index}
								>
									<label
										className="input__label"
										htmlFor={item.name}
									>
										{item.title}
									</label>
									<div className="relative w-full">
										<input
											type={
												showPassword[
													item.name as ObjectKey
												]
													? 'text'
													: 'password'
											}
											className="input__field block w-full pr-[50px]"
											id={item.name}
											{...register(item.name)}
										/>
										<div className="absolute inset-y-0 right-4 flex items-center pl-3">
											<button
												type="button"
												onClick={() =>
													setShowPassword({
														...showPassword,
														[item.name]:
															!showPassword[
																item.name as ObjectKey
															],
													})
												}
											>
												{showPassword[
													item.name as ObjectKey
												] ? (
													<HiEyeOff className="text-xl text-[#3a35418a]" />
												) : (
													<HiEye className="text-xl text-[#3a35418a]" />
												)}
											</button>
										</div>
									</div>
									<ErrorMessage
										errors={errors}
										name={item.name}
										render={({ message }) => (
											<p className="text-red-500 text-base italic font-medium font-mulish">
												{message}
											</p>
										)}
									/>
								</div>
							))}

							<button className="bg-[#2172CD] text-white block w-full rounded-sm h-[45px] text-base">
								Reset Password
							</button>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</>
	);
};
const resetPass = [
	{
		title: 'New Password',
		name: 'newPassword',
	},
	{
		title: 'Confirm Password',
		name: 'confirmPassword',
	},
];
export async function getServerSideProps(context: NextPageContext) {
	const { token } = context.query;
	return {
		props: { token },
	};
}
export default ResetPassword;
