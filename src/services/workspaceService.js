import { getAuthorizationToken } from "../constants/http";

async function getWorkspaceList() {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workspace`,
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getAuthorizationToken(),
                "Content-Type": "application/json"
            }
        }
    );

    return await response.json();
}

// Crear un workspace (CORRECTO)
async function createWorkspace(name, url_img = "") {
    const body = { name, url_img };

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workspace`,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getAuthorizationToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    const data = await response.json();

    if (!data.ok) {
        throw new Error(data.message);
    }

    return data;
}

// Obtener workspace por ID
async function getWorkspaceById(workspace_id) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workspace/${workspace_id}`,
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getAuthorizationToken(),
                "Content-Type": "application/json"
            }
        }
    );

    return await response.json();
}

// Invitar usuario
async function inviteUser(email, workspace_id) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workspace/${workspace_id}/invite`,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getAuthorizationToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ invited_email: email })
        }
    );

    const data = await response.json();

    if (!data.ok) {
        throw new Error(data.message);
    }

    return data;
}

export {
    getWorkspaceList,
    createWorkspace,
    getWorkspaceById,
    inviteUser
};
