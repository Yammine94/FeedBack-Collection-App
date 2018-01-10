import React,{ Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default connect(null, actions) (class Payments extends Component {
    render() {
        
        return(
            <StripeCheckout 
                name="Feedback App"
                description="100 Credits/5$"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn"> Add Credits </button>
            </StripeCheckout>
        );
    }
});
