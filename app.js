const clientId = "YOUR_CLIENT_ID"; // Replace with your Web3Auth client ID

let web3auth = null;
let provider = null;

const initWeb3Auth = async () => {
    web3auth = new window.Web3auth.Web3Auth({
        clientId,
        chainConfig: {
            chainNamespace: "solana",
            chainId: "0x3", // 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
            rpcTarget: "https://api.devnet.solana.com",
            displayName: "Solana Devnet",
            blockExplorer: "https://explorer.solana.com/?cluster=devnet",
            ticker: "SOL",
            tickerName: "Solana Token",
        },
    });

    await web3auth.initModal();
    if (web3auth.provider) {
        provider = web3auth.provider;
    }
};

initWeb3Auth();

const login = async () => {
    if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
    }
    provider = await web3auth.connect();
};

const fetchPrivateKey = async () => {
    if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
    }
    const privateKey = await web3auth.provider.request({
        method: 'solanaPrivateKey',
    });
    console.log(privateKey);
};

const getUserInfo = async () => {
    if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
};

const authenticateUser = async () => {
    if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
};

const parseToken = async () => {
    const idToken = await web3auth.authenticateUser();
    const base64Url = idToken.idToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const result = JSON.parse(window.atob(base64));
    console.log(result);
};

const logout = async () => {
    if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
    }
    await web3auth.logout();
    provider = null;
};

const getAccounts = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const accounts = await solanaWallet.requestAccounts();
    console.log(accounts);
};

const getBalance = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const accounts = await solanaWallet.requestAccounts();
    const connectionConfig = await solanaWallet.request({ method: 'solana_provider_config', params: [] });
    const connection = new window.solanaWeb3.Connection(connectionConfig.rpcTarget);
    const balance = await connection.getBalance(new window.solanaWeb3.PublicKey(accounts[0]));
    console.log(balance / 1000000000);
};

const signTransaction = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const connectionConfig = await solanaWallet.request({ method: 'solana_provider_config', params: [] });
    const connection = new window.solanaWeb3.Connection(connectionConfig.rpcTarget);
    const accounts = await solanaWallet.requestAccounts();
    const block = await connection.getLatestBlockhash('finalized');
    const TransactionInstruction = window.solanaWeb3.SystemProgram.transfer({
        fromPubkey: new window.solanaWeb3.PublicKey(accounts[0]),
        toPubkey: new window.solanaWeb3.PublicKey(accounts[0]),
        lamports: 0.01 * window.solanaWeb3.LAMPORTS_PER_SOL,
    });
    const transaction = new window.solanaWeb3.Transaction({
        blockhash: block.blockhash,
        lastValidBlockHeight: block.lastValidBlockHeight,
        feePayer: new window.solanaWeb3.PublicKey(accounts[0]),
    }).add(TransactionInstruction);
    const signedTx = await solanaWallet.signTransaction(transaction);
    console.log(signedTx.signature.toString('hex'));
};

const signAllTransactions = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const connectionConfig = await solanaWallet.request({ method: 'solana_provider_config', params: [] });
    const connection = new window.solanaWeb3.Connection(connectionConfig.rpcTarget);
    const accounts = await solanaWallet.requestAccounts();
    const block = await connection.getLatestBlockhash('finalized');
    const TransactionInstruction = window.solanaWeb3.SystemProgram.transfer({
        fromPubkey: new window.solanaWeb3.PublicKey(accounts[0]),
        toPubkey: new window.solanaWeb3.PublicKey(accounts[0]),
        lamports: 0.01 * window.solanaWeb3.LAMPORTS_PER_SOL,
    });
    const transaction = new window.solanaWeb3.Transaction({
        blockhash: block.blockhash,
        lastValidBlockHeight: block.lastValidBlockHeight,
        feePayer: new window.solanaWeb3.PublicKey(accounts[0]),
    }).add(TransactionInstruction);
    const signedTx = await solanaWallet.signAllTransactions([transaction, transaction, transaction]);
    console.log(signedTx);
};

const signAndSendTransaction = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const connectionConfig = await solanaWallet.request({ method: 'solana_provider_config', params: [] });
    const connection = new window.solanaWeb3.Connection(connectionConfig.rpcTarget);
    const accounts = await solanaWallet.requestAccounts();
    const block = await connection.getLatestBlockhash('finalized');
    const TransactionInstruction = window.solanaWeb3.SystemProgram.transfer({
        fromPubkey: new window.solanaWeb3.PublicKey(accounts[0]),
        toPubkey: new window.solanaWeb3.PublicKey('8Q3KAP8nV9FAMmtpm3QqoECbafebscsSQ3m6HHgK386v'),
        lamports: 0.01 * window.solanaWeb3.LAMPORTS_PER_SOL,
    });
    const transaction = new window.solanaWeb3.Transaction({
        blockhash: block.blockhash,
        lastValidBlockHeight: block.lastValidBlockHeight,
        feePayer: new window.solanaWeb3.PublicKey(accounts[0]),
    }).add(TransactionInstruction);
    const { signature } = await solanaWallet.signAndSendTransaction(transaction);
    console.log(signature);
};

const signMessage = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }
    const solanaWallet = new window.Web3auth.SolanaWallet(provider);
    const msg = Buffer.from('Web3Auth x Solana Message', 'utf8');
    const result = await solanaWallet.signMessage(msg);
    console.log(Buffer.from(result).toString('hex'));
};

const signSolanaMessage = async () => {
    if (!provider) {
        console.log('provider not initialized yet');
        return;
    }

    const privateKey = await provider.request({ method: 'solanaPrivateKey' });
    const solanaPrivateProvider = await window.Web3auth.SolanaPrivateKeyProvider.getProviderInstance({
        chainConfig: {
            rpcTarget: 'https://rpc.ankr.com/solana_devnet',
            blockExplorer: 'https://explorer.solana.com/?cluster=devnet',
            chainId: '0x3',
            displayName: 'solana',
            ticker: 'SOL',
            tickerName: 'Solana',
        },
        privKey: privateKey,
    });

    if (!solanaPrivateProvider) {
        console.log('provider not initialized yet');
        return;
    }

    const solanaWallet = new window.Web3auth.SolanaWallet(solanaPrivateProvider.provider);
    const msg = Buffer.from('Web3Auth x Solana', 'utf8');
    const result = await solanaWallet.signMessage(msg);
    console.log(Buffer.from(result).toString('hex'));
};

// Add event listeners
document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("fetchPrivateKeyButton").addEventListener("click", fetchPrivateKey);
document.getElementById("getUserInfoButton").addEventListener("click", getUserInfo);
document.getElementById("authenticateUserButton").addEventListener("click", authenticateUser);
document.getElementById("parseTokenButton").addEventListener("click", parseToken);
document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("getAccountsButton").addEventListener("click", getAccounts);
document.getElementById("getBalanceButton").addEventListener("click", getBalance);
document.getElementById("signTransactionButton").addEventListener("click", signTransaction);
document.getElementById("signAllTransactionsButton").addEventListener("click", signAllTransactions);
document.getElementById("signAndSendTransactionButton").addEventListener("click", signAndSendTransaction);
document.getElementById("signMessageButton").addEventListener("click", signMessage);
document.getElementById("signSolanaMessageButton").addEventListener("click", signSolanaMessage);

