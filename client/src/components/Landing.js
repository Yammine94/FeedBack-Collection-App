import React, { Component } from 'react';
import { connect } from 'react-redux';
import authReducer from '../reducers/authReducer';

const Landing = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
                Feedback App!
            </h1>
            Collect feedback from your users/customers
        </div>
    )
}

export default Landing;