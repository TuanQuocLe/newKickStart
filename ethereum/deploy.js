const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'bacon fence credit bamboo grace siege teach oblige gauge spread project broom',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/69a73dc114a9424a9e0254f01291850c'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();


// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const Web3 = require('web3');
// // const { interface, bytecode } = require('./compile'); old school
// const compiledFactory = require('./build/CampaignFactory.json')

// const provider = new HDWalletProvider(
//   'bacon fence credit bamboo grace siege teach oblige gauge spread project broom',
//   'https://rinkeby.infura.io/v3/69a73dc114a9424a9e0254f01291850c'
// );
// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log('Attempting to deploy from account', accounts[0]);

//   const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//     .deploy({ data: compiledFactory.bytecode })
//     .send({ gas: '1000000', from: accounts[0] });

//   console.log(compiledFactory.interface)  
//   console.log('Contract deployed to', result.options.address);
//   provider.engine.stop();
// };
// deploy();
