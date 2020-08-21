import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import clsx from 'clsx';

// import Material UI
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';


// import icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// import Redux 
import { connect } from 'react-redux';
import { getPost, setScrollToComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    menuItem: {
        minWidth: 450,
        display: 'flex',
        justifyContent: 'space-between'
    }
})
class NotificationItem extends Component {
    render() {
        const {
            classes,
            notification,

            notification: {
                postId,
                postDetails: {
                    season,
                    episode,
                    titleId,
                    titleImdbId
                },
            },

            handleClose
        } = this.props;
        
        let linkToPost;
        if (season && episode && titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/season=${season}/episode=${titleId}/post=${postId}`;
        else if (season && titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/season=${season}/post=${postId}`;
        else if (titleImdbId)
            linkToPost = `/moviesTV/title=${titleImdbId}/post=${postId}`;

        const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

        const verb = ({
            'like': 'liked',
            'comment': 'commented on',
            'mention': 'mentioned you in',
            'repliedComment': 'replied to you comment in'
        }[notification.type]);
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? 'primary' : 'secondary';
        const icon = notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
        ) : (
                <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            )

        return (
            <MenuItem key={notification.createdAt} component={Link}
                to={linkToPost} onClick={() => handleClose(notification)} className={classes.menuItem} style={{ backgroundColor: !notification.read && 'rgba(1, 178, 191, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {icon}
                    <div>
                        <Typography
                            variant='body1'
                        >
                            {notification.sender} {verb} {notification.type === 'mention' || notification.type === 'repliedComment' ? 'a post' : 'your post'}
                        </Typography>
                        <Typography variant='body2' style={{ color: 'gray' }}>
                            {time} {/* time would be something like 5 minute ago */}
                        </Typography>
                    </div>
                </div>

                {!notification.read && <Badge color={iconColor} overlap="circle" badgeContent=" " variant='dot'>
                    {circle}
                </Badge>
                }
            </MenuItem>
        )
    }
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
    getPost,
    setScrollToComment
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotificationItem));
