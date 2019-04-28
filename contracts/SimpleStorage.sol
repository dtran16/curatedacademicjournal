// this was a default in react-box
// idk if yall wanted to see this or not but I commented it just in case

pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
