// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };
import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method, // No need for template literals `${method}`
        url: url,
        data: bodyData || null,
        // Check if bodyData is FormData. If so, don't force Content-Type.
        headers: headers ? headers : undefined, 
        params: params || null,
    });
};