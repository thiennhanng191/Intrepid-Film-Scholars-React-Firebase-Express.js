import React, { Component, Fragment } from 'react';
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

// import icons
import ReplyIcon from '@material-ui/icons/Reply';

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
        padding: 0
    },
    commentButtonTypography: {
        textTransform: 'initial'
    }
})

class Comment extends Component {
    state = {
        repliedCommentsExpanded: false,
        repliedCommentsFormExpanded: false,
        repliedCommentsCount: this.props.comment.repliedCommentsCount
    }

    handleShowMoreReplies = () => {
        const { comment: { commentId }, comment } = this.props;
        console.log(`comment ${JSON.stringify(comment)}`)
        this.setState({
            repliedCommentsExpanded: !this.state.repliedCommentsExpanded
        });
        this.props.getComment(commentId);
    };
    handleShowRepliedCommentForm = () => {
        const { comment: { commentId } } = this.props;
        this.setState({
            repliedCommentsFormExpanded: !this.state.repliedCommentsFormExpanded
        });
        this.props.getComment(commentId); //get Comment so that when submit the reply comment the repliedComments field is not undefined
    }

    handleDeleteComment = () => {
        const { comment: { commentId, postId } } = this.props;
        this.props.deleteComment(commentId, postId); 
    }

    componentDidMount = () => {
        // auto scrolling to replied comment when user click on notification of a replied comment
        // this check is only for replied comment
        if (this.props.data.repliedCommentScrollTo.repliedCommentId
            && this.props.data.repliedCommentScrollTo.repliedCommentId === this.props.comment.repliedCommentId // only scroll to the comment from the notification
            //&& this.props.data.repliedCommentScrollTo !== prevProps.data.repliedCommentScrollTo
            //&& setScrollToRepliedComment
            ) {
            console.log('check scroll to replied comment');
            console.log(`check replied comment ${JSON.stringify(this.props.comment)}`)
            console.log(`check replied comment scroll to ${JSON.stringify(this.props.data.repliedCommentScrollTo)}`)
            this.props.scrollToRef(this.props.refProp);
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.comment.repliedCommentsCount !== this.props.comment.repliedCommentsCount) {
            this.setState({
                repliedCommentsCount: this.props.comment.repliedCommentsCount
            })
        }
        if (this.props.data.commentScrollTo
            && this.props.data.commentScrollTo.commentId === this.props.comment.commentId // only scroll to the comment from the notification
            && this.props.data.commentScrollTo !== prevProps.data.commentScrollTo) {
            this.props.scrollToRef(this.props.refProp);
        }
        // open replied comments when click on notification of a replied comment
        if (this.props.data.repliedCommentScrollTo
            && this.props.data.repliedCommentScrollTo.parentCommentId === this.props.comment.commentId
            && this.props.data.repliedCommentScrollTo !== prevProps.data.repliedCommentScrollTo) {
            this.setState({
                repliedCommentsExpanded: true
            });
            //console.log('check scroll to replied comment expanded');
        }
        
    }

    render() {
        const { classes, comment: { body, createdAt, userImage, userHandle, repliedCommentsCount, commentId, postId, parentCommentId }, refProp } = this.props;

        const { comment: { repliedComments, }, parentComment
        } = this.props.data;

        const { commentScrollTo: { setScrollToComment }, repliedCommentScrollTo: { setScrollToRepliedComment } } = this.props.data;

        const { 
            credentials: {
                handle
            }

        } = this.props.user; 

        // check if the comment from the array of comments passed down from props match the comment from the notification
        const checkScrollToComment = (setScrollToComment && this.props.data.commentScrollTo.commentId === this.props.comment.commentId)
            || (setScrollToRepliedComment && this.props.data.repliedCommentScrollTo.repliedCommentId === this.props.comment.repliedCommentId);

        // if parentComment exists (i.e for the case notification of a replied comment)
        const repliedCommentsShown = parentComment ? this.props.data.parentComment.repliedComments : repliedComments

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
                        <div style={{ display: 'inline-flex', marginLeft: 15 }}>
                            <Typography
                                variant='body2'
                                className={classes.commentDate}
                            >
                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                            </Typography>

                            {!parentCommentId && //replied comments don't have a 'Reply' button
                                <Button onClick={this.handleShowRepliedCommentForm} className={classes.commentButton}>
                                    <Icon style={{display: 'flex', marginRight: 5}}>
                                        <ReplyIcon />
                                    </Icon>
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        Reply
                                        </Typography>
                                </Button>
                            }
                            {!parentCommentId && userHandle === handle && 
                                <Button onClick={this.handleDeleteComment} className={classes.commentButton}>
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        Delete
                                    </Typography>
                                </Button>
                            }
                            {repliedCommentsCount > 0 &&
                                <Button onClick={this.handleShowMoreReplies} className={classes.commentButton}>
                                    <Typography variant='body2' color='secondary' className={classes.commentButtonTypography}>
                                        {this.state.repliedCommentsExpanded ? 'Hide' : 'Show'} {this.state.repliedCommentsCount} {repliedCommentsCount > 1 ? 'replies' : 'reply'}
                                    </Typography>
                                </Button>
                            }
                        </div>
                    </Grid>
                </Grid>
                {repliedCommentsShown &&
                    <Collapse in={this.state.repliedCommentsExpanded} timeout='auto' unmountOnExit className={classes.cardCollapse}>
                        <Grid item container spacing={2}>
                            <Grid item sm={1} xs={1} />
                            <Grid item sm={11} xs={11}>
                                <Comments comments={repliedCommentsShown} />
                            </Grid>
                        </Grid>
                    </Collapse>
                }
                <Collapse in={this.state.repliedCommentsFormExpanded} timeout='auto' unmountOnExit className={classes.cardCollapse}>
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
