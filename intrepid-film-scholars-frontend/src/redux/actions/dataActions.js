import { SET_POSTS, SET_TOP_POSTS, SET_OPINION_POSTS, SET_TOP_OPINION_POSTS, SET_FUN_FACT_POSTS, SET_TOP_FUN_FACT_POSTS, SET_PLOT_HOLES_POSTS, SET_TOP_PLOT_HOLES_POSTS, SET_POST, SET_COMMENT, SUBMIT_REPLIED_COMMENT, LOADING_DATA, LOADING_UI, LIKE_POST, UNLIKE_POST, DELETE_POST, UPLOAD_POST, SET_ERRORS, CLEAR_ERRORS, SUBMIT_COMMENT } from '../types';
import { SET_OPINION_POSTS_BY_TITLEID, SET_TOP_OPINION_POSTS_BY_TITLEID, SET_FUN_FACT_POSTS_BY_TITLEID, SET_TOP_FUN_FACT_POSTS_BY_TITLEID, SET_PLOT_HOLES_POSTS_BY_TITLEID, SET_TOP_PLOT_HOLES_POSTS_BY_TITLEID } from '../types';
import { SET_USER_FOR_USER_PAGE, LOADING_USER, SET_TITLES, CLEAR_SEARCH_TITLES, SET_TITLE, SET_POSTS_BY_TITLEID, SET_TOP_POSTS_BY_TITLEID, SET_TV_SEASON, SET_CHOOSE_SEASON, SET_EPISODE_OVERVIEW, SET_EPISODE_DETAILS, CLEAR_EPISODES, CHOOSE_SEASON, CLEAR_POSTS, SET_TITLE_TMDB, SET_SIMILAR_TITLES, SET_HIGHLY_RATED_MOVIES, SET_HIGHLY_RATED_TV, SET_POPULAR_MOVIES, SET_POPULAR_TV, SET_TRENDING_MOVIES, SET_TRENDING_TV } from '../types';
import { SET_MOVIE_GENRES, SET_TV_GENRES, SET_RECOMMENDED_MOVIES, CLEAR_RECOMMENDED_MOVIES, SET_RECOMMENDED_TVS, CLEAR_RECOMMENDED_TVS } from '../types';
import { LOADING_HIGHLY_RATED_TITLE, STOP_LOADING_HIGHLY_RATED_TITLE, LOADING_POPULAR_TITLE, STOP_LOADING_POPULAR_TITLE, LOADING_TRENDING_TITLE, STOP_LOADING_TRENDING_TITLE, LOADING_RECOMMENDED_TITLE } from '../types';
import { COMMENT_SCROLL_TO, CLEAR_COMMENT_SCROLL_TO, CLEAR_REPLIED_COMMENT_SCROLL_TO, REPLIED_COMMENT_SCROLL_TO, SET_PARENT_COMMENT } from '../types';
import axios from 'axios';

// Get all posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then((res) => {
            dispatch({
                type: SET_POSTS,
                payload: res.data // res.data will return the array of all posts
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_POSTS,
                payload: [] // empty object 
            })
        })
};

export const getTopPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/top')
        .then((res) => {
            dispatch({
                type: SET_TOP_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_TOP_POSTS,
                payload: []
            })
        })
};

export const getOpinionPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/opinion')
        .then((res) => {
            dispatch({
                type: SET_OPINION_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_OPINION_POSTS,
                payload: []
            })
        });
}

export const getTopOpinionPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/top/opinion')
        .then((res) => {
            dispatch({
                type: SET_TOP_OPINION_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_TOP_OPINION_POSTS,
                payload: []
            })
        });
}

export const getFunFactPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/funFact')
        .then((res) => {
            dispatch({
                type: SET_FUN_FACT_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_FUN_FACT_POSTS,
                payload: []
            })
        });
}
export const getTopFunFactPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/funFact')
        .then((res) => {
            dispatch({
                type: SET_TOP_FUN_FACT_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_TOP_FUN_FACT_POSTS,
                payload: []
            })
        });
}

