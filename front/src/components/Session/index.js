import React, { useState } from 'react';
import { Paper, Tabs, Tab, TextField, Button, Snackbar } from '@material-ui/core';
import { logIn, register } from '../../core/authentication';

const formConstant = {
    username: {
        label: "Usuario",
        value: "",
    },
    password: {
        label: "Contraseña",
        value: ""
    }
};

export default (props = {
    setUser: (value) => console.log(value)
}) => {
    const [tab, setTab] = useState(0);
    const [form, setForm] = useState(formConstant);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ""
    });
    const [orderedKeys] = useState(["username", "password"]);

    const submit = async (e) => {
        e.preventDefault();
        if (tab === 0) {
            const res = await logIn({ username: form.username.value, password: form.password.value });

            if (res && res.user) {
                props.setUser(res.user);
            } else {
                if (res && res.message) {
                    setSnackbar({
                        open: true,
                        message: res.message
                    });
                } else {
                    setSnackbar({
                        open: true,
                        message: "Server error"
                    });
                }
            }
        } else {
            const res = await register({ username: form.username.value, password: form.password.value });

            if (res && res.user) {
                setSnackbar({
                    open: true,
                    message: "Registrado exitosamente"
                });
                setTab(0);
                setForm(formConstant);
            } else {
                if (res && res.message) {
                    setSnackbar({
                        open: true,
                        message: res.message
                    });
                } else {
                    setSnackbar({
                        open: true,
                        message: "Server error"
                    });
                }
            }
        }
    };

    return (
        <div style={{ padding: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Tabs
                value={tab}
                onChange={(e, newTab) => setTab(newTab)}
            >
                <Tab value={0} label="Inicia sesión" />
                <Tab value={1} label="Registrate" />
            </Tabs>
            <form onSubmit={submit} style={{ marginTop: 10 }}>
                {orderedKeys.map(key => (
                    <TextField variant="outlined" fullWidth
                        key={key}
                        value={form[key].value || ""}
                        label={form[key].label}
                        style={{ marginBottom: 5 }}
                        margin="dense"
                        onChange={e => setForm({ ...form, [key]: { ...form[key], value: e.target.value} })}
                    />
                ))}
                <Button
                    variant="contained"
                    type="submit"
                >
                    Enviar
                </Button>
            </form>
            <Snackbar
                open={snackbar.open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message || ""}
            />
        </div>
    );
};