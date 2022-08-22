import axios from "axios";

const apiURL = 'https://reqres.in/api';

function getUsers(pageParam) {
  return axios.get(`${apiURL}/users?page=${pageParam}`);
}

function getUser(id) {
  return axios.get(`${apiURL}/users/${id}`);
}

function getCreatedUser({ first_name, last_name, email }) {
   return axios.post(`${apiURL}/users`, {
        email,
        first_name,
        last_name
    });
}

function getUpdatedUser(user) {
  return axios.put(`${apiURL}/users/${user.id}`, user);
}

function getDeletedUser(id) {
  return axios.delete(`${apiURL}/users/${id}`);
}

export { getUsers, getUser, getCreatedUser, getUpdatedUser, getDeletedUser };