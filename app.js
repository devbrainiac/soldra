// app.js
// Initialize Web3Modal
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Solana = window.SolanaWeb3;

let web3Modal;
let provider;

// Function to initialize Web3Modal
function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://api.mainnet-beta.solana.com", // Solana Mainnet RPC URL
        },
      },
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
  });
}

// Function to connect wallet
async function connectWallet() {
  try {
    provider = await web3Modal.connect();
    const connection = new Solana.Connection(Solana.clusterApiUrl('mainnet-beta'));

    // Get accounts
    const accounts = await provider.enable();
    const walletAddress = accounts[0];

    console.log("Connected account:", walletAddress);

    // Get the balance of the connected wallet
    const balance = await connection.getBalance(new Solana.PublicKey(walletAddress));
    console.log("Wallet balance:", balance / Solana.LAMPORTS_PER_SOL, "SOL");
  } catch (error) {
    console.error("Could not connect to wallet:", error);
  }
}

// Initialize Web3Modal on page load
window.addEventListener('load', async () => {
  init();

  document.getElementById('connect-wallet').addEventListener('click', async () => {
    await connectWallet();
  });
});
