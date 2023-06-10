import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './Styles/Buttons.css';
import './Styles/Inputs.css'

const theme = createTheme({
    palette: {
        background: {
            default: '#2a2e32',
        },
    },
    // other theme configurations...
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
