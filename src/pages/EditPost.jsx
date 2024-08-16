import React, { useState, useEffect, } from 'react'
import { Container, PostForm, PostForm as PostFormContainer } from '../Components'
import appWriteServices from "../appWrite/appWriteConfig"
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [posts, setPosts] = useState(null)
    const { slug } = useParams();
    const naviagate = useNavigate();
    useEffect(() => {
        if (slug) {
            // console.log("use effect :: slug :: " , slug)
            appWriteServices.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            naviagate("/")
        }
    }, [slug, naviagate])
    return posts ?
        (<div className='py-8'>
            <PostForm post={posts} />
        </div>)


        : ""
}

export default EditPost