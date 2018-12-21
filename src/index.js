const cache = {};

function printTransfer(web3, abi, topics, callback) {
  return async function res(error, data) {
    if (!data.topics[1] || !data.topics[2]) return;
    const from = web3.utils.toHex(web3.utils.toBN(data.topics[1]));
    const to = web3.utils.toHex(web3.utils.toBN(data.topics[2]));
    const value = web3.utils.hexToNumberString(data.data);
    let symbol = 'UNK';
    let name = 'Unknown';
    if (data.address in cache) {
      [symbol, name] = cache[data.address];
    } else {
      const contract = new web3.eth.Contract(abi, data.address);
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

export default function listenToEvents(web3, abi, topics, callback) {
  web3.eth.subscribe(
    'logs',
    { fromBlock: null, topics },
    printTransfer(web3, abi, topics, callback),
  );
}