export const getPlotHolesPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/plotHoles')
        .then((res) => {
            dispatch({
                type: SET_PLOT_HOLES_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_PLOT_HOLES_POSTS,
                payload: []
            })
        });
}

export const getTopPlotHolesPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts/top/plotHoles')
        .then((res) => {
            dispatch({
                type: SET_TOP_PLOT_HOLES_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_TOP_PLOT_HOLES_POSTS,
                payload: []
            })
        });
}

// get posts on movie or tv show by id
export const getPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}`)
        .then((res) => {
            dispatch({
                type: SET_POSTS_BY_TITLEID,
                payload: res.data // res.data will return the array of all posts
            })
        })
        .catch(() => {
            dispatch({
                type: SET_POSTS_BY_TITLEID,
                payload: [] // empty object 
            })
        })
};

export const getTopPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/top`)
        .then((res) => {
            dispatch({
                type: SET_TOP_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_TOP_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

export const getOpinionPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/opinion`)
        .then((res) => {
            dispatch({
                type: SET_OPINION_POSTS_BY_TITLEID,
                payload: res.data // res.data will return the array of all posts
            })
        })
        .catch(() => {
            dispatch({
                type: SET_OPINION_POSTS_BY_TITLEID,
                payload: [] // empty object 
            })
        })
};

export const getFunFactPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/funFact`)
        .then((res) => {
            dispatch({
                type: SET_FUN_FACT_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_FUN_FACT_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

export const getPlotHolesPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/plotHoles`)
        .then((res) => {
            dispatch({
                type: SET_PLOT_HOLES_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_PLOT_HOLES_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

export const getTopOpinionPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/top/opinion`)
        .then((res) => {
            dispatch({
                type: SET_TOP_OPINION_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_TOP_OPINION_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

export const getTopFunFactPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/top/funFact`)
        .then((res) => {
            dispatch({
                type: SET_TOP_FUN_FACT_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_TOP_FUN_FACT_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

export const getTopPlotHolesPostsByTitleId = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/posts/${titleId}/top/plotHoles`)
        .then((res) => {
            dispatch({
                type: SET_TOP_PLOT_HOLES_POSTS_BY_TITLEID,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_TOP_PLOT_HOLES_POSTS_BY_TITLEID,
                payload: []
            })
        })
};

// Get 1 post and its details
export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/post/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });

        })
        .catch((err) => console.log(err));
}

export const getComment = (commentId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/comment/${commentId}`)
        .then(res => {
            dispatch({
                type: SET_COMMENT,
                payload: res.data
            });

        })
        .catch((err) => console.log(err));
}

// Upload a post
export const uploadPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token; // in getTitles the axios header was deleted so have to add it again in order to have the permission to upload a post
    axios.post('/post', newPost) //send post request with newPost as the data
        .then((res) => {
            dispatch({
                type: UPLOAD_POST,
                payload: res.data //res.data will return 1 post
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
// Like a post
export const likePost = (postId) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/post/${postId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/post/${postId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

// Submit a Comment
export const submitComment = (postId, commentData) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token; // in getTitles the axios header was deleted so have to add it again in order to have the permission to post a comment
    axios.post(`/post/${postId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(getPost(postId)); //to get the updated commentCount right away
            dispatch(clearErrors()); // can pass clearErrors() onto dispatch because it is an action creator

        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const deleteComment = (commentId, postId) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;

    axios.delete(`/comment/${commentId}`)
    .then(() => {
        // dispatch({ type: DELETE_COMMENT, payload: commentId })
        dispatch(getPost(postId));
    })
    .catch((err) => console.log(err));
}

export const submitReplyToComment = (commentId, postId, repliedCommentData) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token; // in getTitles the axios header was deleted so have to add it again in order to have the permission to post a comment
    axios.post(`/post/${postId}/comment/${commentId}/comment`, repliedCommentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_REPLIED_COMMENT,
                payload: res.data
            });
            dispatch(getPost(postId)); //to get the updated repliedCommentsCount right away
            dispatch(clearErrors()); // can pass clearErrors() onto dispatch because it is an action creator

        })
        .catch((err) => {
            console.log(err);
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                });
            }
        });
}

