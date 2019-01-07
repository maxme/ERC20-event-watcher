# Real time ERC20 transfers

Watch ERC20 Transfer events in realtime. You can test it on my website: https://bia.is/tools/erc20-watcher

## CLI Usage

### Build

```shell
$ yarn build-cli
```

### Run

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

## Web Usage

```shell
$ yarn build
yarn run v1.12.3
$ browserify src/browser.js -o dist/browser.js
✨  Done in 1.78s.
# Open the index.html file or on mac, run:
$ open index.html
```

# Development

Run tests

```shell
$ yarn test
```

# License

MIT
