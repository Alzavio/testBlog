import {useQuery} from "@tanstack/react-query";
import {getPosts} from "./services/apis";


export function usePostsIds() {
    return useQuery({
        queryKey: ["id"],
        queryFn: getPosts
    })
}

export function usePosts(ids: (string | number)[] | undefined) {
    return useQuery({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["post", {id}],
                queryFn: () => getPosts(id!)
            }
        })
    })
}

export const getPostsByUserId = async (userId: number) => {
    const posts = await getPosts();
    return posts.filter(post => post.userId === userId);
};