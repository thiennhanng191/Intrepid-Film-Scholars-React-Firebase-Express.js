import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Truncate from 'react-truncate';
import PropTypes from 'prop-types';

// import components
import CommonButton from '../../util/CommonButton';
import DeletePost from './DeletePost';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//import material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';

//import icons
import ChatIcon from '@material-ui/icons/Chat';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//import Redux related
import { connect } from 'react-redux';
import { getPost, getTitle } from '../../redux/actions/dataActions';
import { getAllUsers } from '../../redux/actions/userActions';

const styles = (theme) => ({
    card: {
        position: 'relative',
        display: 'block',
        marginBottom: 20,
        boxShadow: 'none'
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    root: {
        display: 'flex',
        marginRight: 40
    },
    moreButton: {
        position: 'absolute',
        right: '1%',
        top: 7,
        color: 'gray'
    },
    moreMenuItem: {
        display: 'flex',
        alignItems: 'center'
    },
    noComment: {
        height: '0px !important'
    },
    horizontalDivider: {
        margin: '20px auto 20px auto',
        height: '0.5px',
        border: 'none',
        backgroundColor: 'gray'
    },
    buttonText: {
        color: 'gray',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1=0.85rem'
        },
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem', shouldComponentUpdate(nextProps, nextState) {

            }

        },
        color: 'gray',
        fontSize: '1.05rem',
    },
    userHandle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        },
        fontSize: '1.15rem',
        marginRight: 5
    },
    date: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem'
        },
        color: 'lightgray',
        fontSize: '1.05rem',
        marginTop: '-3px'
    },
    postBody: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        },
        fontSize: '1rem',
        marginTop: 5
    },
    chip: {
        backgroundColor: '#01B2BF',
        color: 'white',
        height: 20
    },
    likeButton: {
        paddingLeft: 0
    }
})

class FullPagePost extends Component {
    state = {
        expanded: false,
        moreMenuAnchorEl: null,
        isMoreMenuOpen: false,
    };

    handleMoreMenuOpen = (event) => {
        this.setState({
            moreMenuAnchorEl: event.currentTarget
        });
    }

    handleMoreMenuClose = (event) => {
        this.setState({
            moreMenuAnchorEl: null
        });
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            post: {
                body,
                createdAt,
                userImage,
                userHandle,
                postId,
                likeCount,
                commentCount,
                title,
                season,
                episode,
                titleId,
                titleImdbId,
                opinion,
                funFact,
                plotHoles
            },
            titleIdInUrl,
            user: {
                authenticated,
                credentials: { handle } // getAuthenticatedUser will return user with credentials (which contains the handle) as well as the likes and notifications
            },
        } = this.props;

        const { post:
            {
                comments
            },
        } = this.props.data;

        const deleteButton = authenticated && userHandle === handle ? ( // a user can only delete their own posts
            <DeletePost postId={postId} />
        ) : (
                <div></div>
            )

        let linkToTitleContainingPost;
        if (titleImdbId && titleId.length > titleImdbId.length) //link to a season of a tv show (titleId of a post belonging to season is the series imdbid appended with the season)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${titleId.slice(titleImdbId.length)}`
        else if (titleImdbId && titleId !== titleImdbId && titleId.length === titleImdbId.length) //link to an episode (episode's imdb id is different from the show's imdb id but both id have the same length)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${season}/episode=${titleId}`
        else //link to a movie or the overview of a tvshow
            linkToTitleContainingPost = `/moviesTV/title=${titleId}`

        const isMoreMenuOpen = Boolean(this.state.moreMenuAnchorEl)

        const moreMenu = (
            <Menu
                anchorEl={this.state.moreMenuAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={isMoreMenuOpen}
                onClose={this.handleMoreMenuClose}
            >
                {authenticated && userHandle === handle &&
                    < MenuItem >
                        {deleteButton}
                    </MenuItem>
                }
                <MenuItem className={classes.moreMenuItem} onClick={this.handleOpenShareDialog}>
                    <Icon style={{ marginRight: 5 }}>
                        <ShareOutlinedIcon color='secondary' />
                    </Icon>
                    <Typography variant='body2'>
                        Share Post
                        </Typography>
                </MenuItem>
            </Menu >
        )

        return (
            <Card className={classes.card}>
                {/*<CardMedia
                    image={userImage}
                    title="Profile Image"
                    className={classes.image}/>
                */}
                <CardContent className={classes.content}>
                    <div className={classes.root}>
                        <Avatar alt={userHandle} src={userImage} />
                        <div id="container">
                            <Typography component={Link} to={`/user/${userHandle}`} color="primary" style={{ fontSize: '1.15rem' }}>{userHandle}</Typography>
                            {title && !titleIdInUrl &&
                                <Link to={linkToTitleContainingPost} style={{ display: 'inline-flex', marginLeft: 5 }}>
                                    {/*  */}
                                    <Typography className={classes.title}>
                                        <Truncate
                                            lines={1}
                                            ellipsis={('...')}
                                        >
                                            in {title}{season && `, season ${season}`}{episode && `, episode ${episode}`}
                                        </Truncate>
                                    </Typography>
                                </Link>
                            }
                            <CommonButton tooltip='More' onClick={this.handleMoreMenuOpen} btnClassName={classes.moreButton}>
                                <MoreVertIcon />
                            </CommonButton>
                            {moreMenu}
                            <Typography className={classes.date}>{dayjs(createdAt).fromNow()}</Typography>
                        </div>

                    </div>
                    <Typography className={classes.body}>{body}</Typography>

                    <div style={{ marginTop: '-5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {postId &&
                                    <Fragment>
                                        <LikeButton postId={postId} btnClassName={classes.likeButton} />
                                        <span><Typography variant='body1' className={classes.buttonText}> {likeCount} Likes </Typography> </span>
                                    </Fragment>}
                            </div>

                            <CommonButton tooltip='comments' onClick={this.handleExpandClick} onMouseDown={event => event.stopPropagation()}>
                                <ChatIcon color='primary' />
                                <span> <Typography variant='body1' style={{ marginLeft: 10 }} className={classes.buttonText}>{commentCount} {commentCount > 1 ? 'Commments' : 'Comment'}</Typography></span>
                            </CommonButton>
                        </div>
                        {opinion && <Chip label="Opinion" className={classes.chip} />}
                        {funFact && <Chip label="Fun Fact" className={classes.chip} />}
                        {plotHoles && <Chip label="Plot Holes" className={classes.chip} />}
                    </div>
                    {postId && <CommentForm postId={postId} />}
                    {comments && comments.length > 0 &&
                        <Fragment>
                            <hr className={classes.horizontalDivider} />
                            <Comments comments={comments} />
                        </Fragment>
                    }
                </CardContent>
            </Card>
        )
    }
}

FullPagePost.propTypes = {
    //likePost: PropTypes.func.isRequired,
    //unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired, // post was passed in recentPostsMarkup in home.js 
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool // not required sincd not all posts have this property
}
const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});


const mapDispatchToProps = {
    getPost,
    getAllUsers,
    getTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FullPagePost));
