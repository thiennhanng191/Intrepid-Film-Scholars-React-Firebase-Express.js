import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import clsx from 'clsx';
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
import { useMediaQuery } from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// Import Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

// import icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
        padding: 16
    },
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
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            width: 100,
            height: 100
        }
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    mobileCardActions: {
        height: 10,
        paddingTop: 0,
        justifyContent: 'flex-end',
        width: '100%'
    },
    profileIcon: {
        marginRight: 5
    },
    collapseContent: {
        padding: '0px !important'
    },
    mobileImageWrapper: {
        textAlign: 'center',
        position: 'relative',
    },
    addProfileImageButton: {
        top: '80%',
        left: '70%',
        position: 'absolute',
        [theme.breakpoints.down('xs')]: {
            left: '90%',
        }
    },
    avatarBadge: {
        '& .MuiBadge-anchorOriginBottomRightRectangle': {
            transform: 'scale(1) translate(-20%, -20%)'
        }
    }
});


function Profile(props) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    const handleImageChange = (event) => {
        const profileImage = event.target.files[0];
        // send to the server
        const formData = new FormData();
        formData.append('Profile Image', profileImage, profileImage.name);
        props.uploadImage(formData);
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('inputImage'); //id of the file input element
        fileInput.click(); //trigger input file event
    }
    const handleLogout = () => {
        props.logoutUser();
    }

    const {
        classes,

        user: {
            credentials: { handle, createdAt, imageUrl, bio, website, location, favoriteFilms, movieGenres, tvGenres, favoriteQuote },
            authenticated
        },
    } = props;

    const { loadingUser } = props.user;

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const isCollapseContent = bio || favoriteFilms || movieGenres || tvGenres || favoriteQuote;

    const fullSizeRender = (
        <Card className={classes.card}>
            <div className={classes.profile}>
                <Grid container spacing={2} className={classes.basicProfileContainer}>
                    <Grid item sm={5}>
                        <div>
                            <input
                                type='file'
                                id='inputImage'
                                hidden='hidden'
                                onChange={handleImageChange}
                            />
                            <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={
                                    <CommonButton tooltip='Edit Profile Picture' onClick={handleEditPicture} /* btnClassName='button' */>
                                        <CameraIcon color='primary' className={classes.avatarIcon} />
                                    </CommonButton>
                                } 
                                className={classes.avatarBadge}>
                                <Avatar src={imageUrl} className={classes.avatar} />
                            </Badge>
                        </div>
                    </Grid>
                    <Grid item sm={7}>
                        <div className='profile-details'>
                            <MuiLink component={Link} to={`/user/${handle}`} variant='h6' style={{ color: '#01B2BF' }}>
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
                            <Typography variant='body1' style={{ marginBottom: 5 }}>
                                {bio}
                            </Typography>
                        </Fragment>
                    }
                    {favoriteFilms &&
                        <Fragment>
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Favorite Movies and TV Shows
                                    </Typography>
                            <Typography variant='body1' style={{ marginBottom: 5 }}>
                                {favoriteFilms}
                            </Typography>
                        </Fragment>
                    }


                    {movieGenres &&
                        <Fragment>
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Favorite Movie Genres
                                    </Typography>
                            <Typography variant='body1' style={{ marginBottom: 5 }}>
                                {movieGenres.join(', ')}
                            </Typography>
                        </Fragment>

                    }
                    {tvGenres &&
                        <Fragment>
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Favorite TV Genres
                                    </Typography>
                            <Typography variant='body1' style={{ marginBottom: 5 }}>
                                {tvGenres.join(', ')}
                            </Typography>
                        </Fragment>

                    }
                    {favoriteQuote &&
                        <Fragment>
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Favorite Quote
                                    </Typography>
                            <Typography variant='body1' style={{ marginBottom: 5 }}>
                                {favoriteQuote}
                            </Typography>
                        </Fragment>

                    }

                </div>

                {/*}
                            <Tooltip title='Logout' placement='top'>
                                <IconButton onClick={handleLogout}>
                                    <KeyboardReturn color='primary' />
                                </IconButton>
                            </Tooltip>
                                */}
                <CommonButton tooltip='Logout' onClick={handleLogout}>
                    <KeyboardReturn color='primary' />
                </CommonButton>
                <EditProfileDialog />

            </div>
        </Card>
    )

    const mobileSizeRender = (
        <Card className={classes.card}>
            <div className={classes.profile}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <div className={classes.mobileImageWrapper}>
                            <input
                                type='file'
                                id='inputImage'
                                hidden='hidden'
                                onChange={handleImageChange}
                            />
                            <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={
                                    <CommonButton tooltip='Edit Profile Picture' onClick={handleEditPicture} /* btnClassName='button' */>
                                        <CameraIcon color='primary' className={classes.avatarIcon} />
                                    </CommonButton>
                                } 
                                className={classes.avatarBadge}>
                                <Avatar src={imageUrl} className={classes.avatar} />
                            </Badge>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className='profile-details'>
                            <MuiLink component={Link} to={`/user/${handle}`} variant='h6' style={{ color: '#01B2BF' }}>
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
                            {isCollapseContent &&
                                <CardActions disableSpacing className={classes.mobileCardActions}>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                        style={{ color: '#01B2BF' }}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                            }
                        </div>
                    </Grid>
                </Grid>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.collapseContent}>
                        <div style={{ textAlign: 'center' }}>
                            {bio &&
                                <Fragment>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        About Me
                                    </Typography>
                                    <Typography variant='body1' style={{ marginBottom: 5 }}>
                                        {bio}
                                    </Typography>
                                </Fragment>
                            }
                            {favoriteFilms &&
                                <Fragment>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Favorite Movies and TV Shows
                                    </Typography>
                                    <Typography variant='body1' style={{ marginBottom: 5 }}>
                                        {favoriteFilms}
                                    </Typography>
                                </Fragment>
                            }


                            {movieGenres &&
                                <Fragment>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Favorite Movie Genres
                                    </Typography>
                                    <Typography variant='body1' style={{ marginBottom: 5 }}>
                                        {movieGenres.join(', ')}
                                    </Typography>
                                </Fragment>

                            }
                            {tvGenres &&
                                <Fragment>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Favorite TV Genres
                                    </Typography>
                                    <Typography variant='body1' style={{ marginBottom: 5 }}>
                                        {tvGenres.join(', ')}
                                    </Typography>
                                </Fragment>

                            }
                            {favoriteQuote &&
                                <Fragment>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Favorite Quote
                                    </Typography>
                                    <Typography variant='body1' style={{ marginBottom: 5 }}>
                                        {favoriteQuote}
                                    </Typography>
                                </Fragment>

                            }

                        </div>

                        {/*}
                            <Tooltip title='Logout' placement='top'>
                                <IconButton onClick={handleLogout}>
                                    <KeyboardReturn color='primary' />
                                </IconButton>
                            </Tooltip>
                                */}
                        <CommonButton tooltip='Logout' onClick={handleLogout}>
                            <KeyboardReturn color='primary' />
                        </CommonButton>
                        <EditProfileDialog />


                    </CardContent>
                </Collapse>
            </div>
        </Card>
    )
    let profileMarkup =
        !loadingUser ?
            (authenticated ?
                (
                    isSmallScreen ? mobileSizeRender : fullSizeRender
                ) : (
                    /* not authenticated */
                    <Card className={classes.paper}>
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
                    </Card>
                )
            ) :
            (<ProfileSkeleton />)
    return profileMarkup;
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
