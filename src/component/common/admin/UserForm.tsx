import { useCreateData } from '@/hooks/useApi';
import { Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import ButtonLoader from '../shared/ButtonLoader';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { createUserValidator } from '@/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
type UserForm = {
	show: boolean;
	setShow: (value: boolean) => void;
};

const UserForm: React.FC<UserForm> = ({ show, setShow }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createUserValidator),
		mode: 'onChange',
	});
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: createUser, isLoading } = useCreateData(
		'/api/auth/createuser',
		'admin-users',
	);
	const onSubmit = (data: any) => {
		createUser(data);
	};

	return (
		<>
			<Modal
				dismissible={show}
				show={show}
				size="2xl"
				popup={true}
				onClose={() => setShow(false)}
				className="!z-[90]"
			>
				<Modal.Body className="!p-0 overflow-hidden rounded-xl">
					<div className="px-12 py-10">
						<h3 className="text-[#182730] font-semibold text-xl">
							Create User Account
						</h3>
						<form
							className="mt-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="input__group">
								<label
									htmlFor="useruserNamename"
									className="input__label"
								>
									Username
								</label>
								<input
									id="userName"
									type="text"
									className="input__field"
									{...register('userName')}
								/>
								<ErrorMessage
									errors={errors}
									name={'userName'}
									render={({ message }) => (
										<p className="text-red-500 text-base italic font-medium font-mulish">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="input__group mt-3">
								<label htmlFor="email" className="input__label">
									Email
								</label>
								<input
									id="email"
									type="email"
									className="input__field"
									{...register('email')}
								/>
								<ErrorMessage
									errors={errors}
									name={'email'}
									render={({ message }) => (
										<p className="text-red-500 text-base italic font-medium font-mulish">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="input__group mt-3">
								<label className="input__label" htmlFor="role">
									Role
								</label>
								<select
									id="role"
									{...register('role')}
									className="capitalize input__field"
								>
									<option value="default">Default</option>
									<option value="user">User</option>
									<option value="admin">Admin</option>
									<option value="moderator">moderator</option>
								</select>
								<ErrorMessage
									errors={errors}
									name={'role'}
									render={({ message }) => (
										<p className="text-red-500 text-base italic font-medium font-mulish">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2 mt-5">
								<label
									className="input__label"
									htmlFor="password"
								>
									Password
								</label>
								<div className="relative w-full">
									<input
										type={
											showPassword ? 'text' : 'password'
										}
										className="input__field block w-full pr-[50px]"
										id={'password'}
										{...register('password')}
									/>
									<div className="absolute inset-y-0 right-4 flex items-center pl-3">
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
										>
											{showPassword ? (
												<HiEyeOff className="text-xl text-[#3a35418a]" />
											) : (
												<HiEye className="text-xl text-[#3a35418a]" />
											)}
										</button>
									</div>
								</div>
								<ErrorMessage
									errors={errors}
									name={'password'}
									render={({ message }) => (
										<p className="text-red-500 text-base italic font-medium font-mulish">
											{message}
										</p>
									)}
								/>
							</div>
							<button
								className="bg-[#2172CD] w-full h-[52px] mt-4 text-white py-[10px] px-5 rounded text-lg"
								disabled={isLoading}
							>
								{isLoading ? <ButtonLoader /> : 'New User'}
							</button>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default UserForm;
