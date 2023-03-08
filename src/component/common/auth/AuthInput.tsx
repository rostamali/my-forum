import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';
import { IField } from '@/types';

interface AuthFormProps {
	register: UseFormRegister<FieldValues>;
	template: IField[];
	errors: FieldErrors;
}

const AuthInput: React.FC<AuthFormProps> = ({ register, template, errors }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			{template.map((field, index) => (
				<div key={index}>
					{field.type === 'password' ? (
						<div className="flex flex-col gap-2 mb-3">
							<label
								className="input__label"
								htmlFor={field.name}
							>
								{field.title}
							</label>
							<div className="relative w-full">
								<input
									type={showPassword ? 'text' : 'password'}
									className="input__field block w-full pr-[50px]"
									id={field.name}
									{...register(field.name)}
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
								name={field.name}
								render={({ message }) => (
									<p className="text-red-500 text-base italic font-medium font-mulish">
										{message}
									</p>
								)}
							/>
						</div>
					) : (
						<div className="input__group mb-6">
							<label
								htmlFor={field.name}
								className="input__label"
							>
								{field.title}
							</label>
							<input
								className="input__field"
								type={field.type}
								id={field.name}
								{...register(field.name)}
							/>
							<ErrorMessage
								errors={errors}
								name={field.name}
								render={({ message }) => (
									<p className="text-red-500 text-base italic font-medium font-mulish">
										{message}
									</p>
								)}
							/>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default AuthInput;
