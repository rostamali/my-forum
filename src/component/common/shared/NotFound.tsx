import { Spinner } from 'flowbite-react';
import ButtonLoader from './ButtonLoader';

const NotFound = ({ text }: { text: string }) => {
	return (
		<>
			<div className="bg-[#F8F9FA] h-[400px]">
				<div className="container h-full">
					<h2 className="text-black text-xl font-medium flex items-center justify-center h-full flex-col gap-4 capitalize">
						<Spinner
							color="failure"
							aria-label="Failure spinner example"
						/>
						{text}
					</h2>
				</div>
			</div>
		</>
	);
};

export default NotFound;
