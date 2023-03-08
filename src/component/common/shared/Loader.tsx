import { Spinner } from 'flowbite-react';

const Loader = () => {
	return (
		<>
			<div className="loader bg-[#F8F9FA] h-[400px]">
				<div className="container h-full">
					<div className="flex items-center justify-center h-full">
						<Spinner aria-label="Spinner button example" />
						<span className="pl-3 text-black font-normal">
							Loading...
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loader;
