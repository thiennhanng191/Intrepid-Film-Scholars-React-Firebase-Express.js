import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// import components
import Comments from './Comments';
import ReplyToCommentForm from './ReplyToCommentForm';

// import MUI related
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useMediaQuery } from "@material-ui/core";

// import icons
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';

//import Redux related
import { connect } from 'react-redux';
import { getComment, deleteComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: '50%'
    },
    card: {
        backgroundColor: 'rgb(245, 245, 245) !important',
        //marginLeft: 15,
        borderRadius: 15,
        boxShadow: 'none'
    },
    cardContent: {
        paddingTop: 8,
        paddingBottom: '8px !important'
    },
    commentData: {
        //marginLeft: '20px'
    },
    profileImageGrid: {
        '& .MuiGrid-grid-sm-2': {
            flexBasis: 0
        },
        //marginLeft: 20,
        //marginRight: '-25px'
        justifyContent: 'center',
        display: 'inline-flex'
    },
    profileImage: {
        textAlign: 'center',
        marginRight: 0
    },
    commentDateContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 5
    },
    commentDate: {
        //position: 'absolute',
        left: '12%',
        marginRight: 5,
        color: 'darkgray'
    },
    cardCollapse: {
        width: '100%'
    },
    commentButton: {
        padding: 0,
        minWidth: '40px !important'
    },
    commentButtonTypography: {
        textTransform: 'initial',
        marginRight: 5
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 3,
        color: '#01B2BF',
    }
})

