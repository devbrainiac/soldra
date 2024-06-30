import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import Web3Modal from 'web3modal';  // Import Web3Modal

// Function to initialize Web3Modal and handle wallet connection
async function initWeb3Modal() {
  const providerOptions = {
    /* Specify your provider options here */
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // Required: specify the providers you want to use
  });

  try {
    const provider = await web3Modal.connect();
    console.log('Connected to provider:', provider);
    // Handle provider connection, e.g., fetch user accounts or interact with contracts
  } catch (e) {
    console.log('Could not get a wallet connection', e);
    // Handle error gracefully
  }
}

// Call initWeb3Modal function to initialize Web3Modal
initWeb3Modal();

// Update inner HTML with your custom content
document.querySelector('#app').innerHTML = `
  <div>
    <h1>Welcome to Your Web3Modal Integrated Vite App!</h1>
    <p>
      This is your custom content. You can integrate Web3Modal features here.
    </p>
    <button id="connectWallet">Connect Wallet</button>
  </div>
`;
