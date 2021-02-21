import { SET_USER, SET_USERS, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData) // post request to firebase to login
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/'); // redirect to homepage. history from component will be passed onto here so that can redirect in action
        })
        .catch((err) => {
            console.log(err)
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            }
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData) // post request to firebase to login
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/'); // redirect to homepage. history from component will be passed onto here so that can redirect in action
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const registerUserFromGoogleSignin = (newUserData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup/google', newUserData) 
        .then((res) => {
            // dispatch({ type: CLEAR_ERRORS });
        }).catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user') // send a get request to (<url>/api/user)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data // payload to be sent to the reducer is the user data
            })
            axios.get('/users')
                .then((res) => {
                    dispatch({
                        type: SET_USERS,
                        payload: res.data
                    })
                })
                .catch((err) => console.log(err));
        }).catch((err) => console.log(err));

};

//get all users for mentioning
export const getAllUsers = () => (dispatch) => {
    axios.get('/users')
        .then((res) => {
            dispatch({
                type: SET_USERS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.post('/notifications', notificationIds)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch((err) => console.log(err));
}

// export const addPostToNotification = (postId)
export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken; // send a header of type Authorization and value of "Bearer <Token>" when sending a post request

}