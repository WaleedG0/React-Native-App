/*eslint-disable*/
import axios from 'axios';
import url from '../constants/server';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: url,
});

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};


/**
 * Request Wrapper with default success/error actions
 */
const request = async options => {
  const onSuccess = response => {
    if (__DEV__) {
      console.log('%cRequest Successful!', 'color: blue; font-weight: bold;', response.config.url);
    }
    return response.data;
  };

  const onError = error => {
    // console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (__DEV__) {
        console.log(
          '%cRequest Error!',
          'color: red; font-weight: bold;',
          error.response.config.url
        );
        console.log('options: ', options);
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
        console.log('Headers:', error.response.headers);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };


  return client({ ...defaultOptions, ...options })
    .then(onSuccess)
    .catch(onError);
};

export default request;
