import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import redux related
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
import { getMovieGenres, getTVGenres, getRecommendedMovies, getRecommendedTVs } from '../../redux/actions/dataActions';

// import Material UI related
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis,
    paper: {
        marginTop: 5,
        marginBottom: 10
    },
    formControl: {
        //margin: theme.spacing(1),
        width: '-webkit-fill-available',
        marginBottom: 10
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    submitButton: {
        marginTop: 10,
        height: 30,
        width: 85,
        marginBottom: 10
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    getContentAnchorEl: null, //set this to null to set custom anchor origin position
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
    }
};


class FavoriteGenresEdit extends Component {
    state = {
        movieGenres: [],
        tvGenres: [],
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            /* each credential item can be empty so need to check or else would get an undefined error - got from validators.js in the firebase folder */
            movieGenres: (credentials.movieGenres && credentials.movieGenres.length > 0) ? credentials.movieGenres : [],
            tvGenres: (credentials.tvGenres && credentials.tvGenres.length > 0) ? credentials.tvGenres : []
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
            //...this.props.user.credentials,
            movieGenres: this.state.movieGenres,
            tvGenres: this.state.tvGenres
        };

        console.log(`movieGenres ${JSON.stringify(this.state.movieGenres)}`);
        console.log(`tvGenres ${JSON.stringify(this.state.tvGenres)}`);
        this.props.editUserDetails(userDetails);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.credentials !== prevProps.user.credentials) { //if SET_USER has been dispatched
            this.mapUserDetailsToState(this.props.user.credentials);
        }
    }

    componentDidMount = () => {
        this.mapUserDetailsToState(this.props.user.credentials);
        //this.props.getRecommendedMovies(this.props.user.credentials.movieGenres, this.props.data.movieGenres);

    }
    render() {
        const {
            classes,
        } = this.props;

        const { movieGenres, tvGenres } = this.props.data;

        const { authenticated } = this.props.user;
        return (
            <Fragment>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item sm={1} xs={1}/>
                        <Grid item sm={10} xs={10}>
                            {
                                authenticated ? (
                                    <Fragment>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Favorite Movie Genres</InputLabel>
                                            <Select
                                                multiple
                                                displayEmpty
                                                value={this.state.movieGenres}
                                                onChange={this.handlemovieGenresChange}
                                                input={<Input />}
                                                helpertext="check"
                                                renderValue={selected => (<div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>)}
                                                MenuProps={MenuProps}
                                            >
                                                {movieGenres.map((movieGenre) => (
                                                    <MenuItem
                                                        key={movieGenre.name}
                                                        value={movieGenre.name}
                                                    >
                                                        <Checkbox checked={this.state.movieGenres.indexOf(movieGenre.name) > -1} />
                                                        <ListItemText primary={movieGenre.name} />
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
                                                renderValue={selected => (<div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>)}
                                                MenuProps={MenuProps}
                                            >
                                                {tvGenres.map((tvGenre) => (
                                                    <MenuItem key={tvGenre.name} value={tvGenre.name}>
                                                        <Checkbox checked={this.state.tvGenres.indexOf(tvGenre.name) > -1} />
                                                        <ListItemText primary={tvGenre.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                id='favorite-genres-submit-button'
                                                onClick={this.handleSubmit}
                                                className={classes.submitButton}
                                            >
                                                <Typography variant='body1' style={{fontSize: '0.85rem'}}>
                                                    Update
                                    </Typography>
                                            </Button>
                                        </div>
                                    </Fragment>
                                ) : (
                                        <Typography variant='body1' style={{color: 'gray', textAlign: 'center'}}>
                                            Please <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link> to find movies/series that suit your interests
                                        </Typography>

                                    )
                            }

                        </Grid>
                        <Grid item sm={1} xs={1}/>
                    </Grid>

                </Paper>

            </Fragment>
        )
    }
}

FavoriteGenresEdit.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    //credentials: state.user.credentials,
    data: state.data,
    user: state.user
})

const mapDispatchToProps = {
    editUserDetails,
    getMovieGenres,
    getTVGenres,
    getRecommendedMovies, getRecommendedTVs
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FavoriteGenresEdit));
