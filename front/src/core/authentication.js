import { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';
import axios from 'axios';
const secure = new SecureLS();

const getToken = () => secure.get('cc:token');

const setToken = (value) => secure.set('cc:token', value);

const getUser = () => secure.get('cc:user');

const setLoggedUser = (value) => secure.set('cc:user', value);

export const logIn = async (data = { username: "", password: "" }) => {
    return await axios.post('http://localhost:8080/api/auth/signin', data)
        .then(r => {
            setToken(r.data.token);
            axios.defaults.headers = { 'x-access-token': r.data.token };
            setLoggedUser(r.data.user);
            return r.data;
        }).catch(e => e.response && e.response.data);
};

export const register = async (data = { username: "", password: "" }) => {
    const res = await axios.post('http://localhost:8080/api/auth/signup', data)
        .then(r => r.data).catch(e => e.response && e.response.data);
    return res || false;
};

export const useCurrentUser = (
    callback = (user) => {}
) => {
    const token = getToken();
    const user = getUser();
    
    if (token && token !== "" && user && user.id) {
        axios.defaults.headers = { 'x-access-token': token };
        return callback(user);
    }
};