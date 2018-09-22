import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    request.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    console.log("Request", request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
