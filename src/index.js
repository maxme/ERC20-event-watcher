const ERC20MetadataABI = require('../abi/erc20metadata.json');

function watchForERC20Transfer(web3, callback) {
  const cache = {};
  return async function res(error, data) {
    if (!data.topics[1] || !data.topics[2]) return;
    const from = web3.utils.toHex(web3.utils.toBN(data.topics[1]));
    const to = web3.utils.toHex(web3.utils.toBN(data.topics[2]));
    const value = web3.utils.toBN(data.data);
    let symbol = 'UNK';
    let name = 'Unknown';
    if (data.address in cache) {
      [symbol, name] = cache[data.address];
    } else {
      const contract = new web3.eth.Contract(ERC20MetadataABI, data.address);
      if ('symbol' in contract.methods) {
        try {
          symbol = await contract.methods.symbol().call();
        } catch (e) {
          // ignore error
        }
      }
      if ('name' in contract.methods) {
        try {
          name = await contract.methods.name().call();
        } catch (e) {
          // ignore error
        }
      }
    }
    cache[data.address] = [symbol, name];
    callback(value, symbol, name, from, to, data.address);
  };
}

function loopOverPastLogs(web3, callback) {
  return async function f(err, array) {
    if (err) {
      console.error(err);
      return;
    }
    for (let i = 0; i < array.length; i += 1) {
      watchForERC20Transfer(web3, callback)(err, array[i]);
    }
  };
}

module.exports = async function subscribeToERC20Events(web3, callback) {
  const erc20TransferSig = web3.utils.keccak256('Transfer(address,address,uint256)');
  const topics = [erc20TransferSig];
  const fromBlock = (await web3.eth.getBlockNumber()) - 500;

  web3.eth.getPastLogs({ fromBlock, toBlock: 'latest', topics }, loopOverPastLogs(web3, callback));
  web3.eth.subscribe('logs', { fromBlock, topics }, watchForERC20Transfer(web3, callback));
};