// Delete a Post
export const deletePost = (postId) => (dispatch) => {
    const token = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: postId })
        })
        .catch((err) => console.log(err));
}

export const getUserDataForUserPage = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_USER_FOR_USER_PAGE,
                payload: res.data.user
            });
            dispatch({
                type: SET_POSTS,
                payload: res.data.posts
            });
        }).catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            });
        });
}

// get the titles of movies and tv shows from search
export const getTitles = (searchValue, page) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    delete axios.defaults.headers.common['Authorization']; // have to delete the header or the get request would be blocked by CORS (Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response).
    axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&s=' + searchValue + '&page=' + page)
        .then((res) => {
            if (res.data.Response === 'True') {
                dispatch({
                    type: SET_TITLES,
                    payload: res.data
                });
                dispatch(clearErrors());
            }
            else {
                dispatch({
                    type: SET_ERRORS,
                    payload: res.data
                });
            }
        }).catch((err) => {
            console.log(err)
        });
}

export const clearSearchTitles = () => (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_TITLES
    })
}

// get the details of a movie or tv show
export const getTitle = (titleId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    delete axios.defaults.headers.common['Authorization']; // have to delete the header or the get request would be blocked by CORS (Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response).
    axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + titleId)
        .then((res) => {
            dispatch({
                type: SET_TITLE,
                payload: res.data
            });
        }).catch((err) => console.log(err));

}

// set the season according to the dropdown selection
export const chooseSeason = (season) => (dispatch) => {
    dispatch({
        type: CHOOSE_SEASON,
        payload: season
    })
}


export const getTVSeason = (titleId, season) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    delete axios.defaults.headers.common['Authorization']; // have to delete the header or the get request would be blocked by CORS (Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response).
    axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + titleId + '&season=' + season)
        .then((res) => {
            dispatch({
                type: SET_TV_SEASON,
                payload: res.data
            });
            //need to clear the episodes array when choosing a new season
            dispatch({
                type: CLEAR_EPISODES,
                payload: []
            });
            //get the episode details (mainly the poster to display out in the list of episodes)
            res.data.Episodes.map((episode, index) => {
                //console.log(`CHECKKKK ${JSON.stringify(episode)}`);
                axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + episode.imdbID)
                    .then((res) => {
                        dispatch({
                            type: SET_EPISODE_OVERVIEW,
                            payload: [res.data, index]
                        });
                    }).catch((err) => console.log(err));
                return episode;
            });
        })
        .catch((err) => console.log(err));
}

// get the details of a tv series' episode and add the episode to the episodes array (mainly to display the poster out in the tv season page)
/*
const getEpisodeOverview = (episodeId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    delete axios.defaults.headers.common['Authorization']; // have to delete the header or the get request would be blocked by CORS (Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response).
    axios.get('http://www.omdbapi.com/?apikey='+ process.env.REACT_APP_OMDB_API_KEY + '&i=' + episodeId)
        .then((res) => {
            dispatch({
                type: SET_EPISODE_OVERVIEW,
                payload: res.data
            });
        }).catch((err) => console.log(err));
}
*/

// get the details of a tv series' episode without adding the episode to the episodes array (fetching the details in the tv episodes page)
export const getEpisodeDetails = (episodeId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    delete axios.defaults.headers.common['Authorization']; // have to delete the header or the get request would be blocked by CORS (Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response).
    axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + episodeId)
        .then((res) => {
            dispatch({
                type: SET_EPISODE_DETAILS,
                payload: res.data
            });
        }).catch((err) => console.log(err));
}

