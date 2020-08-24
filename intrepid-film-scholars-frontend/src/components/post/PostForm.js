import React, { useState, useEffect, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

//import Material UI
import { useMediaQuery } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

// import icons 
import SendIcon from '@material-ui/icons/SendRounded';

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
    mobileSizeTextField: {
        '& .MuiOutlinedInput-multiline': {
            paddingBottom: 27
        }
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
    mobileSizeCheckBox: {
        paddingLeft: 0,
        paddingRight: 2,
        color: 'gray',
        display: 'inline-block',
        '& .MuiSvgIcon-root': {
            width: '0.85em',
            height: '0.85em'
        }
    },
    buttonTypography: {
        color: 'gray',
        textTransform: 'Capitalize'
    }
})
function PostForm(props) {
    const [body, setBody] = useState('');
    // const [titleId, setTitleId] = useState('');
    const [errors, setErrors] = useState({});
    // const [submitted, setSubmitted] = useState(false);
    const [opinionButtonOn, setOpinionButtonOn] = useState(true);
    const [funFactButtonOn, setFunFactButtonOn] = useState(false);
    const [plotHoleButtonOn, setPlotHoleButtonOn] = useState(false);

   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    useEffect(() => {
        setErrors(props.UI.errors);

        if (!props.UI.errors && !props.UI.loading ) { //there must be a chnage in this.props and prevProps or else it would go to an infinitive loop
            setBody('');
            setErrors({});
        }
    }, [props, props.UI.errors, props.UI.loading]); //only setErrors if props.UI.errors change

    const handleChange = (event) => {
        setBody(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.data.episode) {
            const post = {
                body: body,
                titleImdbId: props.titleId,
                titleId: props.data.episode.imdbID,
                title: props.title,
                season: props.data.season,
                episode: props.data.episode.Episode,
                opinion: opinionButtonOn,
                funFact: funFactButtonOn,
                plotHoles: plotHoleButtonOn
            }
            props.uploadPost(post);

        } else {
            if (props.data.title.Type === 'series' && Number.isInteger(props.data.season)) { //if the user is on a season of a tv show/series
                const post = {
                    body: body,
                    titleImdbId: props.titleId,
                    titleId: props.data.title.imdbID + this.props.data.season,
                    title: props.data.title.Title,
                    season: props.data.season,
                    opinion: opinionButtonOn,
                    funFact: funFactButtonOn,
                    plotHoles: plotHoleButtonOn
                }
                props.uploadPost(post); //this.props.data.season is in the global state (result from the handling of the season dropdown in the titleinfo)
            }
            else { // if the user is on the overview movie/series page
                const post = {
                    body: body,
                    titleImdbId: props.titleId,
                    titleId: props.data.title.imdbID,
                    title: props.data.title.Title,
                    opinion: opinionButtonOn,
                    funFact: funFactButtonOn,
                    plotHoles: plotHoleButtonOn
                }
                props.uploadPost(post);
            }
        }
        setBody('');
    };

    const handleOpinionButton = () => {
        setOpinionButtonOn(!opinionButtonOn);
        if (!opinionButtonOn) {
            setFunFactButtonOn(false);
            setPlotHoleButtonOn(false);
        }

    }

    const handleFunFactButton = () => {
        setFunFactButtonOn(!funFactButtonOn);
        if (!funFactButtonOn) {
            setOpinionButtonOn(false);
            setPlotHoleButtonOn(false);
        }
    }

    const handlePlotHolesButton = () => {
        setPlotHoleButtonOn(!plotHoleButtonOn);
        if (!plotHoleButtonOn) {
            setFunFactButtonOn(false);
            setOpinionButtonOn(false);
        }
    }
    const { classes, placeholderTitle } = props;
    const { loading } = props.data;
    
    const fullSizePostForm = (
         <Fragment>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    name='body'
                    type='text'
                    variant='outlined'
                    //label='POST'
                    multiline
                    rows='5'
                    placeholder={`Share your thoughts on ${placeholderTitle}`}
                    value={body}
                    error={errors ? (errors.body ? true : false) : false}
                    helperText={errors ? errors.body : ''}
                    className={classes.textField}
                    onChange={handleChange}
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
                        <Button className={classes.iconButton} onClick={handleOpinionButton}>
                            <Checkbox
                                checked={opinionButtonOn}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.checkBox}
                            />
                            <Typography variant='body1' className={classes.buttonTypography}>
                                Opinion
                        </Typography>
                        </Button>
                        <Button onClick={handleFunFactButton} className={classes.iconButton}>
                            <Checkbox
                                checked={funFactButtonOn}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.checkBox}
                            />
                            <Typography variant='body1' className={classes.buttonTypography}>
                                Fun fact
                        </Typography>
                        </Button>
                        <Button onClick={handlePlotHolesButton} className={classes.iconButton}>
                            <Checkbox
                                checked={plotHoleButtonOn}
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
    );

const mobilePostCategorySelect = (
    <div style={{ height: 28 }}>
                <div>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button className={classes.iconButton} onClick={handleOpinionButton}>
                            <Checkbox
                                checked={opinionButtonOn}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.mobileSizeCheckBox}
                            />
                            <Typography variant='body2' className={classes.buttonTypography}>
                                Opinion
                        </Typography>
                        </Button>
                        <Button onClick={handleFunFactButton} className={classes.iconButton}>
                            <Checkbox
                                checked={funFactButtonOn}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.mobileSizeCheckBox}
                            />
                            <Typography variant='body2' className={classes.buttonTypography}>
                                Fun fact
                        </Typography>
                        </Button>
                        <Button onClick={handlePlotHolesButton} className={classes.iconButton}>
                            <Checkbox
                                checked={plotHoleButtonOn}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.mobileSizeCheckBox}
                            />
                            <Typography variant='body2' className={classes.buttonTypography}>
                                Plot holes
                        </Typography>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
)
        const mobileSizePostForm = (
         <Fragment>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    name='body'
                    type='text'
                    variant='outlined'
                    //label='POST'
                    multiline
                    rows='3'
                    placeholder={`Share your thoughts on ${placeholderTitle}`}
                    value={body}
                    error={errors ? (errors.body ? true : false) : false}
                    helperText={errors ? errors.body : ''}
                    className={classes.mobileSizeTextField}
                    onChange={handleChange}
                    fullWidth
                />
{
                }
            </form>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-58px', marginBottom: 13}}>
            {mobilePostCategorySelect}
            <IconButton
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.submitButton}
                    disabled={loading}
                >
                    <SendIcon />
                                {loading && (
                        <CircularProgress size={30} className={classes.progressSpinner} />
                    )}
                </IconButton>
                </div>
        </Fragment>
    )
    
    return (
       isSmallScreen ? mobileSizePostForm : fullSizePostForm
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapDispatchToProps = {
    uploadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostForm));
