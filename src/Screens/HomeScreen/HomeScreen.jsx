import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { getWorkspaces } from '../../services/workspaceService';
import { useNavigate } from 'react-router';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const { response, loading, error, sendRequest } = useFetch();

    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);

    return (
        <div className="home-container">

    {/* Sidebar estilo Slack */}
    <ul className="workspace-list">
        {response && response.data ? (
            response.data.map((ws) => (
                <li 
                    key={ws._id}
                    className="workspace-item"
                    onClick={() => navigate(`/workspace/${ws._id}`)}
                >
                    {ws.workspace_name}
                </li>
            ))
        ) : <p style={{ padding: "10px 20px" }}>Sin espacios aún</p>}
    </ul>

    {/* Contenido principal */}
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
