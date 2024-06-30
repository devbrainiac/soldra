    const { Connection, clusterApiUrl, Keypair } = solanaWeb3;
    const web3Modal = new Web3Modal.default({
        cacheProvider: false, // optional
        providerOptions: {} // required
    });

    let provider;

    document.getElementById('connectWallet').addEventListener('click', async () => {
        provider = await web3Modal.connect();
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        
        // Use the provider to get the private key and balance
        const privateKey = getPrivateKey(provider);
        const publicKey = Keypair.fromSecretKey(privateKey).publicKey;
        
        document.getElementById('walletAddress').textContent = `Wallet Address: ${publicKey.toBase58()}`;
        
        const balance = await getBalance(connection, publicKey);
        document.getElementById('walletBalance').textContent = `Wallet Balance: ${balance} SOL`;
    });

    function getPrivateKey(provider) {
        // Assume the provider exposes the private key in some way.
        // This is just a placeholder, replace with actual implementation.
        return new Uint8Array(provider._wallet._keypair.secretKey);
    }

    async function getBalance(connection, publicKey) {
        const balance = await connection.getBalance(publicKey);
        return balance / solanaWeb3.LAMPORTS_PER_SOL;
    }
