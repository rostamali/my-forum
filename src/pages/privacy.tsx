import InfoLayout from '@/component/layouts/InfoLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Privacy = () => {
	return (
		<>
			<Head>
				<title>Privacy Policy</title>
				<meta name="description" content="Privacy Policy" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div id="privacy" className="py-10 bg-[#F8F9FA]">
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
Privacy.getLayout = function getLayout(page: ReactElement) {
	return <InfoLayout>{page}</InfoLayout>;
};
const text = [
	{
		title: `Introduction`,
		desc: `Welcome to My Forum, an online forum platform operated by MD Rostam Ali. This Privacy Policy explains how we collect, use, and disclose personal information from users of our website. By using My Forum, you consent to the collection and use of your personal information as described in this policy.`,
	},
	{
		title: `Information We Collect`,
		desc: `We may collect personal information from you when you register for an account, create a profile, participate in discussions, or contact us through our website. This information may include your name, email address, and any other information you choose to provide.
      </br></br>
      We may also collect non-personal information, such as your IP address and browser type, to help us improve the performance and functionality of our website.`,
	},
	{
		title: `How We Use Your Information`,
		desc: `<b>We may use your personal information to:</b></br></br>
      <ul>
      <li class="block mb-2">1. Provide and improve our services, such as facilitating forum discussions and communicating with you about your account.</li>
      <li class="block mb-2">2. Personalize your user experience by showing you content and ads that match your interests.</li>
      <li class="block mb-2">3. Send you promotional materials or other communications that you may be interested in.</li>
      </ul>
      </br>
      We may also use your non-personal information to analyze trends and usage patterns, administer the website, and diagnose technical problems.
		`,
	},
	{
		title: `Disclosure of Information`,
		desc: `We may share your personal information with third-party service providers who help us operate our website and provide our services. We may also disclose your personal information if required by law or if we believe that such disclosure is necessary to protect our rights or the safety of others.
      </br></br>
      We may share non-personal information with third parties for analytics and advertising purposes.`,
	},
	{
		title: `Security`,
		desc: `We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no security system is perfect, and we cannot guarantee the security of your information.`,
	},
	{
		title: `Children's Privacy`,
		desc: `Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children under the age of 13.`,
	},
	{
		title: `Updates to This Policy`,
		desc: `We may update this Privacy Policy from time to time, and we will notify you of any changes by posting the new policy on our website. Your continued use of My Forum after the changes are posted will signify your acceptance of the new policy.`,
	},
	{
		title: `Contact Us`,
		desc: `If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <b><a href="mailto:info@getsitedone.com." target="_blank" class="underline">info@getsitedone.com.</a></b>`,
	},
];
export default Privacy;
