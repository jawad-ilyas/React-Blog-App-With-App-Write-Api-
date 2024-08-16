import React, { useCallback, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Button, Input, RTE, Select } from "../index"
import appWriteService from "../../appWrite/appWriteConfig"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
function PostForm({ post }) {
    console.log("post form :: post", post, post?.slug)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    // console.log("post form :: useselecter :: userData", userData, userData?.$id)
    // console.log("Complete userData object:", userData);
    // console.log("Access $id directly:", userData.$id);


    const submit = async (data) => {
        // ! update case of the post 
        if (post) {

            // console.log("postform :: submit :: update post is called :: post", post)
            const file = await data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null
            console.log("post form :: file ", file)
            if (file) {
                appWriteService.deleteFile(post?.featuredimage)
            }
            const dbPost = await appWriteService.updatePost(post.$id, { ...data, featuredimage: file ? file.$id : undefined })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            // * create post file 
            // console.log("post form :: submit :: create post called ")
            const file = await appWriteService.uploadFile(data?.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;

                console.log("postform :: submit :: data", data)
                const dbPost = await appWriteService.createPost({ ...data, userId: userData?.$id })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)

                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == "string") {
            return value.trim().toLocaleLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        else
            return ""
    }, [])


    useEffect(() => {
        const subscribtion = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title))
            }
        })

        return () => {
            subscribtion.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm