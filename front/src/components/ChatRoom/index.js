import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';

export default (props = {
    currentUser: null
}) => {
    const [data, setData] = useState([]);
    const [body, setBody] = useState("");
    const [webSocket] = useState(new WebSocket('ws://https://codechallengeedge.herokuapp.com'));

    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get('https://codechallengeedge.herokuapp.com/messages').then(r => r.data);

            if (res && res.messages) {
                setData(res.messages.reverse());
            }
        };

        getMessages();
    }, []);

    webSocket.onerror = (e => {
        console.log("Error", e);
    });

    webSocket.onopen = (e => {
        console.log("Open", e);
    })

    console.log(webSocket);

    const sendMessage = async () => {
        await axios.post('https://codechallengeedge.herokuapp.com/messages', { body, user_id: props.currentUser.id }).then(r => r.data);
    };

    return (
        <div style={{ position: 'relative', padding: 10, paddingBottom: 60, height: '80vh', minWidth: 350 }} >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 'calc(80vh)', maxHeight: 'calc(80vh - 90px)', overflow: 'scroll' }}>
                {data.map(message => (
                    <Grid key={message.id} container>
                        {message.userId !== props.currentUser.id && (
                            <Grid item xs={10}>
                                <Typography align="left" style={{ padding: 5 }}>{message.body}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={2} />
                        {message.userId === props.currentUser.id && (
                            <Grid item xs={10}>
                                <Typography align="right" style={{ padding: 5 }}>{message.body}</Typography>
                            </Grid>
                        )}
                    </Grid>
                ))}
            </div>
            <TextField
                value={body}
                variant="outlined"
                margin="dense"
                onChange={e => setBody(e.target.value)}
                style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}
                InputProps={{
                    endAdornment: <InputAdornment>
                        <Button disabled={body === ""} onClick={sendMessage}>
                            Enviar
                        </Button>
                    </InputAdornment>
                }}
            />
        </div>
    );
};