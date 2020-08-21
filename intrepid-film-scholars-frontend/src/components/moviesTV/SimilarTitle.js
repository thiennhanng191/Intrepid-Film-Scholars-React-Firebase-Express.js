import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';

//import Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

//import Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
    card: {
        height: 150,
        marginBottom: 20
    },
    content: {
        height: '100%'
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
class SimilarTitle extends Component {

    render() {
        const { classes,
            customClass,
            title: {
                Title,
                Year,
                Poster,
                imdbRating,
                imdbID } } = this.props;

        return (
            <Card className={customClass ? customClass : classes.card}> {/* can pass custom styling down from parent props*/}
                <CardActionArea className={classes.actionArea} component={Link} to={`/moviesTV/title=${imdbID}`}>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <CardMedia
                                component='img'
                                alt='poster'
                                height='150px'
                                src={Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png' : Poster}
                                title={`${Title} Poster`}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent className={classes.content}>
                                <div>
                                    <Typography variant='h6' style={{ fontSize: '1.12rem' }}>
                                        <Truncate
                                            lines={2}
                                            ellipsis={(<span>...</span>)}
                                        >
                                            {Title}
                                        </Truncate>
                                    </Typography>

                                </div>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    {Year}
                                </Typography>
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

SimilarTitle.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimilarTitle)); 
