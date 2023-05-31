import axios from 'axios';
const oldPut = axios.put;

const getUrl = (url: string): string => {
  return (url = !url.startsWith('http') ? `/overseerr/${url}` : url);
};
axios.put = (url, ...args) => {
  return oldPut(getUrl(url), ...args);
};
const oldDelete = axios.delete;
axios.delete = (url, ...args) => oldDelete(getUrl(url), ...args);
const oldGet = axios.get;
axios.get = (url, ...args) => oldGet(getUrl(url), ...args);
const oldPost = axios.post;
axios.post = (url, ...args) => oldPost(getUrl(url), ...args);

export default axios;
