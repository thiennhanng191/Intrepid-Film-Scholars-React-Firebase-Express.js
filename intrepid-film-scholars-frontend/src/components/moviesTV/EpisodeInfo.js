import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    card: {
        height: 350,
        maxHeight: 500,
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
});

class EpisodeInfo extends Component {
    render() {
        const { classes,
            episode: {
                Season,
                Episode,
                Title,
                Year,
                Director,
                Writer,
                Plot,
                Poster,
                imdbRating,
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='350px'
                            image={Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png' : Poster}
                            title={`${Title} Poster`}
                        />
                    </Grid>
                    <Grid item sm={9}>
                        <CardContent className={classes.content}>
                            <Typography variant='h5' style={{ color: '#adabab', fontSize: '1.2rem' }}>
                                Season {Season} | Episode {Episode}
                            </Typography>
                            <div style={{display: 'flex'}}>
                                <Typography variant='h5' style={{marginRight: 5}}>
                                    {Title}
                                </Typography>
                                <Typography variant='h5' style={{color: 'gray'}}>
                                ({Year})
                            </Typography>
                            </div>

                            <div className={classes.logoTextContainer}>
                                <Avatar variant='rounded' src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png' className={classes.imdbLogoAvatar} />
                                <Typography variant='body1' className={classes.logoTypography}>
                                    {imdbRating}
                                </Typography>
                            </div>
                            
                            <Typography variant='body1'>
                                {Plot}
                            </Typography>
                            <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Directed by
                                </Typography>
                                <Typography variant='body1'>
                                    {Director}
                                </Typography>
                            </div>
                            <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray'}}>
                                    Written by
                                </Typography>
                                <Typography variant='body1' style={{width: 'fit-content'}}>
                                    {Writer}
                                </Typography>
                            </div>

                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(EpisodeInfo);
