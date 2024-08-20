const openMetaMaskButton = document.getElementById('openMetaMaskButton');
const connectButton = document.getElementById('connectButton');
const verifyTransactionButton = document.getElementById('verifyTransactionButton');
const sendButton = document.getElementById('sendButton');
const qrValueInput = document.getElementById('qrValue');
const amountInput = document.getElementById('amount');
const accountInfo = document.getElementById('accountInfo');
const qrCodeDiv = document.getElementById('qr-code');
const startScanButton = document.getElementById('startScan');
const qrReader = document.getElementById('qrReader');
const video = document.getElementById('video');
let web3;
let userAccount;
let codeReader = new ZXing.BrowserQRCodeReader();

// Botón para abrir MetaMask en móviles
openMetaMaskButton.addEventListener('click', () => {
    if (isMobile()) {
        window.location.href = 'https://metamask.app.link/dapp/calicoins.netlify.app/';
    } else {
        alert('Este botón es solo para dispositivos móviles.');
    }
});

// Botón para conectar la wallet de MetaMask
connectButton.addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const networkId = await web3.eth.net.getId();
            if (networkId !== 11155111) { // ID de la red CaliCoins
                await switchToCaliCoinsNetwork();
            }
            const accounts = await web3.eth.requestAccounts();
            userAccount = accounts[0];
            accountInfo.textContent = `Conectado como: ${userAccount}`;
            qrValueInput.value = userAccount;
            generateQRCode(userAccount);
            verifyTransactionButton.style.display = 'block';
        } catch (error) {
            console.error("Acceso a la cuenta denegado por el usuario o error al cambiar de red");
        }
    } else {
        alert('Por favor, instala MetaMask');
    }
});

// Botón para verificar la transacción en Etherscan
verifyTransactionButton.addEventListener('click', () => {
    if (userAccount) {
        const etherscanUrl = `https://sepolia.etherscan.io/address/${userAccount}`;
        if (isMobile()) {
            window.location.href = etherscanUrl;
        } else {
            window.open(etherscanUrl, '_blank');
        }
    } else {
        alert('Conecta MetaMask primero.');
    }
});

// Enviar CaliCoins
sendButton.addEventListener('click', async () => {
    const qrValue = qrValueInput.value;
    const amount = amountInput.value;
    if (userAccount && qrValue && amount) {
        try {
            const transactionParameters = {
                to: qrValue,
                from: userAccount,
                value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            };
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log('Transacción enviada con hash:', txHash);
        } catch (error) {
            console.error('Error en la transacción', error);
        }
    } else {
        alert('Por favor, conecta MetaMask, introduce la dirección y la cantidad.');
    }
});

// Generar QR Code
function generateQRCode(account) {
    qrCodeDiv.innerHTML = '';
    $('#qr-code').qrcode({
        text: account
    });
}

// Iniciar escaneo de QR
startScanButton.addEventListener('click', () => {
    qrReader.style.display = 'block'; // Mostrar el lector de QR
    codeReader.decodeFromVideoDevice(null, 'video', (result, error) => {
        if (result) {
            qrValueInput.value = result.text;
            alert('Escaneo exitoso: ' + result.text);
            codeReader.reset();
            qrReader.style.display = 'none'; // Ocultar el lector de QR después del escaneo exitoso

            // Conectar automáticamente la wallet si se escanea una dirección válida
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
                web3.eth.getAccounts().then(accounts => {
                    userAccount = accounts[0];
                    if (result.text === userAccount) {
                        accountInfo.textContent = `Conectado como: ${userAccount}`;
                    } else {
                        alert('La cuenta escaneada no coincide con la cuenta conectada.');
                    }
                });
            } else {
                alert('Por favor, instala MetaMask');
            }
        }
        if (error && !(error instanceof ZXing.NotFoundException)) {
            console.error(error);
        }
    }, {
        delayBetweenScanAttempts: 0,  // Sin retraso entre intentos de escaneo
        video: {
            facingMode: 'environment'
        }
    });
});

// Comprobar si es un dispositivo móvil
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Cambiar a la red CaliCoins en MetaMask
async function switchToCaliCoinsNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0xaa36a7',
                            chainName: 'CaliCoins Testnet',
                            rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
                            nativeCurrency: {
                                name: 'CaliCoin',
                                symbol: 'CALI',
                                decimals: 18,
                            },
                            blockExplorerUrls: ['https://sepolia.etherscan.io'],
                        },
                    ],
                });
            } catch (addError) {
                console.error('Error al añadir la red CaliCoins:', addError);
            }
        }
    }
}window.addEventListener("load", function() {
    initHeader();
  
  });
  
  function initHeader() {
    initTopBar();
  }
  
  // Barra superior
  function initTopBar() {
    const translateElement = document.querySelector(".idioma-icon-barra-superior-govco");
    translateElement.addEventListener("click", translate, false);
  
    function translate() {
        // ... // Implementar traducción
    }
  }
