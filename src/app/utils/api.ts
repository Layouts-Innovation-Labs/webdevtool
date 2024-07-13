// // src/utils/api.ts
// import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
//
// interface ApiRequestParams {
//     url: string;
//     method: 'GET' | 'POST' | 'PUT' | 'DELETE';
//     data?: object | any ;
//     headers?: Record<string, string>;
// }
//
// export async function Api<T>(s: string, post: string, data: Omit<{
//     [p: string]: string
// }, "confirmPassword">): Promise<AxiosResponse<T>> {
//     const config: AxiosRequestConfig = {
//         url,
//         method,
//         data,
//         headers,
//     };
//
//     try {
//         return await axios(config);
//     } catch (error: any) {
//         if (error.response) {
//             // Server responded with a status other than 2xx
//             throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
//         } else if (error.request) {
//             // Request was made but no response was received
//             throw new Error('Error: No response received from server');
//         } else {
//             // Something happened in setting up the request
//             throw new Error(`Error: ${error.message}`);
//         }
//     }
// }
