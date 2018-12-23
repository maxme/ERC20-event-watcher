const Web3 = require('web3');
const $ = require('jquery');
const subscribeToERC20Events = require('./index');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));

// Callback that adds new lines to the table
function consoleLog(value, symbol, name, from, to, contactAddress) {
  web3.utils.fromWei(value);
  const v = web3.utils.fromWei(value).toString();
  $('#tablebody').prepend(
    `<tr><td>?</td><td>${symbol}</td><td>${from}</td><td>${to}</td><td>${v}</td></tr>`,
  );
}

$(document).ready(() => {
  // Subscribe to input events
  $('#search').keypress((event) => {
    console.log(event.target.value);
  });

  // Subscribe to web3 events
  subscribeToERC20Events(web3, consoleLog);
});
