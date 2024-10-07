import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get method for getting api data
export const getUser = () => {
  return api.get("/users");
};

// delete method for deleting data by id
export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

//post method  adding data 
export const postData = (user) => {
  return api.post("/users", user);
};

//put method for updating or editig data
export const updateData = (id, user) => {
  return api.put(`/users/${id}`, user);
};