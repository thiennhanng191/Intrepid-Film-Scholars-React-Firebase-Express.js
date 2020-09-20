import React from 'react'


// import MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMediaQuery } from "@material-ui/core";

const styles = (theme) => ({
    ...theme.spreadThis,
    gridContainer: {
        padding: '20px 0',
        [theme.breakpoints.down('xs')]: {
            height: 240
        },
        marginBottom: 35
    },
    card: {
        height: 350,
        [theme.breakpoints.down('xs')]: {
            height: 255,
            width: 150
        }
    },
    fullLineTitle: {
        width: '100%',
        height: 20,
        backgroundColor: 'lightgray',
        marginBottom: 5
    },
    halfLine: {
        width: '50%',
        height: 18,
        backgroundColor: 'gray'
    }
});

function HorizontalScrollSkeleton(props) {
    const { classes } = props;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    const titleSkeleton = (
        <Card className={classes.card}>
            <Skeleton variant="rect" animation="wave" height={isSmallScreen ? '160px' : '240px'} />
            <CardContent>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 8 }} />
                <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
        </Card>
    )
    const fullSizeRender = (
        <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
        </Grid>
    )

    const mobileSizeRender = (
        <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
            <Grid item sm>
                {titleSkeleton}
            </Grid>
        </Grid>
    )
    return (
        isSmallScreen ? mobileSizeRender : fullSizeRender
    )
}

export default withStyles(styles)(HorizontalScrollSkeleton);
