"use client";

import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { FightCashAbi } from "./FightCashAbi";
import { MyUSDCAbi } from "./MyUSDCAbi";
import { useContractContext } from "./ContracProvider";
import { useAccount } from "wagmi";

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isToggled, setToggled] = useState<boolean>(false);

  const { provider, signer } = useContractContext();
  const { chain, chainId } = useAccount();

  const [gameContract, setGameContract] = useState<ethers.Contract | null>(
    null
  );
  const [gameContract2, setGameContract2] = useState<ethers.Contract | null>(
    null
  );
  const [gameContract3, setGameContract3] = useState<ethers.Contract | null>(
    null
  );
  const [usdcContract, setUsdcContract] = useState<ethers.Contract | null>(
    null
  );

  /**
   * Amoy testnet
   */
  // "MyUSDCModule#MyUSDC": "0xA172F1DFcee0eB48D3C493d631b11cdA196255A6",
  // "FightCashModule#FightCash": "0xb3FF18F2a8713477307b04107570d6670f02DE24"

  /**
   * Polygon mainnet
   */
  // const contractAddress = "0x0a90D0FB21a9E7d0934f0A0475329f521d42Dd70"; // my contract address
  // const contractToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // my contract token

  useEffect(() => {
    if (signer && provider) {
      const gameContractAddress =
        chainId === 8453
          ? "0x3cB2e1db4450d8378E76aFA22139c9259F5ae0ce"
          : "0x3023D0723afC5da3737c7EC475de59A73be1F6b6"; //polygon:"0x3023D0723afC5da3737c7EC475de59A73be1F6b6"; // my contract address // Mcg Vs Chandler
      const gameContractAddress2 =
        chainId === 8453
          ? "0x68B5979b8554f407404BFA26FAeFCaBa2a82964E"
          : "0x2Dd932e0d15CDB1Ceaa0Ba97642fD8773850bEb6"; //polygon:"0x2Dd932e0d15CDB1Ceaa0Ba97642fD8773850bEb6"; // my contract address // Jake vs Mike Tyson
      const gameContractAddress3 = "0x0fB59A5A7a267d558c75bC7c90B9728c6d2621A9"; // my contract address

      const contractToken =
        chainId === 8453
          ? "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
          : "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; //polygon:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // my contract token

      const gameContractInstance = new ethers.Contract(
        gameContractAddress,
        FightCashAbi,
        signer
      );

      const gameContractInstance2 = new ethers.Contract(
        gameContractAddress2,
        FightCashAbi,
        signer
      );
      const gameContractInstance3 = new ethers.Contract(
        gameContractAddress3,
        FightCashAbi,
        signer
      );

      const usdcContractInstance = new ethers.Contract(
        contractToken,
        MyUSDCAbi,
        signer
      );

      setGameContract(gameContractInstance);
      setGameContract2(gameContractInstance2);
      setGameContract3(gameContractInstance3);

      setUsdcContract(usdcContractInstance);
    }
  }, [signer, provider]);

  return (
    <AppContext.Provider
      value={{
        isToggled,
        gameContract,
        gameContract2,
        gameContract3,
        usdcContract,
        setToggled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context == undefined) {
    throw new Error("useTimeContext must be used within a TimeProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
