import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import FullPagePost from '../components/post/FullPagePost';
import TitleContainingPost from '../components/post/TitleContainingPost';

// import Material UI
import Grid from '@material-ui/core/Grid';


// import redux
import { connect } from 'react-redux';
import { getPost, getTitle } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
})

class postDetails extends Component {
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        const titleId = this.props.match.params.titleId;
        const episodeId = this.props.match.params.episodeId;

        
        this.props.getPost(postId);
        this.props.getTitle(episodeId ? episodeId : titleId);
    };

    render() {
        /*
        const {
            classes
        } = this.props;
        */
        const localTheme = window.localStorage.getItem('theme');
        const {
            post,
            post: {
                season,
                episode,
                titleId,
                titleImdbId
            },
            title
        } = this.props.data;

        let linkToTitleContainingPost;
        if (titleImdbId && titleId.length > titleImdbId.length) //link to a season of a tv show (titleId of a post belonging to season is the series imdbid appended with the season)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${titleId.slice(titleImdbId.length)}`
        else if (titleImdbId && titleId !== titleImdbId && titleId.length === titleImdbId.length) //link to an episode (episode's imdb id is different from the show's imdb id but both id have the same length)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${season}/episode=${titleId}`
        else //link to a movie or the overview of a tvshow
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}`

        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7} md={8}>
                    <FullPagePost key={post.postId} post={post}/>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <TitleContainingPost title={title} link={linkToTitleContainingPost} theme={localTheme} showDetails={{ title: post.title, season: season, episode: episode }} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
})

const mapDispatchToProps = {
    getPost,
    getTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(postDetails));
