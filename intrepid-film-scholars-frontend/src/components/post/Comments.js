import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// import components
import Comment from './Comment';

// import MUI related
import Grid from '@material-ui/core/Grid';
const styles = (theme) => ({
})

class Comments extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    scrollToMyRef = () => this.myRef.current.offsetTop && window.scrollTo(0, this.myRef.current.offsetTop)
    //scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop); // run this method to execute scrolling

    
    render() {
        const { comments } = this.props;

        return (
            <Grid container>
                {comments && comments.map((comment, index) => { // loop through the comments
                    // const { body, createdAt, userImage, userHandle, repliedCommentsCount } = comment;
                    return (
                        <Comment comment={comment} key={index} index={index} refProp={this.myRef} scrollToRef={this.scrollToMyRef}/>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
