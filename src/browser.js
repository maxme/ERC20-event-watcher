const Web3 = require('web3');
const $ = require('jquery');
const subscribeToERC20Events = require('./index');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));

function consoleLog(value, symbol, name, from, to, contactAddress) {
  // eslint-disable-next-line no-console
  console.log(
    `${value} ${symbol} (${name}) sent from ${from} to ${to} - contract address: ${contactAddress}`,
  );
  $('#tablebody').prepend(
    `<tr><td>?</td><td>${symbol}</td><td>${from}</td><td>${to}</td><td>${value}</td></tr>`,
  );
}

subscribeToERC20Events(web3, consoleLog);
