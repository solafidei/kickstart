import Web3 from "web3";

const getWeb3 = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    return new Web3(window.ethereum);
  } else {
    const provider = new Web3.providers.HttpProvider(
      process.env.INFURA_URL as string
    );
    return new Web3(provider);
  }
};

export default getWeb3;
