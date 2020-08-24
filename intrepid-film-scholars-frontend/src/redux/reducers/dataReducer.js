import { SET_POSTS, SET_TOP_POSTS, SET_OPINION_POSTS, SET_TOP_OPINION_POSTS, SET_FUN_FACT_POSTS, SET_TOP_FUN_FACT_POSTS, SET_PLOT_HOLES_POSTS, SET_TOP_PLOT_HOLES_POSTS, SET_POST, SET_COMMENT, SUBMIT_REPLIED_COMMENT, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, UPLOAD_POST, SUBMIT_COMMENT, SET_MOVIE_GENRES } from '../types';
import { SET_OPINION_POSTS_BY_TITLEID, SET_TOP_OPINION_POSTS_BY_TITLEID, SET_FUN_FACT_POSTS_BY_TITLEID, SET_TOP_FUN_FACT_POSTS_BY_TITLEID, SET_PLOT_HOLES_POSTS_BY_TITLEID, SET_TOP_PLOT_HOLES_POSTS_BY_TITLEID } from '../types';
import { SET_USER_FOR_USER_PAGE, LOADING_USER, SET_TITLES, CLEAR_SEARCH_TITLES, SET_TITLE, SET_POSTS_BY_TITLEID, SET_TOP_POSTS_BY_TITLEID, CLEAR_POSTS, SET_TV_SEASON, CHOOSE_SEASON, SET_CHOOSE_SEASON, SET_EPISODE_OVERVIEW, SET_EPISODE_DETAILS, CLEAR_EPISODES, SET_TITLE_TMDB, SET_SIMILAR_TITLES, SET_HIGHLY_RATED_MOVIES, SET_HIGHLY_RATED_TV, SET_POPULAR_MOVIES, SET_POPULAR_TV, SET_TRENDING_MOVIES } from '../types';
import { SET_TRENDING_TV, SET_TV_GENRES, SET_RECOMMENDED_MOVIES, CLEAR_RECOMMENDED_MOVIES, SET_RECOMMENDED_TVS, CLEAR_RECOMMENDED_TVS, LOADING_RECOMMENDED_TITLE } from '../types';
import { SET_SCROLL_TO_COMMENT, COMMENT_SCROLL_TO, CLEAR_COMMENT_SCROLL_TO, CLEAR_REPLIED_COMMENT_SCROLL_TO, REPLIED_COMMENT_SCROLL_TO, SET_PARENT_COMMENT } from '../types';
const initialState = {
    posts: [],
    post: {}, //detail of 1 post
    comment: {},
    loadingUser: false, 
    userForUserPage: {},
    loading: false,
    titles: [],
    titlesCount: '',
    title: {},
    tvSeason: {},
    season: 'Seasons',
    chooseSeason: false,
    episode: {},
    episodes: [],
    tmdbTitle: {},
    similarTitles: [],
    highlyRatedMovies: [],
    highlyRatedTV: [],
    popularMovies: [],
    popularTV: [],
    trendingMovies: [],
    trendingTV: [],
    movieGenres: [],
    tvGenres: [],
    recommendedMovies: [],
    recommendedTVs: [],
    loadingRecommendedTitle: false,
    setScrollToComment: false,
    checkSetScrollToComment: false,
    commentScrollTo: {},
    repliedCommentScrollTo: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_TOP_POSTS:
        case SET_OPINION_POSTS:
        case SET_TOP_OPINION_POSTS:
        case SET_FUN_FACT_POSTS:
        case SET_TOP_FUN_FACT_POSTS:
        case SET_PLOT_HOLES_POSTS:
        case SET_TOP_PLOT_HOLES_POSTS:
        case SET_POSTS_BY_TITLEID:
        case SET_TOP_POSTS_BY_TITLEID:
        case SET_OPINION_POSTS_BY_TITLEID:
        case SET_TOP_OPINION_POSTS_BY_TITLEID:
        case SET_FUN_FACT_POSTS_BY_TITLEID: 
        case SET_TOP_FUN_FACT_POSTS_BY_TITLEID:
        case SET_PLOT_HOLES_POSTS_BY_TITLEID: 
        case SET_TOP_PLOT_HOLES_POSTS_BY_TITLEID: 
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_POST:
            return {
                ...state,
                //comment: {},
                post: action.payload
            };
        case SET_COMMENT:
            return {
                ...state,
                comment: {
                    ...action.payload,
                    //setScrollToComment: false
                }
            };
        case SUBMIT_REPLIED_COMMENT:
            return {
                ...state,
                comment: {
                    ...state.comment,
                    repliedComments: [
                        action.payload,
                        ...state.comment.repliedComments
                    ]
                }
            };
        case LIKE_POST:
        case UNLIKE_POST:
            /* like and unlike will do the same sequence of actions */
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            if (state.post.postId === action.payload.postId) {
                state.post = action.payload;
            }
            return {
                ...state
            };
        case DELETE_POST:
            let deleteIndex = state.posts.findIndex((post) => post.postId === action.payload); // action payload corresponding to type DELETE_POST contains the postId of the post to be deleted
            state.posts.splice(deleteIndex, 1);
            return {
                ...state
            };

        case UPLOAD_POST:
            return {
                ...state,
                posts: [
                    action.payload, // add the new post to the top of the posts array
                    ...state.posts // spread the rest of the posts
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [
                        {
                            ...action.payload,
                            setScrollToComment: false
                        }, //add the new comment to the top of the comments array of the Post object,
                        ...state.post.comments // spread the rest of the comments array
                    ]
                }
            };
        case LOADING_USER: 
            return {
                ...state, 
                loadingUser: true
            }
        case SET_USER_FOR_USER_PAGE: 
            return {
                ...state,
                loadingUser: false,
                userForUserPage: action.payload
            };
        case SET_TITLES:
            return {
                ...state,
                titles: action.payload.Search,
                titlesCount: action.payload.totalResults
            };
        case CLEAR_SEARCH_TITLES: 
            return {
                ...state, 
                titles: []
            };
        case SET_TITLE:
            return {
                ...state,
                title: action.payload,
                tvSeason: {},
                similarTitles: [], //reset similarTitles to get the similar title of the current movie/show
                chooseSeason: false, // not showing any season details, only show the entire series overview
                season: 'Seasons'
            };
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            };
        case SET_TV_SEASON:
            return {
                ...state,
                tvSeason: action.payload,
                chooseSeason: true,
                loading: false,
                episodes: [] // clear the previous episodes array to add the new episodes of the new season to the array
            }
        case CHOOSE_SEASON:
            return {
                ...state,
                season: action.payload
            }
        case SET_CHOOSE_SEASON:
            return {
                ...state,
                chooseSeason: false,
                episodes: []
            };
        case SET_EPISODE_OVERVIEW:
            const seasonEpisodes = [...state.episodes];
            //add the episode object to the episodes array at the specific index
            seasonEpisodes[action.payload[1]] = action.payload[0];

            return {
                ...state,
                episodes: seasonEpisodes,
                loading: false
            }
        case SET_EPISODE_DETAILS:
            return {
                ...state,
                episodes: [],
                episode: action.payload,
                //chooseSeason: false,
                loading: false
            }
        case CLEAR_EPISODES:
            return {
                ...state,
            }
        case SET_TITLE_TMDB:
            return {
                ...state,
                tmdbTitle: action.payload
            }
        case SET_SIMILAR_TITLES: {
            return {
                ...state,
                similarTitles: [
                    ...state.similarTitles,
                    action.payload
                ]
            }
        }
        case SET_HIGHLY_RATED_MOVIES: {
            return {
                ...state,
                highlyRatedMovies: [
                    ...state.highlyRatedMovies,
                    action.payload
                ],
                loading: true
            }
        }
        case SET_HIGHLY_RATED_TV: {
            return {
                ...state,
                highlyRatedTV: [
                    ...state.highlyRatedTV,
                    action.payload
                ]
            }
        }
        case SET_POPULAR_MOVIES: {
            return {
                ...state,
                popularMovies: [
                    ...state.popularMovies,
                    action.payload
                ]
            }
        }
        case SET_POPULAR_TV: {
            return {
                ...state,
                popularTV: [
                    ...state.popularTV,
                    action.payload
                ]
            }
        }
        case SET_TRENDING_MOVIES: {
            return {
                ...state,
                trendingMovies: [
                    ...state.trendingMovies,
                    action.payload
                ]
            }
        }
        case SET_TRENDING_TV: {
            return {
                ...state,
                trendingTV: [
                    ...state.trendingTV,
                    action.payload
                ]
            }
        }
        case SET_MOVIE_GENRES: {
            return {
                ...state,
                movieGenres: action.payload
            }
        }
        case SET_TV_GENRES: {
            return {
                ...state,
                tvGenres: action.payload
            }
        }
        case CLEAR_RECOMMENDED_MOVIES: {
            return {
                ...state,
                recommendedMovies: []
            }
        }
        case SET_RECOMMENDED_MOVIES: {
            return {
                ...state,
                recommendedMovies: [
                    ...state.recommendedMovies,
                    action.payload
                ],
                loadingRecommendedTitle: false
            }
        }
        case CLEAR_RECOMMENDED_TVS: {
            return {
                ...state,
                recommendedTVs: []
            }
        }
        case SET_RECOMMENDED_TVS: {
            return {
                ...state,
                recommendedTVs: [
                    ...state.recommendedTVs,
                    action.payload
                ]
            }
        }
        case LOADING_RECOMMENDED_TITLE: {
            return {
                ...state,
                loadingRecommendedTitle: true
            }
        }
        case SET_SCROLL_TO_COMMENT:
            const commentsUpdate = [...state.post.comments];
            //get the index of the comment from the notification
            const commentIndex = commentsUpdate.findIndex(comment => comment.commentId === action.payload.commentId);
            //console.log(`check equal ${_isEqual(commentsUpdate[0],action.payload)}`)
            commentsUpdate[commentIndex] = {
                ...action.payload,
                setScrollToComment: true
            }

            return {
                ...state,
                post: {
                    ...state.post,
                    comments: commentsUpdate
                    /*
                    comments: [
                        {
                            ...action.payload,
                            setScrollToComment: true
                        }, //add the new comment to the top of the comments array of the Post object,
                        ...state.post.comments // spread the rest of the comments array
                    ]*/
                },
                checkSetScrollToComment: true
            }

        case CLEAR_COMMENT_SCROLL_TO:
            return {
                ...state,
                commentScrollTo: {}
            }
        case COMMENT_SCROLL_TO:
            return {
                ...state,
                commentScrollTo: {
                    ...action.payload,
                    setScrollToComment: true
                }
            }
        case CLEAR_REPLIED_COMMENT_SCROLL_TO:
            return {
                ...state,
                repliedCommentScrollTo: {},
                parentComment: {}
            }
        case REPLIED_COMMENT_SCROLL_TO:
            return {
                ...state,
                repliedCommentScrollTo: {
                    ...action.payload,
                    setScrollToRepliedComment: true
                }
            }
        case SET_PARENT_COMMENT:
            return {
                ...state,
                parentComment: action.payload
            }
        default:
            return state;
    }
}