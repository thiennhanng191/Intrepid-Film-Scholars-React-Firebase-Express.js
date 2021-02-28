import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';

// import components
import Post from '../../components/post/Post';
import SortPostBar from '../../components/post/SortPostBar';
import PostSkeleton from '../../util/PostSkeleton';
import FavoriteGenresEdit from '../../components/profile/FavoriteGenresEdit';
import SimilarTitle from '../../components/moviesTV/SimilarTitle';
import TitleSkeleton from '../../util/TitleSkeleton';

//import Material UI
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// import Redux
import { getPosts, getTopPosts, getOpinionPosts, getTopOpinionPosts, getFunFactPosts, getTopFunFactPosts, getPlotHolesPosts, getTopPlotHolesPosts, getMovieGenres, getTVGenres, getRecommendedMovies, getRecommendedTVs } from '../../redux/actions/dataActions';


const HomePage = () => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [recommendedView, setRecommendedView] = useState('Movies');
    const [sortBy, setSortBy] = useState('Recent');
    const [tabValue, setTabValue] = useState('All');

    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const { posts, loading, recommendedMovies, recommendedTVs, loadingRecommendedTitle, movieGenres: availableMovieGenres, tvGenres: availableTVGenres } = data;
    const user = useSelector(state => state.user);
    const { authenticated, credentials } = user;
    const { movieGenres: userMovieGenres, tvGenres: userTVGenres } = credentials;

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getMovieGenres());
        dispatch(getTVGenres());
    }, [dispatch]);

    useEffect(() => {
        if (userMovieGenres)
            dispatch(getRecommendedMovies(userMovieGenres, availableMovieGenres));
        if (userTVGenres)
            dispatch(getRecommendedTVs(userTVGenres, availableTVGenres));
    }, [dispatch, userMovieGenres, userTVGenres, availableMovieGenres, availableTVGenres]);

    const onLoadMore = () => {
        setLimit(limit + 10);
    }

    const handleRecommendedToggleButtonChange = (event, nextView) => {
        if (nextView !== null) { //at least 1 toggle button must be on
            setRecommendedView(nextView);
        }
    }

    const handleSortPostSelect = (event) => {
        setSortBy(event.target.value);

        if (event.target.value === 'Top') {
            switch (tabValue) {
                case 'All':
                    dispatch(getTopPosts());
                    break;
                case 'Opinion':
                    dispatch(getTopOpinionPosts());
                    break;
                case 'Fun Fact':
                    dispatch(getTopFunFactPosts());
                    break;
                default:
                    dispatch(getPlotHolesPosts());
            }

        } else {
            switch (tabValue) {
                case 'All':
                    dispatch(getPosts());
                    break;
                case 'Opinion':
                    dispatch(getOpinionPosts());
                    break;
                case 'Fun Fact':
                    dispatch(getFunFactPosts());
                    break;
                default:
                    dispatch(getTopPlotHolesPosts());
            }
        }
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        switch (newValue) {
            case 'All':
                if (sortBy === 'Recent')
                    dispatch(getPosts());
                else
                    dispatch(getTopPosts());
                break;
            case 'Opinion':
                if (sortBy === 'Recent')
                    dispatch(getOpinionPosts());
                else
                    dispatch(getTopOpinionPosts());
                break;
            case 'Fun Fact':
                if (sortBy === 'Recent')
                    dispatch(getFunFactPosts());
                else
                    dispatch(getTopFunFactPosts());
                break;
            default:
                if (sortBy === 'Recent')
                    dispatch(getPlotHolesPosts());
                else
                    dispatch(getTopPlotHolesPosts());
        }
    }

    const handleCategoryPostSelect = (event) => { // for small screens
        setTabValue(event.target.value);

        switch (event.target.value) {
            case 'All':
                if (sortBy === 'Recent')
                    dispatch(getPosts());
                else
                    dispatch(getTopPosts());
                break;
            case 'Opinion':
                if (sortBy === 'Recent')
                    dispatch(getOpinionPosts());
                else
                    dispatch(getTopOpinionPosts());
                break;
            case 'Fun Fact':
                if (sortBy === 'Recent')
                    dispatch(getFunFactPosts());
                else
                    dispatch(getTopFunFactPosts());
                break;
            default:
                if (sortBy === 'Recent')
                    dispatch(getPlotHolesPosts());
                else
                    dispatch(getTopPlotHolesPosts());
        }
    }

    const handleRecentTopToggleChange = (event, nextView) => {
        console.log(`next view ${nextView}`)
        if (nextView !== null) {
            setSortBy(nextView);
            if (nextView === 'Top') {
                switch (tabValue) {
                    case 'All':
                        dispatch(getTopPosts());
                        break;
                    case 'Opinion':
                        dispatch(getTopOpinionPosts());
                        break;
                    case 'Fun Fact':
                        dispatch(getTopFunFactPosts());
                        break;
                    default:
                        dispatch(getPlotHolesPosts());
                }

            }
            else if (nextView === 'Recent') {
                switch (tabValue) {
                    case 'All':
                        dispatch(getPosts());
                        break;
                    case 'Opinion':
                        dispatch(getOpinionPosts());
                        break;
                    case 'Fun Fact':
                        dispatch(getFunFactPosts());
                        break;
                    default:
                        dispatch(getTopPlotHolesPosts());
                }

            }
        }
    }

    let recentPostsMarkup =
        <Fragment>
            <SortPostBar tabValue={tabValue} handleTabChange={handleTabChange} sortBy={sortBy} handleSortPostSelect={handleSortPostSelect} handleCategoryPostSelect={handleCategoryPostSelect} handleRecentTopToggleChange={handleRecentTopToggleChange} />
            {!loading ? (  // if the state has posts then shows the posts
                <Fragment>
                    {
                        posts && posts.slice(0, limit).map((post) => <Post key={post.postId} post={post} />)
                    }
                </Fragment >
            ) : (
                    <PostSkeleton />
                )
            }
        </Fragment>

    let recommendedMoviesMarkup =
        loadingRecommendedTitle && userMovieGenres ? (
            <Fragment>
                <TitleSkeleton />
                <TitleSkeleton />
                <TitleSkeleton />
                <TitleSkeleton />
            </Fragment>
        ) : (
                userMovieGenres ? (
                    recommendedMovies.length > 0 ? (
                        <div className={classes.recommendedContainer}>
                            {
                                recommendedMovies.map((recommendedMovie, index) => (
                                    <SimilarTitle title={recommendedMovie} key={index} customClass={classes.recommendedItem} />
                                ))
                            }
                        </div >
                    ) : (
                            <Typography variant='body1'>Please try another combination of Movies Genres</Typography>
                        )
                ) : (
                        <Typography variant='body1'>
                            Please select your favorite movies and tv genres
                        </Typography>
                    )
            )



    let recommendedTVsMarkup =
        loadingRecommendedTitle && userTVGenres ? (
            <Fragment>
                <TitleSkeleton />
                <TitleSkeleton />
                <TitleSkeleton />
                <TitleSkeleton />
            </Fragment>
        ) : (
                userTVGenres ? (
                    recommendedTVs.length > 0 ? (
                        < div className={classes.recommendedContainer} >
                            {
                                recommendedTVs.map((recommendedTV, index) => (
                                    <SimilarTitle title={recommendedTV} key={index} customClass={classes.recommendedItem} />
                                ))
                            }
                        </div >
                    ) : (
                            <Typography variant='body1'>Please try another combination of TV Genres</Typography>
                        )
                ) : (
                        <Typography variant='body1'>
                            Please select your favorite movies and tv genres
                        </Typography>
                    )
            )

    return (
        <Grid container spacing={4}>
            <Grid item md={8} sm={7} xs={12}>
                {recentPostsMarkup}
                {posts && limit <= posts.length && //not display the button if the limit is more than the length of the posts array
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={onLoadMore} component={Link} to='/' className={classes.loadMoreButton}>
                            <Typography variant='body1' style={{ color: 'white' }}>Load More</Typography>
                        </Button>
                    </div>
                }
            </Grid>
            <Grid item md={4} sm={5} xs={12}>
                <Typography variant='h6' style={{ textAlign: 'center', color: '#079BAB', marginBottom: 10 }}>
                    Your film interests
                    </Typography>
                <FavoriteGenresEdit />
                {authenticated &&
                    <div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' style={{ color: 'gray', fontSize: '1.2rem', width: 'max-content' }}>Suggested for you</Typography>
                            </div>

                            <ToggleButtonGroup
                                value={recommendedView}
                                exclusive
                                onChange={handleRecommendedToggleButtonChange}
                                aria-label="Recommended Movies TV Togggle"
                                className={classes.toggleButtonGroup}
                                id='recommended-movies-tv-toggle'
                            >
                                <ToggleButton value="Movies" aria-label="Movies" className={classes.toggleButton} style={{ borderRadius: 10, width: '100%' }}>
                                    <Typography variant='h6' className={classes.toggleButtonTypography}>Movies</Typography>
                                </ToggleButton>
                                <ToggleButton value="TV" aria-label="TV" className={classes.toggleButton} style={{ borderRadius: 10 }}>
                                    <Typography variant='h6' className={classes.toggleButtonTypography}>TV</Typography>
                                </ToggleButton>
                            </ToggleButtonGroup>

                        </div>
                        {recommendedView === 'Movies' ? recommendedMoviesMarkup : recommendedTVsMarkup}
                    </div>
                }
            </Grid>
        </Grid>
    )
}

export default HomePage;
