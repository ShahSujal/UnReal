import React, { useContext } from "react";
import Style from "../../styles/Style.module.css";
import Image from "next/image";
import { NUSDContext } from "../../context/Context";
const NavBar = () => {
  const context = useContext(NUSDContext)
  const {ContextAddress} = context
  return (
    <>
      <div className={Style.nav}>
        <div className={Style.logo}>
    {/* Company Name */}
          <h2>UNREAL . FINANCE</h2>
    {/* Company  */}
          <Image
            src={'/fav.png'}
            alt="Image Not found"
            width={30}
            height={30}
            className={Style.image}
          />
        </div>
      {/* Current Wallet Address */}
        <div className={Style.wallet}>
          <h2>{ContextAddress?"Account Address - " + ContextAddress:""}</h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;
