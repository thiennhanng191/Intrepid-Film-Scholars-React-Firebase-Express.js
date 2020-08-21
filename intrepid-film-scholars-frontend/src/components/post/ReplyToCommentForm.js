import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// import MUI stuff
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';
//import Redux stuff
import { connect } from 'react-redux';
import { submitReplyToComment, getPost } from '../../redux/actions/dataActions';
import { getAllUsers } from '../../redux/actions/userActions';

//import DraftJS stuff
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

const styles = (theme) => ({
    ...theme.spreadThis,
    textField: {
        //'& .MuiOutlinedInput-root': {
        borderRadius: 15

    },
    commentFormLabel: {
        color: 'black'
    },
    editor: {
        boxSizing: 'border-box',
        cursor: 'text',
        padding: 16,
        borderRadius: 15,
        backgroundColor: '#F0F2F5',
        textAlign: 'left',
        objectFit: 'cover',
        marginBottom: 15
    }
})




class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin({
            //mentionPrefix: '@',
            supportWhitespace: true
        });
    }


    state = {
        body: '',
        errors: {},
        editorState: EditorState.createEmpty(),
        suggestions: this.props.user.users,
        mentionedUsersArray: [],
        commentBody: '',
    }

    componentDidMount = () => {
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, this.props.user.users),
        });
    };

    onAddMention = () => {
        // get the mention object selected
    }

    focus = () => {
        this.editor.focus();
    };

    componentDidUpdate(prevProps) {
        //console.log(this.props.UI.errors);
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors });
        }
        if (!this.props.UI.errors && !this.props.UI.loading && this.props.UI.loading !== prevProps.UI.loading) { //there must be a chnage in this.props and prevProps or else it would go to an infinitive loop
            console.log('checkpoint');
            this.setState({
                body: '',
                editorState: EditorState.createEmpty(),
                errors: {} // close the dialog
            });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    extractMentions = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        let mentionedUsers = [];
        for (let key in raw.entityMap) {
            const ent = raw.entityMap[key];
            if (ent.type === 'mention') {
                mentionedUsers.push(ent.data.mention);
            }
        }
        console.log(`mentionUsers ${JSON.stringify(mentionedUsers)}`);
        this.setState({
            mentionedUsersArray: mentionedUsers
        })
    }

    replaceString = ((stringToReplace, beforeStrings, afterStrings) => {
        var replaceString = stringToReplace;
        for (var i = 0; i < beforeStrings.length; i++) {
            replaceString = replaceString.replace(beforeStrings[i], afterStrings[i]);
        }
        console.log(`replaceString ${replaceString}`)
        return replaceString
    })

    commentBodyFormat = () => {
        let beforeStrings = []
        let afterStrings = []
        this.state.mentionedUsersArray.map(mentionedUser => {
            beforeStrings.push(mentionedUser.name)
            afterStrings.push(`<a href='/user/${mentionedUser.name}'>` + mentionedUser.name + '</a>')
            return mentionedUser;
        })
        console.log(`beforeStrings ${beforeStrings}`);
        console.log(`afterStrings ${afterStrings}`);
        //let retString = this.replaceString(this.state.body, beforeStrings, afterStrings);
        let retString = this.replaceString(this.state.body, beforeStrings, afterStrings);

        return retString;
    }

    extractData = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        console.log(`raw data ${JSON.stringify(raw)}`);
        this.setState({
            body: raw.blocks[0].text
        });
        this.extractMentions();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //this.extractData();
        const newBody = this.commentBodyFormat();
        this.setState({
            body: newBody
        });

        console.log(`new body ${newBody}`)
        console.log(`old body ${this.state.body}`)
        //this.props.submitComment(this.props.postId, { body: this.state.body }); // body is the textfield value
        this.props.submitReplyToComment(this.props.commentId, this.props.postId, { body: newBody, mentions: this.state.mentionedUsersArray }); // body is the textfield value
        //this.props.getPost(this.props.postId);
    }

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];
            
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    {/*
                    <TextField
                        name='body'
                        type='text'
                        label='Comment on post'
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        variant='outlined'
                        fullWidth
                        className={classes.textField}
                    />
                    */}
                    {/*}
                    <OutlinedInput
                        name='body'
                        type='text'
                        error={errors.comment ? true : false}
                        //helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        variant='outlined'
                        fullWidth
                        className={classes.textField}
                        endAdornment={
                            <IconButton type='submit'>
                                <SendIcon />
                            </IconButton>
                        }
                    />*/}

                    <Grid container spacing={0}>
                        <Grid item sm={11} xs={11}>
                            <div className={classes.editor} id='comment-form' onClick={this.focus}> {/* have an id to change form background color in global.js */}
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    error={errors.comment ? true : false}
                                    plugins={plugins}
                                    ref={(element) => { this.editor = element; }}
                                />

                                <MentionSuggestions
                                    onSearchChange={this.onSearchChange}
                                    suggestions={this.state.suggestions}
                                //onAddMention={this.onAddMention}
                                //entryComponent={Entry}
                                />

                            </div>
                        </Grid>
                        <Grid item sm={1} xs={1}>
                            <IconButton type='submit' onClick={this.extractData}>
                                <SendIcon id='submit-icon'/>
                            </IconButton>
                        </Grid>
                    </Grid>


                    {/*
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >
                        Submit
                    </Button>
                    */}
                </form>
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI, //incase we get errors.
    user: state.user,
    authenticated: state.user.authenticated //will not show this form if user is not authenticated
})

const mapDispatchToProps = {
    submitReplyToComment,
    getAllUsers,
    getPost
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentForm));
