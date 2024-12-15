// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PassportRegistry {
    struct Passport {
        string name;
        uint256 age;
        string birthdate;
        string country;
        bool isRegistered;
    }
    
    mapping(address => Passport) private passports;
    
    function register(string memory name, uint256 age, string memory birthdate, string memory country) public {
        passports[msg.sender] = Passport(name, age, birthdate, country, true);
    }

    function verify(address wallet, uint256 age) public view returns (string memory name, uint256 _age, string memory birthdate, string memory country) {
        require(msg.sender == wallet, "Access denied: You can only verify your own data");
        require(passports[wallet].isRegistered, "User not registered");
        Passport memory user = passports[wallet];
        require(user.age == age, "Age does not match the registered record");
        return (user.name, user.age, user.birthdate, user.country);
    }
}