//get tmdb info with imdb id
export const getTmdbInfo = (imdbId) => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/find/' + imdbId + '?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&external_source=imdb_id')
        .then((res) => {
            const tmdbTitle = res.data.movie_results.length > 0 ? res.data.movie_results[0] : res.data.tv_results[0];
            dispatch({
                type: SET_TITLE_TMDB,
                payload: tmdbTitle//res.data.movie_results.length > 0 ? res.data.movie_results[0] : res.data.tv_results[0]
            })
            //console.log(`tmdb info ${res.data.movie_results.length}`);
            //console.log(`tmdb info id ${res.data.movie_results[0].id}`);
            const type = res.data.movie_results.length > 0 ? 'movie' : 'tv';
            const tmdbId = tmdbTitle.id; //(res.data.movie_results.length > 0) ? res.data.movie_results[0].id : res.data.tv_results[0].id;     

            console.log(`type ${type}`)
            console.log(`tmdb id ${tmdbId}`)
            //get movie/tv show's similar movies/tv shows from tmdbId || better implemented inside of getTMDBInfo
            axios.get('https://api.themoviedb.org/3/' + type + '/' + tmdbId + '/recommendations?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&page=1')
                .then((res) => {
                    // get the omdb data for each similar title
                    res.data.results.map((similarTitle) => {
                        const tmdbId = similarTitle.id;

                        // get the movie's imdb id from tmdb id
                        axios.get('https://api.themoviedb.org/3/' + type + '/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                            .then((res) => {
                                const imdbId = res.data.imdb_id;
                                delete axios.defaults.headers.common['Authorization'];

                                //get the movie from omdb api by using its imdb id
                                axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                                    .then((res) => {
                                        if (res.data.Response === 'True') {
                                            dispatch({
                                                type: SET_SIMILAR_TITLES,
                                                payload: res.data // array containing similar titles from tmdb
                                            })
                                        }
                                    })
                                    .catch((err) => console.log(err))

                            })
                            .catch((err) => console.log(err));
                        return similarTitle;
                    })

                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
}

export const getHighlyRatedMovies = () => {
    return async (dispatch) => {
        const tmdbTitlesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=10000');

        // console.log(JSON.stringify(tmdbTitlesResponse));
        const highlyRatedMovies = [];

        const highlyRatedMoviesArrayResponse = await Promise.all(tmdbTitlesResponse.data.results.map(async (highlyRatedMovie) => {
            dispatch({ type: LOADING_HIGHLY_RATED_TITLE });
            const tmdbId = highlyRatedMovie.id;
            const tmdbIdResponse = await axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY);

            // console.log("checkpoint ");

            const imdbId = tmdbIdResponse.data.imdb_id;
            delete axios.defaults.headers.common['Authorization'];

            const omdbResponse = await axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId);
            if (omdbResponse.data.Response === 'True') {
                highlyRatedMovies.push(omdbResponse.data);
            }
            return highlyRatedMovie;
        }
        ));

        dispatch({
            type: SET_HIGHLY_RATED_MOVIES,
            payload: highlyRatedMovies // array containing similar titles from tmdb
        })
        dispatch({
            type: STOP_LOADING_HIGHLY_RATED_TITLE// set loading from ui back to false
        });
        return highlyRatedMoviesArrayResponse;
    }
}
/*
export const getHighlyRatedMovies = () => (dispatch) => {

    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=10000')
        .then((res) => {
            res.data.results.map((highlyRatedMovie) => {
                dispatch({ type: LOADING_HIGHLY_RATED_TITLE });
                const tmdbId = highlyRatedMovie.id;

                // get the movie's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey='+ process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_HIGHLY_RATED_MOVIES,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                                    dispatch({
                                        type: STOP_LOADING_HIGHLY_RATED_TITLE// set loading from ui back to false
                                    });
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                return highlyRatedMovie;
            });

        })
        .catch((err) => console.log(err))

}
*/

