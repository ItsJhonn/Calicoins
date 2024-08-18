// qr-generator.js
function generateQRCode() {
    const walletAddress = document.getElementById('walletAddress').value;
    if (walletAddress === '') {
        alert('Por favor, ingresa una dirección de wallet.');
        return;
    }

    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';  // Limpiar QR previo si existe

    new QRCode(qrcodeContainer, {
        text: walletAddress,
        width: 200,
        height: 200,
    });
}
