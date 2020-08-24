import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import clsx from 'clsx';

import ProfileSkeleton from '../../util/ProfileSkeleton';

// Import icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Import MUI
import { useMediaQuery } from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// Import Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

// import icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    ...theme.spreadThis,
    basicProfileContainer: {
    },
    horizontalDivider: {
        margin: 0,
        width: 0,
        border: 'none',
        marginBottom: '3px !important'
    },
    avatarIcon: {
        backgroundColor: 'rgba(1, 178, 191, 0.15)',
        borderRadius: 20,
        padding: 5,
        position: 'absolute'
    },
    cardContent: {
        padding: '0px !important'
    },
    collapseContent: {
        paddingTop: 0,
        paddingBottom: '0px !important'
    },
    mobileProfile: {
        display: 'flex'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        [theme.breakpoints.down('sm')]: {
            width: 80,
            height: 80
        },
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
    }
});


function StaticProfile(props) {
    const {
        classes,
        profile: {
            handle, createdAt, imageUrl, bio, website, location, favoriteFilms, movieGenres, tvGenres, favoriteQuote
        }
    } = props;

    const { loadingUser } = props.data;
    const [expanded, setExpanded] = useState(false);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const isCollapseContent = bio || favoriteFilms || movieGenres || tvGenres || favoriteQuote;

    const mobileRender = (
        <Card className={classes.paper}>
            <CardContent className={classes.cardContent}>
                <div className={classes.mobileProfile}>
                    <Avatar src={imageUrl} className={classes.avatar} />
                    <div className='profile-details' style={{ width: '100%' }}>
                        <MuiLink component={Link} to={`/user/${handle}`} variant='h6' style={{ color: '#01B2BF' }}>
                            @{handle}
                        </MuiLink>
                        <hr className={classes.horizontalDivider} />
                        {location && (
                            <Fragment>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn color='primary' className={classes.profileIcon} /> <span style={{ display: 'inline-flex' }}><Typography variant='body2'>
                                        {location}
                                    </Typography>
                                    </span>
                                </div>
                                <hr className={classes.horizontalDivider} />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <LinkIcon color='primary' className={classes.profileIcon}/>
                                    <a href={website} target='_blank' rel='noopener noreferrer'>
                                        {' '}{website}
                                    </a>
                                </div>
                                <hr className={classes.horizontalDivider} />
                            </Fragment>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <CalendarToday color='primary' className={classes.profileIcon}/>{' '}
                            <span style={{ display: 'inline-flex' }}> <Typography variant='body2'>
                                Joined {dayjs(createdAt).format('MMM YYYY')}
                            </Typography> </span>
                        </div>

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
                </div>
            </CardContent>

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
                </CardContent>
            </Collapse>
        </Card >
    )

    const fullSizeRender = (
        <Card className={classes.paper}>
            <div className={classes.profile}>
                <Grid container spacing={4} className={classes.basicProfileContainer}>
                    <Grid item sm={4}>
                    <Avatar src={imageUrl} className={classes.avatar} />
                    </Grid>
                    <Grid item sm={8}>
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
            </div>
        </Card>
    )
    let profileMarkup =
        !loadingUser ?
            (
                isSmallScreen ? mobileRender : fullSizeRender
            ) :
            (<ProfileSkeleton />)
    return profileMarkup;
}

StaticProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});

const mapDispatchToProps = {
    logoutUser, uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StaticProfile));
