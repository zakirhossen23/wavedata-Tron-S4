
import TronWeb from 'tronweb';

	//Mainnet
	const fullNode = 'https://api.trongrid.io';
	const solidityNode = 'https://api.trongrid.io';
	const eventServer = 'https://api.trongrid.io';

	// //Nile
	// const fullNode = 'https://api.nileex.io';
	// const solidityNode = 'https://api.nileex.io';
	// const eventServer = 'https://event.nileex.io';

	//Shasta
	// const fullNode = 'https://api.shasta.trongrid.io';
	// const solidityNode = 'https://api.shasta.trongrid.io';
	// const eventServer = 'https://event.shasta.io';


	const privateKey = '4913b179bdc903d0d7b64cc20c11fc095f5cfe3fe2b68499cbea1913a702df4c';
	const contractAdd = 'THMh2mtqGpEMWAjW2abJbSp2WUJH6uowFX';
export default async function useContract() {
	
	let contractInstance = {
		contract: null,
		signerAddress: null
	}
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	contractInstance.signerAddress =  tronWeb.address.fromPrivateKey(privateKey);
	contractInstance.contract = await tronWeb.contract().at(contractAdd);

	return contractInstance;
}
export async function getContractFromKey(privateKey){
	
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	return  await tronWeb.contract().at(contractAdd);
}

export function base64DecodeUnicode(base64String) {
	return Buffer.from(base64String, "base64").toString('utf8');
}
