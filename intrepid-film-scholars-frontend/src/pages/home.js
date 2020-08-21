import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import components
import Post from '../components/post/Post';
import SortPostBar from '../components/post/SortPostBar';
import PostSkeleton from '../util/PostSkeleton';
import FavoriteGenresEdit from '../components/profile/FavoriteGenresEdit';
import SimilarTitle from '../components/moviesTV/SimilarTitle';
import TitleSkeleton from '../util/TitleSkeleton';

//import Material UI
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// import Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/userActions';
import { getPosts, getTopPosts, getOpinionPosts, getTopOpinionPosts, getFunFactPosts, getTopFunFactPosts, getPlotHolesPosts, getTopPlotHolesPosts, getMovieGenres, getTVGenres, getRecommendedMovies, getRecommendedTVs } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    formControl: {
        marginRight: 15,
        '& .MuiInput-underline:before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none !important'
        },
        '& .MuiInputBase-input': {
            color: '#01B2BF !important',
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    sortPostSelect: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            paddingTop: 12,
            paddingBottom: 12,
        },
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem'
    },
    loadMoreButton: {
        backgroundColor: '#3BB6BF !important'
    },
    toggleButtonGroup: {
    },
    toggleButtonTypography: {
        fontSize: '1.2rem'
    },
    recommendedContainer: {
        height: 662,
        overflowY: 'scroll'
    },
    recommendedItem: {
        height: 150,
        marginBottom: 20,
        marginRight: 10
    }
})

class home extends Component {
    state = {
        limit: 10,
        recommendedView: 'Movies',
        sortBy: 'Recent',
        tabValue: 'All'
    }

    componentDidMount() {
        //this.props.getUserData();
        this.props.getPosts();
        this.props.getMovieGenres();
        this.props.getTVGenres();
    }

    onLoadMore = () => {
        this.setState({
            limit: this.state.limit + 10
        });
    }

    handleRecommendedToggleButtonChange = (event, nextView) => {
        if (nextView !== null) { //at least 1 toggle button must be on
            this.setState({
                recommendedView: nextView
            });
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.credentials.movieGenres !== this.props.credentials.movieGenres || prevProps.data.movieGenres !== this.props.data.movieGenres) { //the second condition is for when the page first loaded
            this.props.getRecommendedMovies(this.props.credentials.movieGenres, this.props.data.movieGenres);
        }
        if (prevProps.credentials.tvGenres !== this.props.credentials.tvGenres || prevProps.data.tvGenres !== this.props.data.tvGenres) { //the second condition is for when the page first loaded and)
            this.props.getRecommendedTVs(this.props.credentials.tvGenres, this.props.data.tvGenres);
        }
    }

    handleSortPostSelect = (event) => {
        this.setState({
            sortBy: event.target.value
        })
        if (event.target.value === 'Top') {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getTopPosts();
                    break;
                case 'Opinion':
                    this.props.getTopOpinionPosts();
                    break;
                case 'Fun Fact':
                    this.props.getTopFunFactPosts();
                    break;
                default:
                    this.props.getPlotHolesPosts();
            }

        }
        else {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getPosts();
                    break;
                case 'Opinion':
                    this.props.getOpinionPosts();
                    break;
                case 'Fun Fact':
                    this.props.getFunFactPosts();
                    break;
                default:
                    this.props.getTopPlotHolesPosts();
            }

        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({
            tabValue: newValue
        });
        switch (newValue) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPosts();
                else
                    this.props.getTopPosts();
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPosts();
                else
                    this.props.getTopOpinionPosts();
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPosts();
                else
                    this.props.getTopFunFactPosts();
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPosts();
                else
                    this.props.getTopPlotHolesPosts();
        }
    }

    handleCategoryPostSelect = (event) => { // for small screens
        this.setState({
            tabValue: event.target.value
        });
        switch (event.target.value) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPosts();
                else
                    this.props.getTopPosts();
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPosts();
                else
                    this.props.getTopOpinionPosts();
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPosts();
                else
                    this.props.getTopFunFactPosts();
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPosts();
                else
                    this.props.getTopPlotHolesPosts();
        }
    }

    handleRecentTopToggleChange = (event, nextView) => {
        console.log(`next view ${nextView}`)
        if (nextView !== null) {
            this.setState({
                sortBy: nextView
            })
            if (nextView === 'Top') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getTopPosts();
                        break;
                    case 'Opinion':
                        this.props.getTopOpinionPosts();
                        break;
                    case 'Fun Fact':
                        this.props.getTopFunFactPosts();
                        break;
                    default:
                        this.props.getPlotHolesPosts();
                }

            }
            else if (nextView === 'Recent') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getPosts();
                        break;
                    case 'Opinion':
                        this.props.getOpinionPosts();
                        break;
                    case 'Fun Fact':
                        this.props.getFunFactPosts();
                        break;
                    default:
                        this.props.getTopPlotHolesPosts();
                }

            }
        }
    }
    render() {
        const { classes } = this.props;
        const { posts, loading, recommendedMovies, recommendedTVs, loadingRecommendedTitle } = this.props.data; //posts and loading are properties of dataReducer
        const { authenticated } = this.props.user;
        const { movieGenres, tvGenres } = this.props.credentials;
        let recentPostsMarkup =
            <Fragment>
                <SortPostBar tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} sortBy={this.state.sortBy} handleSortPostSelect={this.handleSortPostSelect} handleCategoryPostSelect={this.handleCategoryPostSelect} handleRecentTopToggleChange={this.handleRecentTopToggleChange} />
                {!loading ? (  // if the state has posts then shows the posts
                    <Fragment>
                        {
                            posts && posts.slice(0, this.state.limit).map((post) => <Post key={post.postId} post={post} />)
                        }
                    </Fragment >
                ) : (
                        <PostSkeleton />
                    )
                }
            </Fragment>

        let recommendedMoviesMarkup =
            loadingRecommendedTitle && movieGenres ? (
                <Fragment>
                    <TitleSkeleton />
                    <TitleSkeleton />
                    <TitleSkeleton />
                    <TitleSkeleton />
                </Fragment>
            ) : (
                    movieGenres ? (
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
            loadingRecommendedTitle && tvGenres ? (
                <Fragment>
                    <TitleSkeleton />
                    <TitleSkeleton />
                    <TitleSkeleton />
                    <TitleSkeleton />
                </Fragment>
            ) : (
                    tvGenres ? (
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
                    {posts && this.state.limit <= posts.length && //not display the button if the limit is more than the length of the posts array
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={this.onLoadMore} component={Link} to='/' className={classes.loadMoreButton}>
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
                                    value={this.state.recommendedView}
                                    exclusive
                                    onChange={this.handleRecommendedToggleButtonChange}
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
                            {this.state.recommendedView === 'Movies' ? recommendedMoviesMarkup : recommendedTVsMarkup}
                        </div>
                    }
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired, // data is the dataReducer - we passed it into data in store.js
    credentials: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    credentials: state.user.credentials,
    UI: state.UI,
});

const mapDispatchToProps = {
    getUserData,
    getPosts,
    getTopPosts,
    getTopOpinionPosts,
    getOpinionPosts,
    getFunFactPosts,
    getTopFunFactPosts,
    getPlotHolesPosts,
    getTopPlotHolesPosts,
    getRecommendedMovies,
    getRecommendedTVs,
    getMovieGenres,
    getTVGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(home));
