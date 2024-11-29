import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Post} from "../interface/post";
import {useDeletePost, useUpdatePost} from "../services/mutations";


function PostWrapper(props) {
    const updatePostMutation = useUpdatePost()
    const deletePostMutation = useDeletePost()

    const [edit, setEdit] = React.useState(false);

    const { control, register, handleSubmit } = useForm<Post>();

    const handleUpdatePostSubmit: SubmitHandler<Post> = (data) => {
        updatePostMutation.mutate(data)
        setEdit(false)
    }

    const handleDeletePost = (id: number) => {
        deletePostMutation.mutate(id)
    }

    return (
        <View style={{borderTopColor: "grey", borderTopWidth: "1px", padding: "1rem", margin: ".5rem"}}>

            {!edit ?
                <>
                    <Text style={{marginBottom: 12}}>
                        Title: {props.title}
                    </Text>
                    <Text style={{marginBottom: 16}}>
                        Body: {props.body}
                    </Text>
                </>
                : <></>
            }

            {edit ?
                <form>
                    <View style={{width:0,height:0}}>
                        <Controller
                            control={control}
                            name="id"
                            defaultValue={props.id}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <TextInput
                                    value={String(value)}
                                    onChangeText={(text) => onChange(Number(text))}
                                    {...rest}
                                />
                            )}
                        />

                    </View>
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
                                multiline
                                numberOfLines={4}
                                placeholder={props.title}
                                placeholderTextColor={"grey"}
                                maxLength={40}
                                style={{
                                    borderBottomColor: '#000',
                                    borderBottomWidth: 1,
                                }}
                            />
                        )}
                    />
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
                                placeholder={props.body}
                                placeholderTextColor={"grey"}
                                maxLength={40}
                                style={{
                                    borderBottomColor: '#000',
                                    borderBottomWidth: 1,
                                    marginBottom: 16
                                }}
                            />
                        )}
                    />
                    <Button
                        title={"Save"}
                        onPress={handleSubmit(handleUpdatePostSubmit)}
                    />
                </form> : <></>
            }
            {!edit ? <div style={{ display: "flex"}}>
                    <Button title={"Delete"} onPress={() => handleDeletePost(props.id!)} />
                    <Button title={"Edit"} onPress={() => setEdit(true)} />
                </div>
                : <></>
            }
        </View>
    );
}

export default PostWrapper;