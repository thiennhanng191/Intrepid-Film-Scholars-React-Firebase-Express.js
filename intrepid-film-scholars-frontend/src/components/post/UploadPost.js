import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CommonButton from '../../util/CommonButton';

// import MUI related
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// import icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// import Redux related
import { connect } from 'react-redux';
import { uploadPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        marginBottom: 5
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})
class UploadPost extends Component {
    state = {
        open: false, // for the dialog
        body: '', // body of the new post
        errors: {},
        submitted: false
    };
    /*
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){ // clear the errors on success (we sent an action of type CLEAR_ERRORS earlier)
            console.log(`errors ${nextProps.UI.error}`)
            this.setState({
                body: '',
                open: false, errors: {} // close the dialog
            });
            //this.handleClose(); | use handleClose here would create an infinite loop
        }
    }
    */


    // the following 2 functions are equivalent to the componentWillReceiveProps
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors }; //basically update the changes in the state
        }
        else return null
    }

    componentDidUpdate(prevProps) {
        //console.log(this.props.UI.errors);
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
        if (!this.props.UI.errors && !this.props.UI.loading && this.props.UI.loading !== prevProps.UI.loading) { //there must be a chnage in this.props and prevProps or else it would go to an infinitive loop
            console.log('checkpoint');
            this.setState({
                body: '',
                open: false, errors: {} // close the dialog
            });
            //this.handleClose(); | use handleClose here would create an infinite loop
        }

    }

    handleOpen = () => {
        this.setState({ open: true })
        console.log(`open ${this.state.open}`)
    };

    handleClose = () => {
        console.log('closed');
        this.props.clearErrors();
        this.setState({ open: false, errors: {} }) // clear the errors when close the dialog
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        //(prevState) => {console.log(prevState.submitted)}
        this.props.uploadPost({ body: this.state.body })
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <CommonButton onClick={this.handleOpen} tooltip="Upload a new Post">
                    <AddIcon />
                </CommonButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <CommonButton
                        tooltip='Close'
                        onClick={this.handleClose}
                        tooltipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </CommonButton>
                    <DialogTitle>Upload a new Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='POST'
                                multiline
                                rows='3'
                                placeholder='Share your thoughts'
                                error={errors ? (errors.body ? true : false) : false}
                                helperText={errors ? errors.body : ''}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

UploadPost.propTypes = {
    uploadPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapDispatchToProps = {
    uploadPost,
    clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadPost));
