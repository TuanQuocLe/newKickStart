import React from "react"
import Layout from "../../component/Layout"
import factory from '../../ethereum/factory.js'
import Campaign from '../../ethereum/campaign'
import { Component } from "react"
import web3 from "../../ethereum/web3"
import { Card, Form, Button, Grid } from "semantic-ui-react"
import ContributeForm from '../../component/ContributeForm'
import { Link } from '../../routes'


class campaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address)
        const sumary = await campaign.methods.getSummary().call()
        return {
            address: props.query.address,
            minimumContribution: sumary[0],
            balance: sumary[1],
            requestsCount: sumary[2],
            approversCount: sumary[3],
            manager: sumary[4]
        }
        
    }
    renderCard () {
        const items = [
                {
                    header: this.props.address,
                    description: 'The manager created this campaign and can create the request!',
                    meta: 'Address of Manager',
                },
                {
                    header: this.props.minimumContribution,
                    description: 'Address of Manager',
                    meta: 'You must contribute at least this much wei to become a contributor!',
                },
                {
                    header: this.props.requestsCount,
                    description: 'A request tried to withdraw money from the contract!',
                    meta: 'Number of Requests',
                },
                {
                    header: web3.utils.fromWei( this.props.address, 'ether'),
                    description: 'The total account balance has left to spend!',
                    meta: 'Campaign Balance in Eth',
                },
                {
                    header:this.props.approversCount,
                    description: 'Number of people who have already contributed to this campaign!',
                    meta: 'Number of Approvers',
                },
        ]
        return items
    }
    
    render() {
        return (

            <Layout>
                <div>
                    <h2>Campaign Details</h2>
                    <Grid>
                        <Grid.Column width={11}>
                                <Card.Group style={{overflowWrap: 'break-word'}} items={this.renderCard()}/>
                                <Button  style={{marginTop: 10, fontSize: 16}}>
                                    <Link route={`/campaign/${this.props.address}/requests`}>
                                        View Requests
                                    </Link>
                                </Button>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <ContributeForm address={this.props.address}></ContributeForm>
                        </Grid.Column>
                    </Grid>
                </div>
                
            </Layout>
    
        )
    }
}

export default campaignShow