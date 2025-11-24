import axios from "axios";
import ENVIRONMENT from "../config/environment";

export const getMessages = async (workspace_id) => {
  return axios.get(`${ENVIRONMENT.URL_API}/messages/${workspace_id}`, {
    withCredentials: true
  });
};

export const sendMessage = async (workspace_id, content) => {
  return axios.post(
    `${ENVIRONMENT.URL_API}/messages/${workspace_id}`,
    { content },
    { withCredentials: true }
  );
};
