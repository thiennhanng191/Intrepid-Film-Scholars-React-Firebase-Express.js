import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// import components
import Post from '../components/post/Post';
import PostSkeleton from '../util/PostSkeleton';
import PostForm from '../components/post/PostForm';
import SortPostBar from '../components/post/SortPostBar';

// import Material Ui
import EpisodeInfo from '../components/moviesTV/EpisodeInfo';

// import Redux 
import { connect } from 'react-redux';
import { getEpisodeDetails, uploadPost } from '../redux/actions/dataActions';
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
    episodeInfo: {
        marginBottom: 50
    },
    textField: {
        marginRight: 20
    },
    form: {
        marginBottom: 20,
        display: 'flex'
    },
    submitButton: {
        maxHeight: 50,
        position: 'relative'
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


class episodeDetails extends Component {
    state = {
        body: '',
        errors: {},
        submitted: false,
        opinionButtonOn: false,
        funFactButtonOn: false,
        plotHoleButtonOn: false,
        sortBy: 'Recent',
        tabValue: 'All'
    };

    componentDidMount = () => {
        const episodeId = this.props.match.params.episodeId;
        this.props.getEpisodeDetails(episodeId);
        this.props.getPostsByTitleId(episodeId);
    }

    handleSortPostSelect = (event) => {
        this.setState({
            sortBy: event.target.value
        })
        const episodeId = this.props.match.params.episodeId;
        if (event.target.value === 'Top') {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getTopPostsByTitleId(episodeId);
                    break;
                case 'Opinion':
                    this.props.getTopOpinionPostsByTitleId(episodeId);
                    break;
                case 'Fun Fact':
                    this.props.getTopFunFactPostsByTitleId(episodeId);
                    break;
                default:
                    this.props.getPlotHolesPostsByTitleId(episodeId);
            }

        }
        else {
            switch (this.state.tabValue) {
                case 'All':
                    this.props.getPostsByTitleId(episodeId);
                    break;
                case 'Opinion':
                    this.props.getOpinionPostsByTitleId(episodeId);
                    break;
                case 'Fun Fact':
                    this.props.getFunFactPostsByTitleId(episodeId);
                    break;
                default:
                    this.props.getTopPlotHolesPostsByTitleId(episodeId);
            }

        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({
            tabValue: newValue
        });
        const episodeId = this.props.match.params.episodeId;
        switch (newValue) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPostsByTitleId(episodeId);
                else
                    this.props.getTopPostsByTitleId(episodeId);
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPostsByTitleId(episodeId);
                else
                    this.props.getTopOpinionPostsByTitleId(episodeId);
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPostsByTitleId(episodeId);
                else
                    this.props.getTopFunFactPostsByTitleId(episodeId);
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPostsByTitleId(episodeId);
                else
                    this.props.getTopPlotHolesPostsByTitleId(episodeId);
        }
    }

    handleCategoryPostSelect = (event) => { // for small screens
        this.setState({
            tabValue: event.target.value
        });
        const episodeId = this.props.match.params.episodeId;
        switch (event.target.value) {
            case 'All':
                if (this.state.sortBy === 'Recent')
                    this.props.getPosts(episodeId);
                else
                    this.props.getTopPosts(episodeId);
                break;
            case 'Opinion':
                if (this.state.sortBy === 'Recent')
                    this.props.getOpinionPosts(episodeId);
                else
                    this.props.getTopOpinionPosts(episodeId);
                break;
            case 'Fun Fact':
                if (this.state.sortBy === 'Recent')
                    this.props.getFunFactPosts(episodeId);
                else
                    this.props.getTopFunFactPosts(episodeId);
                break;
            default:
                if (this.state.sortBy === 'Recent')
                    this.props.getPlotHolesPosts(episodeId);
                else
                    this.props.getTopPlotHolesPosts(episodeId);
        }
    }

    handleRecentTopToggleChange = (event, nextView) => {
        console.log(`next view ${nextView}`)
        if (nextView !== null) {
            this.setState({
                sortBy: nextView
            })
            const episodeId = this.props.match.params.episodeId;
            if (nextView === 'Top') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getTopPosts(episodeId);
                        break;
                    case 'Opinion':
                        this.props.getTopOpinionPosts(episodeId);
                        break;
                    case 'Fun Fact':
                        this.props.getTopFunFactPosts(episodeId);
                        break;
                    default:
                        this.props.getPlotHolesPosts(episodeId);
                }

            }
            else if (nextView === 'Recent') {
                switch (this.state.tabValue) {
                    case 'All':
                        this.props.getPosts(episodeId);
                        break;
                    case 'Opinion':
                        this.props.getOpinionPosts(episodeId);
                        break;
                    case 'Fun Fact':
                        this.props.getFunFactPosts(episodeId);
                        break;
                    default:
                        this.props.getTopPlotHolesPosts(episodeId);
                }

            }
        }
    }
    render() {
        const { classes } = this.props;
        const {
            episode,
            episode: {
                Title
            },
            posts,
            loading
        } = this.props.data;
        const titleIdInUrl = this.props.match.params.titleId;

        let episodePostsMarkup =
            <Fragment>
                <SortPostBar tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} sortBy={this.state.sortBy} handleSortPostSelect={this.handleSortPostSelect} handleCategoryPostSelect={this.handleCategoryPostSelect} handleRecentTopToggleChange={this.handleRecentTopToggleChange} />
                {
                    !loading ? (  // if the state has posts then shows the posts
                        posts.map((post) => <Post titleIdInUrl={titleIdInUrl} key={post.postId} post={post} />) //...this.props for the Post component to inherit the Route's props (in order to use this.props.match.titleId to check if url contain the titleId in the Post component)
                    ) : (
                            <PostSkeleton />
                        )
                }
            </Fragment>

        return (
            <Fragment>
                <div className={classes.episodeInfo}>
                    <EpisodeInfo episode={episode} />
                </div>
                <PostForm title={this.props.data.title.Title} placeholderTitle={Title} titleId={this.props.match.params.titleId} />
                {episodePostsMarkup}
            </Fragment>
        )
    }
}

episodeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    getEpisodeDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapDispatchToProps = {
    getEpisodeDetails,
    uploadPost,
    getPostsByTitleId,
    getTopPostsByTitleId,
    getOpinionPostsByTitleId,
    getTopOpinionPostsByTitleId,
    getFunFactPostsByTitleId,
    getTopFunFactPostsByTitleId,
    getPlotHolesPostsByTitleId,
    getTopPlotHolesPostsByTitleId
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(episodeDetails));
