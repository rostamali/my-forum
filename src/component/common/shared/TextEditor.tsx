import dynamic from 'next/dynamic';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
const Editor = dynamic(
	() => import('react-draft-wysiwyg').then((module) => module.Editor),
	{
		ssr: false,
	},
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type DraftType = {
	defaultVal: any;
	handler: any;
};

const TextEditor: React.FC<DraftType> = ({ handler, defaultVal }) => {
	const [editorState, setEditorState] = useState(
		defaultVal ? defaultVal : EditorState.createEmpty(),
	);

	const onEditorStateChange = (event: any) => {
		setEditorState(event);
		handler(draftToHtml(convertToRaw(event.getCurrentContent())));
	};
	return (
		<>
			<Editor
				editorState={editorState}
				placeholder="Lets get started"
				toolbarClassName="rich-text-editor__toolbar !border-0 !bg-transparent"
				wrapperClassName="wrapperClassName w-full"
				editorClassName="rich-text-editor border-0 px-4 text-[#0E0E23] bg-[#E2E7EA] rounded-sm"
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					options: ['inline', 'blockType', 'list', 'link', 'image'],
					list: {
						inDropdown: false,
						options: ['unordered'],
						unordered: {
							visible: true,
							icon: '/assets/icons/list.png',
						},
					},
					inline: {
						inDropdown: false,
						options: ['bold', 'italic'],
						bold: {
							visible: true,
							icon: '/assets/icons/bold.png',
						},
						italic: {
							visible: true,
							icon: '/assets/icons/italic.png',
						},
					},
					blockType: {
						inDropdown: false,
						className: 'custom-icon-block',
						options: ['H4', 'Blockquote', 'Code'],
					},
					link: {
						link: {
							visible: true,
							icon: '/assets/icons/link.png',
						},
					},
					image: {
						visible: true,
						icon: '/assets/icons/image.png',
						fileUpload: true,
						url: true,
					},
				}}
			/>
		</>
	);
};

export default TextEditor;
