const Web3 = require('web3');
const subscribeToERC20Events = require('./index');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));

function consoleLog(value, symbol, name, from, to, contactAddress) {
  const strValue = value.toString();
  // eslint-disable-next-line no-console
  console.log(
    `${strValue} ${symbol} (${name}) sent from ${from} to ${to} - contract address: ${contactAddress}`,
  );
}

subscribeToERC20Events(web3, consoleLog);
