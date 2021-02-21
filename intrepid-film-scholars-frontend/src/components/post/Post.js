import React, { useState, useEffect, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

// import components
import CommonButton from '../../util/CommonButton';
import DeletePost from './DeletePost';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import ShareDialog from './ShareDialog';

//import material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';

//import icons
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowIcon from '@material-ui/icons/ChevronRightRounded';
//import Redux related
import { connect } from 'react-redux';
import { getPost, getTitle } from '../../redux/actions/dataActions';
import { getAllUsers } from '../../redux/actions/userActions';

const styles = (theme) => ({
    card: {
        position: 'relative',
        display: 'block',
        marginBottom: 20,
        boxShadow: 'none',
        overflow: 'visible !important'
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 16,
        objectFit: 'cover',
        paddingBottom: '4px !important'
    },
    collapseContent: {
        paddingTop: 0,
        paddingBottom: '0px !important'
    },
    collapseContentNoComments: {
        paddingTop: 0,
        paddingBottom: '16px !important'
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
    root: {
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
    goToPostButton: {
        position: 'absolute',
        right: '1%'
    },
    postButton: {
        paddingTop: 5
    },
    buttonText: {
        color: 'gray',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.85rem'
        },
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem'
        },
        color: 'gray !important',
        fontSize: '1.05rem',
        width: '100%'
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
        //color: 'lightgray',
        fontSize: '0.875rem'
    },
    postBody: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        },
        fontSize: '1rem',
        marginTop: 5
    },
    likeButton: {
        paddingLeft: 0
    }
})

function Post(props) {
    dayjs.extend(relativeTime);

    const [expanded, setExpanded] = useState(false);
    const [commentCount, setCommentCount] = useState('');
    const [comments, setComments] = useState([]);
    const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
    const [openShareDialog, setOpenShareDialog] = useState(false);

    
    useEffect(() => {
        setCommentCount(props.post.commentCount);
        setComments(props.post.comments);
    }, [])

    useEffect(() => {
        if (Number.isInteger(props.data.post.commentCount) && props.data.post.commentCount !== commentCount 
        && props.data.post.postId === props.post.postId) { // only update the 1 post being commented
            /* update a new comment after user commented */
            /* or remove the comment that the user has deleted */
            setCommentCount(props.data.post.commentCount);
            setComments(props.data.post.comments)
        }
    }, [props.data.post.commentCount])

    const handleExpandClick = (event) => {
        event.stopPropagation(); 
        event.preventDefault(); 
        if (expanded === false) {
            props.getPost(props.post.postId);
        } 
        setExpanded(!expanded);
    }
    const handleMoreMenuOpen = (event) => {
        setMoreMenuAnchorEl(event.currentTarget);
    }

    const handleMoreMenuClose = (event) => {
        setMoreMenuAnchorEl(null);
    }

    const handleOpenShareDialog = () => {
        setOpenShareDialog(true);
        setMoreMenuAnchorEl(null);
    }
    
    const handleCloseShareDialog = () => {
        setOpenShareDialog(false);
    }

    const {
        classes,
        post: {
            body,
            createdAt,
            userImage,
            userHandle,
            postId,
            likeCount,
            title,
            season,
            episode,
            titleId,
            titleImdbId
        },
        titleIdInUrl,
        user: {
            authenticated,
            credentials: { handle } // getAuthenticatedUser will return user with credentials (which contains the handle) as well as the likes and notifications
        },
    } = props; 

    let linkToTitleContainingPost;
        if (titleImdbId && titleId.length > titleImdbId.length) //link to a season of a tv show (titleId of a post belonging to season is the series imdbid appended with the season)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${titleId.slice(titleImdbId.length)}`
        else if (titleImdbId && titleId !== titleImdbId && titleId.length === titleImdbId.length) //link to an episode (episode's imdb id is different from the show's imdb id but both id have the same length)
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}/season=${season}/episode=${titleId}`
        else if (titleImdbId) //link to a movie or the overview of a tvshow
            linkToTitleContainingPost = `/moviesTV/title=${titleImdbId}`

        let linkToPost;
        if (season && episode && titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/season=${season}/episode=${titleId}/post=${postId}`;
        else if (season && titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/season=${season}/post=${postId}`;
        else if (titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/post=${postId}`;


        const deleteButton = authenticated && userHandle === handle ? ( // a user can only delete their own posts
            <DeletePost postId={postId} />
        ) : (
                <div></div>
            )


        const isMoreMenuOpen = Boolean(moreMenuAnchorEl)

        const moreMenu = (
            <Menu
                anchorEl={moreMenuAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={isMoreMenuOpen}
                onClose={handleMoreMenuClose}
            >
                {authenticated && userHandle === handle &&
                    < MenuItem >
                        {deleteButton}
                    </MenuItem>
                }
                <MenuItem className={classes.moreMenuItem} onClick={handleOpenShareDialog}>
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
            <CardActionArea onClick={() => window.location = linkToPost} />
            <CardContent className={classes.content}>
                <div className={classes.root}>
                    <Avatar alt={userHandle} src={userImage} />
                    <div id="container" style={{ width: '100%' }}>
                        <Typography variant="h6" component={Link} to={`/user/${userHandle}`} color="primary" className={classes.userHandle}>{userHandle}</Typography>

                        {title && !titleIdInUrl &&
                            <Link to={linkToTitleContainingPost} style={{ display: 'inline-flex' }}>
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

                        {/*
                        {deleteButton}
*/}
                        <CommonButton tooltip='More' onClick={handleMoreMenuOpen} btnClassName={classes.moreButton}>
                            <MoreVertIcon />
                        </CommonButton>
                        <Typography id='post-date' className={classes.date}>{dayjs(createdAt).fromNow()}</Typography>
                    </div>
                    {moreMenu}
                    <ShareDialog openDialog={openShareDialog} handleDialogClose={handleCloseShareDialog} url={`intrepidfilmscholars.ml${linkToPost}`} />
                </div>
                <Typography className={classes.postBody}>{body}</Typography>

                <div style={{ marginTop: '-5px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <LikeButton postId={postId} btnClassName={classes.likeButton} />
                        <span><Typography variant='body1' className={classes.buttonText}> {likeCount} Likes </Typography> </span>
                    </div>

                    <CommonButton tooltip='comments' onClick={handleExpandClick} onMouseDown={event => event.stopPropagation()}>
                        <ChatIcon color='primary' />
                        <span> <Typography variant='body1' style={{ marginLeft: 10 }} className={classes.buttonText}>{commentCount} {commentCount > 1 ? 'Commments' : 'Comment'}</Typography></span>
                    </CommonButton>

                    <CommonButton tooltip='go to post' btnClassName={classes.goToPostButton} component={Link} to={`${linkToPost}`}>
                        <ArrowIcon color='primary' />
                    </CommonButton>
                </div>

            </CardContent>


            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent className={comments &&
                        comments.length > 0 ? classes.collapseContent : classes.collapseContentNoComments}>
                    <CommentForm postId={postId} />
                    {comments &&
                        comments.length > 0 &&
                        <Fragment>
                            <hr className={classes.horizontalDivider} />
                            <Comments comments={comments} />
                        </Fragment>
                    }
                </CardContent>
            </Collapse>

        </Card>
    )
}


Post.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
