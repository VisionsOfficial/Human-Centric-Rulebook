async function eth_sign(contractId){
    if (typeof window.ethereum !== 'undefined'
      || (typeof window.web3 !== 'undefined')) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const account = (await web3.eth.getAccounts())[0];
      const data = web3.utils.sha3(contractId);
      const signature = await web3.eth.sign(data, account);

      if(signature) {
        $('#console').text(signature);
        uploadClientSignature(contractId, data, signature);
      }

    } else {
      $('#console').text("Metamask not detected");
    }
}

// Calls to the backend for blockchain signature
function uploadClientSignature(contractId, hash, signature) {

  $.post({
      url: "/blockchain/contracts/"+contractId+"/sign/client",
      data: JSON.stringify({
          hash,
          signature
      }),
      dataType: 'json',
      contentType: 'application/json',
      success(response) {
          console.log(response);
      },
      error(jqXHR, status, err) {
          console.log(jqXHR);
          console.log(status);
          console.log(err);
      }
  });
}

function uploadProviderSignature() {

}