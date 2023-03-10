import AuthInput from '@/component/common/auth/AuthInput';
import Picture from '@/component/common/shared/Picture';
import Link from 'next/link';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useCreateData } from '@/hooks/useApi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonLoader from '@/component/common/shared/ButtonLoader';
import { ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
	const forgotValidation = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(forgotValidation),
		mode: 'onChange',
	});
	const { mutate: forgetPassword, isLoading } = useCreateData(
		'/api/auth/forget',
		'password',
	);
	const onSubmit = handleSubmit((user) => {
		forgetPassword(user);
	});

	return (
		<>
			<Head>
				<title>Forget Password</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<section
				id="signup"
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
							Want to new password?
						</h4>
						<p className="text-[#666f74] text-base font-normal mt-2">
							Write your email address for getting the reset
							password link.
						</p>
						<span className="border-b border-b-[#E2E7EA] w-[100px] block my-5"></span>
						<form onSubmit={onSubmit}>
							<AuthInput
								register={register}
								template={signupTemplate}
								errors={errors}
							/>
							<button
								className="bg-[#2172CD] text-white block w-full rounded-sm h-[45px] text-base"
								disabled={isLoading}
							>
								{isLoading ? <ButtonLoader /> : 'Send Now'}
							</button>
						</form>
						<div className="auth-form-footer pt-6">
							<p className="text-[#666f74] text-base font-normal ">
								Don&apos;t have an account?
								<Link
									href="/signup"
									className="text-[#2172CD] ml-1"
								>
									Signup here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
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
const signupTemplate = [
	{
		title: 'Email Address',
		name: 'email',
		type: 'email',
	},
];
export default ForgotPassword;
