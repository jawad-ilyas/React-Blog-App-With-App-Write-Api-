import React, { useState, useEffect } from 'react'
import appWriteServices from "../appWrite/appWriteConfig"
import { Container, PostCard as PostCardContainer } from '../Components'

export default function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appWriteServices.getPosts([]).then((posts) => {
            if (posts) {
                // console.log("all post :: getPosts :: posts.documents", posts.documents)
                setPosts(posts?.documents)
            }

        })
    }, [])

    return (
        <Container>
            <div className='flex flex-wrap'>
                {posts?.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCardContainer {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )
}
