import React, { Component } from 'react';
import { connect } from 'react-redux';
import authReducer from '../reducers/authReducer';
import Payments from './Payments';
class Header extends Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return ;
            case false:
                return <li><a href="/auth/google">Sign In</a></li>
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3">Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }   
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    {this.props.auth == false ? <a href="/" className="brand-logo left">Logo</a>: <a href="/surveys" className="brand-logo left">Logo</a> }
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(Header);