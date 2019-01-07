# Real time ERC20 transfers

Watch ERC20 Transfer events in realtime. You can test it on my website: https://bia.is/tools/erc20-watcher

## CLI Usage

```shell
$ eth-watch-event -h
Usage: eth-watch-event [options]

Options:
  -V, --version        output the version number
  -e, --event <string> JSON ABI Input file (default: "")
  -a, --abi <file>
  -h, --help           output usage information

# Example, watch for ERC20 events
$ eth-watch-event -a erc20abi.json -e "Transfer(address,address,uint256)"
```

## Code Usage

```js
import ABI2solidity from "abi2solidity";

const ABI = `
[
  {
    "constant": false,
    "inputs": [],
    "name": "f",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
`;

const solidity = ABI2solidity(ABI);
console.log(solidity);
// Will print out:
// interface GeneratedInterface {
//   function f (  ) external returns ( uint256 );
// }
```

Alternative usage with files:

```js
import { ABI2solidityFiles } from "abi2solidity";

ABI2solidityFiles(inputFileABI, outputFileSolidity);
```

# Development

Run tests

```shell
$ yarn test
```

# License

MIT
