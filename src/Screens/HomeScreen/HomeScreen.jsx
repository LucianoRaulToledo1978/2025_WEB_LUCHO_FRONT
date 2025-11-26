import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { getWorkspaces } from '../../services/workspaceService';
import { useNavigate } from 'react-router';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const { response, loading, error, sendRequest } = useFetch();

    // 🔵 1) Pedir la lista de workspaces al backend
    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);

    // 🔵 2) Imprimir en consola la respuesta real del backend
    useEffect(() => {
        console.log("RESPONSE FROM BACKEND:", response);
    }, [response]);

    // 🔵 3) Obtener el array real de workspaces, sin importar el nombre
    let workspaceList = [];

    if (response?.data) {
        // Casos posibles:
        if (Array.isArray(response.data)) {
            workspaceList = response.data;
        } 
        else if (Array.isArray(response.data.workspaces)) {
            workspaceList = response.data.workspaces;
        } 
        else if (Array.isArray(response.data.items)) {
            workspaceList = response.data.items;
        } 
        else if (Array.isArray(response.data.list)) {
            workspaceList = response.data.list;
        }
    }

    return (
        <div className="home-container">

            {/* 🔵 SIDEBAR estilo Slack */}
            <ul className="workspace-list">
                {loading && <p style={{ padding: "10px 20px", color: "#fff" }}>Cargando...</p>}

                {error && <p style={{ padding: "10px 20px", color: "red" }}>{error.message}</p>}

                {workspaceList.length > 0 ? (
                    workspaceList.map((ws) => (
                        <li 
                            key={ws._id}
                            className="workspace-item"
                            onClick={() => navigate(`/workspace/${ws._id}`)}
                        >
                            {ws.workspace_name || ws.name || "Sin nombre"}
                        </li>
                    ))
                ) : (
                    !loading && (
                        <p style={{ padding: "10px 20px", color: "#fff" }}>
                            No tenés espacios creados.
                        </p>
                    )
                )}
            </ul>

            {/* 🔵 CONTENIDO PRINCIPAL */}
            <div className="home-main">
                <h1 className="home-title">Mis espacios de trabajo</h1>

                <button
                    className="create-workspace-button"
                    onClick={() => navigate('/workspace/new')}
                >
                    Crear nuevo espacio
                </button>
            </div>

        </div>
    );
};

export default HomeScreen;
