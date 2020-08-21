import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    RedditShareButton,
    TwitterShareButton,
    ViberShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TumblrShareButton,

    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    RedditIcon,
    EmailIcon,
    ViberIcon,
    WhatsappIcon,
    LinkedinIcon,
    TumblrIcon,
} from "react-share";

// import material-ui related
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    ...theme.spreadThis,
    iconButton: {
        marginRight: 10
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 50
    },
    dialogTitle: {
        '& .MuiTypography-h6': {
        color: '#01B2BF'
        }
    },
    cancelButton: {
        backgroundColor: '#01B2BF',
        color: 'white'
    }
})

class ShareDialog extends Component {
    render() {
        const {
            classes,
            openDialog,
            handleDialogClose,
            url
        } = this.props;

        const shareMarkup = (
            <Fragment>
                <FacebookShareButton url={url} className={classes.iconButton}>
                    <FacebookIcon className={classes.icon} />
                </FacebookShareButton>
                <FacebookMessengerShareButton appId='2633907740208764' url={url} className={classes.iconButton}>
                    <FacebookMessengerIcon  className={classes.icon} />
                </FacebookMessengerShareButton>
                <TwitterShareButton url={url} className={classes.iconButton}>
                    <TwitterIcon className={classes.icon} />
                </TwitterShareButton>
                <RedditShareButton url={url} className={classes.iconButton}>
                    <RedditIcon className={classes.icon} />
                </RedditShareButton>
                <EmailShareButton url={url} className={classes.iconButton}>
                    <EmailIcon className={classes.icon} />
                </EmailShareButton>
                <WhatsappShareButton url={url} className={classes.iconButton}>
                    <WhatsappIcon className={classes.icon} />
                </WhatsappShareButton>
                <ViberShareButton url={url} className={classes.iconButton}>
                    <ViberIcon className={classes.icon} />
                </ViberShareButton>
                <LinkedinShareButton url={url} className={classes.iconButton}>
                    <LinkedinIcon className={classes.icon} />
                </LinkedinShareButton>
                <TumblrShareButton url={url} className={classes.iconButton}>
                    <TumblrIcon className={classes.icon} />
                </TumblrShareButton>
            </Fragment>
        )
        return (
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                maxWidth='sm'
                className={classes.dialog}
                id='project-component-dialog'
            >
                <DialogTitle className={classes.dialogTitle}>
                        Share Post
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {shareMarkup}
                </DialogContent>
                <DialogActions>
                <Button variant='contained' onClick={handleDialogClose} className={classes.cancelButton}> 
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ShareDialog);
