import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import PostSkeleton from '../util/PostSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import Profile from '../components/profile/Profile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserDataForUserPage } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        postIdParam: null
    }
    componentDidMount() {
        const handle = this.props.match.params.handle; //match holds details about the url, path name, base url - get the handle params from the url (`\ the url is user/:handle`)

        const postId = this.props.match.params.postId;
        if (postId) { //if we have postId in the url then set postId to the state
            this.setState({
                postIdParam: postId
            })
        }
        console.log(`handle ${handle}`);
        this.props.getUserDataForUserPage(handle);
        axios.get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;

        const postsMarkup = loading ? (
            <PostSkeleton/>
        ) : (posts === null || posts.length === 0 ? (
            <p>This user has no post yet</p>
        ) : !postIdParam ? ( //postIdParam is undefined => render posts that user have
            posts.map((post) => <Post key={post.postId} post={post} />)
        ) : ( //postIdParam is provided => try to go to that one exact post
                    posts.map((post) => {
                        if (post.postId !== postIdParam)
                            return <Post key={post.postId} post={post} />
                        else //find the right post that we are trying to open
                            return <Post key={post.postId} post={post} openDialog/>
                    })
                ))
        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (<Profile profile={this.state.profile} />)}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserDataForUserPage: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
    getUserDataForUserPage
};

export default connect(mapStateToProps, mapDispatchToProps)(user);
