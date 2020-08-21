import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/ifs_logo_colored.svg';
import { Link } from 'react-router-dom';

// import material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


//import Redux related
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.spreadThis
});

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }   
    */

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors };
        } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.UI.errors !== this.props.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props; // loading is in props of UI now 
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm={5}>
                    <div>
                        <img src={AppIcon} alt="app icon" className={classes.logo} />
                        <Typography variant="h4" className={classes.pageTitle}>
                            Welcome back!
                        </Typography>
                    </div>
                    <form noValidate id='login-form' onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                        {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <div id="container" className={classes.footer}>
                            <Typography variant='body2' style={{ textAlign: 'center' }}>
                                Don't have an account yet? Join our community <Link to='/signup'>here</Link>
                            </Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ // from global state, take what we need for the login page - only need user and UI, don't need data
    user: state.user,
    UI: state.UI
});

const mapDispatchToProps = { //what action to be used in the login
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(login));
