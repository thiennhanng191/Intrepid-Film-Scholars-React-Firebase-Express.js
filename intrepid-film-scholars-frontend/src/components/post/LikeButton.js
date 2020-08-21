import React, { Component } from 'react';
import CommonButton from '../../util/CommonButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// import Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedPost = () => { //whether user has liked the post or not
        /* checking if the likes array in the userReducer state is not empty, and if it’s not, find the like that contains the postId in the array */
        if (this.props.user.likes && this.props.user.likes.find((like) => like.postId === this.props.postId)) //can do this.props.postId because postId was passed in the prop in the LikeButton component in post.js
            return true;
        else
            return false;
    };
    likePost = () => {
        this.props.likePost(this.props.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }

    render() {
        const { authenticated } = this.props.user;
        const { btnClassName } = this.props; 
        const likeButton = !authenticated ? ( // not login => empty heart icon and redirect to login page when trying to click like
            <Link to='/login'>
                <CommonButton tooltip='Like'>
                    <FavoriteBorderIcon color='primary' />
                </CommonButton>
            </Link>
        ) : (
                this.likedPost() ? ( // if user has already liked the post then show a full heart icon that will triggers unlikePost
                    <CommonButton tooltip='Unlike' onClick={this.unlikePost} btnClassName={btnClassName}>
                        <FavoriteIcon color='primary' />
                    </CommonButton>
                ) : (
                        <CommonButton tooltip='Like' onClick={this.likePost} btnClassName={btnClassName}>
                            <FavoriteBorderIcon color='primary' />
                        </CommonButton>
                    )
            );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = ({
    likePost,
    unlikePost
})
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
