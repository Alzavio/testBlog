import React, {useState} from 'react';
import {usePosts} from "../queries";
import {useCreatePost} from "../services/mutations";
import { SubmitHandler } from "react-hook-form";

function Fetching(props) {
    const posts = usePosts()
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    if (posts.isPending){
        return <div>Loading...</div>
    }

    if (posts.isError) {
        return <div>Something went wrong.</div>
    }

    const createPostMutation = useCreatePost()


    const handleCreatePostSubmit: SubmitHandler<Post> = (data) => {
        createPostMutation.mutate(data)
    }

    if (posts.isSuccess) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Body:</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </button>
                </form>

                {posts.data.map((post) => (
                    <div style={{borderTop: "1px solid grey", padding: "1rem", margin: ".5rem"}} key={post.id}>
                        Title: {post.title}
                        <br/><br/>
                        Body: {post.body}
                    </div>
                ))}
            </>
        );
    }
}

export default Fetching;