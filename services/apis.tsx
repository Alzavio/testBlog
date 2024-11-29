import axios from "axios";
import {Post} from "./interface/post";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPosts = async () => {
    return (await axiosInstance.get<Post[]>('posts')).data;
}
