import AuthInput from '@/component/common/auth/AuthInput';
import ButtonLoader from '@/component/common/shared/ButtonLoader';
import Picture from '@/component/common/shared/Picture';
import { useCreateData } from '@/hooks/useApi';
import { signinValidation } from '@/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinValidation),
		mode: 'onChange',
	});
	const { mutate: signin, isLoading } = useCreateData(
		'/api/auth/signin',
		'user',
	);
	const onSubmit = handleSubmit((user) => {
		signin(user, {
			onError: (err: any) => {
				toast.error(err.response.data.message);
			},
		});
	});

	return (
		<>
			<Head>
				<title>Login to your account</title>
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
							Welcome to MyForum
						</h4>
						<p className="text-[#666f74] text-base font-normal mt-2">
							Log into your account to unlock true power of
							community.
						</p>
						<span className="border-b border-b-[#E2E7EA] w-[100px] block my-5"></span>
						<form onSubmit={onSubmit}>
							<AuthInput
								register={register}
								template={signupTemplate}
								errors={errors}
							/>
							<Link href="/forgot-password">
								<span className="text-[#666f74] hover:text-[#2172CD] text-base font-medium mb-3 block">
									Forgot Password
								</span>
							</Link>
							<button
								className="bg-[#2172CD] text-white block w-full rounded-sm h-[45px] text-base"
								disabled={isLoading}
							>
								{isLoading ? <ButtonLoader /> : 'Log in'}
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
							<span className="border-b border-b-[#E2E7EA] w-[80px] block my-5"></span>
							<span className="text-[#666f74] text-sm font-normal">
								By signing up, signing in or continuing. I agree
								to MyForum&apos;s{' '}
								<Link
									href="/terms-of-service"
									className="text-[#2172CD]"
								>
									Terms of use
								</Link>{' '}
								and{' '}
								<Link
									href="/privacy"
									className="text-[#2172CD]"
								>
									Privacy Policy
								</Link>
							</span>
						</div>
					</div>
				</div>
			</section>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={true}
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
		title: 'Email',
		name: 'email',
		type: 'email',
	},
	{
		title: 'Password',
		name: 'password',
		type: 'password',
	},
];

export default Login;
