import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Post} from "../interface/post";
import {createPost, deletePost, getPosts, updatePost} from "./apis";

export function useCreatePost() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Post) => createPost(data),
        onSettled: async (_, error) => {
            if (error) {
                console.log("Error", error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ["id"] });
            }
        }
    })
}

export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Post) => updatePost(data),

        onSettled: async (_, error, variables) => {
            if (error) {
                console.log("Error", error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ["post"] });
                await queryClient.invalidateQueries({
                    queryKey: ["post", {id: variables.id}]
                });
            }
        }
    })
}

export function useDeletePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: () => {
            console.log("Deleted successfully")
        },
        onSettled: async (_, error) => {
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ["id"] });
            }
        }
    })
}