export const getHighlyRatedTV = () => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=vote_average.desc&page=1&timezone=America%2FNew_York&vote_count.gte=900')
        .then((res) => {
            res.data.results.map((highlyRatedTV) => {
                dispatch({ type: LOADING_HIGHLY_RATED_TITLE });
                const tmdbId = highlyRatedTV.id;

                // get the show's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/tv/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the show from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_HIGHLY_RATED_TV,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                                    dispatch({
                                        type: STOP_LOADING_HIGHLY_RATED_TITLE// set loading from ui back to false
                                    });
                                }
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err));
                return highlyRatedTV;
            });
        })
        .catch((err) => console.log(err))
};

export const getPopularMovies = () => {
    return async (dispatch) => {
        const tmdbTitlesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1');

        const popularMovies = [];

        const popularMovesArrayResponse = await Promise.all(tmdbTitlesResponse.data.results.map(async (popularMovie) => {
            dispatch({ type: LOADING_POPULAR_TITLE });
            const tmdbId = popularMovie.id; 
            const externalIdTmdbResponse = await axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY);
            
            const imdbId = externalIdTmdbResponse.data.imdb_id;
            delete axios.defaults.headers.common['Authorization'];

            const omdbResponse = await axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId);
            console.log("omdbResponse: ", JSON.stringify(omdbResponse));
            if (omdbResponse.data.Response === 'True') {
                popularMovies.push(omdbResponse.data);
            }
            return popularMovies; 
        }));
        dispatch({
            type: SET_POPULAR_MOVIES,
            payload: popularMovies // array containing similar titles from tmdb
        });
        dispatch({
            type: STOP_LOADING_POPULAR_TITLE// set loading from ui back to false
        });
        return popularMovesArrayResponse; 
    }
}

/*
export const getPopularMovies = () => (dispatch) => {

    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1')
        .then((res) => {
            res.data.results.map((popularMovie) => {
                dispatch({ type: LOADING_POPULAR_TITLE });

                const tmdbId = popularMovie.id;

                // get the movie's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_POPULAR_MOVIES,
                                        payload: res.data // array containing similar titles from tmdb
                                    });
                                    dispatch({
                                        type: STOP_LOADING_POPULAR_TITLE// set loading from ui back to false
                                    });
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                return popularMovie;
            });
        })
        .catch((err) => console.log(err))

}
*/

export const getPopularTV = () => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=popularity.desc&page=1&vote_count.gte=2000')
        .then((res) => {
            res.data.results.map((popularTV) => {
                dispatch({ type: LOADING_POPULAR_TITLE });
                const tmdbId = popularTV.id;

                // get the show's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/tv/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the show from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_POPULAR_TV,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                                    dispatch({
                                        type: STOP_LOADING_POPULAR_TITLE// set loading from ui back to false
                                    });
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                return popularTV;
            });
        })
        .catch((err) => console.log(err))
}

export const getTrendingMovies = () => {
    return async (dispatch) => {
        const tmdbTitlesResponse = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + process.env.REACT_APP_TMDB_API_KEY);

        const trendingMovies = [];

        const trendingMovesArrayResponse = await Promise.all(tmdbTitlesResponse.data.results.map(async (trendingMovie) => {
            dispatch({ type: LOADING_TRENDING_TITLE });
            const tmdbId = trendingMovie.id;
            const externalIdTmdbResponse = await axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY);

            const imdbId = externalIdTmdbResponse.data.imdb_id;
            delete axios.defaults.headers.common['Authorization'];

            const omdbResponse = await axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId);
            if (omdbResponse.data.Response === 'True') {
                trendingMovies.push(omdbResponse.data);
            }
            return trendingMovies; 
        }));
        dispatch({
            type: SET_TRENDING_MOVIES,
            payload: trendingMovies// array containing similar titles from tmdb
        });
        dispatch({
            type: STOP_LOADING_TRENDING_TITLE// set loading from ui back to false
        });
        return trendingMovesArrayResponse;
    }
}
/*
export const getTrendingMovies = () => (dispatch) => {
    dispatch({ type: LOADING_TRENDING_TITLE });
    axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
        .then((res) => {
            res.data.results.map((trendingMovie) => {
                const tmdbId = trendingMovie.id;

                // get the movie's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True')
                                    dispatch({
                                        type: SET_TRENDING_MOVIES,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                            })
                            .catch((err) => console.log(err))
                    })
                return trendingMovie;
            });
            dispatch({
                type: STOP_LOADING_UI // set loading from ui back to false
            });
        })
        .catch((err) => console.log(err))
    dispatch({
        type: STOP_LOADING_TRENDING_TITLE// set loading from ui back to false
    });
}
*/ 

