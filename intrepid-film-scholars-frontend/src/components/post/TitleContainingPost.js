import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//import Mui related
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
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
        alignSelf: 'center',
    }
})
class TitleContainingPost extends Component {
    state = {
        theme: ''
    }
    componentDidMount = () => {
        this.setState({
            theme: this.props.theme
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.theme !== this.props.theme) {
            this.setState({
                theme: this.props.theme
            })
        }
    }
    render() {
        const { classes,
            customClass,
            link,
            showDetails: {
                season,
                episode,
                title
            },
            title: {
                Title,
                Year,
                Poster,
                imdbRating,
                Plot,
                Type,
                Director,
                Writer,
                Actors,
            } } = this.props;

        return (
            <Card className={customClass ? customClass : classes.card}> {/* can pass custom styling down from parent props*/}
                <CardActionArea className={classes.actionArea} component={Link} to={link}>
                    <CardContent className={classes.content}>
                        <Grid container spacing={2}>
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
                                {episode &&
                                    <div>
                                        <Typography variant='body1' style={{ color: '#079BAB' }}>
                                            {title} {/* tv show's title */}
                                        </Typography>

                                    </div>
                                }
                                <Typography variant='h5' style={{ marginRight: 8 }}>
                                    {Title} {/* episode's title */}
                                </Typography>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    ({Year})
                                    </Typography>

                                <Typography variant='body1' style={{ color: '#079BAB' }}>
                                    {season && `Season ${season}`} {episode && ` | Episode ${episode}`}
                                </Typography>
                                <div className={classes.logoTextContainer}>
                                    <Avatar variant='rounded' src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png' className={classes.imdbLogoAvatar} />
                                    <Typography variant='body1' className={classes.logoTypography}>
                                        {imdbRating}
                                    </Typography>
                                </div>

                            </Grid>
                        </Grid>


                        <div>
                            <Typography variant='body1'>
                                {Plot}
                            </Typography>
                        </div>
                        {Type === 'movie' && <div style={{ display: 'grid', marginBottom: 3 }}>
                            <Typography variant='body1' style={{ color: '#079BAB' }}>
                                Directed by
                                </Typography>
                            <Typography variant='body1' style={{ width: 'fit-content' }}>
                                {Director}
                            </Typography>
                        </div>}
                        <div style={{ display: 'grid', marginBottom: 3 }}>
                            <Typography variant='body1' style={{ color: '#079BAB' }}>
                                Written by
                                </Typography>
                            <Typography variant='body1' style={{ width: 'fit-content' }}>
                                {Writer}
                            </Typography>
                        </div>
                        <div style={{ display: 'grid', marginBottom: 3 }}>
                            <Typography variant='body1' style={{ color: '#079BAB' }}>
                                Cast
                                </Typography>
                            <Typography variant='body1' style={{ width: 'fit-content' }}>
                                {Actors}
                            </Typography>
                        </div>
                        {/*
                    <Button  variant='containted' color='primary'>
                        Details
                    </Button>
                    */}
                    </CardContent>
                    {/*
                    <Grid container spacing={2}>
                        <Grid item sm={3}>
                            <CardMedia
                                component='img'
                                alt='poster'
                                height='150px'
                                src={Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png' : Poster}
                                title={`${Title} Poster`}
                            />
                        </Grid>
                        <Grid item sm={9}>
                            <CardContent className={classes.content}>
                                <div>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        {title} {/* tv show's title 
                                    </Typography>

                                </div>
                                <div style={{display: 'flex'}}>
                                    <Typography variant='h6' style={{ fontSize: '1.2rem', marginRight: 8 }}>
                                        {Title} episode's title
                                    </Typography>
                                    <Typography variant='h6' style={{ fontSize: '1.2rem', color: 'gray' }}>
                                        ({Year})
                                    </Typography>

                                </div>

                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Season {season} | Episode {episode}
                                </Typography>
                                <div className={classes.logoTextContainer}>
                                    <Avatar variant='rounded' src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png' className={classes.imdbLogoAvatar} />
                                    <Typography variant='body1' className={classes.logoTypography}>
                                        {imdbRating}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Grid>
                    </Grid>
                */}
                </CardActionArea>
            </Card >
        )
    }
}

TitleContainingPost.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TitleContainingPost));
