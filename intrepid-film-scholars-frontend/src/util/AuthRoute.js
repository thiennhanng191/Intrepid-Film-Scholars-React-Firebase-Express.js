import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/>}
    />
);

const mapStateToProp = (state) => ({
    authenticated: state.user.authenticated //authenticated in in the userReducer's state
});

AuthRoute.propTypes = {
    user: PropTypes.object // not required so as not to get a warning when logged out
}

export default connect(mapStateToProp)(AuthRoute); 