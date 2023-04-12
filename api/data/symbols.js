const axios = require('axios');
const fs = require('fs');

async function fetchFuturesSymbols() {
  try {
    const response = await axios.get(
      'https://fapi.binance.com/fapi/v1/exchangeInfo'
    );
    const symbols = response.data.symbols.map(
      (symbolInfo) => symbolInfo.symbol
    );
    return symbols;
  } catch (error) {
    console.error('Error fetching Binance Futures symbols:', error.message);
    return [];
  }
}

function writeSymbolsToFile(symbols) {
  const fileName = './data/binance_futures_symbols.txt';
  const fileContent = symbols.map((s) => `"${s}",\n`).join('');

  // remove last comma from file content
  const fileContentWithoutLastComma = fileContent.slice(0, -2);

  fs.writeFile(fileName, `[${fileContentWithoutLastComma}]`, (error) => {
    if (error) {
      console.error('Error writing symbols to file:', error.message);
      return;
    }
    console.log(`Binance Futures symbols written to ${fileName}`);
  });
}

async function main() {
  const symbols = await fetchFuturesSymbols();
  writeSymbolsToFile(symbols);
}

main();
