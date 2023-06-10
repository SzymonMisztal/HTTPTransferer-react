import React, {useEffect} from 'react';
import {AppBar, Toolbar, IconButton, InputBase, Button, Menu, MenuItem, styled} from '@mui/material';
import { CloudUpload, CloudDownload, AccountCircle, Settings } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function TopBar({currentDir, setCurrentDir}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
        setInputValue(currentDir);
    }, [currentDir]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Handle logout logic here
        handleMenuClose();
    };

    const handleAddAccount = () => {
        // Handle add account logic here
        handleMenuClose();
    };

    const handleSettings = () => {

    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2a2e32',
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    {/* Left */}
                    <Button startIcon={<CloudUpload />}>
                        Upload
                    </Button>
                    <Button startIcon={<CloudDownload />}>
                        Download
                    </Button>

                    {/* Middle */}
                    <InputBase value={inputValue} fullWidth onChange={(e) => setInputValue(e.target.value)} />

                    {/* Right */}
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleLogout}>Log Off</MenuItem>
                        <MenuItem onClick={handleAddAccount}>Add Account</MenuItem>
                    </Menu>
                    <IconButton color="inherit" onClick={handleSettings}>
                        <Settings />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default TopBar;
