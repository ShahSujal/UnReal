import Image from "next/image";
import React, { useContext } from "react";

// Importing Style Sheet
import Style from "../../styles/Style.module.css";

// Importing Context to get Account Address of user
import { NUSDContext } from "../../context/Context";

// Function Starts
const ConnectWallet = () => {


  const context = useContext(NUSDContext);
  // DeStructuring Set Call Function
  const { setCall } = context;

  return (
    <>
    {/* Wallet Random Image */}
      <Image
        src={"/connectWallet.png"}
        width={1080}
        height={1080}
        alt="no image"
        className={Style.WalletImage}
        priority={true}
      />

      {/* Wallet Connection Button */}
      <div className={Style.wallet}>
        <button
        className={Style.walletButton}
          onClick={() => {
            setCall();
          }}
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
};

export default ConnectWallet;
