import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

// Importing Style Sheet
import styles from "../../styles/Home.module.css";

// Importing Ethers functionality
import { Contract, BigNumber, ethers } from "ethers";

// Contract abi file
import nUSD from "../../nUSD.json";

// Importing Context
import { NUSDContext } from "../../context/Context";

// Toaster Module 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  
  // TEXT Input ON change listener
  const [ethValue, setEthValue] = useState(0);

  
  // Destructuring useState And Function And Toast Design
  const context = useContext(NUSDContext);
  const { ContextSigner, ContextAddress, networkName,toastDesign } = context;

   // Intial BaLance in NUSD 
  const [currentToken, setCurrentToken] = useState<string>();

  {/*
  Market Address from .env file
  if test in MUMBAI Matic replace only: 
  process.env.GOERLI_DEPLOYED_ADDRESS -> process.env.MUMBAI_DEPLOYED_ADDRESS
  const Deployed_Address = process.env.GOERLI_DEPLOYED_ADDRESS;
  */}

  // git hides .env file and i given my account private key in .env file

  // GOERLI -> "0x5AB504Af4EB1568ECD63E9Ace2519A7A4369c946"
  // Mumbai Matic -> "0x67Bb342cA5645994EB2508dbe7A8b7dC4C8f0B97"
  
  const Deployed_Address = "0x5AB504Af4EB1568ECD63E9Ace2519A7A4369c946";


  // Storing Our Deployed Cpntract in variable to use functionality on Contract
  const DeployedContract = new Contract(
    Deployed_Address,
    nUSD.abi,
    ContextSigner
  );

  // Check Balance Of Current NUSD
  const balanceCheck = async () => {
    // If your MetaMask is connected from other test network it will generate notification
    if (networkName == "goerli") {

      // Calling Contract Balances function
      const balance = await DeployedContract.balances(ContextAddress);

      // Formating Big Number to Ethers
      const Ethers = ethers.utils.formatUnits(balance);

      // Updating Balance
      setCurrentToken(Ethers);
    } else {
      // Notification Warning 
      toast.error("Switch GOERLI & Reload Page", toastDesign);
    }
  };

  const BuyNUSD = async (price: BigNumber) => {
     // If your MetaMask is connected from other test network it will generate notification
    if (networkName == "goerli") {
      try {
      // Formating Input Number to Big Number
        const wei = ethers.utils.parseEther(price);
        // Calling Deposite Contract passing msg.value
        const transaction = await DeployedContract.depositETH({
          value: wei.toString(),
        });
        // Notification Of processing Transaction
        toast.loading("Transaction Processing", toastDesign);

        // Waiting For Transaction To complete
        await transaction.wait();

        // If transaction Successful Notification
        toast.success("Transaction Successful", toastDesign);

        // Updating BALANCE
        balanceCheck();

      } catch (error) {
        // Not Suffecient eths
        if (error.code == -32603) {
          toast.error("Sorry not have Enough Ethers", toastDesign);
        }
        // Error
        toast.error("Something Went Wrong ", toastDesign);
      }
    } else {
      // Notification Warning 
      toast.error("Switch to Goerli & Reload Page", toastDesign);
    }
  };

  // I does'nt use this function in future if Applied Contract Owner to Check NUSD Total Market Cap
  const TotalNUSDCheck = async () => {
    const total = await DeployedContract.totalSupply(ContextAddress);
    const Ethers = ethers.utils.formatUnits(total);
  };


  const RedeemETH = async (price: BigNumber) => {
    // If your MetaMask is connected from other test network it will generate notification
    if (networkName == "goerli") {
      try {
        // Formating Input Number to Big Number
        const wei = ethers.utils.parseEther(price);

        // Calling Redeem Contract passing NUSD AMOUNT -> Eth
        const transaction = await DeployedContract.redeemNUSD(wei.toString());

         // Notification Of processing Transaction
        toast.loading("Transaction Processing", toastDesign);
        // Waiting For Transaction To complete
        await transaction.wait();
         // If transaction Successful Notification
        toast.success("Transaction Successful", toastDesign);

        // Updating BALANCE
        balanceCheck();
      } catch (error) {

        if (error.code == -32603) {
          toast.error("Sorry not have Enough nUSD", toastDesign);
        }
        toast.error("Something Went Wrong", toastDesign);
      }
    } else {
      toast.error("Switch to Goerli & Reload Page ", toastDesign);
    }
  };

  return (
    <>
    {/* Toaster Notification Code */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Image */}
      <Image
        src={"/money.png"}
        width={1080}
        height={1080}
        alt="no image"
        priority={true}
        className={styles.moneyTree}
      />
      {/* Random Text */}
      <p>A nUSD Most stable currency</p>

      {/* Current Balance if Balance function Call */}
      <div className={styles.balance}>
        {currentToken != undefined ? <h2>{currentToken} USD Tokens</h2> : <></>}
      </div>

      {/* Input Amount  */}
      <div className={styles.content}>
        <input
          type="number"
          placeholder="Enter Amount in GOERLI Ether"
          onChange={(e) => {
            setEthValue(e.target.value);
          }}
        />
      </div>

      {/* Buttons to perform operations */}
      <div className={styles.content}>
        {/* Button 1 */}
        <button onClick={() => RedeemETH(ethValue.toString())}>
          Redeem to ETH
        </button>
         {/* Button 2 */}
        <button onClick={() => BuyNUSD(ethValue.toString())}>Buy NUSD</button>
         {/* Button 3 */}
        <button onClick={() => balanceCheck()}>Balance</button>
      </div>
    </>
  );
};

export default Content;
