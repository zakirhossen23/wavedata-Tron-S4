import { useState, useEffect } from 'react';
import TronWeb from 'tronweb';

declare let window;
export default function useContract() {
	const fetchData = async () => {
		await sleep(200);
		try {
			const contract = { contract: null, signerAddress: null, fD: fetchData };

			if (window.localStorage.getItem("type") === "tronlink"){
				contract.contract =  await window?.tronWeb?.contract().at('THMh2mtqGpEMWAjW2abJbSp2WUJH6uowFX');
				contract.signerAddress =  window?.tronWeb?.defaultAddress?.base58;
				window.contract = contract.contract;
				setContractInstance(contract);
			}else{
				const fullNode = 'https://api.trongrid.io';
				const solidityNode = 'https://api.trongrid.io';
				const eventServer = 'https://api.trongrid.io';
				const privateKey = '4913b179bdc903d0d7b64cc20c11fc095f5cfe3fe2b68499cbea1913a702df4c';
				const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
				contract.signerAddress =  tronWeb.address.fromPrivateKey(privateKey);
				contract.contract = await tronWeb.contract().at('THMh2mtqGpEMWAjW2abJbSp2WUJH6uowFX');
				window.contract = contract.contract;
				setContractInstance(contract);
			}
		} catch (error) {
			console.error(error);
		}
	};
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
		fD: fetchData,
	});
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	 }
	
	useEffect(() => {
		

		fetchData();
	}, []);

	return contractInstance;
}