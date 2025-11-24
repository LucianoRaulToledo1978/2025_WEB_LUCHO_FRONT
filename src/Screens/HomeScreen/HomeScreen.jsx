import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceList } from '../../services/workspaceService'
import { Link } from 'react-router'
import './HomeScreen.css'

const HomeScreen = () => {
    const {loading, response, error, sendRequest} = useFetch()

    useEffect(
        () => {
            sendRequest(
                getWorkspaceList
            )
        },
        []
    )

    console.log(response, loading, error)
    console.log("RESPONSE COMPLETA:", response);

  return (
    <div className="home-container">
       
        <h1>Espacios de trabajo</h1>
        {loading && <div className="loading">Cargando espacios...</div>}
         {error && <div className="error">Error: {error.message}</div>}

         <div className="workspace-list">
        {
            !loading && response &&  response.data.workspaces.map(
                (elemento) => {
                    return (
                        <div className="workspace-card" key={elemento.workspace_id}>
                            <h2>{elemento.workspace_name}</h2>
                            <a href={`/workspace/${elemento.workspace_id}`}>Entrar</a>
                        </div>
                    )
                }
            )
        }
        </div>

         <Link to='/workspace/new' className="new-workspace-link">
            Crear nuevo espacio de trabajo
        </Link>
    </div>
  )
}

export default HomeScreen