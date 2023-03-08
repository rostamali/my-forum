import { Modal } from 'flowbite-react';
import { useState } from 'react';
import TagField from '../shared/TagField';
import { useForm } from 'react-hook-form';
import { useCreateData } from '@/hooks/useApi';
import { toast } from 'react-toastify';
import ButtonLoader from '../shared/ButtonLoader';

type CategoryForm = {
	show: boolean;
	setShow: (value: boolean) => void;
};

const CategoryForm: React.FC<CategoryForm> = ({ show, setShow }) => {
	const [tags, setTags] = useState<string[]>([]);
	const { handleSubmit, register, reset } = useForm();
	const { mutate: createCategory, isLoading } = useCreateData(
		'/api/category/create',
		'categories',
	);
	const onSubmit = (data: any) => {
		if (tags.length === 0) {
			return toast.success('Tag is required');
		} else {
			data.tags = tags;
			createCategory(data);
			reset();
		}
		setTags([]);
	};

	return (
		<>
			<Modal
				dismissible={show}
				show={show}
				size="2xl"
				popup={true}
				onClose={() => [setShow(false), setTags([])]}
				className="!z-[90]"
			>
				<Modal.Body className="!p-0 overflow-hidden rounded-xl">
					<div className="px-12 py-10">
						<h3 className="text-[#182730] font-semibold text-xl">
							Create Category
						</h3>
						<form
							className="mt-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="input__group">
								<label htmlFor="title" className="input__label">
									Title
								</label>
								<input
									type="text"
									id="title"
									className="bg-[#E2E7EA] h-[45px] outline-none rounded-[3px] pl-3 ring-0 border border-[#E2E7EA] focus:border-[#2172CD] focus:ring-0 min-w-[220px] focus-visible:outline-none"
									{...register('title')}
								/>
							</div>
							<div className="input__group mt-4">
								<label htmlFor="" className="input__label">
									Tags
								</label>
								<TagField defaultVal={tags} handler={setTags} />
							</div>
							<div className="input__group mt-4">
								<label
									htmlFor="background"
									className="input__label"
								>
									Background
								</label>
								<input
									type="color"
									id="background"
									className="bg-[#E2E7EA] h-[45px] outline-none rounded-[3px] pl-3 ring-0 border border-[#E2E7EA] focus:border-[#2172CD] focus:ring-0 focus-visible:outline-none cursor-pointer"
									{...register('background')}
								/>
							</div>
							<div className="input__group mt-4">
								<label
									htmlFor="description"
									className="input__label"
								>
									Description
								</label>
								<textarea
									id="description"
									className="bg-[#E2E7EA] h-[120px] outline-none rounded-[3px] pl-3 ring-0 border border-[#E2E7EA] focus:border-[#2172CD] focus:ring-0 min-w-[220px] focus-visible:outline-none"
									{...register('description')}
								></textarea>
							</div>
							<button
								className="bg-[#2172CD] w-full h-[52px] mt-4 text-white py-[10px] px-5 rounded text-base "
								disabled={isLoading}
							>
								{isLoading ? (
									<ButtonLoader />
								) : (
									'Create Category'
								)}
							</button>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CategoryForm;
