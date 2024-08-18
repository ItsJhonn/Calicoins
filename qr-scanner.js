// web3Service.js
async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            return accounts[0];
        } catch (error) {
            console.error('User rejected the request:', error);
            alert('Necesitas conectar MetaMask para continuar.');
        }
    } else {
        alert('MetaMask no está instalado. Por favor, instala MetaMask.');
    }
}

async function sendTransaction(toAddress) {
    const web3 = new Web3(window.ethereum);

    try {
        const fromAddress = await connectToMetaMask();
        const tx = {
            to: toAddress,
            from: fromAddress,
            value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
        };

        const txHash = await web3.eth.sendTransaction(tx);
        console.log('Transaction hash:', txHash);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}
