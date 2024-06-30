import { Core } from './node_modules/@walletconnect/core/dist/index.es.js';
import { Web3Wallet } from './node_modules/@walletconnect/web3wallet/dist/index.es.js';


// Create Core instance
const core = new Core({
  projectId: 'a5b621fc19ef15b1e20a49ba690ef180'
});

// Define metadata
const metadata = {
  name: 'soldra',
  description: 'AppKit Example',
  url: 'https://soldra.vercel.app/',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Initialize Web3Wallet
let web3wallet;

Web3Wallet.init({
  core, // pass the shared 'core' instance
  metadata
}).then(instance => {
  web3wallet = instance;

  // Add event listener to connect button
  const connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', async () => {
    try {
      const session = await web3wallet.connect();
      console.log('Connected:', session);
      // Handle connected session
    } catch (error) {
      console.error('Connection error:', error);
      // Handle connection error
    }
  });
}).catch(error => {
  console.error('Initialization error:', error);
});
