import InfoLayout from '@/component/layouts/InfoLayout';
import Head from 'next/head';
import React, { ReactElement } from 'react';

const TermsPage = () => {
	return (
		<>
			<Head>
				<title>Terms of Service</title>
				<meta name="description" content="Terms of Service" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div id="terms" className="py-10 bg-[#F8F9FA]">
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
TermsPage.getLayout = function getLayout(page: ReactElement) {
	return <InfoLayout>{page}</InfoLayout>;
};
const text = [
	{
		title: `Terms of Service for My Forum`,
		desc: `Please read these terms and conditions carefully before using My Forum, an online forum platform operated by MD Rostam Ali. Your use of My Forum constitutes your agreement to these terms and conditions.`,
	},
	{
		title: `Registration and Account Security`,
		desc: `To use My Forum, you may need to register for an account and create a profile. You agree to provide accurate and complete information when you register, and to update your information promptly if it changes.
      </br></br>
      You are responsible for maintaining the security of your account and password, and for any activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.`,
	},
	{
		title: `User Conduct`,
		desc: `You are solely responsible for the content that you post on My Forum. You agree not to post any content that:</br></br>
      <ul>
      <li class="block mb-2">1. Is unlawful, harmful, or otherwise objectionable;</li>
      <li class="block mb-2">2. Infringes on any intellectual property or other rights of any person or entity;</li>
      <li class="block mb-2">3. Contains viruses or other harmful components;</li>
      <li class="block mb-2">3. Is false or misleading;</li>
      <li class="block mb-2">3. Harasses, abuses, or threatens others;</li>
      <li class="block mb-2">3. Violates any applicable laws or regulations.</li>
      </ul>
      </br>
      We reserve the right to remove any content that we determine, in our sole discretion, violates these terms and conditions or is otherwise inappropriate.
		`,
	},
	{
		title: `Intellectual Property`,
		desc: `You retain ownership of the content that you post on My Forum, but you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such content in any media now known or hereafter developed.
      </br></br>
      We respect the intellectual property rights of others, and we ask that you do the same. If you believe that your intellectual property rights have been infringed, please contact us at info@getsitedone.com.`,
	},
	{
		title: `Updates to These Terms and Conditions`,
		desc: `We may update these terms and conditions from time to time, and we will notify you of any changes by posting the new terms and conditions on our website. Your continued use of My Forum after the changes are posted will signify your acceptance of the new terms and conditions.`,
	},
	{
		title: `Contact Us`,
		desc: `If you have any questions or concerns about these terms and conditions, please`,
	},
];
export default TermsPage;
