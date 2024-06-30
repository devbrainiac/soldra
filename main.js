import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';


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
