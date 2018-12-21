import Web3 from 'web3';
import listenToEvents from './index';

const ERC20MetadataABI = require('../abi/erc20metadata.json');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
const erc20TransferSig = web3.utils.keccak256('Transfer(address,address,uint256)');

function consoleLog(value, symbol, name, from, to, contactAddress) {
  // eslint-disable-next-line no-console
  console.log(
    `${value} ${symbol} (${name}) sent from ${from} to ${to} - contract address: ${contactAddress}`,
  );
}

listenToEvents(web3, ERC20MetadataABI, [erc20TransferSig], consoleLog);
