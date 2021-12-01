import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3e3020E8B089176cDfD4DC355A0E95608F5FC50C'
);

export default instance;





// import web3 from './web3'
// import CampaignFactory from './build/CampaignFactory.json'

// const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0xde55BEB864BEDF82C01A10dDF99bb0991Cb4595A')

// export default instance