export const getTrendingTV = () => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
        .then((res) => {
            res.data.results.map((trendingTV) => {
                dispatch({ type: LOADING_TRENDING_TITLE });
                const tmdbId = trendingTV.id;
                // get the movie's imdb id from tmdb id
                axios.get('https://api.themoviedb.org/3/tv/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_TRENDING_TV,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                                    dispatch({
                                        type: STOP_LOADING_TRENDING_TITLE// set loading from ui back to false
                                    });
                                }
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err));
                return trendingTV;
            });
        })
        .catch((err) => console.log(err))
}

// get all movie genres
export const getMovieGenres = () => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US')
        .then((res) => {
            dispatch({
                type: SET_MOVIE_GENRES,
                payload: res.data.genres
            })
        })
        .catch((err) => console.log(err));
}

// get all tv genres
export const getTVGenres = () => (dispatch) => {
    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US')
        .then((res) => {
            dispatch({
                type: SET_TV_GENRES,
                payload: res.data.genres
            })
        })
        .catch((err) => console.log(err));
}
// get recommended movies based on user's favorite' movie genres
export const getRecommendedMovies = (favoriteMovieGenresNames, movieGenres) => (dispatch) => {

    let favoriteMovieGenresIds = [];

    let favoriteMovieGenresIdsString = favoriteMovieGenresNames && favoriteMovieGenresNames.length > 0 && favoriteMovieGenresNames.map((favoriteMovieGenresName, index) => {
        //if (index === 0 ) {
        //console.log(`movie Genres filter ${JSON.stringify(movieGenres.filter(movieGenre => movieGenre.name === favoriteMovieGenresName).map(movieGenre => movieGenre.id))}`);
        //    favoriteMovieGenresIds = movieGenres.filter(movieGenre => movieGenre.name === favoriteMovieGenresName).map(movieGenre => movieGenre.id);
        //} else {
        //console.log(`check return ${favoriteMovieGenresIds.concat(movieGenres.filter(movieGenre => movieGenre.name === favoriteMovieGenresName).map(movieGenre => movieGenre.id))}`);
        return favoriteMovieGenresIds.concat(movieGenres.filter(movieGenre => movieGenre.name === favoriteMovieGenresName).map(movieGenre => movieGenre.id));

        // }
        //return favoriteMovieGenresIds;
    })

    //console.log(`check type ${typeof favoriteMovieGenresIds}`)
    //let movieGenreIds = favoriteMovieGenresIds && favoriteMovieGenresIds.length > 0 && favoriteMovieGenresIds.join();
    dispatch({ type: LOADING_RECOMMENDED_TITLE });
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + favoriteMovieGenresIdsString)
        .then((res) => {
            dispatch({
                type: CLEAR_RECOMMENDED_MOVIES,
            });
            res.data.results.map((result) => {
                const tmdbId = result.id;
                axios.get('https://api.themoviedb.org/3/movie/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;

                        delete axios.defaults.headers.common['Authorization'];
                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True') {
                                    dispatch({
                                        type: SET_RECOMMENDED_MOVIES,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                                }
                            })
                            .catch((err) => console.log(err));
                        //dispatch({ type: STOP_LOADING_RECOMMENDED_TITLE });
                    })
                    .catch((err) => console.log(err));
                return result;
            })
        })
        .catch((err) => console.log(err));
}

