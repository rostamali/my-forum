import { Pagination } from 'flowbite-react';
type Pagination = {
	currentpage: number;
	totalPage: number;
	handler: (value: number) => void;
};

const CustomPagination: React.FC<Pagination> = ({
	currentpage,
	totalPage,
	handler,
}) => {
	return (
		<>
			<Pagination
				currentPage={currentpage}
				onPageChange={(val) => handler(val)}
				showIcons={true}
				totalPages={totalPage}
				className="custom-pagination"
				previousLabel="Prev"
				nextLabel="Next"
			/>
		</>
	);
};

export default CustomPagination;
