
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}
  
  let useContract = await import("../../../../contract/useContract.ts");
  const {contract, signerAddress} = await useContract.default();

  let Trials = [];
  let TotalTrials = await contract._TrialIds().call();
  for (let i = 0; i < Number(TotalTrials); i++) {
    let trial_element = await contract._trialMap(Number(i)).call();

    var newTrial = {
      id: Number(trial_element.trial_id),
      title: trial_element.title,
      image: trial_element.image,
      description: trial_element.description,
      contributors: Number(trial_element.contributors),
      audience: Number(trial_element.audience),
      budget: Number(trial_element.budget),
      permissions: trial_element.permission,
    };
    Trials.push(newTrial);
  }
  res.status(200).json({ value: JSON.stringify(Trials) })
}
