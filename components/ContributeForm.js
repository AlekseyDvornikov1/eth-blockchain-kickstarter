import React, {Component} from 'react';
import {Button, Input, Form, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import {Router} from '../routes'
import web3 from '../ethereum/web3';

class ContributionForm extends Component {

    state = {
        errorMessage: '',
        contribution: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true, errorMessage: ''});
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.contribution, 'ether')
            });
        } catch (e) {
            this.setState({errorMessage:e.message})
        }
        this.setState({loading: false});
        Router.replaceRoute(`/campaigns/${this.props.address}`);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Value to contribute</label>
                <Input label="ether" labelPosition="right" value={this.state.contribution} onChange={event => this.setState({contribution: event.target.value})}   />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage}/>
            <Button  loading={this.state.loading} primary type="submit">Contribute!</Button>

        </Form>
        );
    }
}

export default ContributionForm;