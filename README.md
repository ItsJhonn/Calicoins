# CaliCoins Pruba de concepto

## Descripción

CaliCoins QR Transfer es una aplicación web que permite a los usuarios enviar CaliCoins utilizando MetaMask y códigos QR. Los usuarios pueden conectar su wallet MetaMask, generar códigos QR para direcciones de wallet, enviar CaliCoins, y verificar transacciones en Etherscan.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos principales:

1. `index.html`: Página principal de la aplicación.
2. `qr-generator.js`: Script para generar códigos QR.
3. `web3Service.js`: Servicios de Web3 para conectar con MetaMask y enviar transacciones.
4. `script.js`: Script adicional para manejar la generación y escaneo de códigos QR.
5. `server.js`: Servidor backend para manejar las solicitudes de transferencia de fondos.

## Requisitos

- **MetaMask**: Extensión de navegador para interactuar con la red Ethereum.
- **Node.js**: Necesario para ejecutar el servidor backend.
- **Web3.js**: Biblioteca para interactuar con la blockchain Ethereum.
- **QRCode.js**: Biblioteca para generar códigos QR.
- **ZXing Library**: Biblioteca para escanear códigos QR.

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd calicoins-qr-transfer
    ```

2. **Instala las dependencias del servidor:**

    ```bash
    npm install
    ```

3. **Configura el archivo `.env`:**

    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```env
    INFURA_URL=https://infura.io/v3/YOUR_INFURA_PROJECT_ID
    PRIVATE_KEY=YOUR_PRIVATE_KEY
    ```

4. **Ejecuta el servidor:**

    ```bash
    node server.js
    ```

5. **Abre el archivo `index.html` en un navegador web para usar la aplicación.**

## Uso

1. **Conectar MetaMask:**
   - Haz clic en "Conectar MetaMask" para conectar tu wallet MetaMask. Asegúrate de estar en la red de CaliCoins.

2. **Generar Código QR:**
   - Ingresa una dirección de wallet en el campo correspondiente y haz clic en "Generar Código QR" para generar un código QR.

3. **Enviar CaliCoins:**
   - Ingresa la dirección de destino y la cantidad de CaliCoins, luego haz clic en "Enviar CaliCoins" para realizar la transferencia.

4. **Verificar Transacción:**
   - Haz clic en "Verificar Transacción" para abrir el enlace de la transacción en Etherscan.

5. **Escanear Código QR:**
   - Haz clic en "Iniciar escaneo de QR" para activar la cámara y escanear un código QR. La dirección escaneada se mostrará en el campo correspondiente.

## Scripts

### `index.html`

- Contiene la estructura HTML y el estilo para la interfaz de usuario.
- Incluye botones para generar códigos QR, conectar MetaMask, enviar CaliCoins y verificar transacciones.

### `qr-generator.js`

- Proporciona una función para generar códigos QR.

### `web3Service.js`

- Incluye funciones para conectar a MetaMask y enviar transacciones.

### `script.js`

- Maneja la generación y escaneo de códigos QR, y el envío de transacciones.

### `server.js`

- Configura un servidor Express para manejar las solicitudes de transferencia de fondos utilizando Web3.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un *issue* para discutir cualquier cambio que te gustaría realizar.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autores

- Jhonn Alexander Torres  [torres.castro.alex@gmail.com](mailto:torres.castro.alex@gmail.com).
- Cristobal Valencia Ceron [cristobalvalencia3002@gmail.com](mailto:cristobalvalencia3002@gmail.com).
