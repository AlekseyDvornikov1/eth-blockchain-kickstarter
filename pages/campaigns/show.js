import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributionForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
        } = this.props;

        const items = [{
            header: manager,
            meta: 'Address of manager',
            description: 'The manager created this campaign and can create request to withdraw money.',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to become an approver.',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: requestsCount,
            meta: 'Number of requests',
            description: 'A requests try to withdraw money from the contract',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: approversCount,
            meta: 'Number of Approvers',
            description: 'Number of people who have been already donated to the campaign.',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: web3.utils.fromWei(balance,'ether'),
            meta: 'Campaign Balance (ETH)',
            description: 'The balance is how much money this campaign has left to spend.',
            style: { overflowWrap: 'break-word' }
        },

    ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h3>Campaign Show</h3>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column  width={6}>
                            <ContributionForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column >
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;