import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import useStyles from './styles.js';
import { Link } from 'react-router-dom'
import AppIcon from '../../images/ifs_logo_colored.svg';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { getUserData, setAuthorizationHeader, registerUserFromGoogleSignin } from '../../redux/actions/userActions';
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'us-social-app.firebaseapp.com',
};

firebase.initializeApp(config);


const LoginPage = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const UI = useSelector(state => state.UI);
    const { errors: UIerrors, loading: UIloading } = UI;

    const [loading, setLoading] = useState(UIloading);


    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                const user = authResult.user; 
                /* sign in first time -> adding user to the db */
                if (authResult.additionalUserInfo.isNewUser) {
                    const newUser = {
                        "uid": user.uid, 
                        "handle": user.email.split("@")[0],
                        "email": user.email, 
                        "imageUrl": user.photoURL
                    }
                    dispatch(registerUserFromGoogleSignin(newUser)); 

                    // no redirect here 
                    // => authenticate and redirect have been handling inside of getUserData(), which is called in firebase.auth().onAuthStateChanged 
                    return false; 
                }
                return true;
            },
        }
    };


    useEffect(() => {
        setLoading(UIloading);
        setErrors(UIerrors);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => setAuthorizationHeader(idToken)).catch(err => console.log('err:', err));
                dispatch(getUserData());
            }
        });
    }, [UIerrors, UIloading, dispatch]);

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
                            Already have an account? <Link to='/signup'>Sign up</Link>
                        </Typography>
                    </div>
                </form>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

export default LoginPage
