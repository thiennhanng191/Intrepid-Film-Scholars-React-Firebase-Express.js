import React from 'react'


// import MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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

        return (
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height={isSmallScreen ? '150px' : '240px'} 
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                        <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height={isSmallScreen ? '150px' : '240px'} 
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                        <Skeleton animation="wave" height={10} style={{ marginBottom:8}} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
}

export default withStyles(styles)(HorizontalScrollSkeleton);
