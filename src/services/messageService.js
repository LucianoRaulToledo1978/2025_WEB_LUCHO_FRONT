import axios from "axios";
import ENVIRONMENT from "../config/environment.js";



export const getMessages = async (workspace_id) => {
  return axios.get(`${ENVIRONMENT.URL_API}/api/chat/${workspace_id}`, {
    withCredentials: true
  });
};

export const sendMessage = async (workspace_id, content) => {
  return axios.post(
    `${ENVIRONMENT.URL_API + "/api/workspace/ID"}`,
    { content },
    { withCredentials: true }
  );
};
