import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';

// import Material UI
import { useMediaQuery } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

// import icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    card: {
    },
    content: {
        height: '100%',
        paddingBottom: '16px !important'
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
    },
    expandOpen: {
        transform: 'rotate(180deg)',
      },
    mobileCardActions: {
        height: 10, 
        paddingTop: 0, 
        justifyContent: 'flex-end'
    }
});

function EpisodeInfo(props) {
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
    } = props;

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const mobileSizeRender = (
        <Card className={classes.mobileSizedCard} style={{marginBottom: 20}}>
            <CardContent className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='100%'
                            image={Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png' : Poster}
                            title={`${Title} Poster`}
                        />
                    </Grid>
                    <Grid item xs={8}>

                        <Typography variant='h6' style={{ color: '#adabab', fontSize: '1rem' }}>
                            Season {Season} | Episode {Episode}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <Typography variant='h6' style={{ marginRight: 5, fontSize: '1.2rem' }}>
                                {Title}
                            </Typography>
                            <Typography variant='h6' style={{ color: 'gray', fontSize: '1.2rem' }}>
                                ({Year})
                            </Typography>
                        </div>
                            <div className={classes.logoTextContainer}>
                                <Avatar variant='rounded' src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png' className={classes.imdbLogoAvatar} />
                                <Typography variant='body1' className={classes.logoTypography}>
                                    {imdbRating}
                                </Typography>

                            </div>
                            <CardActions disableSpacing className={classes.mobileCardActions}>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    style={{ color: '#01B2BF'}}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                    </Grid>
                </Grid>
            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{paddingTop: 0}}>
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
                        <Typography variant='body1' style={{ color: 'gray' }}>
                            Written by
                                </Typography>
                        <Typography variant='body1' style={{ width: 'fit-content' }}>
                            {Writer}
                        </Typography>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    )
    const fullSizeRender = (
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
                        <div style={{ display: 'flex' }}>
                            <Typography variant='h5' style={{ marginRight: 5 }}>
                                {Title}
                            </Typography>
                            <Typography variant='h5' style={{ color: 'gray' }}>
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
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Written by
                                </Typography>
                            <Typography variant='body1' style={{ width: 'fit-content' }}>
                                {Writer}
                            </Typography>
                        </div>

                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
    return (
        isSmallScreen ? mobileSizeRender : fullSizeRender
    )
}

export default withStyles(styles)(EpisodeInfo);
