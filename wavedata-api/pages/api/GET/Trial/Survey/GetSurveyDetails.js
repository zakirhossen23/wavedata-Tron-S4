export default async function handler(req, res) {
	try {
		let FixCors = await import("../../../../../contract/fixCors.js");
		await FixCors.default(res);
	} catch (error) {}

	let useContract = await import("../../../../../contract/useContract.ts");
	const {contract, signerAddress} = await useContract.default();

	let survey_element = await contract._surveyMap(Number(req.query.surveyid)).call();
	var new_survey = {
		id: Number(survey_element.surveyId),
		trial_id: Number(survey_element.trialId),
		user_id: Number(survey_element.userId),
		name: survey_element.name,
		description: survey_element.description,
		date: survey_element.date,
		image: survey_element.image,
		reward: Number(survey_element.reward),
		submission: Number(survey_element?.submission)
	};
	let allCategory = [];

	let totalCategories = await contract._SurveyCategoryIds().call();
	for (let i = 0; i < Number(totalCategories); i++) {
		let element = await contract._categoryMap(Number(i)).call();
		allCategory.push({
			name: element.name,
			image: element.image
		});
	}

	let secionElement = await contract._sectionsMap(Number(req.query.surveyid)).call();
	let final = {
		Survey: new_survey,
		Sections: JSON.parse(secionElement),
		Categories: allCategory
	};

	res.status(200).json({status: 200, value: final});
	return;
}

