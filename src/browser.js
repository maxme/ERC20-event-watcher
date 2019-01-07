const Web3 = require('web3');
const $ = require('jquery');
const moment = require('moment');
const subscribeToERC20Events = require('./index');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
let filter = '';

// Callback that adds new lines to the table
function addEventToTable(value, symbol, name, from, to, contractAddress) {
  if (symbol.match(filter) || (symbol.match(filter) || contractAddress.match(filter))) {
    web3.utils.fromWei(value);
    const v = web3.utils.fromWei(value).toString();
    const now = moment().format('LTS');
    const fromTrunc = from === '0x0' ? from : `${from.slice(0, 16)}...`;
    const toTrunc = to === '0x0' ? to : `${to.slice(0, 16)}...`;
    $('#tablebody').prepend(
      `<tr><td>${now}</td><td><a href="https://etherscan.io/token/${contractAddress}">${symbol}</a></td><td><a href="https://etherscan.io/address/${from}">${fromTrunc}</a></td><td><a href="https://etherscan.io/address/${to}">${toTrunc}</a></td><td>${v}</td></tr>`,
    );
  }
}

$(document).ready(() => {
  // Subscribe to input events
  $('#search').keyup((event) => {
    filter = event.target.value;
  });

  const params = new URLSearchParams(document.location.search);
  const urlFilter = params.get('filter');
  if (urlFilter) {
    $('#search').val(urlFilter);
    filter = urlFilter;
  }

  // Subscribe to all ERC20 web3 events (warning: not efficient at all)
  subscribeToERC20Events(web3, addEventToTable);
});
