"use strict";

 const { createWeb3Modal, defaultSolanaConfig } = window.Web3Modal.solana;
    const solanaWeb3 = window.solanaWeb3;

    // 0. Setup chains
    const solana = {
      id: 'solana',
      network: 'mainnet-beta',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      chainId: 101,
    };
    const solanaTestnet = {
      id: 'solana-testnet',
      network: 'testnet',
      rpcUrl: 'https://api.testnet.solana.com',
      chainId: 102,
    };
    const solanaDevnet = {
      id: 'solana-devnet',
      network: 'devnet',
      rpcUrl: 'https://api.devnet.solana.com',
      chainId: 103,
    };
    const chains = [solana, solanaTestnet, solanaDevnet];

    // 1. Get projectId from https://cloud.walletconnect.com
    const projectId = 'YOUR_PROJECT_ID';

    // 2. Create solanaConfig
    const metadata = {
      name: 'Web3Modal',
      description: 'Web3Modal Solana Example',
      url: 'https://web3modal.com', // origin must match your domain & subdomain
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    };

    const solanaConfig = defaultSolanaConfig({
      metadata,
      chains,
      projectId,
    });

    // 3. Create modal
    const modal = createWeb3Modal({
      solanaConfig,
      chains,
      projectId,
    });

    // Function to connect wallet
    async function connectWallet() {
      try {
        const provider = await modal.open();
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

        // Get accounts
        const accounts = await provider.request({ method: 'solana_accounts' });
        const walletAddress = accounts[0];

        console.log('Connected account:', walletAddress);

        // Get the balance of the connected wallet
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
        console.log('Wallet balance:', balance / solanaWeb3.LAMPORTS_PER_SOL, 'SOL');
      } catch (error) {
        console.error('Could not connect to wallet:', error);
      }
    }

    // Add event listener to connect button
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
