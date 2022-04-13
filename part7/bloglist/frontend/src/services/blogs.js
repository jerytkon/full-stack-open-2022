import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const addLike = async (object) => {
  const config = {
    headers: { Authorization: token }
  };
  const newObject = { ...object, likes: object.likes + 1 };
  const response = await axios.put(
    `${baseUrl}/${object.id}`,
    newObject,
    config
  );
  return newObject;
};

const poista = async (object) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${object.id}`, config);
  return response.data;
};

console.log('hello world');

export default { getAll, create, setToken, update, poista, addLike };
