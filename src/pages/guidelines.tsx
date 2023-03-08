import InfoLayout from '@/component/layouts/InfoLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Guidelines = () => {
	return (
		<>
			<Head>
				<title>My Forum Guidelines</title>
				<meta name="description" content="About MyForum" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div id="guidelines" className="py-10 bg-[#F8F9FA]">
				<div className="container mx-auto">
					{text.map((item, index) => (
						<div className="mt-4" key={index}>
							<h5 className="text-lg text-[#303344] font-semibold">
								{item.title}
							</h5>
							<p
								className="text-base font-normal text-[#666f74] mt-4"
								dangerouslySetInnerHTML={{
									__html: item.desc,
								}}
							></p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
Guidelines.getLayout = function getLayout(page: ReactElement) {
	return <InfoLayout>{page}</InfoLayout>;
};

const text = [
	{
		title: `Community Rules`,
		desc: `Envato is a community of creatives who come together to
		share ideas and help each other succeed.
		<br />
		<br />
		We invite you to join in, but do have a few rules. The
		rules and values below exist to help you understand what
		it means to be a member of the community and cover all
		aspects of community interaction on Envato forums,
		blogs, contests and events. We’re committed to upholding
		them, and we hope you will be too.`,
	},
	{
		title: `We believe when the community succeeds, we succeed.`,
		desc: `We love healthy competition, but feel we’re all better off when we’re sharing ideas, knowledge and skills and helping one another. We come to give back, not shamelessly self-promote.`,
	},
	{
		title: `We’re a global community of many types of people.`,
		desc: `We are from all corners of the earth and a glorious melting pot of creative fields, skill levels, cultures, religions and more. We think the opportunity for anyone to achieve success no matter where they come from leads to a more meritocratic and equal world.
		`,
	},
	{
		title: `We celebrate individuality and embrace diversity.`,
		desc: `We encourage different viewpoints as long as they’re presented in a way that’s constructive and respectful. Personal attacks as well as any behavior that is hateful or offensive based on race, ethnicity, national origin, religion, gender or sexual orientation are not okay.`,
	},
	{
		title: `We’re excited about and inspired by collaboration..`,
		desc: `By collaborating with people from different backgrounds, we are exposed to new ideas and perspectives that fuel the creative 
		process and innovation.`,
	},
	{
		title: `We’re always learning because we’re hungry and curious.`,
		desc: `We’re all students and teachers. Our world moves super fast and we stay ahead of the pack by pushing and pulling each other 
		forward. We don’t follow the trends, we make them.`,
	},
];

export default Guidelines;
