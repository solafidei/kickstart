import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

//look into automating this
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x92090A270199Be1ed1941796c5973A81325CEAAc"
);

export default instance;
