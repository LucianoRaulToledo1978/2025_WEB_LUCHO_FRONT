import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { getMessages, sendMessage } from '../../services/messageService';

const ChatScreen = () => {
    const { workspace_id } = useParams();

    const [newMessage, setNewMessage] = useState("");

    const { sendRequest, response, loading } = useFetch();

    // 🔴 Traer mensajes al cargar
    useEffect(() => {
        sendRequest(() => getMessages(workspace_id));
    }, [workspace_id]);

    // 🔵 Enviar mensaje
    const handleSend = async () => {
        if(!newMessage.trim()) return;

        await sendMessage(workspace_id, newMessage);

        // Volver a pedir los mensajes actualizados
        sendRequest(() => getMessages(workspace_id));

        setNewMessage("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Chat del Workspace</h1>

            {/* MESSAGES */}
            <div style={{
                border: "1px solid #ccc",
                height: "300px",
                overflowY: "auto",
                padding: "10px",
                marginBottom: "20px"
            }}>
                {
                    response?.data?.messages?.map(msg => (
                        <div key={msg._id} style={{ marginBottom: "10px" }}>
                            <b>{msg.user.username}:</b> {msg.content}
                        </div>
                    ))
                }
            </div>

            {/* INPUT */}
            <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                style={{ width: "70%", padding: "10px" }}
            />

            <button onClick={handleSend} style={{ padding: "10px 20px", marginLeft: "10px" }}>
                Enviar
            </button>
        </div>
    );
};

export default ChatScreen;
