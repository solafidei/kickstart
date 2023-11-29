// lib/connectWallet.ts
import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {
  /* Add any other wallet providers you want to support */
};

export async function ConnectWallet() {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);

  return web3;
}
