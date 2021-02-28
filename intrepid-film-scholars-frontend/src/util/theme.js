export default {
  palette: {
    primary: {
      light: '#3BB6BF',
      main: '#01B2BF',
      dark: '#016B73',
      contrastText: '#013C40'
      //textDark: '#F2C791',
    },
    secondary: {
      light: '#5CC0C7',
      main: '#079BAB',
      dark: '#005D70',
      contrastText: '#FFC432'
      //textDark: '#0D212C',
    },
  },
  shadows: new Array(25).fill('none'),
  spreadThis: { // styling object to be spread to the child components (e.g the login, signup, etc page)
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    logo: {
      maxWidth: '20%',
      margin: '15px auto 0px auto',
      objectFit: 'contain'
    },
    root: {
      display: 'flex',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
      color: '#01B2BF !important'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    textField: {
      margin: '10px auto 10px auto',
      marginBottom: 5
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    footer: {
      marginTop: 10,
      fontSize: '1.2rem'
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none', //invisible
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 130,
        height: 130,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'left',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#255059' //theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
}