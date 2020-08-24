import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// import MUI related
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
    ...theme.spreadThis,
})
const ProfileSkeleton = (props) => {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <Grid container spacing={0} className={classes.basicProfileContainer}>
                    <Grid item xs={5}>
                        <div className='image-wrapper'>
                            <Skeleton animation="wave" variant="circle" width={100} height={100} />
                        </div>
                    </Grid>
                    <hr />
                    <Grid item xs={7}>
                        <div style={{marginTop: 10}}>
                        <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                            <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </div>
                            
                    </Grid>
                </Grid>
                <hr />
                <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                            <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                <hr />
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ProfileSkeleton)
