import { Button, CircularProgress, Grid, Link, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import useStyles from './styles.js';

import AppIcon from '../../images/ifs_logo_colored.svg';

const LoginPage = (props) => {
    const classes = useStyles(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const UI = useSelector(state => state.UI);
    const { errors: UIerrors, loading: UIloading } = UI; 

    const [loading, setLoading] = useState(UIloading);

    useEffect(() => {
        setLoading(UIloading);
        setErrors(UIerrors);
    }, [UIerrors, UIloading]);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setLoading(true);
        const userData = {
            email: email,
            password: password,
        }
        dispatch(loginUser(userData, props.history));
    }

    return (
        <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm={5}>
                    <div>
                        <img src={AppIcon} alt="app icon" className={classes.logo} />
                        <Typography variant="h4" className={classes.pageTitle}>
                            Hello there!
                        </Typography>
                    </div>
                    <form noValidate id='signup-form' onSubmit={handleSubmit}>
                        <TextField
                            id="email" /* id can be used for styling etc.*/
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={email}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Log in
                        {UIloading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <div id="container" className={classes.footer}>
                            <Typography variant='body2' style={{ textAlign: 'center' }}>
                                Already have an account? Login <Link to='/login'>here</Link>
                            </Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
    )
}

export default LoginPage
