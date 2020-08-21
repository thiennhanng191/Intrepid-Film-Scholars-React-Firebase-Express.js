import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { ThemeProvider } from 'styled-components';
import themeUtil from './util/theme.js';
import { GlobalStyles } from './util/global.js';
import { lightTheme, darkTheme } from './util/customTheme.js';
import useDarkMode from './util/useDarkMode.js';

import jwtDecode from 'jwt-decode';
// import Redux related
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// import components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// import pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import moviesTV from './pages/moviesTV';
import movieTVdetails from './pages/movieTVdetails';
import episodeDetails from './pages/episodeDetails';
import postDetails from './pages/postDetails';

import axios from 'axios';

const muiTheme = createMuiTheme(themeUtil);

axios.defaults.baseURL = 'https://us-central1-us-social-app.cloudfunctions.net/api/';
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) { // token has already expired
    store.dispatch(logoutUser());
    window.location.href = '/login'; //redirect to login page
    //authenticated = false;

  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />  
        <Provider store={store}>
          <Router>
            <Navbar theme={theme} toggleTheme={toggleTheme}/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path='/moviesTV' component={moviesTV} />
                <Route exact path='/moviesTV/title=:titleId' component={movieTVdetails} />
                <Route exact path='/moviesTV/title=:titleId/post=:postId' component={postDetails} />
                <Route exact path='/moviesTV/title=:titleId/season=:season' component={movieTVdetails} />
                <Route exact path='/moviesTV/title=:titleId/season=:season/post=:postId' component={postDetails} />
                <Route exact path='/moviesTV/title=:titleId/season=:season/episode=:episodeId' component={episodeDetails} />
                <Route exact path='/moviesTV/title=:titleId/season=:season/episode=:episodeId/post=:postId' component={postDetails} />
                <Route exact path='/user/:handle' component={user} />
                <Route exact path='/user/:handle/post/:postId' component={user} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
