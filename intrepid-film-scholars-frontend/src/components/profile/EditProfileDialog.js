import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CommonButton from '../../util/CommonButton';

// import Redux related
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
import { getMovieGenres, getTVGenres } from '../../redux/actions/dataActions';

// import MUI related
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
// import icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    },
    formControl: {
        //margin: theme.spacing(1),
        width: '-webkit-fill-available',
        marginBottom: 5
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class EditProfileDialog extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        favoriteQuote: '',
        favoriteFilms: '',
        movieGenres: [],
        tvGenres: [],
        open: false // open form dialog
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            /* each credential item can be empty so need to check or else would get an undefined error - got from validators.js in the firebase folder */
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
            favoriteFilms: credentials.favoriteFilms ? credentials.favoriteFilms : '',
            favoriteGenres: credentials.favoriteGenres ? credentials.favoriteGenres : '',
            favoriteQuote: credentials.favoriteQuote ? credentials.favoriteQuote : '',
            movieGenres: (credentials.movieGenres && credentials.movieGenres.length > 0) ? credentials.movieGenres : [],
            tvGenres: (credentials.tvGenres && credentials.tvGenres.length > 0) ? credentials.tvGenres : []
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    handlemovieGenresChange = (event) => {
        this.setState({
            movieGenres: event.target.value
        })
    }

    handleTVGenresChange = (event) => {
        this.setState({
            tvGenres: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
            favoriteGenres: this.state.favoriteGenres,
            favoriteFilms: this.state.favoriteFilms,
            favoriteQuote: this.state.favoriteQuote,
            movieGenres: this.state.movieGenres,
            tvGenres: this.state.tvGenres
        };
        this.props.editUserDetails(userDetails);
        this.handleClose(); // close the dialog after submitting the form
    }

    componentDidMount() {
        /* get the existing user credentials */
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
        this.props.getMovieGenres();
        this.props.getTVGenres();
    };

    render() {
        const { classes } = this.props;

        const { movieGenres, tvGenres } = this.props.data;
        const movieGenresArray = [];
        const tvGenresArray = [];

        movieGenres.map((movieGenre) => {
            return movieGenresArray.push(movieGenre.name);
            ;
        })

        tvGenres.map((tvGenre) => {
            return tvGenresArray.push(tvGenre.name);
            ;
        })


        return (
            <Fragment>
                <CommonButton tooltip='Edit Profile' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary' />
                </CommonButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>Edit Your Profile Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='bio'
                                type='text'
                                label='Bio'
                                multiline
                                rows='3'
                                placeholder='A short bio about yourself'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                                id='input-base'
                            />
                            <TextField
                                name='website'
                                type='text'
                                label='Website'
                                placeholder='Your personal or professional website'
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                                id='input-base'
                            />
                            <TextField
                                name='location'
                                type='text'
                                label='Location'
                                placeholder='Where you live'
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                                id='input-base'
                            />
                            <TextField
                                name='favoriteFilms'
                                type='text'
                                label='Favorite Movies/Shows'
                                placeholder='Your favorite movies and tv shows'
                                className={classes.textField}
                                value={this.state.favoriteFilms}
                                onChange={this.handleChange}
                                fullWidth
                                id='input-base'
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel>Favorite Movie Genres</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.movieGenres}
                                    onChange={this.handlemovieGenresChange}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {movieGenresArray.map((movieGenreName) => (
                                        <MenuItem key={movieGenreName} value={movieGenreName}>
                                            <Checkbox checked={this.state.movieGenres.indexOf(movieGenreName) > -1} />
                                            <ListItemText primary={movieGenreName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel>Favorite TV Genres</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.tvGenres}
                                    onChange={this.handleTVGenresChange}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {tvGenresArray.map((tvGenreName) => (
                                        <MenuItem key={tvGenreName} value={tvGenreName}>
                                            <Checkbox checked={this.state.tvGenres.indexOf(tvGenreName) > -1} />
                                            <ListItemText primary={tvGenreName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <TextField
                                name='favoriteQuote'
                                type='text'
                                label='Favorite Quote'
                                multiline
                                rows='3'
                                placeholder='A favorite quote from your beloved movie or tv show'
                                className={classes.textField}
                                value={this.state.favoriteQuote}
                                onChange={this.handleChange}
                                fullWidth
                                id='input-base'
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditProfileDialog.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    data: state.data
})

const mapDispatchToProps = {
    editUserDetails,
    getMovieGenres,
    getTVGenres
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfileDialog));
