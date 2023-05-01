import { Contract } from "web3-eth-contract";
import getWeb3 from "./getWeb3";
import CampaignFactory from "./build/CampaignFactory.json";

let instance: Contract | null = null;

const web3Instance = getWeb3();

if (web3Instance !== null) {
  instance = new web3Instance.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x92090A270199Be1ed1941796c5973A81325CEAAc"
  );
}

export default instance;
