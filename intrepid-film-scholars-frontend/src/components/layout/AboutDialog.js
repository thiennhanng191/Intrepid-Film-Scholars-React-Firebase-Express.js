import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// import material-ui related
import { useMediaQuery } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// import icons
import CloseIcon from '@material-ui/icons/CloseRounded';

const styles = (theme) => ({
    ...theme.spreadThis,
    dialogTitle: {
        '& .MuiTypography-h6': {
            color: '#01B2BF'
        }
    },
    dialogContent: {
        paddingBottom: 16
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: 'gray'
    }
})

function AboutDialog(props) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

    const { classes,
        openDialog,
        handleDialogClose
    } = props;

    return (
        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth='md'
            className={classes.dialog}

        >{
                isSmallScreen ? (
                    <DialogTitle className={classes.dialogTitle}>
                        About Intrepid Film Scholars
                    </DialogTitle>
                ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DialogTitle className={classes.dialogTitle}>
                                About Intrepid Film Scholars
                        </DialogTitle>
                            <IconButton onClick={handleDialogClose} style={{ color: 'gray' }}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    )
            }


            <DialogContent className={!isSmallScreen && classes.dialogContent}>
                <Typography variant='body1'>
                    As a personal project of Nhan Nguyen - Vassar College 22', Intrepid Film Scholars is a social media platform where everyone is welcome to discuss about their favorite movies or TV shows, or share any fun facts or plot holes they which they find interesting. Why "intrepid film scholars"? That is what my Intro To Film Studies professor referred to us as, and I found it to be really inspiring and flattering.
                </Typography>
                <Typography variant='body1'>
                    For any bugs report or feature request/suggestion, please contact me at <a href="mailto: ntnguyen@vassar.edu">ntnguyen@vassar.edu</a>.
                </Typography>
                {isSmallScreen &&
                    <DialogActions>
                        <Button variant='contained' onClick={handleDialogClose} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </DialogActions>
                }
            </DialogContent>
        </Dialog >
    )
}

export default withStyles(styles)(AboutDialog);
