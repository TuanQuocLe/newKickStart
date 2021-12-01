pragma solidity ^0.4.17;

contract CampainFactory {
    address[] deployedCampaigns;
    
    function createCampaign( uint minimum ) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns () public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping( address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContributor;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public contributor;
    
    
    modifier restricted () {
        require(manager == msg.sender);
        _;
    }
    
    
    function Campaign( uint minimum, address creator ) public {
        manager = creator;
        minimumContributor = minimum;
        
    }
    
    function contribute () public payable {
        require(msg.value > minimumContributor);
        approvers[msg.sender] = true;
        contributor++;
        
    }
    
    function createRequest ( string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request ({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function aprroveRequest(uint index) public {
        
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        
        requests[index].approvalCount++;
    } 
    
    function finalizeRequest ( uint index ) restricted public {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (contributor/2));
        
        request.complete = true;
        request.recipient.transfer(request.value);
        
        
    }

    function getSumary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            contributor,
            manager
        );
    }
    
    function getRequestCount () public view returns (uint) {
        return requests.length;
    }
    
}


