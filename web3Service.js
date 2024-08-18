const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configura Web3 con el proveedor de Infura
const web3 = new Web3(process.env.INFURA_URL);

// Clave privada de la cuenta principal desde la cual se enviará el Sepolia
const privateKey = process.env.PRIVATE_KEY;
const fromAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

app.post('/transfer', async (req, res) => {
    const { toAddress, amount } = req.body;

    try {
        const nonce = await web3.eth.getTransactionCount(fromAddress);
        const tx = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount, 'ether'),
            gas: 2000000,
            nonce: nonce
        };

        // Firma la transacción
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        // Envía la transacción firmada
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        res.status(200).send(`Transaction successful: ${receipt.transactionHash}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Transaction failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
