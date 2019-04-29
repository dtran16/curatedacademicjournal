//current token skeleton pulled from
//https://theethereum.wiki/w/index.php/ERC20_Token_Standard and part of object task
pragma solidity 0.5.0;

import "./IERC20.sol";
import "./SafeMath.sol";
import "./Review.sol";

// contract CAJCoin is IERC20 {
contract CAJCoin {

    //import safemath
    using SafeMath for uint256;

    //Genreal Parameters
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSup;

    address private caddr;

    // Balances for each type of account
    mapping(address => uint256) private balances;
    mapping(uint256 => uint256) private paperBalances;

    //tokens staked on each paper by each user
    mapping(uint256 => mapping(address => uint256)) private userTokensStaked;

    //dev address
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
        bool b = _amount > 0;
        if (msg.sender == _user) {
            b = b && balances[_user] >= _amount ;
        } else {
            b = b && allowed[_user][msg.sender] >= _amount;
        }
        return b;
    }

    function userCanRecive(address _user, uint256 _amount) private returns (bool success) {
        bool b = _amount > 0;
        b = b && (balances[_user]).add(_amount) > balances[_user];
        return b;
    }

    function paperCanRecive(uint256 _paper, uint256 _amount) private returns (bool success) {
        bool b = _amount > 0;
        b = b && archive.paperExists(_paper);
        b = b && archive.getPaperState(_paper) == 0;
        return b;
    }

    function paperCanSend(uint256 _paper, uint256 _amount) private returns (bool success) {
        bool b = _amount > 0;
        b = b && archive.paperExists(_paper);
        b = b && archive.getPaperState(_paper) == 2 || archive.getPaperState(_paper) == 4 || archive.getPaperState(_paper) == 3 || archive.getPaperState(_paper) == 5; // 2: under review; 4: old version
        b = b && paperBalances[_paper] >= _amount;
        return b;
    }

    // This is the constructor and automatically runs when the smart contract is uploaded
    constructor() public {
        name = "CAJCoin";
        symbol = "CAJ";
        decimals = 18;

        devAddress = msg.sender;
        totalSup = 1000000 * 10**uint(decimals);
        balances[devAddress] = totalSup;
        emit Transfer(devAddress, devAddress, totalSup);
    }

    //get total supply
    function totalSupply() external view returns (uint256) {
        return totalSup;
    }

    //get balance of a user account
    function balanceOf(address _owner) public returns (uint256 balance) {
        return balances[_owner];
    }

    // Transfer given amount from owner's account to another account
    function transfer(address _to, uint256 _amount) public returns (bool success) {
        if (userCanSend(msg.sender, _amount) && userCanRecive(_to, _amount)) {
            balances[msg.sender] = balances[msg.sender].sub(_amount);
            balances[_to] = balances[_to].add(_amount);
            emit Transfer(msg.sender, _to, _amount);
            return true;
        }
        return false;
        //return transferFrom(msg.sender, _to, _amount);
    }

    // Transer given amount from one account to another account
    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        if (userCanSend(_from, _amount) && userCanRecive(_to, _amount)) {
            balances[_from] = balances[_from].sub(_amount);
            allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_amount);
            balances[_to] = balances[_to].add(_amount);

            emit Transfer(_from, _to, _amount);
            return true;
        }
        return false;
    }
    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    function approve(address _spender, uint256 _amount) external returns (bool success) {
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    //mapping(uint256 => mapping(address => uint256)) private userTokensStaked;
    //Stake a token on a paper, this will be called from the other contract
    function stakeTokens(address _from, uint256 _to, uint256 _amount) external returns (bool success) {
        if (balances[_from] < _amount) {
            return false;
        }
        if (paperCanRecive(_to, _amount)
            && msg.sender == caddr) {
            balances[_from] = balances[_from].sub(_amount);
            paperBalances[_to] = paperBalances[_to].add(_amount);
            userTokensStaked[_to][_from] += _amount;

            return true;
        }
        return false;
    }

    //Collect a token from a paper, this will also be run from the other contract
    function collectTokens(uint256 _from, address _to, uint256 _amount) external  returns (bool success) {
        if (userCanRecive(_to, _amount) && paperCanSend(_from, _amount)
            && msg.sender == caddr) {
            paperBalances[_from] = paperBalances[_from].sub(_amount);
            balances[_to] = balances[_to].add(_amount);
            return true;
        }
        return false;
    }

    //Return the balance of a paper account
    function paperBalance(uint256 _paperID) public returns (uint256 balance) {
        return paperBalances[_paperID];
    }

    function tokensStakedByUser(uint256 _paperID, address _user) public returns (uint256 amount) {
        return userTokensStaked[_paperID][_user];
    }

    function setContract(address addr) public {
        assert(msg.sender == devAddress);
        archive = Review(addr);
        caddr = addr;
    }
}
