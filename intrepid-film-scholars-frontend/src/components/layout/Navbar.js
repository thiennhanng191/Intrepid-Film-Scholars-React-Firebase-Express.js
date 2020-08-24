import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommonButton from '../../util/CommonButton';
import ThemeToggle from '../../util/ThemeToggle';
import Notifications from './Notifications';

import { logoutUser } from '../../redux/actions/userActions';

// import material-ui related things
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//import icons
import Typography from '@material-ui/core/Typography';
import ProfileIcon from '@material-ui/icons/PersonOutline';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DarkModeIcon from '@material-ui/icons/NightsStayOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/CloseRounded';

// import logo
import IFSLogoWithText from '../../images/ifs_logo_with_text_white.svg';

const styles = (theme) => ({
    ...theme.spreadThis,
    grow: {
        flexGrow: 1,
    },
    avatar: {
        width: 30,
        height: 30
    },
    dropDownIcon: {
        marginRight: 5
    },
    logo: {
        width: 150
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'contents',
        },
    },
    sectionMobile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
})

const profileMenuId = 'primary-profile-menu-mobile';

class Navbar extends Component {
    state = {
        profileAnchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleProfileOpen = (event) => {
        this.setState({
            profileAnchorEl: event.currentTarget
        });
    };

    handleProfileClose = () => {
        this.setState({
            profileAnchorEl: null
        });
    };

    handleMobileMenuOpen = (event) => {
        this.setState({
            mobileMoreAnchorEl: event.currentTarget
        })
    };

    handleMobileMenuClose = () => {
        this.setState({
            mobileMoreAnchorEl: null
        })
    }
    handleLogout = () => {
        this.setState({
            profileAnchorEl: null
        });
        this.props.logoutUser();
    };


    render() {
        const { classes, authenticated, theme, toggleTheme } = this.props;

        const {
            user: {
                credentials: { handle, imageUrl },
                //loading, //different from the UI loading
            }
        } = this.props;

        const isProfileMenuOpen = Boolean(this.state.profileAnchorEl);

        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                id={this.mobileMenuId}
                keepMounted
                //transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
                style={{disableScrollLock: true }}
            >
                <MenuItem>
                    <Link to='/moviesTV'>
                        <Typography variant='body1'>
                            DISCOVER
                                    </Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleProfileClose} component={Link} to={`/user/${handle}`}>
                    <ProfileIcon className={classes.dropDownIcon} /> Profile
                </MenuItem>

                <MenuItem onClick={this.handleLogout} component={Link} to={`/`}>
                    <LogoutIcon className={classes.dropDownIcon} />Logout
                </MenuItem>
                <MenuItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <DarkModeIcon className={classes.dropDownIcon} />Dark Mode
                </div>

                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </MenuItem>
            </Menu>
        );
        const renderProfileMenu = (
            <Menu
                anchorEl={this.state.profileAnchorEl}
                getContentAnchorEl={null} //set this to null to set custom anchor origin position
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id={profileMenuId}
                keepMounted
                //transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isProfileMenuOpen}
                onClose={this.handleProfileClose}
            >

                <MenuItem onClick={this.handleProfileClose} component={Link} to={`/user/${handle}`}>
                    <ProfileIcon className={classes.dropDownIcon} /> Profile
                </MenuItem>

                <MenuItem onClick={this.handleLogout} component={Link} to={`/`}>
                    <LogoutIcon className={classes.dropDownIcon} />Logout
                </MenuItem>
                <MenuItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <DarkModeIcon className={classes.dropDownIcon} />Dark Mode
                </div>

                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </MenuItem>
            </Menu>
        );
        //console.log(authenticated);
        return (
            <div className={classes.grow}>
                <AppBar>
                    <Toolbar>
                        {console.log(authenticated)}
                        {authenticated ? ( /* if user is authenticated */
                            <Fragment>
                                <div className={classes.sectionDesktop}>
                                    <Link to='/'>
                                        <CommonButton tooltip='Home'>
                                            <img src={IFSLogoWithText} alt='logo' className={classes.logo} />
                                        </CommonButton>
                                    </Link>
                                    <div className={classes.grow} />
                                    <Link to='/moviesTV'>
                                        <Typography variant='body1'>
                                            DISCOVER
                                    </Typography>
                                    </Link>


                                    <Notifications id='notification-icon' />
                                    <IconButton
                                        aria-label='user profile'
                                        aria-controls={profileMenuId}
                                        aria-haspopup='true'
                                        onClick={this.handleProfileOpen}
                                    >
                                        <Avatar src={imageUrl} alt='User Profile' className={classes.avatar} />
                                        <span>
                                            <Typography variant='h6'>{handle}</Typography>
                                        </span>
                                    </IconButton>
                                </div>
                                <div className={classes.sectionMobile}>
                                    <Link to='/'>
                                        <CommonButton tooltip='Home'>
                                            <img src={IFSLogoWithText} alt='logo' className={classes.logo} />
                                        </CommonButton>
                                    </Link>
                                    <div className={classes.grow} />
                                    <IconButton
                                        aria-label="show more"
                                        aria-controls={this.mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={this.handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        { isMobileMenuOpen ? <CloseIcon/> : <MenuIcon /> }
                                    </IconButton>
                                </div>
                            </Fragment>
                        ) : ( /* user not authenticated */
                                <Fragment>
                                    <Link to='/'>
                                        <CommonButton tooltip='Home'>
                                            <img src={IFSLogoWithText} alt='logo' className={classes.logo} />
                                        </CommonButton>
                                    </Link>
                                    <div className={classes.grow} />
                                    <Link to='/login' style={{marginRight: 15}}>
                                        <Typography variant='body1'>
                                            LOG IN
                                    </Typography>
                                    </Link>
                                    <Link to='/signup'>
                                        <Typography variant='body1'>
                                            SIGN UP
                                    </Typography>
                                    </Link>
                                </Fragment>
                            )}
                    </Toolbar>
                </AppBar>
                {renderProfileMenu}
                {renderMobileMenu}
            </div >

        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user,
    UI: state.UI
});

const mapDispatchToProps = {
    logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
