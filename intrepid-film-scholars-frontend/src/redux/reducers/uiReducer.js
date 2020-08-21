import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, LOADING_HIGHLY_RATED_TITLE, STOP_LOADING_HIGHLY_RATED_TITLE, LOADING_POPULAR_TITLE, STOP_LOADING_POPULAR_TITLE, LOADING_TRENDING_TITLE, STOP_LOADING_TRENDING_TITLE } from '../types';

const initialState = {
    loading: false,
    errors: {},
    theme: '',
    loadingHighlyRatedTitle: false,
    loadingPopularTitle: false,
    loadingTrendingTitle: false,
    loadingRecommendedTitle: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        case LOADING_HIGHLY_RATED_TITLE:
            return {
                ...state,
                loadingHighlyRatedTitle: true
            }
        case STOP_LOADING_HIGHLY_RATED_TITLE:
            return {
                ...state,
                loadingHighlyRatedTitle: false
            }
        case LOADING_POPULAR_TITLE:
            return {
                ...state,
                loadingPopularTitle: true
            }
        case STOP_LOADING_POPULAR_TITLE:
            return {
                ...state,
                loadingPopularTitle: false
            }
        case LOADING_TRENDING_TITLE:
            return {
                ...state,
                loadingTrendingTitle: true
            }
        case STOP_LOADING_TRENDING_TITLE:
            return {
                ...state,
                loadingTrendingTitle: false
            }
        default:
            return state;
    }
}