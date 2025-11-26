import { useState } from "react";

/* Gestion INTERNA de los fetch de mi aplicacion */
const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    async function sendRequest(requestCallback) {
        try {
            setLoading(true);
            setError(null);

            const response = await requestCallback();
            setResponse(response);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        loading,
        response,
        error,
        sendRequest
    };
};

export default useFetch;
