import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//import Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
})
class SimilarTitle extends Component {

    render() {
        const { classes,
            customClass
        } = this.props;

        return (
            <Card className={customClass ? customClass : classes.card}> {/* can pass custom styling down from parent props*/}
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <CardMedia
                            component='img'
                            alt='poster'
                            height='150px'
                            src={'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/140x209/film-4001654135._CB466678728_.png'}
                            title={'Poster'}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <CardContent className={classes.content}>
                            <div className={classes.fullLineTitle} />
                            <div className={classes.fullLineTitle} />
                            <div className={classes.halfLine} />
                        </CardContent>
                    </Grid>
                </Grid>
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
