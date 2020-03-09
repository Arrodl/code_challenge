import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import io from 'socket.io-client';

export default (props = {
    currentUser: null
}) => {
    const [data, setData] = useState([]);
    const [body, setBody] = useState("");
    const [webSocket] = useState(new WebSocket('wss://codechallengeedge.herokuapp.com'));

    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get('https://codechallengeedge.herokuapp.com/messages').then(r => r.data);

            if (res && res.messages) {
                setData(res.messages.reverse());
            }
        };

        getMessages();
    }, []);

    webSocket.onopen = (e)=> {
        console.log("open", e);
    }

    webSocket.onerror = (e) => {
        console.log("error");
    }

    webSocket.onmessage = (e) => {
        if (e.data) {
            const message = JSON.parse(e.data);
            setData([...data, message]);
        }
    }

    const sendMessage = async () => {
        const data = { body, user_id: props.currentUser.id };
        webSocket.send(JSON.stringify(data));
        // await axios.post('https://codechallengeedge.herokuapp.com/messages', { body, user_id: props.currentUser.id }).then(r => r.data);
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