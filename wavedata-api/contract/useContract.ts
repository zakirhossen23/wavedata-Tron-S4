
import TronWeb from 'tronweb';

export default async function useContract() {
	
	let contractInstance = {
		contract: null,
		signerAddress: null
	}

	const fullNode = 'https://api.nileex.io';
	const solidityNode = 'https://api.nileex.io';
	const eventServer = 'https://event.nileex.io';
	const privateKey = '1468f14005ff479c5f2ccde243ad3b85b26ff40d5a4f78f4c43c81a1b3f13a03';
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	contractInstance.signerAddress =  tronWeb.address.fromPrivateKey(privateKey);
	contractInstance.contract = await tronWeb.contract().at('TDefGcxmW5KEHybkF7JcA6gP8e8oazPkWm');

	return contractInstance;
}


export function base64DecodeUnicode(base64String) {
	return Buffer.from(base64String, "base64").toString('utf8');
}
