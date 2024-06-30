const { Core } = require('@walletconnect/core');
const { Web3Wallet } = require('@walletconnect/web3wallet');

const core = new Core({
  projectId: 'a5b621fc19ef15b1e20a49ba690ef180'
})

const metadata = {
  name: 'soldra',
  description: 'AppKit Example',
  url: 'https://soldra.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared 'core' instance
  metadata
})

const connectButton = document.getElementById('connectButton'); // Replace with your actual button ID

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
