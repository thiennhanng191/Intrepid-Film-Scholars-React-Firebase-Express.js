import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// import PropTypes from 'prop-types';
import { useMediaQuery } from "@material-ui/core";

//import Material UI
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = (theme) => ({
    ...theme.spreadThis,
    formControl: {
        marginRight: 15,
        '& .MuiInput-underline:before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none !important'
        },
        '& .MuiInputBase-input': {
            color: '#01B2BF !important',
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    sortPostSelect: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            paddingTop: 12,
            paddingBottom: 12,
        },
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem'
    },
    selectSortPostContainer: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },

    tab: {
        [theme.breakpoints.down('md')]: {
            minWidth: 120
        }
    },
    categoryFormControl: {
        '& .MuiOutlinedInput-root': {
            height: 40,
            minWidth: 80
        }
    },
    sortPostBarMobile: {
        display: 'inline-flex', 
        justifyContent: 'space-between',
        width: '100%', 
        backgroundColor: '#242526', 
        marginBottom: 20
    },
    toggleButtonGroup: {
        paddingTop: 5, 
        paddingBottom: 5, 
        marginRight: 15,
        '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: 5
        },
        '& .MuiToggleButton-root.Mui-selected': {
            backgroundColor: 'rgba(1, 178, 191, 0.5)'
        }
    },
    toggleButton: {

    }
})
function SortPostBar(props) {
    const { classes,
        tabValue,
        handleTabChange,
        sortBy,
        handleSortPostSelect,
        handleCategoryPostSelect,
        handleRecentTopToggleChange
    } = props;

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const mobileRender = (
        <div id='sort-post-bar-mobile' className={classes.sortPostBarMobile}>
            <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 15 }}>
                <FormControl variant="outlined" className={classes.categoryFormControl}>
                    <Select
                        value={tabValue}
                        // indicatorColor="primary"
                        // textColor="primary"
                        onChange={handleCategoryPostSelect}
                        aria-label="disabled tabs example"
                        inputProps={{ 'aria-label': 'Without label' }}
                        MenuProps={{
                            getContentAnchorEl: null, //set this to null to set custom anchor origin position
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
                        }}
                    >
                        <MenuItem value="" disabled>
                            <Typography variant='body1' style={{ color: 'gray' }}>
                                Sort posts by
                                </Typography>
                        </MenuItem>
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Opinion'}>Opinion</MenuItem>
                        <MenuItem value={'Fun Fact'}>Fun Fact</MenuItem>
                        <MenuItem value={'Plot Holes'}>Plot Holes</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: 'inline-flex' }}>
                {/*
                        <FormControl id='select' className={classes.formControl}>
                            <Select
                                value={sortBy}
                                onChange={handleSortPostSelect}
                                className={classes.sortPostSelect}
                                inputProps={{ 'aria-label': 'Without label' }}
                                MenuProps={{
                                    getContentAnchorEl: null, //set this to null to set custom anchor origin position
                                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
                                }}
                                id='sort-post-select'
                            >
                                <MenuItem value="" disabled>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Sort posts by
                                </Typography>
                                </MenuItem>
                                <MenuItem value={'Recent'}>Recent</MenuItem>
                                <MenuItem value={'Top'}>Top</MenuItem>
                            </Select>
                        </FormControl>
                            */}
                <ToggleButtonGroup
                    value={sortBy}
                    exclusive
                    onChange={handleRecentTopToggleChange}
                    aria-label="sort post recent top"
                    className={classes.toggleButtonGroup}
                >
                    <ToggleButton value='Recent' className={classes.toggleButton}>
                        <Typography variant='body2'>
                            Recent
                                </Typography>
                    </ToggleButton>
                    <ToggleButton value='Top' className={classes.toggleButton}>
                        <Typography variant='body2'>
                            Top
                                </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )

    const fullSizeRender = (
        <Grid item container spacing={0} style={{ marginBottom: 20 }}>
            <Grid item xs={10}>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                    aria-label="disabled tabs example"

                >
                    <Tab label="All" value='All' className={classes.tab} />
                    <Tab label="Opinion" value='Opinion' className={classes.tab} />
                    <Tab label="Fun Fact" value='Fun Fact' className={classes.tab} />
                    <Tab label="Plot Holes" value='Plot Holes' className={classes.tab} />
                </Tabs>
            </Grid>
            <Grid item xs={2} id='post-sort-select'>
                <div className={classes.selectSortPostContainer}>
                    <div />
                    <div style={{ display: 'inline-flex' }}>
                        <FormControl id='select' className={classes.formControl}>
                            <Select
                                value={sortBy}
                                onChange={handleSortPostSelect}
                                className={classes.sortPostSelect}
                                inputProps={{ 'aria-label': 'Without label' }}
                                MenuProps={{
                                    getContentAnchorEl: null, //set this to null to set custom anchor origin position
                                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
                                }}
                                id='sort-post-select'
                            >
                                <MenuItem value="" disabled>
                                    <Typography variant='body1' style={{ color: 'gray' }}>
                                        Sort posts by
                                </Typography>
                                </MenuItem>
                                <MenuItem value={'Recent'}>Recent</MenuItem>
                                <MenuItem value={'Top'}>Top</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
    return (
        <Fragment>
            {isSmallScreen ? mobileRender : fullSizeRender}
        </Fragment>
    )
}

export default withStyles(styles)(SortPostBar);
