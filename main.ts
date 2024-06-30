import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana'
import { solana, solanaTestnet, solanaDevnet } from '@web3modal/solana/chains'

// 0. Setup chains
const chains = [solana, solanaTestnet, solanaDevnet]

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'a5b621fc19ef15b1e20a49ba690ef180'

// 2. Create solanaConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Solana Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const solanaConfig = defaultSolanaConfig({
  metadata,
  chains,
  projectId
})

// 3. Create modal
const modal = createWeb3Modal({
  solanaConfig,
  chains,
  projectId
})