import config from "../config/config";

import { Client, Account, Databases, Storage, Query, ID } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    // * create Post
    async createPost({ title, slug, content, featuredimage, status, userId }) {
        console.log(title,
            content,
            featuredimage,
            status,
            userId)
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,// database id 
                config.appWriteCollectionId,
                slug, // document id 
                {
                    // document properties
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("AppWrite server :: createPost :: error ", error)
            throw error
        }
    }

    // * update post 
    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,// database id 
                config.appWriteCollectionId,
                slug, // document id 
                {
                    // document properties
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("AppWrite server :: updatePost :: error ", error)
            throw error
        }
    }

    // * delete post 
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,// database id 
                config.appWriteCollectionId,
                slug)

            return true
        } catch (error) {
            console.log("AppWrite server :: deletePost :: error ", error)
            return false;
        }
    }

    // * single get Post 
    async getPost(slug) {
        console.log("app write config getPost " , slug)
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,// database id 
                config.appWriteCollectionId,
                slug)
        } catch (error) {
            console.log("AppWrite server :: get Post :: error ", error)
            // throw error
            return false
        }
    }

    // * get Posts 
    // ?  you need to create indexes before using the [*** queries]
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,// database id 
                config.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("AppWrite server :: get Posts error  :: error ", error)
            // throw error
            return false
        }
    }

    // * file upload method 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("AppWrite server :: file error :: error ", error)
            // throw error
            return false
        }
    }

    // * Delete Fil 
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId,

            )
            return true;
        } catch (error) {
            console.log("AppWrite server :: file error into delete :: error ", error)
            // throw error
            return false
        }
    }

    // * file preview
    getFilePreview(fileId) {
        // console.log("app write config :: getFilePrview :: fileId ", fileId)
        try {
            return this.bucket.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("app write config :: getFilePrview :: error ", error.message)
        }
    }

}


const service = new Service();
export default service;