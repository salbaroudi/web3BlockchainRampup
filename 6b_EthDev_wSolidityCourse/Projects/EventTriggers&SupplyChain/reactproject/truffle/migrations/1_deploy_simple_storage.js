const SimpleStorage = artifacts.require("../contracts/SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
