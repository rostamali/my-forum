import { BsSearch } from 'react-icons/bs';
const SearchField = () => {
	return (
		<>
			<div className="search-field">
				<div className="flex flex-col gap-2">
					<div className="relative w-full">
						<div className="absolute inset-y-0 left-3 flex items-center">
							<button type="button">
								<BsSearch className="text-lg text-[#3a35418a]" />
							</button>
						</div>
						<input
							type={'text'}
							className="bg-[#E2E7EA] h-[42px] outline-0 rounded-[3px] pl-10 ring-0 border border-[#E2E7EA] focus:border-[#2172CD] focus:right-0 min-w-[320px]"
							id={'search'}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchField;
