import axios from 'axios';

export function configAxios() {
  axios.interceptors.response.use(response => {
    return response.data;
  }, error => {
    if (error.response.config.headers.silent !== true) {
      if (error.response.status === 404) {
        console.error(`${error.response.status}, ${error.response.config.url} not found.`);
      } else {
        console.error(error.response.data.message || error.response.data.error || error.response.data);
      }
    }
  
    return Promise.reject(error);
  });
}
