export default async function handler(req, res) {
	try {
		let FixCors = await import("../../../contract/fixCors.js");
		await FixCors.default(res);
	} catch (error) {}

	let useContract = await import("../../../contract/useContract.ts");
	const {contract, signerAddress} = await useContract.default();
	
	let userdetails = await contract.getUserDetails(Number(req.query.userid)).call();
	let fhir_element = await contract._fhirMap(Number(userdetails[6])).call();
	var newFhir = {
		id: Number(fhir_element.userId),
		family_name: fhir_element.familyName,
		given_name: fhir_element.givenName,
		identifier: fhir_element.identifier,
		phone: fhir_element.phone,
		gender: fhir_element.gender,
		about: fhir_element.about,
		patient_id: fhir_element.patientId,
		privatekey: userdetails[4] + "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		image: fhir_element.image,
		credits: fhir_element.credits
	};
	if (newFhir.patient_id === "") {
		newFhir = null;
	}

	res.status(200).json({value: newFhir});
}

