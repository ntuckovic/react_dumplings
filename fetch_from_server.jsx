/*
Example usage:
==============
import fetchFromServer from 'react-dumplings/fetch_from_server.jsx';

fetchFromServer.fetch("http://my-api-link.exmpla", (data) => {
    console.log(data);
    console.log('jaaj!');
});
*/

const fetchFromServer = {
    checkStatus: (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    },

    parseJSON: (response) => {
        return response.json()
    },

    mergeHeaders: (headers={}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        };

        headers = Object.assign(headers, defaultHeaders)

        return headers;
    },

    fetch: (url, onSuccess) => {
        return fetch(url, {
              credentials: 'same-origin'
            })
            .then(fetchFromServer.checkStatus)
            .then(fetchFromServer.parseJSON)
            .then(function(data) {
                onSuccess(data);
            })
    },

    post: (url, data, onSuccess, headers={}) => {
        return fetch(url, {
              credentials: 'same-origin',
              method: 'POST',
              headers: fetchFromServer.mergeHeaders(headers),
              body: JSON.stringify(data)
            })
            .then(fetchFromServer.checkStatus)
            .then(fetchFromServer.parseJSON)
            .then(function(data) {
                onSuccess(data);
            })
    },
};

module.exports = fetchFromServer;
