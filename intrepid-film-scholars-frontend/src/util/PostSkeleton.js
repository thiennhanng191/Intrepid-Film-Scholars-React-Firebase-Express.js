import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

// import MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
        marginBottom: 20, 
    },
    cardHeader: {
        paddingBottom: 0
    }
})
const PostSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5}) //create an array of length 5
                            .map((item, index) => (
        <Card className={classes.card} key ={index}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                }
                title={
                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                }
                subheader={ <Skeleton animation="wave" height={10} width="30%" />}
                className={classes.cardHeader}
            />
            <CardContent>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
        </Card>
    ))
        return (
            <Fragment>
                {content}
            </Fragment>
        )
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(PostSkeleton)
