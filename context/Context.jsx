import { createContext, useState,ReactNode } from "react";

import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

export const NUSDContext = createContext();


const Context = ({ children }) => {

  // UseStates
  const [ContextAddress, setContextAddress] = useState();
  const [ContextSigner, setContextSigner] = useState({});
  const [networkName, setNetworkName] = useState("")
  const [key, setKey] = useState(0)
   
  // Toast Design
  const toastDesign = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  
  // Connect To your Meta Mask Function
  const setCall = async () => {
     try {      
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      setContextSigner(signer);
      const currencyName = await signer.provider.getNetwork()
      setNetworkName(currencyName.name);
      const address = await signer.getAddress();
      setContextAddress(address);
      setKey(1)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NUSDContext.Provider value={{ ContextAddress,setCall,ContextSigner,networkName,toastDesign,key }}>
      {children}
    </NUSDContext.Provider>
  );
};
export default Context;
