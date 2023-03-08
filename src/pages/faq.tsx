import InfoLayout from '@/component/layouts/InfoLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Faq = () => {
	return (
		<>
			<Head>
				<title>Frequently Asked Questions</title>
				<meta name="description" content="Frequently Asked Questions" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div id="faq" className="py-10 bg-[#F8F9FA]">
				<div className="container mx-auto">
					{accordionData.map((item, index: number) => (
						<div className="mt-4" key={index}>
							<h5 className="text-lg text-[#303344] font-semibold">
								{item.heading}
							</h5>
							<p
								className="text-base font-normal text-[#666f74] mt-4"
								dangerouslySetInnerHTML={{
									__html: item.content as string,
								}}
							></p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
Faq.getLayout = function getLayout(page: ReactElement) {
	return <InfoLayout>{page}</InfoLayout>;
};
const accordionData = [
	{
		heading: 'What is My Forum?',
		content: `My Forum is an online forum platform that allows users to create and participate in discussions on a wide range of topics.`,
	},
	{
		heading: 'How do I create an account?',
		content: `To create an account, click the "Sign Up" button on the My Forum homepage and follow the prompts. You will need to provide some basic information and create a username and password.`,
	},
	{
		heading: 'Is My Forum free to use?',
		content: `Yes, My Forum is free to use for all registered users.`,
	},
	{
		heading: `What types of topics can I discuss on My Forum?`,
		content: `You can discuss almost any topic on My Forum, as long as it is within the bounds of our terms and conditions. Some popular topics include technology, sports, politics, and entertainment.`,
	},
	{
		heading: `How do I start a new discussion thread?`,
		content: `To start a new discussion thread, go to the relevant forum section and click the "New Thread" button. Give your thread a title and start writing your post.`,
	},
	{
		heading: `Can I upload images or videos to my posts?`,
		content: `Yes, you can upload images and videos to your posts by using the image or video upload buttons in the post editor.`,
	},
	{
		heading: `Can I report inappropriate content or behavior?`,
		content: `Yes, if you see any content or behavior that violates our terms and conditions, please report it to us by using the "Report" button or by contacting us at info@getsitedone.com.`,
	},
	{
		heading: `How do I edit or delete my posts?`,
		content: `To edit or delete your posts, go to the post and click the "Edit" or "Delete" button. Please note that you may not be able to edit or delete posts that have already been replied to by other users.`,
	},
	{
		heading: `How can I contact the My Forum team?`,
		content: `You can contact us by using the "Contact Us" form on the My Forum website, or by sending an email to info@getsitedone.com.`,
	},
];
export default Faq;
