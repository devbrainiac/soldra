import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Solana Connect </title>
  </head>
  <body>
    <w3m-button></w3m-button>
    <script type="module" src="main.ts"></script>
  </body>
</html>
`

setupCounter(document.querySelector('#counter'))
