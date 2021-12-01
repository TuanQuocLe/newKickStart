import Layout from "../../../component/Layout"
import { Link } from '../../../routes'
import Campaign from "../../../ethereum/campaign"
import { Table, Button } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css';
import RequestRow from '../../../component/RequestRow'

const Requests = (props) => {
    const { Header, Row, HeaderCell } = Table

    const renderRows = () => {
        return props.requests.map((request, index) => {
            return (
                <RequestRow 
                    approversCount={props.approversCount}
                    id={index}
                    key={index}
                    request={request}
                    address={props.address}
                >
                </RequestRow>
            )
        })
    }
    return (
        <Layout>
            <div >
                <h2>Requests</h2>
                <Link route={`/campaign/${props.address}/requests/new`}>
                    <Button primary floated='right' style={{ marginBottom: 10}}>Add Request</Button>
                </Link>
            </div>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                {renderRows()}
            </Table>
            <h3>Found {props.requestCount} {props.requestCount > 1 ? 'Requests' : 'Request'}.</h3>

        </Layout>
    )
}
Requests.getInitialProps = async (props) => {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()
    const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
    }))
    return { address, requests, requestCount, approversCount }
}


export default Requests