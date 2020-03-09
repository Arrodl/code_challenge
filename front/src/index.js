import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import store, { Keys, buildAction, ActionTriggers } from './core/store';
import Header from './components/Header';
import Session from './components/Session';
import ChatRoom from './components/ChatRoom';
import { createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
import { useCurrentUser, logOut } from './core/authentication';
const history = require("history").createBrowserHistory();

const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            root: {
                backgroundColor: 'transparent'
            },
            colorDefault: {
                backgroundColor: 'transparent'
            }
        },
        MuiToolbar: {
            root: {
                justifyContent: 'space-between'
            }
        }
    },
    palette: {
        action: {
            hover: 'gray'
        },
        secondary: {
            main: '#E40000'
        }
    },
    typography: {
        fontSize: 14
    }
});

const App = connect((state, ownProps) => ({
    ...ownProps,
    currentUser : state[Keys.SESSION].user
}), (dispatch) => ({
    setUser: (value) => dispatch(buildAction(Keys.SESSION, ActionTriggers.handleKeyValue({
        key: 'user',
        value
    })))
}))((props = {
    currentUser: null,
    setUser: (value) => {}
}) => {
    if (!props.currentUser) {
        useCurrentUser(user => {
            if (user) {
                props.setUser(user);
            }
        });
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Header currentUser={props.currentUser} deleteUser={() => {
                logOut();
                history.push('/');
                props.setUser(null);
            }} />
            <Router history={history}>
                <Switch>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100%'
                    }}>
                        <Paper elevation={3}>
                            <Route exact path="/" render={p => (<Session {...p} setUser={props.setUser} />)} />
                            <Route exact path="/chatroom" render={p => (<ChatRoom {...p} currentUser={props.currentUser} />)} />
                            {props.currentUser && <Redirect form="/" to="/chatroom" />}
                            {!props.currentUser && <Redirect from="/chatroom" to="/" />}
                        </Paper>
                    </div>
                </Switch>
            </Router>
        </ThemeProvider>
    );
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
