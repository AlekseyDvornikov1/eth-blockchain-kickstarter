import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2b8D509E98D8bA1082cFBCe8123208360978f183'
);

export default instance;