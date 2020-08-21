import { SET_USER, SET_USERS, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ } from '../types';

const initialState  = {// not the global state, it is what is stored in userReducer
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [], 
    users: []
};

export default function (state =  initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: // used for logging out
            return initialState; // having no credentials whatsoever
        case SET_USER: 
            return {
                authenticated: true,
                loading: false,
                ...action.payload // will bind credentials to credentials, likes to likes, etc.
            };
        case LOADING_USER: 
            return {
                ...state,
                loading: true
            }
        case LIKE_POST: 
            return {
                ...state,
                likes: [
                    ...state.likes,
                    // add a new like to the likes array
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter((like) => like.postId !== action.payload.postId) // remove the like in which the postId is the same as the postId from the payload
            }

        case MARK_NOTIFICATIONS_READ: 
            state.notifications.forEach(notification => notification.read = true);
            return {
                ...state
            }
        case SET_USERS: 
            return {
                ...state, 
                users: action.payload
            };
        default:
            return state;
    }
}