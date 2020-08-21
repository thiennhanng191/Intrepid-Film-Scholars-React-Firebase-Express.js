import React, { Component } from 'react'


// import MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.spreadThis,
    gridContainer: {
        padding: '20px 0'
    },
    card: {
        height: 350,
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

class HorizontalScrollSkeleton extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='240px'
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='240px'
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='240px'
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='240px'
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='240px'
                            image={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={`Poster`}
                        />
                        <CardContent>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(HorizontalScrollSkeleton);
