import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const ThemeSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    color: 'white',
    '&$checked': {
      transform: 'translateX(16px)',
      color: 'white',
      '& + $track': {
        backgroundColor: '#3BB6BF',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#3BB6BF',
      border: '6px solid #black',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #e0e4eb`, //border when switch unchecked (when in light mode)
    backgroundColor: '#e0e4eb',
    opacity: 1,
    height: 'initial',
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

/*
const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 100px;
  height: 40px;
  margin: 0 auto;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  svg {
    width: 1.2rem;
    height: auto;
    transition: all 0.3s linear;
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;
*/

const styles = (theme) => ({
  ...theme.spreadThis,
  formControlLabel: {
    marginLeft: 0,
    marginRight: 0
  }
});

const ThemeToggle = ({ theme, toggleTheme }, props) => {
  const isDark = theme === 'dark';

  return (
    /*
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme} >
          <FlareIcon style={{color: '#F2C744'}}/>
          <NightsStayIcon style={{color: '#F2F2F0'}}/>
      </ToggleContainer>
     */
    <FormControlLabel
      control={<ThemeSwitch checked={isDark} onChange={toggleTheme} name="checkedB" />}
      style={{  marginLeft: 0,
        marginRight: 0, height: 30}}
    //label="iOS style"
    />

  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ThemeToggle);
