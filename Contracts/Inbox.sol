pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string initialmessage) public{
        message=initialmessage;
    }

    function setMessage(string newmessage) public{
        message=newmessage;
    }

    function getMessage() view public returns(string){
        return message;
    }

}


    
