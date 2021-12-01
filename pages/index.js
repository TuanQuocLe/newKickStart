import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import factory from "../ethereum/factory";
import Layout from "../component/Layout";
import { Link } from "../routes"

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        return {campaigns: campaigns}
    }

    renderCampaigns() {
        const campaignBox = this.props.campaigns.map(address => {
            return {
                    header: address,
                    description: <Link route={`/campaign/${address}`}  >View Campaign</Link>,
                    fluid: true
                }
        })
        return <Card.Group items={campaignBox}/>
        
    }

    render() {
    return (
        <Layout>
            <h2>Open Campaigns</h2>
                    <Form>
                        <Form.Field>
                            {this.renderCampaigns()}
                        </Form.Field>
                        <Link route = '/campaign/new'>
                            <Button 
                                content='Create Campaign'
                                icon='add circle'
                                labelPosition='right'
                                primary
                                />
                        </Link>
                    </Form>
           
        </Layout>
    )
  }
}


export default CampaignIndex;