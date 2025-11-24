import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getMessages = async (workspace_id) => {
    return await axios.get(`${API_URL}/messages/${workspace_id}`, {
        withCredentials: true
    });
};

export const sendMessage = async (workspace_id, content) => {
    return await axios.post(`${API_URL}/messages/${workspace_id}`, 
        { content }, 
        { withCredentials: true }
    );
};
