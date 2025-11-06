import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import useForm from "../../hooks/useForm"
import { inviteUser } from "../../services/workspaceService"
import './InviteUserForm.css'

function InviteUserForm({ workspace_id }) {
    const [isOpen, setIsOpen] = useState(false)

    function handleOpenInviteForm() {
        setIsOpen(true)
    }
    function handleCloseInviteForm() {
        setIsOpen(false)
    }


    const {sendRequest, response, error, loading} = useFetch()

    const initial_state = {
        email: ''
    }
    const onSubmit = (form_data) => {
        console.log(form_data)
        sendRequest(
            async () => {
                return await inviteUser(form_data.email, workspace_id)
            }
        )
    }

    const { form_state, handleInputChange, handleSubmit} = useForm({initial_form_state: initial_state, onSubmit})
    console.log(response, error, loading)

   
    return (
    <div className="invite-container">
      {!isOpen ? (
        <button className="invite-button" onClick={() => setIsOpen(true)}>
          + Invitar usuario
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Ingresa el email del usuario"
            value={form_state.email}
            onChange={handleInputChange}
          />
          {error && <span className="error-msg">{error.message}</span>}
          {response && <span className="success-msg">{response.message}</span>}

          <button type="submit" disabled={loading}>Invitar</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}
        



export default InviteUserForm