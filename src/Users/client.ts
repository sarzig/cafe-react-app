import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

console.log("BASE_API", BASE_API);
console.log("USERS_API", USERS_API);

export interface User { 
  _id: string,
  full_name: string,
  image: string,
  email: string,
  password: string,
  hometown: string,
  bio: string,
  interests: [],
  favorite_cafe_days: [],
  favorite_drinks: [],
  favorite_menu_items: [],
  favorite_recipes: string[],
  role: string
};
export const signin = async (credentials: User) => {
  const response = await request.post( `${USERS_API}/signin`, credentials );
  return response.data;
};
export const profile = async () => {
  const response = await request.post(`${USERS_API}/profile`);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user: any) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};
export const findUserById = async (id: string) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};
export const findUsersByRole = async (role: string) => {
  let url = `${USERS_API}?role=${role}`;

  // If role is 'all', change the API endpoint to fetch all users
  if (role === 'all') {
    url = `${USERS_API}`; // Fetch all users without filtering by role
  } else {
    url = `${USERS_API}?role=${role}`; // Fetch all users without filtering by role
  }

  const response = await
  request.get(url);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};