import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#396387',
            main: '#26547C',
            dark: '#234D71',
            contrastText: '#FFF',
        },
        secondary: {
            light: '#AB2B35',
            main: '#A31621',
            dark: '#95141E',
            contrastText: '#FFF',
        },
    },
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>
, document.getElementById('root'));
