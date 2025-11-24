import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { id } = useParams(); // workspace_id

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const loadMessages = async () => {
    const res = await axios.get(`${backend}/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post(`${backend}/messages/${id}`, { text }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setText("");
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <h2>Chat del Workspace</h2>

      <div>
        {messages.map((m) => (
          <p key={m._id}>
            <b>{m.sender}</b>: {m.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