function Comment(props) {
    const { classes } = props;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
    const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [repliedCommentsExpanded, setRepliedCommentsExpanded] = useState(false);
    const [repliedCommentsFormExpanded, setRepliedCommentsFormExpanded] = useState(false);
    const [repliedCommentsCount, setRepliedCommentsCount] = useState(props.comment.repliedCommentsCount);

    const handleShowMoreReplies = () => {
        const { comment: { commentId }, comment } = props;
        console.log(`comment ${JSON.stringify(comment)}`);
        setRepliedCommentsExpanded(!repliedCommentsExpanded);
        props.getComment(commentId);
    }

    const handleShowRepliedCommentForm = () => {
        const { comment: { commentId } } = props;
        setRepliedCommentsFormExpanded(!repliedCommentsFormExpanded);
        props.getComment(commentId); //get Comment so that when submit the reply comment the repliedComments field is not undefined
    }

    const handleDeleteComment = () => {
        const { comment: { commentId, postId } } = props;
        props.deleteComment(commentId, postId);
    }
    /*
    useEffect(() => {
        // auto scrolling to replied comment when user click on notification of a replied comment
        // this check is only for replied comment
        if (props.data.repliedCommentScrollTo.repliedCommentId
            && props.data.repliedCommentScrollTo.repliedCommentId === props.comment.repliedCommentId // only scroll to the comment from the notification
            //&& props.data.repliedCommentScrollTo !== prevProps.data.repliedCommentScrollTo
            //&& setScrollToRepliedComment
        ) {
            console.log('check scroll to replied comment');
            console.log(`check replied comment ${JSON.stringify(props.comment)}`)
            console.log(`check replied comment scroll to ${JSON.stringify(props.data.repliedCommentScrollTo)}`)
            props.scrollToRef(props.refProp);
        }
    }, []);
    */

    useEffect(() => {
        setRepliedCommentsCount(repliedCommentsCount);
        /*
       if (props.data.commentScrollTo && props.data.commentScrollTo.commentId === props.comment.commentId) { // only scroll to the comment from the notification)
            props.scrollToRef(props.refProp);
        }

        // open replied comments when click on notification of a replied comment
        if (props.data.repliedCommentScrollTo
            && props.data.repliedCommentScrollTo.parentCommentId === props.comment.commentId) {
            setRepliedCommentsExpanded(true);
        }
        */
    }, [props.repliedCommentsCount, props.data.commentScrollTo]);

    const { comment: { body, createdAt, userImage, userHandle, commentId, postId, parentCommentId, repliedComments }, refProp } = props;

    repliedCommentsCount && console.log("replied comments count: ", repliedCommentsCount);
    /*
    const { comment: { repliedComments, }, parentComment
    } = props.data;
    */
    const { commentScrollTo: { setScrollToComment }, repliedCommentScrollTo: { setScrollToRepliedComment } } = props.data;

    const {
        credentials: {
            handle
        }
    } = props.user;

    // check if the comment from the array of comments passed down from props match the comment from the notification
    const checkScrollToComment = (setScrollToComment && props.data.commentScrollTo.commentId === props.comment.commentId)
        || (setScrollToRepliedComment && props.data.repliedCommentScrollTo.repliedCommentId === props.comment.repliedCommentId);

    // if parentComment exists (i.e for the case notification of a replied comment)
    // const repliedCommentsShown = parentComment ? props.data.parentComment.repliedComments : repliedComments

    return (
        <Fragment key={createdAt}> {/* for comment the created at is almost likely to never be the same */}
            <Grid item container spacing={2} style={{ marginBottom: 8 }}>
                <Grid item sm={1} xs={1} className={classes.profileImageGrid}>
                    <Avatar src={userImage} alt='comment' className={classes.profileImage} />
                </Grid>
                <Grid item sm={11} xs={11}>
                    <Card className={classes.card} id='comment-card' ref={checkScrollToComment ? refProp : null}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.commentData} >
                                <div style={{ marginTop: '-5px' }}>
                                    <Typography
                                        variant='h6'
                                        component={Link}
                                        to={`/user/${userHandle}`}
                                        color='primary'
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        {userHandle}
                                    </Typography>
                                </div>

                                {/* <hr className={classes.invisibleSeparator} /> */}
                                {/*}
                                                    <Typography variant='body1'>
                                                        {body}
                                                    </Typography>
                    */}
                                <div dangerouslySetInnerHTML={{ __html: body }} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className={classes.commentDateContainer}>
                        <Typography
                            variant='body2'
                            className={classes.commentDate}
                        >
                            {!isMediumScreen ? dayjs(createdAt).format('h:mm a, MMMM DD YYYY') : dayjs(createdAt).fromNow()}
                        </Typography>

                        {props.comment.repliedCommentsCount > 0 &&
                            <Button onClick={handleShowMoreReplies} className={classes.commentButton}>
                                <Icon className={classes.icon}>
                                    {repliedCommentsExpanded ?
                                        <ExpandLessIcon style={{ width: 20, height: 20 }} /> : <ExpandMoreIcon style={{ width: 20, height: 20 }} />
                                    }
                                </Icon>
                                {!isSmallScreen &&
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        {!isMediumScreen && ( repliedCommentsExpanded ? 'Hide' : 'Show' )} {props.comment.repliedCommentsCount} {repliedCommentsCount > 1 ? 'replies' : 'reply'}
                                    </Typography>
                                }
                            </Button>
                        }

                        {!parentCommentId && //replied comments don't have a 'Reply' button
                            <Button onClick={handleShowRepliedCommentForm} className={classes.commentButton}>
                                <Icon className={classes.icon}>
                                    <ReplyIcon style={{ width: 20, height: 20 }} />
                                </Icon>
                                {!isSmallScreen &&
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        Reply
                                </Typography>
                                }
                            </Button>
                        }
                        {!parentCommentId && userHandle === handle &&
                            <Button onClick={handleDeleteComment} className={classes.commentButton}>
                                <Icon className={classes.icon}>
                                    <DeleteIcon style={{ width: 20, height: 20 }} />
                                </Icon>
                                {!isSmallScreen &&
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        Delete
                                    </Typography>
                                }
                            </Button>
                        }
                    </div>
                </Grid>
            </Grid>
            {/* {repliedCommentsShown && */}
            <Collapse in={repliedCommentsExpanded} timeout='auto' unmountOnExit className={classes.cardCollapse}>
                <Grid item container spacing={2}>
                    <Grid item sm={1} xs={1} />
                    <Grid item sm={11} xs={11}>
                        <Comments comments={repliedComments} />
                    </Grid>
                </Grid>
            </Collapse>
            {/*  } */}
            <Collapse in={repliedCommentsFormExpanded} timeout='auto' unmountOnExit className={classes.cardCollapse}>
                <Grid item container spacing={2}>
                    <Grid item sm={1} xs={1} />
                    <Grid item sm={11} xs={11}>
                        <ReplyToCommentForm commentId={commentId} postId={postId} />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});


const mapDispatchToProps = {
    getComment,
    deleteComment
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comment));
