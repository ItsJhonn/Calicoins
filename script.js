// script.js

// Generar Código QR
document.getElementById('generateBtn').addEventListener('click', () => {
    const walletAddress = document.getElementById('walletAddress').value.trim();
    if (!walletAddress) {
        alert('Por favor, ingresa una dirección de wallet.');
        return;
    }

    // Limpiar QR anterior
    document.getElementById('qrcode').innerHTML = '';

    // Generar nuevo QR
    new QRCode(document.getElementById('qrcode'), {
        text: walletAddress,
        width: 200,
        height: 200,
    });
});

// Escanear Código QR
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Código QR escaneado: ${decodedText}`);
    html5QrcodeScanner.clear();
    sendTransaction(decodedText);
}

function onScanError(errorMessage) {
    // Puedes manejar los errores de escaneo aquí
    console.warn(`Error de escaneo: ${errorMessage}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 }, /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanError);

// Enviar Transacción usando Web3 y MetaMask
async function sendTransaction(toAddress) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();
            const fromAddress = accounts[0];

            const tx = {
                from: fromAddress,
                to: toAddress,
                value: web3.utils.toWei('0.01', 'ether'),
            };

            web3.eth.sendTransaction(tx)
                .on('transactionHash', function(hash){
                    console.log('Hash de la transacción:', hash);
                    alert('Transacción enviada con éxito. Hash: ' + hash);
                })
                .on('error', function(error){
                    console.error('Error en la transacción:', error);
                    alert('Error al enviar la transacción.');
                });
        } catch (error) {
            console.error('Error al conectar con MetaMask:', error);
            alert('Por favor, instala y conecta MetaMask.');
        }
    } else {
        alert('MetaMask no está instalado. Por favor, instala MetaMask para continuar.');
    }
}