// get recommended tvs based on user's favorite' tv genres
export const getRecommendedTVs = (favoriteTVGenresNames, tvGenres) => (dispatch) => {
    let favoriteTVGenresIds = [];

    let favoriteTVGenresIdsString = favoriteTVGenresNames && favoriteTVGenresNames.length > 0 && favoriteTVGenresNames.map((favoriteTVGenresName, index) => {
        //console.log(`tv Genres filter ${JSON.stringify(tvGenres.filter(tvGenre => tvGenre.name === favoriteTVGenresName).map(tvGenre => tvGenre.id))}`);

        return favoriteTVGenresIds.concat(tvGenres.filter(tvGenre => tvGenre.name === favoriteTVGenresName).map(tvGenre => tvGenre.id));
        // }
        //return favoriteMovieGenresIds;
    });

    //const regexComma =/,/gi;
    //favoriteTVGenresIdsString = String(favoriteTVGenresIdsString).replace(regexComma, '%2C%20');
    //console.log(`check reommended tv genres ${favoriteTVGenresIdsString}`);

    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.REACT_APP_TMDB_API_KEY + '&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=' + favoriteTVGenresIdsString + '&include_null_first_air_dates=false')
        .then((res) => {
            dispatch({
                type: CLEAR_RECOMMENDED_TVS,
            });
            res.data.results.map((result) => {
                const tmdbId = result.id;
                axios.get('https://api.themoviedb.org/3/tv/' + tmdbId + '/external_ids?api_key=' + process.env.REACT_APP_TMDB_API_KEY)
                    .then((res) => {
                        const imdbId = res.data.imdb_id;
                        delete axios.defaults.headers.common['Authorization'];

                        //get the movie from omdb api by using its imdb id
                        axios.get('https://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMDB_API_KEY + '&i=' + imdbId)
                            .then((res) => {
                                if (res.data.Response === 'True')
                                    dispatch({
                                        type: SET_RECOMMENDED_TVS,
                                        payload: res.data // array containing similar titles from tmdb
                                    })
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                return result;
            })
        })
        .catch((err) => console.log(err));
}
/*
export const setScrollToComment = (commentId, postId) => (dispatch) => {
    axios.get(`/comment/${commentId}`)
        .then((res) => {
            dispatch({ 
                type: SET_SCROLL_TO_COMMENT,
                payload: res.data
            });
            dispatch(getPost(postId));
        })
        .catch((err) => console.log(err));
}
*/
export const setScrollToComment = (commentId) => (dispatch) => {
    dispatch({
        type: CLEAR_COMMENT_SCROLL_TO
    });
    axios.get(`/comment/${commentId}`)
        .then((res) => {
            dispatch({
                type: COMMENT_SCROLL_TO,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));

}

export const setScrollToRepliedComment = (repliedCommentId, parentCommentId) => (dispatch) => {
    dispatch({
        type: CLEAR_REPLIED_COMMENT_SCROLL_TO
    });
    axios.get(`/repliedComment/${repliedCommentId}`)
        .then((res) => {
            dispatch({
                type: REPLIED_COMMENT_SCROLL_TO,
                payload: res.data
            });
            axios.get(`/comment/${parentCommentId}`)
                .then((res) => {
                    dispatch({
                        type: SET_PARENT_COMMENT,
                        payload: res.data
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}
// clear the state's posts array when rendering specific season's or episode's posts 
export const clearPosts = () => (dispatch) => {
    dispatch({ type: CLEAR_POSTS });
}
// Not choosing any season in the tv series' details page dropdown
export const chooseSeasonDefault = () => (dispatch) => {
    dispatch({ type: SET_CHOOSE_SEASON });
}

export const clearErrors = () => (dispatch) => { // a function like this which only dispatches an action is called an action creator
    dispatch({ type: CLEAR_ERRORS });
}