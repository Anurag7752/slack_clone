import {axiosInstance} from "./axios";

export async function getStreamToken(){
    const response = await axiosInstance.get("/chat/token");
    console.log(response.data);
    return response.data;
}