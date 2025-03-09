const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("NevoTestContract", (m) => {
    // set usdc contract address (testnet/sepolia address)
    const usdcAddress = "0xf3C3351D6Bd0098EEb33ca8f830FAf2a141Ea2E1";

    // Deploy the Nevo contract
    const nevoContract = m.contract("Nevo", [usdcAddress]);

    // Return all the deployed contracts
    return { nevoContract };
});
