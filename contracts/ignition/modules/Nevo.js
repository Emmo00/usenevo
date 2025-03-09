const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("NevoContract", (m) => {
    // set usdc contract address
    const usdcAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

    // Deploy the Nevo contract
    const nevoContract = m.contract("Nevo", [usdcAddress]);

    // Return all the deployed contracts
    return { nevoContract };
});
