// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract nUSD {
    string public currencyName = "nUSD";
    uint8 public decimals = 18;
    
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    event Deposit(address indexed depositor, uint256 ethAmount, uint256 nusdAmount);
    event Redeem(address indexed redeemer, uint256 nusdAmount, uint256 ethAmount);
    
    function depositETH() external payable {
        uint256 ethAmount = msg.value;
        uint256 nusdAmount = ethAmount / 2;
        
        balances[msg.sender] += nusdAmount;
        totalSupply += nusdAmount;
        
        emit Deposit(msg.sender, ethAmount, nusdAmount);
    }
    
    function redeemNUSD(uint256 nusdAmount) external {
        require(nusdAmount > 0, "Invalid nUSD amount");
        require(balances[msg.sender] >= nusdAmount, "Insufficient nUSD balance");
        
        uint256 ethAmount = nusdAmount * 2;
        
        balances[msg.sender] -= nusdAmount;
        totalSupply -= nusdAmount;
        
        payable(msg.sender).transfer(ethAmount);
        
        emit Redeem(msg.sender, nusdAmount, ethAmount);
    }
}
