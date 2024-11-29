import React, {useEffect, useState} from 'react';
import {getPostsByUserId, usePosts, usePostsIds} from "../queries";
import {useCreatePost, useUpdatePost} from "../services/mutations";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Post} from "../interface/post";
import {Button, ScrollView, Text, TextInput, View} from "react-native";
import PostWrapper from "./post";




function Fetching(props) {
    const posts = usePostsIds()
    const createPostMutation = useCreatePost()
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [userID, setUserID] = useState<number>();

    useEffect(() => {
        async function fetch() {
            const filtered = await getPostsByUserId(userID)
            setFilteredPosts(filtered)
        }
        fetch()
    }, [userID])

    const { control, handleSubmit } = useForm<Post>();

    if (posts.isPending){
        return <div>Loading...</div>
    }

    if (posts.isError) {
        return <div>Something went wrong.</div>
    }


    const handleCreatePostSubmit: SubmitHandler<Post> = (data) => {
        console.log("Data: ", data)
        createPostMutation.mutate(data)
    }

    if (posts.isSuccess) {
        return (
            <ScrollView>
                <select onChange={(e) => setUserID(Number(e.target.value))}>
                    <option> Select a userId </option>
                    {[...new Set(posts.data.map(entry => entry.userId))].map(userId => (
                        <option key={userId} value={userId}>
                            {userId}
                        </option>
                    ))}
                </select>

                <form>
                    <View>
                        <Text>Title:</Text>
                        <Controller
                            control={control}
                            name="title"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable
                                    style={{
                                        borderBottomColor: '#000',
                                        borderBottomWidth: 1,
                                    }}
                                />
                            )}
                        />
                    </View>
                    <View>
                        <Text>Body:</Text>
                        <Controller
                            control={control}
                            name="body"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    maxLength={40}
                                    style={{
                                        borderBottomColor: '#000',
                                        borderBottomWidth: 1,
                                    }}
                                />
                            )}
                        />
                    </View>
                    <Button title={createPostMutation.isPending ? 'Creating...' : 'Create Post'} onPress={handleSubmit(handleCreatePostSubmit)} disabled={createPostMutation.isPending} />
                </form>
                {!userID ? posts.data.map((post) => (
                    <PostWrapper id={post.id} title={post.title} body={post.body} key={post.id} />
                )) : filteredPosts.map((post) => (
                    <PostWrapper id={post.id} title={post.title} body={post.body} key={post.id} />
                ))}
            </ScrollView>
        );
    }
}

export default Fetching;