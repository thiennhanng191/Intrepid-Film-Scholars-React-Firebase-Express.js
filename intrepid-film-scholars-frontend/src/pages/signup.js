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


// import Redux related
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis 
});

class signup extends Component {
    constructor() {
        super();
        this.state = {
           email: '',
           password: '',
           comfirmPassword: '',
           handle: '',
           errors: {} 
        }
    }
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors };
        } else return null;
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.UI.errors !== this.props.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password, 
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }
    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm={5}>
                <div>
                        <img src={AppIcon} alt="app icon" className={classes.logo} />
                        <Typography variant="h4" className={classes.pageTitle}>
                            Hello there!
                        </Typography>
                    </div>
                    <form noValidate id='signup-form' onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" /* id can be used for styling etc.*/
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
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            value={this.state.confirmPassword} 
                            helperText={errors.confirmPassword} 
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Username" 
                            className={classes.textField}
                            value={this.state.handle} 
                            helperText={errors.handle} 
                            error={errors.handle ? true : false}
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
                            variant ="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                        >
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <div id="container" className={classes.footer}>
                        <Typography variant='body2' style={{textAlign: 'center'}}>
                            Already have an account? Login <Link to='/login'>here</Link>
                        </Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapDispatchToProps = {
    signupUser
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(signup));
