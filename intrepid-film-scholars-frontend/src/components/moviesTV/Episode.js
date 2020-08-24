import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

//import Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// import Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
    card: {
        height: 150,
        marginBottom: 20
    },
    content: {
        height: '100%'
    },
    title: {
        fontSize: '1.2rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.1rem'
        }
    },
    logoTextContainer: {
        display: 'inline-flex'
    },
    imdbLogoAvatar: {
        '& .MuiAvatar-img': {
            objectFit: 'contain'
        },
        marginBottom: 0
    },
    logoTypography: {
        alignSelf: 'center'
    }
})
class Episode extends Component {
    state = {
        season: 'Seasons',
    }

    render() {
        const { classes,
            seriesId,
            index,
            customClass,
            Episode: {
                Title,
                Episode,
                imdbRating,
                imdbID } } = this.props;

        const { episodes, season } = this.props.data;

        //const { Poster } = anEpisode;
        // console.log(`check episodes array ${index} ${JSON.stringify(episodes[index])}`);
        //console.log(`check episodes ${index} ${episodes[index] ? episodes[index].Poster : 'N/A'}`);

        return (
            <Card className={customClass ? customClass : classes.card}>
                <CardActionArea className={classes.actionArea} component={Link} to={`/moviesTV/title=${seriesId}/season=${season}/episode=${imdbID}`}>
                    <Grid container spacing={2}>
                        <Grid item sm={3} xs={4}>
                            <CardMedia
                                component='img'
                                alt='poster'
                                height='150px'
                                src={episodes[index] ? episodes[index].Poster : 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                                title={`${Title} Poster`}
                            />
                        </Grid>
                        <Grid item sm={9} xs={8}>
                            <CardContent className={classes.content}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Season {season} | Episode {Episode}
                                </Typography>
                                <div>
                                    <Typography className={classes.title}>
                                    <Truncate
                                            lines={2}
                                            ellipsis={('...')}
                                        >
                                            {Title}
                                        </Truncate>
                                    </Typography>

                                </div>
                                <div className={classes.logoTextContainer}>
                                    <Avatar variant='rounded' src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png' className={classes.imdbLogoAvatar} />
                                    <Typography variant='body1' className={classes.logoTypography}>
                                        {imdbRating}
                                    </Typography>
                                </div>
                                {/*
                        <Button  variant='containted' color='primary'>
                            Details
                        </Button>
                        */}
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        )
    }
}

Episode.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Episode)); 
