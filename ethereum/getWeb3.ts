import Web3 from "web3";

const getWeb3 = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    return new Web3(window.ethereum);
  }

  return null;
};

export default getWeb3;
