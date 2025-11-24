import axios from "axios";
import ENVIRONMENT from "../config/environment.js";



export const getMessages = async (workspace_id) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/chat/${workspace_id}`, {
    withCredentials: true
  });
};

export const sendMessage = async (workspace_id, content) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL + "/api/workspace/ID"}`,
    { content },
    { withCredentials: true }
  );
};
