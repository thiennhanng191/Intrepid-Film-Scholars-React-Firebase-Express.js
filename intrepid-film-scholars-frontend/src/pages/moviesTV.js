import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Title from '../components/moviesTV/Title';
import HorizontalScrollContainer from '../components/moviesTV/HorizontalScrollContainer';
import HorizontalScrollSkeleton from '../util/HorizontalScrollSkeleton';

// import Material UI
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import Pagination from '@material-ui/lab/Pagination';

// import icons
import SearchIcon from '@material-ui/icons/Search';

// import Redux related
import { connect } from 'react-redux';
import { getTitles, getHighlyRatedMovies, getHighlyRatedTV, getPopularMovies, getPopularTV, getTrendingMovies, getTrendingTV } from '../redux/actions/dataActions';
//import CommonButton from '../util/CommonButton';

const styles = (theme) => ({
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    form: {
        width: '100%',
        display: 'inline-flex'
    },
    container: {
        justifyContent: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    toggleButtonGroupContainer: {
        marginTop: 25,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 25,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    category: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        fontSize: '1.15rem'
    },
    toggleButtonGroup: {
        width: 220,
        height: 35,
        maxHeight: '50px',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 25,
        //marginLeft: 15,
        border: '1px solid #01B2BF',
        [theme.breakpoints.down('xs')]: {
            width: 150
        }

    },
    toggleButton: {
        borderRadius: 25,
        height: 47,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    toggleButtonTypography: {
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.875rem'
        }

    }
})



class moviesTV extends Component {
    constructor() {
        super();
        this.state = {
            submitted: false,
            searchValue: '',
            page: '1',
            errors: {},
            selected: 0,
            highlyRatedView: 'Movies',
            popularView: 'Movies',
            trendingView: 'Movies'
        }
    }

    componentDidMount = () => {
        this.props.getHighlyRatedMovies();
        this.props.getHighlyRatedTV();
        this.props.getPopularMovies();
        this.props.getPopularTV();
        this.props.getTrendingMovies();
        this.props.getTrendingTV();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            page: '1',
            submitted: true
        })
        const search = this.state.searchValue;
        this.props.getTitles(search);
    }
    handleChange = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    }

    handleSelectPage = (event, value) => {
        this.setState({
            page: value
        })
        const { searchValue } = this.state;
        this.props.getTitles(searchValue, value)
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors }; //basically update the changes in the state
        }
        else return null
    }

    componentDidUpdate(prevProps) {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
        if (!this.props.UI.errors && !this.props.UI.loading && this.props.UI.loading !== prevProps.UI.loading) { //there must be a chnage in this.props and prevProps or else it would go to an infinitive loop
            this.setState({
                errors: {}
            });
        }

    }

    handleHighlyRatedToggleButtonChange = (event, nextView) => {
        if (nextView !== null) { //at least 1 toggle button must be on
            this.setState({
                highlyRatedView: nextView
            });
        }
    }

    handlePopularToggleButtonChange = (event, nextView) => {
        if (nextView !== null) { //at least 1 toggle button must be on
            this.setState({
                popularView: nextView
            });
        }
    }

    handleTrendingToggleButtonChange = (event, nextView) => {
        if (nextView !== null) { //at least 1 toggle button must be on
            this.setState({
                trendingView: nextView
            });
        }
    }

    render() {
        const {
            titles,
            titlesCount,
        } = this.props.data; //posts and loading are properties of dataReducer
        const { loadingHighlyRatedTitle, loadingPopularTitle, loadingTrendingTitle } = this.props.UI;
        const { classes } = this.props;
        const { errors } = this.state;


        let searchTitlesMarkup =
            titles.map((title, index) =>
                <Fragment key={index}>
                    <Grid item sm={3}>
                        <Title title={title} key={title.Title} />
                    </Grid>
                </Fragment>
            )

        let numberOfPages = Math.ceil(Number(titlesCount / 10));
        let menuItems = [];
        for (var i = 1; i <= numberOfPages; i++) {
            menuItems.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
        }

        let searchPagination =
            <Pagination count={numberOfPages} page={Number(this.state.page)} onChange={this.handleSelectPage} />

        return (
            <Fragment>
                <Grid container spacing={2} className={classes.container}>

                    <Grid item sm={2} xs={1} />

                    <Grid item sm={8} xs={10}>
                        <Paper className={classes.paper}>
                            <form noValidate onSubmit={this.handleSubmit} className={classes.form}>

                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Movies/TV series"
                                    inputProps={{ 'aria-label': 'search movies/TV series' }}
                                    value={this.state.searchValue}
                                    onChange={this.handleChange}
                                    error={errors === 'Too many results' ? true : false}
                                    id='input-base'
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="search" id='submit-icon'>
                                    <SearchIcon />
                                </IconButton>
                            </form>
                        </Paper>

                        {errors && <FormHelperText error={true} id="component-error-text" style={{ marginLeft: 12 }}>{errors.Error}</FormHelperText>}

                    </Grid>
                    <Grid item sm={2} xs={1} />

                    <Grid item sm={1} xs />

                    <Grid item container sm={10} xs={11} spacing={2} style={{ justifyContent: 'center' }}>
                        {searchTitlesMarkup}
                        <div style={{ width: '100%', display: 'inline-flex', justifyContent: 'center' }}>
                            {this.state.submitted && searchPagination}
                        </div>
                        <div style={{ width: '100%', textAlign: 'left', display: 'inline-flex' }}>
                            <div className={classes.toggleButtonGroupContainer}>
                                <Typography variant='h6' className={classes.category}>Highly Rated </Typography>
                                <ToggleButtonGroup
                                    value={this.state.highlyRatedView}
                                    exclusive
                                    onChange={this.handleHighlyRatedToggleButtonChange}
                                    aria-label="Highly Rated Movies TV Togggle"
                                    className={classes.toggleButtonGroup}
                                    id='movies-tv-toggle'
                                >
                                    <ToggleButton value="Movies" aria-label="Movies" className={classes.toggleButton} style={{ borderRadius: 15, width: '100%' }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>Movies</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="TV" aria-label="TV" className={classes.toggleButton} style={{ borderRadius: 15 }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>TV</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        {!loadingHighlyRatedTitle ? <HorizontalScrollContainer titlesList={this.state.highlyRatedView === 'Movies' ? this.props.data.highlyRatedMovies : this.props.data.highlyRatedTV} /> : <HorizontalScrollSkeleton />}

                        <div style={{ width: '100%', textAlign: 'left', display: 'inline-flex' }}>
                            <div className={classes.toggleButtonGroupContainer}>
                                <Typography variant='h6' className={classes.category}>Popular </Typography>
                                <ToggleButtonGroup
                                    value={this.state.popularView}
                                    exclusive
                                    onChange={this.handlePopularToggleButtonChange}
                                    aria-label="Popular Movies TV Togggle"
                                    className={classes.toggleButtonGroup}
                                    id='movies-tv-toggle'
                                >
                                    <ToggleButton value="Movies" aria-label="Movies" className={classes.toggleButton} style={{ borderRadius: 15, width: '100%' }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>Movies</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="TV" aria-label="TV" className={classes.toggleButton} style={{ borderRadius: 15 }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>TV</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        {!loadingPopularTitle ? <HorizontalScrollContainer titlesList={this.state.popularView === 'Movies' ? this.props.data.popularMovies : this.props.data.popularTV} /> : <HorizontalScrollSkeleton />}

                        <div style={{ width: '100%', textAlign: 'left', display: 'inline-flex' }}>
                            <div className={classes.toggleButtonGroupContainer}>
                                <Typography variant='h6' className={classes.category}>What's trending</Typography>
                                <ToggleButtonGroup
                                    value={this.state.trendingView}
                                    exclusive
                                    onChange={this.handleTrendingToggleButtonChange}
                                    aria-label="Trending Movies TV Togggle"
                                    className={classes.toggleButtonGroup}
                                    id='movies-tv-toggle'
                                >
                                    <ToggleButton value="Movies" aria-label="Movies" className={classes.toggleButton} style={{ borderRadius: 15, width: '100%' }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>Movies</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="TV" aria-label="TV" className={classes.toggleButton} style={{ borderRadius: 15 }}>
                                        <Typography variant='h6' className={classes.toggleButtonTypography}>TV</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        {!loadingTrendingTitle ? <HorizontalScrollContainer titlesList={this.state.trendingView === 'Movies' ? this.props.data.trendingMovies : this.props.data.trendingTV} /> : <HorizontalScrollSkeleton />}

                    </Grid>
                    <Grid item sm={1} xs />
                    {/*
                    <Grid item sm={12} style={{ display: 'inline-flex', justifyContent: 'center' }}>

                    </Grid>
                    */}
                </Grid>
            </Fragment>
        );
    }
}

moviesTV.propTypes = {
    getTitles: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired // data is the dataReducer - we passed it into data in store.js
};

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapDispatchToProps = {
    getTitles,
    getHighlyRatedMovies,
    getHighlyRatedTV,
    getPopularMovies,
    getPopularTV,
    getTrendingMovies,
    getTrendingTV
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(moviesTV));
