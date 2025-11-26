import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useFetch from "../hooks/useFetch.jsx";

import { getWorkspaces } from "../services/workspaceService";
import "../Screens/HomeScreen/HomeScreen.css";

const SlackLayout = () => {
    const navigate = useNavigate();
    const { response, sendRequest } = useFetch();

    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);

    let workspaceList = [];

    if (Array.isArray(response?.data?.workspaces)) {
        workspaceList = response.data.workspaces;
    }

    return (
        <div className="home-container">

            {/* SIDEBAR */}
            <ul className="workspace-list">
                {workspaceList.map(ws => (
                    <li
                        key={ws._id}
                        className="workspace-item"
                        onClick={() => navigate(`/workspace/${ws._id}`)}
                    >
                        {ws.workspace_name}
                    </li>
                ))}
            </ul>

            {/* CONTENIDO */}
            <div className="home-main">
                <Outlet />
            </div>

        </div>
    );
};

export default SlackLayout;
