import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import 'semantic-ui-css/semantic.min.css';


const RequestRow =  ({ id, key, request, address, approversCount}) => {
    const campaign = Campaign(address)
    const onApprove = async () => {
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.approveRequest(id).send({ from: accounts[0]})
    }

    const onFinalize = async () => {
        
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.finalizeRequest(id).send({ from: accounts[0]})
    }
    
    
    

    const { Row, Cell } = Table
    return (
        <Row 
            disabled={request.complete}
            key={key}
            positive={request.approvalCount > approversCount/2 && !request.complete}
        >
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>{!request.complete && <Button onClick={onApprove} color='green'>Approve</Button>}</Cell>
            <Cell>{!request.complete && <Button onClick={onFinalize} color='blue'>Finalize</Button>}</Cell>
        </Row>
    )
}

export default RequestRow