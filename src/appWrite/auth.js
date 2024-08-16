import config from "../config/config";

import { Client, Account, ID } from "appwrite";



export class AuthServices {

    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another mehtod 
                return this.login({ email, password, name })
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login({ email, password }) {
        // console.log(email , password)
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error ", error)
            throw error;
        }

        // this is default behaviour if else is not working 
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error ", error)

            throw error
        }
    }
}

const authServices = new AuthServices();

export default authServices;