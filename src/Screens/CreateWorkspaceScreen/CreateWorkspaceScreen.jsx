import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { createWorkspace } from '../../services/workspaceService'
import { useNavigate } from 'react-router'
import './CreateWorkspaceScreen.css'

const CreateWorkspaceScreen = () => {
    const navigation = useNavigate()
    const {response, loading, error, sendRequest} = useFetch()

    const initial_state = {
        workspace_name: ''
    }



    const onSubmit = (form_data) => {
        console.log(form_data)
        sendRequest(
            async () => {
                return await createWorkspace(form_data.workspace_name, '')
            }
        )
    }
    useEffect(
        () => {
            if(response && response.ok){
                /* 
                Si todo esta bien cargar lista de workspaces en home
                 */
                navigation('/home')
            }
        },
        [response]
    )

    const {
        form_state,
        handleInputChange,
        handleSubmit
    } = useForm({
        initial_form_state: initial_state,
        onSubmit: onSubmit
    })
    return (
        <div className="create-container">
            <div className="create-box">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="workspace_name">Nombre del espacio de trabajo</label>
                    <input type="text" name="workspace_name" id="workspace_name" value={form_state.workspace_name} onChange={handleInputChange} />
                </div>
                {
                    error && <span className="error-message">{error.message}</span>
                    /*error && <span style={{color: 'red'}}>{error.message}</span>*/
                }
                 {loading && <span className="loading">Creando espacio...</span>}

                <button type="submit" disabled={loading}>Crear espacio de trabajo</button>
            </form>
        </div>
        </div>
    )
}

export default CreateWorkspaceScreen