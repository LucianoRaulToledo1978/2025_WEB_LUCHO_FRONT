import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getMessagesByWorkspace = (workspace_id) => {
  return axios.get(`${API_URL}/messages/${workspace_id}`)
}

export const sendMessage = (workspace_id, text) => {
  return axios.post(`${API_URL}/messages`, {
    workspace_id,
    text
  })
}
