const AdminPageTitle = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => {
	return (
		<>
			<h2 className="admin-page-title text-3xl text-black font-semibold pb-2">
				{title}
			</h2>
			<span className="text-base font-medium text-[#0E0E23] hover:text-[#6259CA]">
				{subtitle}
			</span>
		</>
	);
};

export default AdminPageTitle;
