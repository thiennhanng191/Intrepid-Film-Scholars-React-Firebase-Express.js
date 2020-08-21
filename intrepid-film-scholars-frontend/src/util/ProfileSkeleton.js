import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import BlankProfileImage from '../images/blank-profile-image.png';

// import MUI related
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Import icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
})
const ProfileSkeleton = (props) => {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <Grid container spacing={2} className={classes.basicProfileContainer}>
                    <Grid item sm={5}>
                        <div className='image-wrapper'>
                            <img src={BlankProfileImage} alt='profile' className='profile-image' /> {/* 'profile-image' is in the global style */}
                        </div>
                    </Grid>
                    <hr />
                    <Grid item sm={7}>
                        <div className='profile-details'> {/* 'profile-details' is in the global style */}
                            <div className={classes.handle} />
                            <hr />
                            <LocationOn color='primary' /> <span>Location</span>
                            <hr />
                            <LinkIcon color='primary' /> https://website.com
                    <hr />
                            <CalendarToday color='primary' /> Join date
                </div>
                    </Grid>
                </Grid>
                <hr />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <hr />
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ProfileSkeleton)
