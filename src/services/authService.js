// import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
// import ENVIRONMENT from "../config/environment.js";

// const API_URL = import.meta.env.VITE_API_URL;

// fetch(`${API_URL}/api/auth/login`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ email, password })
// });



// export async function register (name, email, password){
//     const usuario = {
//         email,
//         username: name,
//         password
//     }

//     //Queremos consumir nuesta API

//     //Ordena al navegador hacer una consulta HTTP
//     //recibe 2 parametros: la URL de consulta y un objeto de configuracion de consulta
//     const response_http = await fetch(
//         `${ENVIRONMENT.URL_API}/api/auth/register`,
//         {
//             method: HTTP_METHODS.POST,
//             headers: {
//                 //Como vamos a enviar JSON, configuro que mi consulta envia contenido tipo JSON
//                 [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
//             },
//             body: JSON.stringify(usuario)
//         }
//     )

//     //Transformamos a objeto de JS el body de la respuesta
//     const response_data = await response_http.json()
//     if( !response_data.ok ){
//         throw new Error(response_data.message || 'Error al registrar usuario')
//     }
//     return response_data
// }

// export async function login(email, password) {
//     const response = await fetch(
//         `${ENVIRONMENT.URL_API}/api/auth/login`,
//         {
//             method: HTTP_METHODS.POST,
//             headers: {
//                 [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
//             },
//             body: JSON.stringify({ email, password })
//         })
//     const response_data = await response.json()

//     if (!response.ok) {
//         throw new Error(response_data.message)
//     }
//     return response_data
// }

const API_URL = import.meta.env.VITE_API_URL;

export async function register(name, email, password) {
    const usuario = {
        email,
        username: name,
        password
    };

    const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }
    );

    const response_data = await response.json();

    if (!response.ok) {
        throw new Error(response_data.message || 'Error al registrar usuario');
    }

    return response_data;
}

export async function login(email, password) {
    const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }
    );

    const response_data = await response.json();

    if (!response.ok) {
        throw new Error(response_data.message);
    }

    return response_data;
}
