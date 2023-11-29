// hooks/useWallet.ts
import { useState, useCallback } from "react";
import Web3 from "web3";
import { ConnectWallet } from "../ethereum/connect-wallet";

export function UseWallet() {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const connect = useCallback(async () => {
    if (!web3) {
      const newWeb3 = await ConnectWallet();
      setWeb3(newWeb3);
    }
  }, [web3]);

  return {
    web3,
    connect,
  };
}
