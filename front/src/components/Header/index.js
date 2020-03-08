import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';

export default ({ currentUser, deleteUser = () => {} }) => {

    return (
        <AppBar position="fixed" elevation={0} color="default">
            <Toolbar>
                <Typography>
                    Test: Alfonso Reyna Cerón
                </Typography>
                <Typography>
                    {currentUser && currentUser.username}
                    {!currentUser && "No hay usuario loggeado"}
                </Typography>
                {currentUser && 
                <Button onClick={() => deleteUser()}>
                    Cerrar sesión
                </Button>}
            </Toolbar>
        </AppBar>
    );
};