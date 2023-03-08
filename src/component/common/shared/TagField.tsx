import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type TagFieldType = {
	defaultVal: string[];
	handler: any;
};

const TagField: React.FC<TagFieldType> = ({ defaultVal, handler }) => {
	const [tags, setTags] = useState<string[]>(defaultVal);
	const removeTags = (indexToRemove: number) => {
		setTags([...tags.filter((item, index) => index !== indexToRemove)]);
		handler([...tags.filter((item, index) => index !== indexToRemove)]);
	};
	const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (value !== '') {
			setTags([...tags, value]);
			handler([...tags, value]);
			(event.target as HTMLInputElement).value = '';
		}
	};
	return (
		<>
			<div className="tags-input flex items-center flex-wrap min-h-[40px] w-full px-[8px] py-[6px] border-0 bg-[#E2E7EA] focus-within:border-orange-dark rounded-sm">
				<ul id="tags" className="flex flex-wrap">
					{defaultVal.length > 0 &&
						defaultVal.map((tag, index) => (
							<li
								key={index}
								className="tag w-auto h-[32px] flex items-center justify-center gap-[6px] text-[#fff] list-none rounded-md px-2 ml-[8px] mb-[3px] bg-[#2171cd]"
							>
								<span className="tag-title text-sm font-medium text-white">
									{tag}
								</span>
								<button
									className="tag-close-icon"
									onClick={() => removeTags(index)}
									type="button"
								>
									<FaTimes className="text-[14px]" />
								</button>
							</li>
						))}
				</ul>
				<input
					id="tags"
					className="flex-1 bg-[#E2E7EA] h-[40px] rounded-sm px-3 outline-0 focus-visible:outline-0 focus:ring-0 border-0"
					type="text"
					onKeyUp={(event) =>
						event.key === 'Enter' ? addTags(event) : null
					}
					onKeyPress={(
						e: React.KeyboardEvent<
							HTMLInputElement | HTMLTextAreaElement
						>,
					) => {
						e.key === 'Enter' && e.preventDefault();
					}}
					placeholder="Press enter to add tags"
				/>
			</div>
		</>
	);
};

export default TagField;
