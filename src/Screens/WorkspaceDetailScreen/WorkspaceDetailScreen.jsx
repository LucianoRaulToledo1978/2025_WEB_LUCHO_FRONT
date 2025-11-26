import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { getWorkspaceById } from '../../services/workspaceService';
import InviteUserForm from '../../Components/InviteUserForm/InviteUserForm';

const WorkspaceDetailScreen = () => {

    const { workspace_id } = useParams();
    const { response, loading, error, sendRequest } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {console.log("RESPONSE WORKSPACE:", response);
    console.log("ERROR WORKSPACE:", error);
        sendRequest(() => getWorkspaceById(workspace_id));
    }, [workspace_id]);

    return (
        <div>
            <h1>
                Workspace Seleccionado: 
                {response?.data?.workspace?.name ?? "Cargando..."}
            </h1>

            <InviteUserForm workspace_id={workspace_id} />

            <button onClick={() => navigate(`/workspace/${workspace_id}/chat`)}>
                Ir al Chat
            </button>
        </div>
    );
}

export default WorkspaceDetailScreen;
