import { useEffect, useState } from "react";
import axios from "axios";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const getWorkspaces = async () => {
    const res = await axios.get(`${backend}/workspace`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWorkspaces(res.data);
  };

  const createWorkspace = async () => {
    await axios.post(`${backend}/workspace`, { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setName("");
    getWorkspaces();
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  return (
    <div>
      <h1>Mis Workspaces</h1>

      <input
        type="text"
        placeholder="Nuevo Workspace"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createWorkspace}>Crear</button>

      <ul>
        {workspaces.map(w => (
          <li key={w._id}>
            {w.name}
            <button onClick={() => window.location.href = `/chat/${w._id}`}>
              Abrir Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
