import * as nodeFetch from "node-fetch";
import { apiUrl } from "../lib/links";

export const getLoginToken = async(username, password) => {
    const response = await nodeFetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({username: username, password: password})
    })
    if(response.status !==200){
        throw new Error("An error occured, please contact IT");
    }
    const body = await response.json();
    return body.token;
}