//current token skeleton pulled from 
//https://theethereum.wiki/w/index.php/ERC20_Token_Standard and part of object task
pragma solidity 0.5.6;

import "./IERC20.sol";
import "./SafeMath.sol";
import "./Review.sol";

contract CAJToken is IERC20 { 
   
    //Genreal Parameters
    string public name; 
    string public symbol; 
    uint8 public decimals;
    uint256 public totalSupply;
    
    // Balances for each type of account
    mapping(address => uint256) private balances;
    mapping(uint256 => uint256) private paperBalances;
    address private devAddress;

    //paper database contract
    Review archive;

    // Events
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    // Owner of account approves the transfer of an amount to another account
    mapping(address => mapping (address => uint256)) allowed;

    // SECURITY HELPER METHODS
    function userCanSend(address _user, uint256 _amount) private returns (bool success) {
        bool b = true;
        b = _amount > 0;
        if (msg.sender == _user) {
            b = balances[_user] >= _amount ;
            return b;
        } else {
            b = allowed[_user][msg.sender] >= _amount;
            return b;
        }
    }

    function userCanRecive(address _user, uint256 _amount) private returns (bool success) {
        bool b = true;
        b = _amount > 0;
        b = (balances[_user].add(_amount)) > balances[_user];
        return b;
    }

    function paperCanRecive(uint256 _paper, uint256 _amount) private returns (bool success) {
        bool b = true;
        b = _amount > 0;
        b = archive.getPaper(_paper)[0] != 0;
        b = archive.getPaper(_paper)[8] == 0;
        return b;
    }

    function paperCanSend(uint256 _paper, uint256 _amount) private returns (bool success) {
        bool b = true;
        b = _amount > 0;
        b = archive.getPaper(_paper)[0] != 0;
        b = archive.getPaper(_paper)[8] == 2 || archive.getPaper(_paper)[8] == 4;
        b = paperBalances[_paper] >= _amount;
        return b;
    }




    // This is the constructor and automatically runs when the smart contract is uploaded
    constructor() public { 
        name = "CAJCoin"; 
        symbol = "CAJ"; 
        decimals = 18; 
        
        //need to fix below
        private devAddress="someone's address"; // 0x34cd63B5C273EA1c0EbC6CbEBCC15940fB043A9E Add the address that you will distribute tokens from here
        uint totalSupply = 1000000 * 10**uint(decimals)
        balances[devAddress] = totalSupply;
        emit Transfer(address)
    }

    //get total supply
    function totalSupply() external view returns (uint256) {
        return totalSupply;
    }

    //get balance of a user account
    function balanceOf(address _owner) public returns (uint256 balance) {
        return balances[_owner];
    }

    // Transfer the balance from owner's account to another account
    function transfer(address _to, uint256 _amount) public  returns (bool success) {
        if (userCanSend(msg.sender, _amount) && userCanRecive(_to, _amount)) {
            balances[msg.sender] = balances[msg.sender].sub(_amount);
            balances[_to] += balances[_to].add(_amount);
            emit Transfer(msg.sender, _to, _amount); 
            return true;
        } else {
            return false;
        }
    }

    //transer from someone else's account to another accound
    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        if (userCanSend(_from, _amount) && userCanRecive(_to, _amount)) {
            balances[_from] = balances[_from].sub(_amount);
            allowed[_from][msg.sender].sub(_amount);
            balances[_to] += balances[_to].add(_amount);
            return true;
        } else {
            return false;
        }
    }
    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    function approve(address _spender, uint256 _amount) external returns (bool success) {
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    //Stake a token on a paper, this will be called from the other contract
    function stakeToken(address _from, uint256 _to, uint256 _amount) external returns (bool success) {
        if (userCanSend(_from, _amount) && paperCanRecive(_to, _amount)
            && msg.sender == archive.address) {
            balances[_from] = balances[_from].sub(_amount);
            paperBalances[_to] = paperBalances[_to].add(_amount);
            emit Transfer(msg.sender, _to, _amount); 
            return true;
        } else {
            return false;
        }
    }

    //Collect a token from a paper, this will also be run from the other contract
    function collectToken(uint256 _from, address _to, uint256 _amount) external  returns (bool success) {
        if (userCanRecive(_to, _amount) && paperCanSend(_from, _amount)
            && msg.sender == archive.address) {
            paperBalances[_from] = paperBalances[_from].sub(_amount);
            balances[_to] = balances[_to].add(_amount);
            return true;
        } else {
            return false;
        }
    }

    //Transfer Tokens from paper to paper, this will be run fromt the other smart contract
    function transferPapers(uint256 _from, uint256 _to, uint256 _amount) external  returns (bool success) {
        if (paperCanRecive(_to, _amount) && paperCanSend(_from, _amount)
            && msg.sender == archive.address) {
            paperBalances[_from] = paperBalances[_from].sub(_amount);
            paperBalances[_to] = paperBalances[_to].add(_amount);
            return true;
        } else {
            return false;
        }
    }

    //Return the balance of a paper account
    function paperBalance(uint256 _paperID) public returns (uint256 balance) {
        return paperBalances[_paperID];
    }
}