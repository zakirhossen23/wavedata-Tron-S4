
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}

  let useContract = await import("../../../../contract/useContract.ts");
	const {contract, signerAddress} = await useContract.default();
	let trial_id = await contract.GetOngoingTrial(Number(req.query.userid)).call();
	let totalTrials = await contract._TrialIds().call();

  let all_available_trials = [];
  for (let i = 0; i < Number(totalTrials); i++) {
    let trial_element = await contract._trialMap(Number(i)).call();

    var newTrial = {
      id: Number(trial_element.trial_id),
      title: trial_element.title,
      image: trial_element.image,
      description: trial_element.description,
      contributors: Number(trial_element.contributors),
      audience: Number(trial_element.audience),
      budget: Number(trial_element.budget),      
      permissions: (trial_element.permission),
    };
    if (trial_id !== "False") {
      if (Number(trial_id) !== newTrial.id)
        all_available_trials.push(newTrial);
    }else{
      all_available_trials.push(newTrial);
    }
  }
    res.status(200).json({ status: 200, value: JSON.stringify(all_available_trials) })
    return;
  
}
