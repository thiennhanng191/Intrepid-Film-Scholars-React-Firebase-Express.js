import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CommonButton from '../../util/CommonButton';

// import material-ui related
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        padding: 0
    }
}

class DeletePost extends Component {
    state = {
        open: false,
    }

    handleOpen = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deletePost = () => {
        this.props.deletePost(this.props.postId); //postId was passed to props in the <DeletePost> component in Post.js
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <CommonButton
                    component={Link}
                    to={window.location.pathname}
                    tooltip='Delete Post'
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                    onMouseDown={event => event.stopPropagation()}
                >
                    <DeleteOutline color='secondary' style={{marginRight: 5}} />
                    <Typography variant='body2'>
                        Delete Post
                    </Typography>
                </CommonButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want to delete this post
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}
const mapDispatchToProps = {
    deletePost
};
export default connect(null, mapDispatchToProps)(withStyles(styles)(DeletePost)); // dont need mapStateToProps here
