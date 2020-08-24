import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// import components
import Post from '../components/post/Post';
import PostSkeleton from '../util/PostSkeleton';
import TitleInfo from '../components/moviesTV/TitleInfo';
import Episode from '../components/moviesTV/Episode';
import SimilarTitle from '../components/moviesTV/SimilarTitle';
import PostForm from '../components/post/PostForm';
import SortPostBar from '../components/post/SortPostBar';

//import Redux
import { connect } from 'react-redux';
import { getTitle, uploadPost, chooseSeason, getTVSeason, getEpisodeDetails, getTmdbInfo } from '../redux/actions/dataActions';
import { getPostsByTitleId, getTopPostsByTitleId, getOpinionPostsByTitleId, getTopOpinionPostsByTitleId, getFunFactPostsByTitleId, getTopFunFactPostsByTitleId, getPlotHolesPostsByTitleId, getTopPlotHolesPostsByTitleId } from '../redux/actions/dataActions';

const styles = (theme) => ({
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
    titleInfo: {
        marginBottom: 20
    },
    similarContainer: {
        height: 662,
        overflowY: 'scroll'
    },
    episodesContainer: {
        height: 662,
        overflowY: 'scroll'
    },
    similarItem: {
        height: 150,
        marginBottom: 20,
        marginRight: 10
    },
    episodeItem: {
        height: 150,
        marginBottom: 20,
        marginRight: 10
    },
    progressSpinner: {
        position: 'absolute'
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
    tab: {
        minWidth: 120
    }
})

class movieTVdetails extends Component {
    state = {
        body: '', // body of the new post
        titleId: '',
        errors: {},
        submitted: false,
        sortBy: 'Recent',
        tabValue: 'All'
    }
    componentDidMount = () => {
        const titleId = this.props.match.params.titleId;
        console.log(`title id in movieTvdetails ${titleId}`)
        this.props.getTitle(titleId);
        const seasonInUrl = this.props.match.params.season;
        if (seasonInUrl) { //if url contain a season of a series
            this.props.chooseSeason(seasonInUrl); //change the value of the season select dropdown
            this.props.getTVSeason(titleId, seasonInUrl);
            this.props.getPostsByTitleId(titleId + seasonInUrl);
        }
        else
            this.props.getPostsByTitleId(titleId);
        this.props.getTmdbInfo(titleId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.titleId !== this.props.match.params.titleId) {
            const newTitleId = this.props.match.params.titleId;
            console.log(`new titleid ${newTitleId}`)
            this.props.getTitle(newTitleId);
            this.props.getPostsByTitleId(newTitleId);
            this.props.getTmdbInfo(newTitleId);
        }
    }

    handleSortPostSelect = (event) => {
        this.setState({
            sortBy: event.target.value
        })
        const titleImdbId = this.props.match.params.titleId;
        const seasonInUrl = this.props.match.params.season;
        const titleId = seasonInUrl ? (titleImdbId + seasonInUrl) : titleImdbId;
        if (event.target.value === 'Top') {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getTopPostsByTitleId(titleId);
                    break;
                case 'Opinion':
                    this.props.getTopOpinionPostsByTitleId(titleId);
                    break;
                case 'Fun Fact':
                    this.props.getTopFunFactPostsByTitleId(titleId);
                    break;
                default:
                    this.props.getPlotHolesPostsByTitleId(titleId);
            }

        }
        else {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getPostsByTitleId(titleId);
                    break;
                case 'Opinion':
                    this.props.getOpinionPostsByTitleId(titleId);
                    break;
                case 'Fun Fact':
                    this.props.getFunFactPostsByTitleId(titleId);
                    break;
                default:
                    this.props.getTopPlotHolesPostsByTitleId(titleId);
            }

        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({
            tabValue: newValue
        });
        const titleImdbId = this.props.match.params.titleId;
        const seasonInUrl = this.props.match.params.season;
        const titleId = seasonInUrl ? (titleImdbId + seasonInUrl) : titleImdbId;
        switch (newValue) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPostsByTitleId(titleId);
                else
                    this.props.getTopPostsByTitleId(titleId);
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPostsByTitleId(titleId);
                else
                    this.props.getTopOpinionPostsByTitleId(titleId);
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPostsByTitleId(titleId);
                else
                    this.props.getTopFunFactPostsByTitleId(titleId);
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPostsByTitleId(titleId);
                else
                    this.props.getTopPlotHolesPostsByTitleId(titleId);
        }
    }

    handleCategoryPostSelect = (event) => { // for small screens
        this.setState({
            tabValue: event.target.value
        });
        const titleImdbId = this.props.match.params.titleId;
        const seasonInUrl = this.props.match.params.season;
        const titleId = seasonInUrl ? (titleImdbId + seasonInUrl) : titleImdbId;
        switch (event.target.value) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPosts(titleId);
                else
                    this.props.getTopPosts(titleId);
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPosts(titleId);
                else
                    this.props.getTopOpinionPosts(titleId);
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPosts(titleId);
                else
                    this.props.getTopFunFactPosts(titleId);
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPosts(titleId);
                else
                    this.props.getTopPlotHolesPosts(titleId);
        }
    }

    handleRecentTopToggleChange = (event, nextView) => {
        console.log(`next view ${nextView}`)
        if (nextView !== null) {
            this.setState({
                sortBy: nextView
            })
            const titleImdbId = this.props.match.params.titleId;
            const seasonInUrl = this.props.match.params.season;
            const titleId = seasonInUrl ? (titleImdbId + seasonInUrl) : titleImdbId;
            if (nextView === 'Top') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getTopPosts(titleId);
                        break;
                    case 'Opinion':
                        this.props.getTopOpinionPosts(titleId);
                        break;
                    case 'Fun Fact':
                        this.props.getTopFunFactPosts(titleId);
                        break;
                    default:
                        this.props.getPlotHolesPosts(titleId);
                }

            }
            else if (nextView === 'Recent') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getPosts(titleId);
                        break;
                    case 'Opinion':
                        this.props.getOpinionPosts(titleId);
                        break;
                    case 'Fun Fact':
                        this.props.getFunFactPosts(titleId);
                        break;
                    default:
                        this.props.getTopPlotHolesPosts(titleId);
                }

            }
        }
    }

    render() {
        const { classes } = this.props;
        const { title, title: { Title, Type }, posts, tvSeason, similarTitles, loading } = this.props.data;

        const titleId = this.props.match.params.titleId;

        const similarTitlesMarkup = (
            < div className={classes.similarContainer} >
                {
                    similarTitles.map((similarTitle, index) => (
                        <SimilarTitle title={similarTitle} key={index} customClass={classes.similarItem} />
                    ))
                }
            </div >
        )

        const seasonInUrl = this.props.match.params.season;
        let movieTVPostsMarkup = (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={7} md={8}>
                    <SortPostBar tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} sortBy={this.state.sortBy} handleSortPostSelect={this.handleSortPostSelect} handleCategoryPostSelect={this.handleCategoryPostSelect} handleRecentTopToggleChange={this.handleRecentTopToggleChange} />
                    {
                        !loading ? (  // if the state has posts then shows the posts

                            posts.length !== 0 ? posts.map((post) => <Post titleIdInUrl={titleId} seasonInUrl={seasonInUrl} key={post.postId} post={post} />) : ( //...this.props for the Post component to inherit the Route's props (in order to use this.props.match.titleId to check if url contain the titleId in the Post component)
                                <p>There are no posts yet</p>
                            )
                        ) : (
                                <PostSkeleton />
                            )
                    }
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <p>You may also like these {Type === 'movie' ? 'movies' : 'shows'}</p>
                    {similarTitlesMarkup}
                </Grid>
            </Grid>
        )

        let seasonPostsMarkup = (
            !loading ? (  // if the state has posts then shows the posts
                posts.length !== 0 ? posts.map((post) => <Post titleIdInUrl={titleId} seasonInUrl={seasonInUrl} key={post.postId} post={post} />) : ( //in React when loop thru an array and show some data, each child must have a unique key
                    <p>There are no posts yet</p>
                )
            ) : (
                    <PostSkeleton />
                )
        )

        const seasonEpisodesMarkup = (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={7} md={8}>
                <SortPostBar tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} sortBy={this.state.sortBy} handleSortPostSelect={this.handleSortPostSelect} handleCategoryPostSelect={this.handleCategoryPostSelect} handleRecentTopToggleChange={this.handleRecentTopToggleChange} />
                    {seasonPostsMarkup}
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    < div className={classes.episodesContainer} >
                        {
                            tvSeason.Episodes && tvSeason.Episodes.map((episode, index) => (
                                <Episode customClass={classes.episodeItem} Episode={episode} seriesId={titleId} episodeId={episode.imdbID} index={index} key={episode.imdbID} />
                            )// have to check if tvSeason is defined since the initial select option is 'Seasons'
                            )
                        }
                    </div>

                </Grid>
            </Grid>
        );

        const currentTitle = Title && seasonInUrl ? `${Title} season ${this.props.data.season}` : `${Title}`
        return (
            <Fragment>
                <div className={classes.titleInfo}>
                    <TitleInfo title={title} />
                </div>
                <PostForm placeholderTitle={currentTitle} title={Title} />
                {Type === 'series' && Number.isInteger(parseInt(this.props.data.season)) ? seasonEpisodesMarkup : movieTVPostsMarkup}
            </Fragment>
        )
    }
}

movieTVdetails.propTypes = {
    title: PropTypes.object,
    tvSeason: PropTypes.object
}
const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI,
    //tvSeason: state.tvSeason

});

const mapDispatchToProps = {
    getTitle,
    getPostsByTitleId,
    getTopPostsByTitleId,
    getOpinionPostsByTitleId,
    getTopOpinionPostsByTitleId,
    getFunFactPostsByTitleId,
    getTopFunFactPostsByTitleId,
    getPlotHolesPostsByTitleId,
    getTopPlotHolesPostsByTitleId,
    uploadPost,
    getEpisodeDetails,
    chooseSeason,
    getTVSeason,
    getTmdbInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(movieTVdetails));
