import Image from 'next/image';

type PictureType = {
	link: string;
	classList: string;
	alt: string;
};

const Picture: React.FC<PictureType> = ({ link, classList, alt }) => {
	return (
		<>
			<div
				className={`relative overflow-hidden ${
					classList ? classList : ''
				}`}
			>
				<Image
					src={link}
					alt={alt}
					sizes="(max-width: 100%) 100vw, 50vw"
					fill
					quality={100}
					className="object-cover w-full h-full"
					priority={false}
				/>
			</div>
		</>
	);
};

export default Picture;
