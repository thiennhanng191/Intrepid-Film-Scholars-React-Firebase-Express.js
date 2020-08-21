import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// import components
import NotificationItem from './NotificationItem';

// import MUI related
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// import icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// import Redux 
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { setScrollToComment, setScrollToRepliedComment, getComment } from '../../redux/actions/dataActions';
const styles = (theme) => ({
    ...theme.spreadThis,
})
class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });

    }

    handleNotificationMenuClose = (notification) => {
        const { type, commentId, repliedCommentId, parentCommentId} = notification;
        if ((type === 'comment' || type === 'mention') && commentId) {
            this.props.setScrollToComment(commentId);
        }
        else if ((type === 'repliedComment' || type ==='mention') && repliedCommentId && parentCommentId) {
            this.props.setScrollToRepliedComment(repliedCommentId, parentCommentId);
        }
        this.setState({ anchorEl: null });        
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((notification) => !notification.read) //get the unread notifications' ids
            .map((notification) => notification.notificationId); //return an array of the ids of notifications that have the read property of false         
        this.props.markNotificationsRead(unreadNotificationsIds);
    }


    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);
        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(notification => notification.read === false).length > 0 ? (//check if there is any unread notification
                notificationsIcon = (
                    <Badge
                        badgeContent={notifications.filter(notification => notification.read === false).length}
                        color='secondary'>
                        <NotificationsIcon />
                    </Badge>
                )) : (
                    notificationsIcon = <NotificationsIcon />
                )
        } else {
            notificationsIcon = <NotificationsIcon />
        }


        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => {

                return (
                    <NotificationItem notification={notification} handleClose={this.handleNotificationMenuClose} key={index} />
                )
            })
        ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )
        return (
            <Fragment>
                <Tooltip placement='top' title='Notifications'>
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleOpen}
                        id='notification-icon'
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    getContentAnchorEl={null} //set this to null to set custom anchor origin position
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened} /* onEntered is triggered once the menu is opened */
                >
                    <MenuItem disabled>
                        <Typography variant='h5'>
                            Notifications
                        </Typography>
                    </MenuItem>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapDispatchToProps = {
    markNotificationsRead,
    setScrollToComment,
    setScrollToRepliedComment,
    getComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notifications))
