import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x96DF8FC030Bb7894E5eE9a172259c57106da5f4C"
);

export default instance;
