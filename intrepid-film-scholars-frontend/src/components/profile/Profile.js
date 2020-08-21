import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditProfileDialog from './EditProfileDialog.js';

import CommonButton from '../../util/CommonButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';

// Import icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CameraIcon from '@material-ui/icons/PhotoCameraOutlined';

// Import MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Import Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    basicProfileContainer: {
        marginBottom: 10
    },
    horizontalDivider: {
        marginBottom: '5px !important'
    },
    avatarIcon: {
        backgroundColor: 'rgba(1, 178, 191, 0.15)',
        borderRadius: 20,
        padding: 5, 
        position: 'absolute'
    }
});


class Profile extends Component {
    handleImageChange = (event) => {
        const profileImage = event.target.files[0];
        // send to the server
        const formData = new FormData();
        formData.append('Profile Image', profileImage, profileImage.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('inputImage'); //id of the file input element
        fileInput.click(); //trigger input file event
    }
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location, favoriteFilms, movieGenres, tvGenres, favoriteQuote },
                loading, //different from the UI loading
                authenticated
            }
        } = this.props;

        let profileMarkup =
            !loading ?
                (authenticated ?
                    (<Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <Grid container spacing={2} className={classes.basicProfileContainer}>
                                <Grid item sm={5}>
                                    <div className='image-wrapper'>
                                        <img src={imageUrl} alt='profile' className='profile-image' />
                                        <input
                                            type='file'
                                            id='inputImage'
                                            hidden='hidden'
                                            onChange={this.handleImageChange}
                                        />
                                        <CommonButton tooltip='Edit Profile Picture' onClick={this.handleEditPicture} btnClassName='button'>
                                            <CameraIcon color='primary' className={classes.avatarIcon}/>
                                        </CommonButton>
                                    </div>
                                </Grid>
                                <Grid item sm={7}>
                                    <div className='profile-details'>
                                        <MuiLink component={Link} to={`/user/${handle}`} variant='h6' style={{color: '#01B2BF'}}>
                                            @{handle}
                                        </MuiLink>
                                        <hr className={classes.horizontalDivider} />
                                        {location && (
                                            <Fragment>
                                                <LocationOn color='primary' /> <span style={{ display: 'inline-flex' }}><Typography variant='body2'>
                                                    {location}
                                                </Typography>
                                                </span>
                                                <hr className={classes.horizontalDivider} />
                                            </Fragment>
                                        )}
                                        {website && (
                                            <Fragment>
                                                <LinkIcon color='primary' />
                                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                                    {' '}{website}
                                                </a>
                                                <hr className={classes.horizontalDivider} />
                                            </Fragment>
                                        )}
                                        <CalendarToday color='primary' />{' '}
                                        <span style={{ display: 'inline-flex' }}> <Typography variant='body2'>
                                            Joined {dayjs(createdAt).format('MMM YYYY')}
                                        </Typography> </span>
                                    </div>
                                </Grid>
                            </Grid>
                            <div style={{ textAlign: 'center' }}>
                            {bio &&
                                    <Fragment>
                                        <Typography variant='body1' style={{ color: 'gray' }}>
                                            About Me
                                    </Typography>
                                        <Typography variant='body1' style={{marginBottom: 5}}>
                                            {bio}
                                        </Typography>
                                    </Fragment>
                                }
                                {favoriteFilms &&
                                    <Fragment>
                                        <Typography variant='body1' style={{ color: 'gray' }}>
                                            Favorite Movies and TV Shows
                                    </Typography>
                                        <Typography variant='body1' style={{marginBottom: 5}}>
                                            {favoriteFilms}
                                        </Typography>
                                    </Fragment>
                                }


                                {movieGenres &&
                                    <Fragment>
                                        <Typography variant='body1' style={{ color: 'gray' }}>
                                            Favorite Movie Genres
                                    </Typography>
                                        <Typography variant='body1' style={{marginBottom: 5}}>
                                            {movieGenres.join(', ')}
                                        </Typography>
                                    </Fragment>

                                }
                                {tvGenres &&
                                    <Fragment>
                                        <Typography variant='body1' style={{ color: 'gray' }}>
                                            Favorite TV Genres
                                    </Typography>
                                        <Typography variant='body1' style={{marginBottom: 5}}>
                                            {tvGenres.join(', ')}
                                        </Typography>
                                    </Fragment>

                                }
                                {favoriteQuote &&
                                    <Fragment>
                                        <Typography variant='body1' style={{ color: 'gray' }}>
                                            Favorite Quote
                                    </Typography>
                                        <Typography variant='body1' style={{marginBottom: 5}}>
                                            {favoriteQuote}
                                        </Typography>
                                    </Fragment>

                                }

                            </div>

                            {/*}
                            <Tooltip title='Logout' placement='top'>
                                <IconButton onClick={this.handleLogout}>
                                    <KeyboardReturn color='primary' />
                                </IconButton>
                            </Tooltip>
                                */}
                            <CommonButton tooltip='Logout' onClick={this.handleLogout}>
                                <KeyboardReturn color='primary' />
                            </CommonButton>
                            <EditProfileDialog />

                        </div>
                    </Paper>) : (
                        /* not authenticated */
                        <Paper className={classes.paper}>
                            <Typography variant='body2' align='center'>
                                No profile found, please login again
                            </Typography>
                            <div className={classes.buttons}>
                                <Button variant='contained' color='primary' component={Link} to='/login'>
                                    Login
                                    </Button>
                                <Button variant='contained' color='secondary' component={Link} to='/signup'>
                                    Signup
                                    </Button>
                            </div>
                        </Paper>
                    )
                ) :
                (<ProfileSkeleton />)
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    logoutUser, uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
