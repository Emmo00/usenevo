require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

require("dotenv").config();

const { ARBITRUM_SEPOLIA_URL, ARBITRUM_SEPOLIA_CHAIN_ID, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    arbitrum_testnet: {
      url: ARBITRUM_SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: parseInt(ARBITRUM_SEPOLIA_CHAIN_ID),
    },
  },
};
