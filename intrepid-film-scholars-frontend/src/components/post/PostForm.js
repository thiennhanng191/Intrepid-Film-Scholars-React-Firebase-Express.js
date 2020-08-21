import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';


//import Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

//import Redux
import { connect } from 'react-redux';
import { uploadPost } from '../../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.spreadThis,
    textField: {
        //backgroundColor: 'white',
        marginRight: 20,
        '& .MuiOutlinedInput-multiline': {
            paddingBottom: 27
        }
    },
    form: {
        marginBottom: 20,
        display: 'flex'
    },
    submitButton: {
        maxHeight: 50,
        position: 'relative'
    },
    iconButton: {
        '-webkit-appearance': 'none',
        height: 28,
        borderRadius: 10,
        display: 'flex', 
        alignItems: 'center',
        '& .MuiButton-label': {
            height: 0
        }
    },
    progressSpinner: {
        position: 'absolute'
    },
    checkBox: {
        paddingLeft: 0,
        color: 'gray',
        display: 'inline-block'
    },
    buttonTypography: {
        color: 'gray',
        textTransform: 'Capitalize'
    }
})
class PostForm extends Component {
    state = {
        body: '', // body of the new post
        titleId: '',
        errors: {},
        submitted: false,
        opinionButtonOn: true,
        funFactButtonOn: false,
        plotHoleButtonOn: false
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors }; //basically update the changes in the state
        }
        else return null
    }

    componentDidUpdate(prevProps) {
        //console.log(this.props.UI.errors);
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
        if (!this.props.UI.errors && !this.props.UI.loading && this.props.UI.loading !== prevProps.UI.loading) { //there must be a chnage in this.props and prevProps or else it would go to an infinitive loop
            this.setState({
                body: '',
                errors: {}
            });
        }

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.data.episode) {
            const post = {
                body: this.state.body,
                titleImdbId: this.props.titleId,
                titleId: this.props.data.episode.imdbID,
                title: this.props.title,
                season: this.props.data.season,
                episode: this.props.data.episode.Episode,
                opinion: this.state.opinionButtonOn,
                funFact: this.state.funFactButtonOn,
                plotHoles: this.state.plotHoleButtonOn
            }
            this.props.uploadPost(post);

        } else {
            if (this.props.data.title.Type === 'series' && Number.isInteger(this.props.data.season)) { //if the user is on a season of a tv show/series
                const post = {
                    body: this.state.body,
                    titleImdbId: this.props.titleId,
                    titleId: this.props.data.title.imdbID + this.props.data.season,
                    title: this.props.data.title.Title,
                    season: this.props.data.season,
                    opinion: this.state.opinionButtonOn,
                    funFact: this.state.funFactButtonOn,
                    plotHoles: this.state.plotHoleButtonOn
                }
                this.props.uploadPost(post); //this.props.data.season is in the global state (result from the handling of the season dropdown in the titleinfo)
            }
            else { // if the user is on the overview movie/series page
                const post = {
                    body: this.state.body,
                    titleImdbId: this.props.titleId,
                    titleId: this.props.data.title.imdbID,
                    title: this.props.data.title.Title,
                    opinion: this.state.opinionButtonOn,
                    funFact: this.state.funFactButtonOn,
                    plotHoles: this.state.plotHoleButtonOn
                }
                this.props.uploadPost(post);
            }
        }
        this.setState({
            body: ''
        });
    };

    handleOpinionButton = () => {
        this.setState({
            opinionButtonOn: !this.state.opinionButtonOn
        });
        if (!this.state.opinionButtonOn) {
            this.setState({
                funFactButtonOn: false, 
                plotHoleButtonOn: false
            })
        }
        
    }

    handleFunFactButton = () => {
        this.setState({
            funFactButtonOn: !this.state.funFactButtonOn
        });
        if (!this.state.funFactButtonOn) {
            this.setState({
                opinionButtonOn: false, 
                plotHoleButtonOn: false
            })
        }
    }

    handlePlotHolesButton = () => {
        this.setState({
            plotHoleButtonOn: !this.state.plotHoleButtonOn
        });
        if (!this.state.plotHoleButtonOn) {
            this.setState({
                funFactButtonOn: false, 
                opinionButtonOn: false
            })
        }
    }
    render() {
        const { classes, placeholderTitle } = this.props;
        const { loading } = this.props.data;
        const { errors } = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        name='body'
                        type='text'
                        variant='outlined'
                        //label='POST'
                        multiline
                        rows='5'
                        placeholder={`Share your thoughts on ${placeholderTitle}`}
                        value={this.state.body}
                        error={errors ? (errors.body ? true : false) : false}
                        helperText={errors ? errors.body : ''}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.submitButton}
                        disabled={loading}
                    >
                        Submit
                                {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner} />
                        )}
                    </Button>
                </form>
                <div style={{ marginTop: '-48px', marginBottom: 30, height: 28 }}>
                    <div>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button className={classes.iconButton} onClick={this.handleOpinionButton}>
                                <Checkbox
                                    checked={this.state.opinionButtonOn}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    className={classes.checkBox}
                                />
                                <Typography variant='body1' className={classes.buttonTypography}>
                                    Opinion
                        </Typography>
                            </Button>
                            <Button onClick={this.handleFunFactButton} className={classes.iconButton}>
                                <Checkbox
                                    checked={this.state.funFactButtonOn}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    className={classes.checkBox}
                                />
                                <Typography variant='body1' className={classes.buttonTypography}>
                                    Fun fact
                        </Typography>
                            </Button>
                            <Button onClick={this.handlePlotHolesButton} className={classes.iconButton}>
                                <Checkbox
                                    checked={this.state.plotHoleButtonOn}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    className={classes.checkBox}
                                />
                                <Typography variant='body1' className={classes.buttonTypography}>
                                    Plot holes
                        </Typography>
                            </Button>
                        </ButtonGroup>
                    </div>

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapDispatchToProps = {
    uploadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostForm));
