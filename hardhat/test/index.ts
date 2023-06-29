import { ethers } from "hardhat";
import { expect } from "chai";

describe("nUSD", function () {
    let nusdContract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        const nUSDContractFactory = await ethers.getContractFactory("nUSD");
        [owner, addr1, addr2] = await ethers.getSigners();

        nusdContract = await nUSDContractFactory.deploy();
        await nusdContract.deployed();
    });

    it("should deposit ETH and emit Deposit event", async function () {
        const ethAmount = ethers.utils.parseEther("1");
        const nusdAmount = ethAmount.div(2);

        await expect(nusdContract.connect(addr1).depositETH({ value: ethAmount }))
            .to.emit(nusdContract, "Deposit")
            .withArgs(addr1.address, ethAmount, nusdAmount);

        const balance = await nusdContract.balances(addr1.address);
        expect(balance).to.equal(nusdAmount);

        const totalSupply = await nusdContract.totalSupply();
        expect(totalSupply).to.equal(nusdAmount);
    });

    it("should redeem nUSD and transfer ETH back to the redeemer", async function () {
        const ethAmount = ethers.utils.parseEther("1");
        const nusdAmount = ethAmount.div(2);

        await nusdContract.connect(addr1).depositETH({ value: ethAmount });

        await expect(nusdContract.connect(addr1).redeemNUSD(nusdAmount))
            .to.emit(nusdContract, "Redeem")
            .withArgs(addr1.address, nusdAmount, ethAmount);

        const balance = await nusdContract.balances(addr1.address);
        expect(balance).to.equal(0);

        const totalSupply = await nusdContract.totalSupply();
        expect(totalSupply).to.equal(0);

        const addr1Balance = await addr1.getBalance();
        expect(addr1Balance).to.be.at.least(ethAmount);
    });

    it("should revert when redeeming invalid nUSD amount", async function () {
        const ethAmount = ethers.utils.parseEther("1");
        const nusdAmount = ethAmount.div(2);

        await nusdContract.connect(addr1).depositETH({ value: ethAmount });

        await expect(nusdContract.connect(addr1).redeemNUSD(nusdAmount.add(1)))
            .to.be.revertedWith("Insufficient nUSD balance");
    });
});
