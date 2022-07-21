import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

 class CampaignIndex extends Component {
    
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns}
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(campaign => ({
            header: campaign,
            description: (
                <Link route={`/campaigns/${campaign}`}>
                    <a>View more</a>
                </Link>
            ),
            fluid: true
        }));

        return <Card.Group items={items}></Card.Group>
    }

    render() {
        return (
            <Layout>
            <h3>Open campaigns</h3>
            <Link route='/campaigns/new'>
                <a>
                    <Button 
                        content="Create Campaign"
                        icon="add circle" 
                        labelPosition="left"
                        primary
                        floated="right"
                    />
                </a>
            </Link>
            {this.renderCampaigns()}
            </Layout>
            );
    }
}

export default CampaignIndex;