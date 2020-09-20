import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//import Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

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
                        <Skeleton variant="rect" animation="wave" height={150} />
                    </Grid>
                    <Grid item xs={8}>
                        <CardContent className={classes.content}>
                            <Skeleton animation="wave" height={25} />
                            <Skeleton animation="wave" height={25} width="80%" />
                            <div style={{height: 15}} />
                            <Skeleton animation="wave" height={15} width="50%" />
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
