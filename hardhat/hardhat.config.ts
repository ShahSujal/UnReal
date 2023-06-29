import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const Goerli_URL = process.env.Goerli_URL as string;
const MUMBAI_URL = process.env.MUMBAI_URL as string;
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    // goerli: {
    //   url: Goerli_URL,
    //   accounts: [ACCOUNT_PRIVATE_KEY],
    // },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};

export default config;
