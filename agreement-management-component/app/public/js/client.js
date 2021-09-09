async function eth_sign(contractId) {
	if (
		typeof window.ethereum !== "undefined" ||
		typeof window.web3 !== "undefined"
	) {
		const web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
		const account = (await web3.eth.getAccounts())[0];
		const hash = web3.utils.sha3(contractId);
		const signature = await web3.eth.sign(hash, account);

		if (signature) {
			// $("#console").text(signature);
			uploadClientSignature(account, contractId, hash, signature);
		}
	} else {
		$("#console").text("Metamask not detected");
	}
}

// Calls to the backend for blockchain signature
function uploadClientSignature(address, contractId, hash, signature) {
	$.post({
		url: "/api/blockchain/contracts/" + contractId + "/sign/client",
		data: JSON.stringify({
			address,
			hash,
			signature,
		}),
		dataType: "json",
		contentType: "application/json",
		success(response) {
			alert(
				"Contract has now been signed by both parties and stored on the blockchain."
			);
		},
		error(jqXHR, status, err) {
			console.log(jqXHR.responseJSON[0]);
			alert(jqXHR.responseJSON[0].message);
		},
	});
}
