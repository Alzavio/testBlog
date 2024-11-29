import axios from "axios";
import {Post} from "../interface/post";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPosts = async () => {
    return (await axiosInstance.get<Post[]>('posts')).data;
}
/*
export const createPost = async (newPost: Omit<Post, 'id'>) => {
    await axiosInstance.post("posts", newPost);
};
*/

export const createPost = async (data: Post) => {
    await axiosInstance.post("posts", data);
};

export const updatePost = async (data: Post) => {
    await axiosInstance.put(`posts/${data.id}`, data);
}

export const deletePost = async (id: number) => {
    await axiosInstance.delete(`posts/${id}`);
}