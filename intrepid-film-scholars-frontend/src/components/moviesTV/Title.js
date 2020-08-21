import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

//import Redux
import { connect } from 'react-redux';
import { getTitle } from '../../redux/actions/dataActions';

//import Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    card: {
        height: 350,
        maxHeight: 390,
        borderColor: 'transparent'
    },
    content: {
        height: '100%',
        background: 'transparent'
    },
    actionArea: {
        height: '100%'
    }
})
class Title extends Component {
    render() {
        const { classes, title: { Title, Year, Poster, imdbID }, scrollItemClassName } = this.props;

        return (
            <Card variant='outlined' className={scrollItemClassName ? scrollItemClassName : classes.card}>
                <CardActionArea className={classes.actionArea} component={Link} to={`/moviesTV/title=${imdbID}`}>
                    <CardMedia
                        component='img'
                        alt='poster'
                        height='240px'
                        image={Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png' : Poster}
                        title={`${Title} Poster`}
                    />
                    <CardContent className={classes.content}>
                        <div>
                            <Typography gutterBottom variant='h6' style={{ fontSize: '1.2rem' }}>
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
                        {/*
                        <Button  variant='containted' color='primary'>
                            Details
                        </Button>
                        */}
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

Title.propTypes = {
    title: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
    getTitle
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Title)); 
