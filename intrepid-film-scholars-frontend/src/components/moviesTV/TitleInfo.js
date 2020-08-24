import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';

// import Redux
import { connect } from 'react-redux';
import { getTVSeason, chooseSeasonDefault, getPostsByTitleId, chooseSeason } from '../../redux/actions/dataActions';

// import Material UI
import { useMediaQuery } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

// import icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    card: {
    },
    content: {
        //maxHeight: 350, 
        height: 330,
        overflowY: 'scroll',
    },
    actionArea: {
        height: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        position: 'absolute',
        bottom: 35
    },
    mobileFormControl: {
        margin: theme.spacing(1),
        '& .MuiOutlinedInput-root': {
            height: 45,
            width: 90
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
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    mobileCardActions: {
        height: 10,
        paddingTop: 0,
        justifyContent: 'flex-end'
    }
})
function TitleInfo(props) {
    const [oldPath, setOldPath] = useState('');
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    useEffect(() => {
        //call getTVSeason to render the episodes' poster when go back from an episode's details page
        if (props.data.chooseSeason){ // dont get the season when it's a movie or in the overview of a tv show/series
            props.getTVSeason(props.title.imdbID, props.data.season);
        }    
        setOldPath(window.location.pathname);
    }, []) // only run getTVSeason in the initial render

    const handleSelectSeason = (event) => {
        props.chooseSeason(event.target.value);
        console.log(`choose season ${event.target.value}`)
        if (!Number.isInteger(event.target.value)) { //use props.data.season here would get the previous value of season, not the one that is just been set supposedly
            props.chooseSeasonDefault();
            props.getPostsByTitleId(props.title.imdbID);
            const originalPath = `/moviesTV/title=${props.title.imdbID}`;
            window.history.pushState(null, null, originalPath);
        }
        else {
            const { imdbID } = props.title;
            props.getTVSeason(imdbID, event.target.value);
            const titleToGetPost = imdbID + event.target.value; //cannot use props.data.season here as well -- similar to above problem
            console.log(`title to get post ${titleToGetPost}`);
            props.getPostsByTitleId(titleToGetPost);

            //let oldPath = window.location.pathname; //the path we have currently
            const newPath = `/moviesTV/title=${imdbID}/season=${event.target.value}` // the path for the seasom that user chose
            window.history.pushState(null, null, newPath); //change the url path to the post URL when open post dialog
        };
    }

    const { classes,
        title: {
            Title,
            Year,
            Poster,
            Plot,
            Type,
            Director,
            Writer,
            Actors,
            imdbRating,
            Production,
        } } = props;

    const { season, chooseSeason } = props.data;

    const numberOfSeasons = Type === 'series' && props.title.totalSeasons;
    let menuItems = [<MenuItem value={'Seasons'} key='Seasons'>Seasons</MenuItem>];
    for (var i = 1; i <= numberOfSeasons; i++) {
        menuItems.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
    }

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const seasonSelectButton = <FormControl variant="outlined" className={isSmallScreen ? classes.mobileFormControl : classes.formControl}>
        <InputLabel id="select-button">Season</InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={season}
            onChange={handleSelectSeason}
            label="Season"
        >
            {
                menuItems
            }
        </Select>
    </FormControl>

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
                <Grid item sm={9} style={{ position: 'relative' }}>
                    <div>
                        <CardContent className={classes.content}>
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
                            {Type === 'movie' && <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Directed by
                                </Typography>
                                <Typography variant='body1'>
                                    {Director}
                                </Typography>
                            </div>}
                            <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Written by
                                </Typography>
                                <Typography variant='body1' style={{ width: 'fit-content' }}>
                                    {Writer}
                                </Typography>
                            </div>
                            <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Cast
                                </Typography>
                                <Typography variant='body1' style={{ width: 'fit-content' }}>
                                    {Actors}
                                </Typography>
                            </div>
                            {Type === 'movie' && <div style={{ display: 'grid', marginBottom: 3 }}>
                                <Typography variant='body1' style={{ color: 'gray' }}>
                                    Produced by
                                </Typography>
                                <Typography variant='body1'>
                                    {Production}
                                </Typography>
                            </div>
                            }

                            {/*
                        <Button  variant='containted' color='primary'>
                            Details
                        </Button>
                        */}
                            {Type === 'series' && seasonSelectButton}
                        </CardContent>
                    </div>

                </Grid>
            </Grid>
        </Card>
    )

    const mobileSizeRender = (
        <Card className={classes.card}>
            <CardContent className={classes.mobileContent}>
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
                    <Grid item xs={8} style={{ position: 'relative' }}>
                        <div>
                            <div style={{}}>
                                <Typography variant='h6' style={{ marginRight: 5 }}>
                                    {Title}
                                </Typography>
                                <Typography variant='h6' style={{ color: 'gray' }}>
                                    ({Year})
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
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', bottom :'0%', width: '100%'}}>
                            {Type === 'series' && seasonSelectButton}
                            {!chooseSeason && <div />} {/* this is for justifyContent space-between to work when there is no seasonSelectButton*/}
                            <CardActions disableSpacing className={classes.mobileCardActions}>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    style={{ color: '#01B2BF' }}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                        </div>

                    </Grid>
                </Grid>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{ paddingTop: 0 }}>
                    <Typography variant='body1'>
                        {Plot}
                    </Typography>
                    {Type === 'movie' && <div style={{ display: 'grid', marginBottom: 3 }}>
                        <Typography variant='body1' style={{ color: 'gray' }}>
                            Directed by
                                </Typography>
                        <Typography variant='body1'>
                            {Director}
                        </Typography>
                    </div>}
                    <div style={{ display: 'grid', marginBottom: 3 }}>
                        <Typography variant='body1' style={{ color: 'gray' }}>
                            Written by
                                </Typography>
                        <Typography variant='body1' style={{ width: 'fit-content' }}>
                            {Writer}
                        </Typography>
                    </div>
                    <div style={{ display: 'grid', marginBottom: 3 }}>
                        <Typography variant='body1' style={{ color: 'gray' }}>
                            Cast
                                </Typography>
                        <Typography variant='body1' style={{ width: 'fit-content' }}>
                            {Actors}
                        </Typography>
                    </div>
                    {Type === 'movie' && <div style={{ display: 'grid', marginBottom: 3 }}>
                        <Typography variant='body1' style={{ color: 'gray' }}>
                            Produced by
                                </Typography>
                        <Typography variant='body1'>
                            {Production}
                        </Typography>
                    </div>
                    }
                </CardContent>
            </Collapse>

        </Card>
    )
    return (
        isSmallScreen ? mobileSizeRender : fullSizeRender
    )
}

TitleInfo.propTypes = {
    title: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {
    getTVSeason,
    getPostsByTitleId,
    chooseSeasonDefault,
    chooseSeason,
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TitleInfo)); 
