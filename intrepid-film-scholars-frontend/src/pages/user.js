import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

// import components
import Post from '../components/post/Post';
import PostSkeleton from '../util/PostSkeleton';
import Profile from '../components/profile/Profile';
import StaticProfile from '../components/profile/StaticProfile';

// import Material UI
import { useMediaQuery } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserDataForUserPage } from '../redux/actions/dataActions';

function User(props) {
    const [postIdParam, setPostIdParam] = useState(null);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    useEffect(() => {
        const handle = props.match.params.handle; //match holds details about the url, path name, base url - get the handle params from the url (`\ the url is user/:handle`)
        const postId = props.match.params.postId;
        if (postId) {
            setPostIdParam(postId);
        }
        props.getUserDataForUserPage(handle);
    }, []);

    const { posts, loading, userForUserPage } = props.data;
    const { credentials } = props.user; //authenticated user

    const postsMarkup = loading ? (
        <PostSkeleton />
    ) : (posts === null || posts.length === 0 ? (
        <p>This user has no post yet</p>
    ) : !postIdParam ? ( //postIdParam is undefined => render posts that user have
        posts.map((post) => <Post key={post.postId} post={post} />)
    ) : ( //postIdParam is provided => try to go to that one exact post
                posts.map((post) => {
                    if (post.postId !== postIdParam)
                        return <Post key={post.postId} post={post} />
                    else //find the right post that we are trying to open
                        return <Post key={post.postId} post={post} openDialog />
                })
            ))

    const isAuthenticatedUser = credentials.handle === props.match.params.handle;

    const fullSizeRender = (
        <Grid container spacing={2}>
            <Grid item sm={7} md={8}>
                {postsMarkup}
            </Grid>
            <Grid item sm={5} md={4}>
                {
                    isAuthenticatedUser ?
                        <Profile /> : <StaticProfile profile={userForUserPage} />
                }
            </Grid>
        </Grid>
    );
    const mobileSizeRender = (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                {isAuthenticatedUser ?
                    <Profile /> : <StaticProfile profile={userForUserPage} />
                }
            </Grid>
            <Grid item xs={12}>
                {postsMarkup}
            </Grid>
        </Grid>
    )
    return (
        isSmallScreen ? mobileSizeRender : fullSizeRender
    )
}

User.propTypes = {
    getUserDataForUserPage: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

const mapDispatchToProps = {
    getUserDataForUserPage
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
